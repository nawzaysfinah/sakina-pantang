# Sakina · سكينة · 安宁

**44-Day Postpartum Confinement Program · Program Berpantang 44 Hari · 四十四天坐月子**

A trilingual postpartum companion app bridging the Malay *pantang* and Chinese *坐月子 (zuò yuèzi)* confinement traditions — built for the fourth trimester.

Live: [sakina-pantang-sg.netlify.app](https://sakina-pantang-sg.netlify.app)

---

## What it is

Sakina guides a mother through 44 days of postpartum recovery with:

- **Day-by-day meal plans** for both Malay/Indonesian and Chinese confinement traditions
- **Herbal treatment schedules** — jamu, tapel, param, urutan (Malay) + sesame oil, ginger, TCM herbs (Chinese)
- **Daily intentions, doa (prayer) with Arabic + romanisation**, and rituals
- **"Why it works" explanations** — the biochemistry and TCM logic behind every practice
- **Ordering & booking reminders** with lead times (groceries, jamu packs, massage bookings, 猪脚醋 prep, celebration planning)
- **Hover day preview** — see each day's meals at a glance before opening
- **Persistent task sidebar** — add your own to-dos with due dates, categories, priority, and notes (all stored in the browser)

Everything is trilingual: **English first · Bahasa Melayu · 中文**

---

## Three phases

| Phase | Days | Malay | Chinese |
|---|---|---|---|
| Early Recovery | 1–7 | Pemulihan Awal | 初期恢复 |
| Strengthening | 8–21 | Penguatan | 增强体力 |
| Awakening | 22–44 | Kebangkitan | 恢复活力 |

---

## Tech stack

- **Next.js 14** (App Router)
- **React 18** — fully client-side (`'use client'`)
- **CSS custom properties** — no Tailwind, no CSS-in-JS; plain CSS with design tokens
- **localStorage** — progress tracking and todos persist in the browser, no backend
- **Netlify** — deployed via `@netlify/plugin-nextjs`
- Google Fonts: Playfair Display + DM Sans

---

## Project structure

```
├── app/
│   ├── layout.js          # Root layout, fonts, metadata
│   ├── globals.css        # All styles — CSS custom properties + component classes
│   └── page.js            # Shell → renders <SakinaApp />
├── components/
│   ├── SakinaApp.jsx      # Main client component — all state, grid, modal, hover preview
│   └── TodoSidebar.jsx    # Persistent task panel (desktop) / slide-in (mobile)
└── data/
    ├── meals.js            # 44-day Malay/Indonesian meal plan
    ├── chineseMeals.js     # 44-day Chinese 坐月子 meal plan
    ├── chinesePractices.js # Phase-based 坐月子 practices & herbal schedules
    ├── doaList.js          # 7 Arabic duas with romanisation & translation
    ├── intentions.js       # 44 daily intentions
    ├── jamu.js             # 44-day jamu & herbal treatment schedule
    ├── orderingTasks.js    # Grocery/booking tasks with lead times (key days)
    ├── rationale.js        # Why-it-works explanations — Malay & Chinese (phase-based)
    └── weekLabels.js       # Week structure + day-of-week labels
```

---

## Running locally

```bash
npm install
npm run dev
# → http://localhost:3000
```

```bash
npm run build   # production build
npm start       # serve production build
```

---

## Deploying to Netlify

The `netlify.toml` is pre-configured:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

Connect the GitHub repo in Netlify → **Site configuration → Build & Deploy → Link to Git repository** → select this repo. Every `git push` to `main` will auto-deploy.

---

## Data & privacy

- No backend, no database, no accounts
- All user data (completed days, todo list) lives in `localStorage` — private to the user's browser
- Safe to share publicly

---

## Traditions bridged

| | Malay Pantang | Chinese 坐月子 |
|---|---|---|
| Core belief | Body is "open" (terbuka) — protect from wind & cold | Body is depleted of Qi & Blood — restore with warmth |
| Key foods | Ginger, turmeric, sesame oil, iron-rich broths | Sesame oil chicken, pig trotter vinegar, red dates, dang gui |
| Herbal practice | Jamu (drink), tapel (body paste), param (body scrub), urutan (massage) | 月子茶, 四物汤, 十全大补汤 |
| Duration | 44 days | 30–44 days (满月) |
| Milestone | Kenduri / thanksgiving | 满月酒 Full Moon celebration |

---

*سكينة · Ketenangan · 安宁 · Tranquility*
