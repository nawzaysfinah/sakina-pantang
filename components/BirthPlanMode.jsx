'use client';

import { useState, useEffect } from 'react';
import { birthPlan } from '@/data/birthPlan';

const LS_KEY = 'sakinaBirthPlanDone';

const BADGE_COLORS = {
  now:    { bg: '#E1F5EE', color: '#0F6E56' },
  ok:     { bg: '#F1EFE8', color: '#5F5E5A' },
  urgent: { bg: '#FCEBEB', color: '#A32D2D' },
};

export default function BirthPlanMode() {
  const [done, setDone] = useState({});

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(LS_KEY) || '{}');
      setDone(stored);
    } catch {}
  }, []);

  function toggle(taskId) {
    setDone(prev => {
      const next = { ...prev, [taskId]: !prev[taskId] };
      try { localStorage.setItem(LS_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }

  const totalTasks = birthPlan.reduce((acc, w) => acc + w.weekendTasks.length + w.dailyHabits.length, 0);
  const doneTasks  = Object.values(done).filter(Boolean).length;
  const pct        = totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div className="bp-container">
      <div className="bp-intro">
        <p>Week-by-week checklist from Week 32 to full term. Tick tasks as you complete them — progress is saved on this device.</p>
        <div className="bp-progress-bar-wrap">
          <div className="bp-progress-bar-track">
            <div className="bp-progress-bar-fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="bp-progress-label">{doneTasks} of {totalTasks} tasks done · {pct}%</span>
        </div>
      </div>

      {birthPlan.map(week => {
        const allTasks = [...week.weekendTasks, ...week.dailyHabits];
        const weekDone = allTasks.filter(t => done[t.id]).length;
        const weekComplete = weekDone === allTasks.length && allTasks.length > 0;
        const badgeStyle = BADGE_COLORS[week.badgeType] || BADGE_COLORS.ok;

        return (
          <div key={week.week} className={`bp-week-card${weekComplete ? ' bp-week-complete' : ''}`}>
            <div className="bp-week-head">
              <div className="bp-week-left">
                <span className="bp-week-num">Week {week.week}</span>
                {weekComplete && <span className="bp-week-tick">✓</span>}
              </div>
              <div className="bp-week-title">{week.theme}</div>
              <span
                className="bp-badge"
                style={{ background: badgeStyle.bg, color: badgeStyle.color }}
              >
                {week.badge}
              </span>
            </div>

            <div className="bp-week-body">
              {week.weekendTasks.length > 0 && (
                <div className="bp-section">
                  <div className="bp-section-label">
                    <span className="bp-dot bp-dot-wknd" />
                    This weekend
                  </div>
                  {week.weekendTasks.map(task => (
                    <label key={task.id} className={`bp-task${done[task.id] ? ' bp-task-done' : ''}`}>
                      <input
                        type="checkbox"
                        checked={!!done[task.id]}
                        onChange={() => toggle(task.id)}
                        className="bp-checkbox"
                      />
                      <span className="bp-task-text">{task.text}</span>
                    </label>
                  ))}
                </div>
              )}

              {week.dailyHabits.length > 0 && (
                <div className="bp-section">
                  <div className="bp-section-label">
                    <span className="bp-dot bp-dot-daily" />
                    Daily habit{week.dailyHabits.length > 1 ? 's' : ''}
                  </div>
                  {week.dailyHabits.map(task => (
                    <label key={task.id} className={`bp-task${done[task.id] ? ' bp-task-done' : ''}`}>
                      <input
                        type="checkbox"
                        checked={!!done[task.id]}
                        onChange={() => toggle(task.id)}
                        className="bp-checkbox"
                      />
                      <span className="bp-task-text">{task.text}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
