'use client';

import { useState, useEffect, useRef } from 'react';
import { meals } from '@/data/meals';
import { chineseMeals } from '@/data/chineseMeals';
import { doaList } from '@/data/doaList';
import { intentions } from '@/data/intentions';
import { jamuSchedule } from '@/data/jamu';
import { chinesePractices } from '@/data/chinesePractices';
import { malayRationale, chineseRationale } from '@/data/rationale';
import { orderingTasks } from '@/data/orderingTasks';
import { weekLabels, dayNames } from '@/data/weekLabels';
import BirthPlanMode from './BirthPlanMode';
import TumbuhMode from './TumbuhMode';

const phases = [
  { days: [1,7],   name: 'Pemulihan Awal',  tag: 'Early Recovery' },
  { days: [8,21],  name: 'Penguatan',        tag: 'Strengthening' },
  { days: [22,44], name: 'Kebangkitan',      tag: 'Awakening' },
];

function getPhase(d) {
  if (d <= 7)  return phases[0];
  if (d <= 21) return phases[1];
  return phases[2];
}

function getChinesePhase(d) {
  if (d <= 7)  return chinesePractices[1];
  if (d <= 21) return chinesePractices[2];
  return chinesePractices[3];
}

function getDayTitle(d) {
  const titles = {
    1:'Hari Pertama · Day One · 第一天', 7:'Satu Minggu · One Week · 第一周',
    14:'Dua Minggu · Two Weeks · 两周', 21:'Tiga Minggu · Three Weeks · 三周',
    28:'Empat Minggu · Four Weeks · 四周', 40:'Hampir Sampai · Almost There · 快到了',
    44:'Selesai · You Did It · 完成了'
  };
  return titles[d] || `Hari Ke-${d} · Day ${d} · 第${d}天`;
}

function getRituals(d) {
  const base = [
    ['🕌','Morning prayer before anything else · Solat & doa pagi · 晨祷优先'],
    ['💧','Warm water with honey & ginger · Air suam madu & halia · 温蜂蜜姜水'],
    ['🌿',"Today's herbal treatment (see schedule above) · Rawatan herbal · 今日草药调理"],
    ['🍽️','Three full meals — do not skip · Tiga waktu makan penuh · 三餐不可省'],
    ['😴','Sleep when the baby sleeps — this is a prescription · Tidur bila bayi tidur · 婴儿睡你也睡'],
  ];
  if (d % 7 === 0) base.push(['💆‍♀️','Full massage today — book your therapist · Urutan penuh 60–90 min · 今日全身按摩']);
  if (d <= 7)      base.push(['🚫','No visitors — recovery needs quiet · Tiada tetamu · 谢绝访客，静心恢复']);
  if (d > 7 && d <= 21) base.push(['🧘‍♀️','Deep breathing 5 min — inhale 4, exhale 6 · Nafas dalam · 深呼吸5分钟']);
  if (d > 21)      base.push(['🚶‍♀️','Light walk 10–15 min inside the home · Jalan kaki ringan · 室内轻走10–15分钟']);
  if (d === 44)    base.push(['🎉','Confinement complete — celebrate with family! · Pantang selesai! · 坐月子圆满完成！']);
  return base;
}

function getMalayRationale(d) { return d <= 7 ? malayRationale[1] : d <= 21 ? malayRationale[2] : malayRationale[3]; }
function getChineseRationale(d) { return d <= 7 ? chineseRationale[1] : d <= 21 ? chineseRationale[2] : chineseRationale[3]; }

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function renderModalBodyHTML(d, tradition) {
  const chPhase = getChinesePhase(d);
  const mRat = getMalayRationale(d);
  const cRat = getChineseRationale(d);
  const meal = meals[d] || meals[((d - 1) % 7) + 1];
  const cMeal = chineseMeals[d];
  const jamu = jamuSchedule[d] || 'Jamu minum pagi: Air jahe & kunyit hangat.';
  const intention = intentions[d - 1];
  const doa = doaList[(d - 1) % doaList.length];
  const t = tradition;

  const sharedSection = `
    <div class="modal-section">
      <h3>Today's Intention · Niat Hari Ini · 今日心意</h3>
      <p style="font-style:italic; color: var(--coklat-muda);">"${escHtml(intention)}"</p>
    </div>
    <div class="modal-section">
      <h3>Prayer · Doa · 祈祷</h3>
      <div class="doa-box">
        <div class="doa-arabic">${doa.arabic}</div>
        <div class="doa-roman">${doa.roman}</div>
        <div class="doa-trans">${doa.trans}</div>
      </div>
    </div>`;

  const malaySection = `
    <div class="trad-section-label"><div class="trad-dot malay"></div><span>Malay & Indonesian · Pantang · 马来传统</span></div>
    <div class="modal-section">
      <h3>Meals Today · Makanan Hari Ini · 今日饮食</h3>
      <div class="meal-grid">
        <div class="meal-card"><div class="meal-time">🌅 Breakfast · Pagi · 早餐</div><div class="meal-name">${meal.pagi[0]}</div><div class="meal-desc">${meal.pagi[1]}</div></div>
        <div class="meal-card"><div class="meal-time">☀️ Lunch · Tengah Hari · 午餐</div><div class="meal-name">${meal.tengah[0]}</div><div class="meal-desc">${meal.tengah[1]}</div></div>
        <div class="meal-card" style="grid-column:span 2"><div class="meal-time">🌙 Dinner · Malam · 晚餐</div><div class="meal-name">${meal.malam[0]}</div><div class="meal-desc">${meal.malam[1]}</div></div>
      </div>
    </div>
    <div class="modal-section">
      <h3>Herbal Treatment · Jamu & Rawatan · 草药调理</h3>
      <div class="jamu-box">${jamu}</div>
    </div>
    <div class="modal-section">
      <h3>Daily Rituals · Amalan Harian · 每日仪式</h3>
      <ul class="ritual-list">${getRituals(d).map(r=>`<li><span class="icon">${r[0]}</span><span>${r[1]}</span></li>`).join('')}</ul>
    </div>
    <div class="modal-section">
      <details class="rationale-details">
        <summary>Why Pantang Works · Mengapa · 为何如此</summary>
        <div class="rationale-block">
          <h4>The Core Principle · Prinsip Utama</h4>
          <p>${mRat.principle}</p>
          <h4>Why These Foods · Mengapa Makanan Ini</h4>
          <ul>${mRat.food.map(f=>`<li>${f}</li>`).join('')}</ul>
          <h4>Why Jamu & Massage · Mengapa Jamu & Urutan</h4>
          <ul>${mRat.jamu.map(j=>`<li>${j}</li>`).join('')}</ul>
          <h4>Why 44 Days · Mengapa 44 Hari</h4>
          <p>${mRat.confinement}</p>
        </div>
      </details>
    </div>`;

  const chineseSection = `
    <div class="trad-section-label"><div class="trad-dot chinese"></div><span>Chinese Confinement · 坐月子 (zuò yuèzi) · Penjagaan Cina</span></div>
    <div class="modal-section">
      <h3 class="chinese-h">Meals Today · 今日饮食 · Makanan Hari Ini</h3>
      <div class="meal-grid">
        <div class="meal-card chinese-card"><div class="meal-time">🌅 Morning · 早餐</div><div class="meal-name">${cMeal.pagi[0]}</div><div class="meal-desc">${cMeal.pagi[1]}</div></div>
        <div class="meal-card chinese-card"><div class="meal-time">☀️ Lunch · 午餐</div><div class="meal-name">${cMeal.tengah[0]}</div><div class="meal-desc">${cMeal.tengah[1]}</div></div>
        <div class="meal-card chinese-card" style="grid-column:span 2"><div class="meal-time">🌙 Dinner · 晚餐</div><div class="meal-name">${cMeal.malam[0]}</div><div class="meal-desc">${cMeal.malam[1]}</div></div>
      </div>
    </div>
    <div class="modal-section">
      <h3 class="chinese-h">${chPhase.title}</h3>
      <div class="chinese-box"><strong>今日草药 · Herbal Drink:</strong> ${chPhase.herbal}</div>
    </div>
    <div class="modal-section">
      <h3 class="chinese-h">Practices · 坐月子规矩</h3>
      <ul class="ritual-list">${chPhase.practices.map(r=>`<li><span class="icon">${r[0]}</span><span>${r[1]}</span></li>`).join('')}</ul>
    </div>
    <div class="modal-section">
      <h3 class="chinese-h">Wisdom · 传统智慧</h3>
      <p style="font-style:italic; color: var(--merah); font-size:0.9rem; line-height:1.7;">${chPhase.wisdom}</p>
    </div>
    <div class="modal-section">
      <details class="rationale-details chinese">
        <summary>Why 坐月子 Works · 为何如此 · Mengapa</summary>
        <div class="rationale-block chinese">
          <h4>The Core Principle · 核心原理</h4>
          <p>${cRat.principle}</p>
          <h4>Why These Foods · 为何吃这些</h4>
          <ul>${cRat.food.map(f=>`<li>${f}</li>`).join('')}</ul>
          <h4>Why These Herbs · 为何用这些草药</h4>
          <ul>${cRat.herbs.map(h=>`<li>${h}</li>`).join('')}</ul>
          <h4>The Long View · 长远眼光</h4>
          <p>${cRat.confinement}</p>
        </div>
      </details>
    </div>`;

  const tasks = orderingTasks[d];
  const orderSection = tasks ? `
    <div class="modal-section">
      <h3>📦 Order & Book Today</h3>
      ${tasks.map(task => `
        <div class="order-card ${task.category}">
          <div class="order-cat">${task.icon} ${task.category}</div>
          <div class="order-task">${task.task}</div>
          <div class="order-lead">${task.leadTime}</div>
          <div class="order-items">${task.items.join(' · ')}</div>
        </div>`).join('')}
    </div>` : '';

  let html = orderSection + sharedSection;
  if (t === 'malay')        html += malaySection;
  else if (t === 'chinese') html += chineseSection;
  else                      html += malaySection + '<hr class="divider-trad">' + chineseSection;

  return html;
}

export default function SakinaApp() {
  const [appMode, setAppMode] = useState('recover'); // 'recover' | 'prepare' | 'tumbuh'
  const [doneDays, setDoneDays] = useState([]);
  const [currentDay, setCurrentDay] = useState(null);
  const [currentTradition, setCurrentTradition] = useState('both');
  const [hoverInfo, setHoverInfo] = useState(null);
  const modalBodyRef = useRef(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('sakinaDone') || '[]');
    setDoneDays(saved);
  }, []);

  const saveDoneDays = (days) => {
    setDoneDays(days);
    localStorage.setItem('sakinaDone', JSON.stringify(days));
  };

  const openDay = (d) => {
    setCurrentDay(d);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setCurrentDay(null);
    document.body.style.overflow = '';
  };

  const navigateDay = (dir) => {
    const next = currentDay + dir;
    if (next >= 1 && next <= 44) setCurrentDay(next);
  };

  const toggleDone = () => {
    const newDays = doneDays.includes(currentDay)
      ? doneDays.filter(d => d !== currentDay)
      : [...doneDays, currentDay];
    saveDoneDays(newDays);
  };

  const scrollToWeek = (w) => {
    document.querySelectorAll('.week-btn').forEach((b, i) => b.classList.toggle('active', i === w - 1));
    const el = document.getElementById(`week-${w}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleMouseEnter = (d, e) => {
    if (!window.matchMedia('(hover: hover)').matches) return;
    setHoverInfo({ day: d, x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (hoverInfo) setHoverInfo(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : null);
  };

  const handleMouseLeave = () => setHoverInfo(null);

  const getPreviewPos = (x, y) => {
    const gap = 12;
    let px = x + gap;
    let py = y + gap;
    if (px + 220 > window.innerWidth)  px = x - 220 - gap;
    if (py + 120 > window.innerHeight) py = y - 120 - gap;
    return { left: px, top: py };
  };

  const pct = Math.round((doneDays.length / 44) * 100);
  const phase = currentDay ? getPhase(currentDay) : null;
  const isDone = currentDay ? doneDays.includes(currentDay) : false;

  useEffect(() => {
    if (currentDay && modalBodyRef.current) {
      modalBodyRef.current.innerHTML = renderModalBodyHTML(currentDay, currentTradition);
    }
  }, [currentDay, currentTradition]);

  const hoverMeal = hoverInfo ? (meals[hoverInfo.day] || meals[((hoverInfo.day-1)%7)+1]) : null;
  const hoverTasks = hoverInfo ? orderingTasks[hoverInfo.day] : null;
  const previewPos = hoverInfo ? getPreviewPos(hoverInfo.x, hoverInfo.y) : {};

  return (
    <>
      <div className="header">
        <div className="header-inner">
          <div className="logo-motif">
            <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28 4 C28 4 44 20 28 28 C12 20 28 4 28 4Z" fill="#8FB87A" opacity="0.8"/>
              <path d="M4 28 C4 28 20 44 28 28 C20 12 4 28 4 28Z" fill="#8FB87A" opacity="0.6"/>
              <path d="M52 28 C52 28 36 44 28 28 C36 12 52 28 52 28Z" fill="#8FB87A" opacity="0.6"/>
              <path d="M28 52 C28 52 12 36 28 28 C44 36 28 52 28 52Z" fill="#8FB87A" opacity="0.8"/>
              <circle cx="28" cy="28" r="5" fill="#D4975A"/>
            </svg>
          </div>
          <h1>Sakina</h1>
          <p className="subtitle">Postpartum · Pregnancy · Baby Development · 产后 · 孕期 · 宝宝成长</p>
          <p className="tagline">For every stage of the journey · Untuk setiap peringkat · 陪伴每个阶段</p>
        </div>
      </div>

      {/* Mode toggle */}
      <div className="mode-toggle-wrap">
        <button
          className={`mode-btn${appMode === 'prepare' ? ' mode-btn-active-prepare' : ''}`}
          onClick={() => setAppMode('prepare')}
        >
          🌱 Prepare · Sedia · 备产
        </button>
        <button
          className={`mode-btn${appMode === 'recover' ? ' mode-btn-active-recover' : ''}`}
          onClick={() => setAppMode('recover')}
        >
          🌿 Recover · Pulih · 康复
        </button>
        <button
          className={`mode-btn${appMode === 'tumbuh' ? ' mode-btn-active-tumbuh' : ''}`}
          onClick={() => setAppMode('tumbuh')}
        >
          🌸 Tumbuh · 成长
        </button>
      </div>

      {appMode === 'prepare' && <BirthPlanMode />}

      {appMode === 'tumbuh' && <TumbuhMode />}

      {appMode === 'recover' && (
        <>
          <div className="intro">
            <p>Welcome to your 44-day postpartum healing journey. Every day holds its own intention — deep rest, nourishment, ritual, and care. Two ancient traditions, woven into one path.</p>
            <p>Selamat datang dalam perjalanan pemulihan Anda. · 欢迎踏上您的产后康复之旅。</p>
            <div className="intro-phases">
              <span className="phase-chip">Days 1–7 · Early Recovery · Pemulihan Awal · 初期恢复</span>
              <span className="phase-chip hijau-mid">Days 8–21 · Strengthening · Penguatan · 增强体力</span>
              <span className="phase-chip tembaga">Days 22–44 · Awakening · Kebangkitan · 恢复活力</span>
            </div>
          </div>

          <div className="progress-section">
            <div className="progress-bar-wrap">
              <div className="progress-bar" style={{ width: `${pct}%` }}></div>
            </div>
            <div className="progress-label">{doneDays.length} of 44 days complete</div>
          </div>

          <div className="week-nav">
            {[1,2,3,4,5,6,7].map(w => (
              <button key={w} className="week-btn" onClick={() => scrollToWeek(w)}>
                {w === 7 ? 'Day 43–44' : `Week ${w}`}
              </button>
            ))}
          </div>

          <div className="days-section">
            {weekLabels.map(wk => (
              <div className="week-section" id={`week-${wk.w}`} key={wk.w}>
                <div className="week-label">
                  {wk.label} <span className="phase-tag">{wk.phase}</span>
                </div>
                <div className="day-grid">
                  {wk.days.map(d => {
                    const dDone = doneDays.includes(d);
                    const dow = dayNames[d % 7];
                    return (
                      <div
                        key={d}
                        className={`day-card${dDone ? ' done' : ''}`}
                        onClick={() => openDay(d)}
                        onMouseEnter={e => handleMouseEnter(d, e)}
                        onMouseLeave={handleMouseLeave}
                        onMouseMove={handleMouseMove}
                      >
                        <div className="day-num">{d}</div>
                        <div className="day-name">{dow}</div>
                        <div className="day-check">✓</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Hover Preview */}
          {hoverInfo && hoverMeal && (
            <div className="day-preview visible" style={{ left: previewPos.left, top: previewPos.top }}>
              <div className="day-preview-day">Day {hoverInfo.day} · {getDayTitle(hoverInfo.day).split('·')[0].trim()}</div>
              <div className="day-preview-meal">🌅 {hoverMeal.pagi[0].split('·')[0].trim()}</div>
              <div className="day-preview-meal">☀️ {hoverMeal.tengah[0].split('·')[0].trim()}</div>
              <div className="day-preview-meal">🌙 {hoverMeal.malam[0].split('·')[0].trim()}</div>
              {hoverTasks && (
                <div className="day-preview-order">📦 {hoverTasks.length} order/booking task{hoverTasks.length > 1 ? 's' : ''} today</div>
              )}
            </div>
          )}

          {/* Modal */}
          <div
            className={`modal-overlay${currentDay !== null ? ' open' : ''}`}
            onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
          >
            <div className="modal">
              <div className="modal-header">
                <button className="modal-close" onClick={closeModal}>✕</button>
                <div className="modal-day-num">Day {currentDay} of 44</div>
                <div className="modal-title">{currentDay ? getDayTitle(currentDay) : ''}</div>
                <div className="modal-phase">{phase ? `Phase: ${phase.name} · ${phase.tag}` : ''}</div>
              </div>
              <div className="tradition-toggle">
                <button
                  className={`trad-btn${currentTradition === 'both' ? ' active-both' : ''}`}
                  onClick={() => setCurrentTradition('both')}
                >✦ Both Traditions · 双传统</button>
                <button
                  className={`trad-btn${currentTradition === 'malay' ? ' active-malay' : ''}`}
                  onClick={() => setCurrentTradition('malay')}
                >🌿 Malay · Pantang</button>
                <button
                  className={`trad-btn${currentTradition === 'chinese' ? ' active-chinese' : ''}`}
                  onClick={() => setCurrentTradition('chinese')}
                >🔴 Chinese · 坐月子</button>
              </div>
              <div className="modal-body" ref={modalBodyRef}></div>
              <div className="nav-btns">
                <button className="nav-btn" disabled={currentDay <= 1} onClick={() => navigateDay(-1)}>← Previous Day</button>
                <button className="nav-btn" disabled={currentDay >= 44} onClick={() => navigateDay(1)}>Next Day →</button>
              </div>
              <button
                className={`mark-done-btn${isDone ? ' done-state' : ''}`}
                onClick={toggleDone}
              >
                {isDone ? '✓ Day Complete' : 'Mark Day Complete · Tandai Selesai · 标记完成'}
              </button>
            </div>
          </div>

          <div className="footer">
            <div className="footer-name">Sakina · سكينة · 安宁</div>
            <div>Tranquility · Ketenangan · 安宁 · سكينة</div>
            <div style={{ marginTop: '8px', opacity: 0.6 }}>Two ancient traditions, one healing journey · Dua tradisi, satu perjalanan · 两种传统，一段康复之旅</div>
          </div>
        </>
      )}
    </>
  );
}
