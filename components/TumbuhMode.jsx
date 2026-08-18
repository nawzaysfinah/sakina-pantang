'use client';

import { useState, useEffect } from 'react';
import { babyDevPhases } from '@/data/babyDev';

const LS_KEY = 'sakinaTumbuhDone';

export default function TumbuhMode() {
  const [done, setDone] = useState({});
  const [activePhase, setActivePhase] = useState('newborn');

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

  const allTasks = babyDevPhases.flatMap(p =>
    p.weeks.flatMap(w => [...w.motor, ...w.social, ...w.cognitive])
  );
  const doneTasks = allTasks.filter(t => done[t.id]).length;
  const pct = allTasks.length ? Math.round((doneTasks / allTasks.length) * 100) : 0;

  const currentPhase = babyDevPhases.find(p => p.id === activePhase);

  return (
    <div className="tb-container">
      <div className="tb-intro">
        <p>Week-by-week activities and milestones for your baby's first 12 months. Tick each activity as you complete it — progress is saved on this device.</p>
        <div className="tb-progress-wrap">
          <div className="tb-progress-track">
            <div className="tb-progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="tb-progress-label">{doneTasks} of {allTasks.length} activities done · {pct}%</span>
        </div>
      </div>

      <div className="tb-phase-tabs">
        {babyDevPhases.map(phase => (
          <button
            key={phase.id}
            className={`tb-phase-tab${activePhase === phase.id ? ' active' : ''}`}
            onClick={() => setActivePhase(phase.id)}
          >
            {phase.label}
            <span className="tb-phase-sub">{phase.sublabel}</span>
          </button>
        ))}
      </div>

      <div className="tb-legend">
        <div className="tb-leg"><div className="tb-dot tb-dot-motor" /><span>Motor</span></div>
        <div className="tb-leg"><div className="tb-dot tb-dot-social" /><span>Social / emotional</span></div>
        <div className="tb-leg"><div className="tb-dot tb-dot-cognitive" /><span>Cognitive / language</span></div>
        <div className="tb-leg"><div className="tb-dot tb-dot-watch" /><span>Watch for this</span></div>
      </div>

      {currentPhase && currentPhase.weeks.map(week => {
        const weekTasks = [...week.motor, ...week.social, ...week.cognitive];
        const weekDone = weekTasks.filter(t => done[t.id]).length;
        const weekComplete = weekDone === weekTasks.length && weekTasks.length > 0;

        return (
          <div key={week.id} className={`tb-week-card${weekComplete ? ' tb-week-complete' : ''}`}>
            <div className="tb-week-head">
              <div className="tb-week-left">
                <span className="tb-week-label">{week.label}</span>
                {weekComplete && <span className="tb-week-tick">✓</span>}
              </div>
              <span className="tb-week-theme">{week.theme}</span>
            </div>

            <div className="tb-week-body">
              {week.motor.length > 0 && (
                <div className="tb-section">
                  <div className="tb-sec-label">
                    <div className="tb-dot tb-dot-motor" />
                    Motor
                  </div>
                  {week.motor.map(task => (
                    <label key={task.id} className={`tb-task${done[task.id] ? ' tb-task-done' : ''}`}>
                      <input
                        type="checkbox"
                        className="tb-checkbox"
                        checked={!!done[task.id]}
                        onChange={() => toggle(task.id)}
                      />
                      <span className="tb-task-text">{task.text}</span>
                    </label>
                  ))}
                </div>
              )}

              {week.social.length > 0 && (
                <div className="tb-section">
                  <div className="tb-sec-label">
                    <div className="tb-dot tb-dot-social" />
                    Social & emotional
                  </div>
                  {week.social.map(task => (
                    <label key={task.id} className={`tb-task${done[task.id] ? ' tb-task-done' : ''}`}>
                      <input
                        type="checkbox"
                        className="tb-checkbox"
                        checked={!!done[task.id]}
                        onChange={() => toggle(task.id)}
                      />
                      <span className="tb-task-text">{task.text}</span>
                    </label>
                  ))}
                </div>
              )}

              {week.cognitive.length > 0 && (
                <div className="tb-section">
                  <div className="tb-sec-label">
                    <div className="tb-dot tb-dot-cognitive" />
                    Cognitive & language
                  </div>
                  {week.cognitive.map(task => (
                    <label key={task.id} className={`tb-task${done[task.id] ? ' tb-task-done' : ''}`}>
                      <input
                        type="checkbox"
                        className="tb-checkbox"
                        checked={!!done[task.id]}
                        onChange={() => toggle(task.id)}
                      />
                      <span className="tb-task-text">{task.text}</span>
                    </label>
                  ))}
                </div>
              )}

              {week.watch.length > 0 && (
                <div className="tb-section tb-section-watch">
                  <div className="tb-sec-label">
                    <div className="tb-dot tb-dot-watch" />
                    Milestones to watch for
                  </div>
                  {week.watch.map((item, i) => (
                    <div key={i} className="tb-watch-item">
                      <span className="tb-watch-bullet">◆</span>
                      <span className="tb-watch-text">{item}</span>
                    </div>
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
