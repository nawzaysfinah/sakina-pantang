#!/usr/bin/env node
// Builds data/*.js from the Obsidian vault at /vault.
// Frontmatter = exact values. Body = prose + [[wikilinks]] (the graph).
// See /vault/Vault Guide.md for the full design rationale.

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const VAULT_DIR = path.join(ROOT, 'vault');
const OUT_DIR = path.join(ROOT, 'vault-build', 'data');

// ---------- load all notes ----------
const files = fs.readdirSync(VAULT_DIR).filter(f => f.endsWith('.md'));
const notes = {}; // name (no .md) -> { data, content }
for (const f of files) {
  const raw = fs.readFileSync(path.join(VAULT_DIR, f), 'utf8');
  const { data, content } = matter(raw);
  notes[f.slice(0, -3)] = { data, content };
}

// ---------- link resolution ----------
const LINK_RE = /\[\[([^\]|]+)(\|([^\]]+))?\]\]/g;

function resolveLinks(text) {
  if (!text) return text;
  return text.replace(LINK_RE, (_, target, __, alias) => (alias || target).trim());
}

// ---------- markdown section parsing ----------
function parseSections(body) {
  const sections = {};
  const parts = body.split(/^## /m).slice(1); // drop preamble before first ##
  for (const part of parts) {
    const newlineIdx = part.indexOf('\n');
    const heading = (newlineIdx === -1 ? part : part.slice(0, newlineIdx)).trim();
    const text = (newlineIdx === -1 ? '' : part.slice(newlineIdx + 1)).trim();
    sections[heading] = text;
  }
  return sections;
}

function bulletList(sectionText) {
  if (!sectionText) return [];
  return sectionText
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.startsWith('- '))
    .map(l => resolveLinks(l.slice(2).trim()));
}

function iconBulletList(sectionText) {
  // "- 🚿 Bathe only with warm herbal water..." -> ['🚿', 'Bathe only with warm herbal water...']
  if (!sectionText) return [];
  return sectionText
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.startsWith('- '))
    .map(l => {
      const withoutDash = l.slice(2).trim();
      const spaceIdx = withoutDash.indexOf(' ');
      const icon = withoutDash.slice(0, spaceIdx);
      const text = withoutDash.slice(spaceIdx + 1).trim();
      return [icon, resolveLinks(text)];
    });
}

function paragraph(sectionText) {
  if (!sectionText) return undefined;
  return resolveLinks(sectionText.trim());
}

// ---------- group notes by type ----------
const dayNotes = [];
const rationaleNotes = [];
const chinesePracticeNotes = [];

for (const [name, note] of Object.entries(notes)) {
  const t = note.data.type;
  if (t === 'day') dayNotes.push({ name, ...note });
  else if (t === 'rationale') rationaleNotes.push({ name, ...note });
  else if (t === 'chinese-practice') chinesePracticeNotes.push({ name, ...note });
}

// ---------- build meals.js / chineseMeals.js / jamu.js from day notes ----------
const meals = {};
const chineseMeals = {};
const jamuSchedule = {};

for (const note of dayNotes) {
  const d = note.data.day;
  meals[d] = note.data.malay;
  chineseMeals[d] = note.data.chinese;
  const sections = parseSections(note.content);
  if (sections['Jamu']) {
    jamuSchedule[d] = resolveLinks(sections['Jamu'].trim());
  }
}

// ---------- build rationale.js from rationale notes ----------
const malayRationale = {};
const chineseRationale = {};

for (const note of rationaleNotes) {
  const { tradition, phase } = note.data;
  const sections = parseSections(note.content);
  const entry = {
    principle: paragraph(sections['Principle']),
    food: bulletList(sections['Food']),
  };
  if (tradition === 'malay') {
    entry.jamu = bulletList(sections['Jamu']);
  } else {
    entry.herbs = bulletList(sections['Herbs']);
  }
  if (sections['Safety Note']) {
    entry.safetyNote = paragraph(sections['Safety Note']);
  }
  entry.confinement = paragraph(sections['Confinement']);

  if (tradition === 'malay') malayRationale[phase] = entry;
  else chineseRationale[phase] = entry;
}

// ---------- build chinesePractices.js ----------
const chinesePractices = {};
for (const note of chinesePracticeNotes) {
  const { phase, title } = note.data;
  const sections = parseSections(note.content);
  const entry = {
    title,
    practices: iconBulletList(sections['Practices']),
    herbal: paragraph(sections['Herbal Drink']),
    wisdom: paragraph(sections['Wisdom']),
  };
  if (sections['Safety Note']) {
    entry.teaNote = paragraph(sections['Safety Note']);
  }
  chinesePractices[phase] = entry;
}

// ---------- emit as JS modules (matching current data/*.js shapes) ----------
function jsLiteral(v, indent = 0) {
  return JSON.stringify(v, null, 2)
    .split('\n')
    .map((line, i) => (i === 0 ? line : '  '.repeat(indent) + line))
    .join('\n');
}

function writeModule(filename, exportName, obj) {
  const out = `export const ${exportName} = ${JSON.stringify(obj, null, 2)};\n`;
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, filename), out, 'utf8');
  console.log(`  wrote ${path.relative(ROOT, path.join(OUT_DIR, filename))}`);
}

console.log(`Building from ${files.length} vault notes...`);
console.log(`  day notes: ${dayNotes.length}, rationale notes: ${rationaleNotes.length}, chinese-practice notes: ${chinesePracticeNotes.length}`);

writeModule('meals.js', 'meals', meals);
writeModule('chineseMeals.js', 'chineseMeals', chineseMeals);
writeModule('jamu.js', 'jamuSchedule', jamuSchedule);
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(
  path.join(OUT_DIR, 'rationale.js'),
  `export const malayRationale = ${JSON.stringify(malayRationale, null, 2)};\n\n` +
  `export const chineseRationale = ${JSON.stringify(chineseRationale, null, 2)};\n`,
  'utf8'
);
console.log(`  wrote ${path.relative(ROOT, path.join(OUT_DIR, 'rationale.js'))}`);
writeModule('chinesePractices.js', 'chinesePractices', chinesePractices);

console.log('Done.');
