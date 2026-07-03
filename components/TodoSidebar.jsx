'use client';

import { useState, useEffect } from 'react';

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function formatDate(d) {
  const [y,m,day] = d.split('-');
  return `${day}/${m}/${y.slice(2)}`;
}

function catLabel(c) {
  return {groceries:'🛒 Groceries',herbal:'🌿 Herbal',massage:'💆 Massage',chinese:'🔴 坐月子',reminder:'🔔 Reminder',other:'📌 Other'}[c]||c;
}

export default function TodoSidebar({ isOpen, onClose }) {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [form, setForm] = useState({
    title: '',
    category: 'other',
    priority: 'normal',
    dueDate: '',
    day: '',
    notes: '',
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('sakinaTodos') || '[]');
    setTodos(saved);
  }, []);

  const saveTodos = (list) => {
    setTodos(list);
    localStorage.setItem('sakinaTodos', JSON.stringify(list));
  };

  const addTodo = () => {
    if (!form.title.trim()) return;
    const newTodos = [{
      id: crypto.randomUUID(),
      title: form.title.trim(),
      category: form.category,
      priority: form.priority,
      dueDate: form.dueDate,
      day: form.day ? parseInt(form.day) : null,
      notes: form.notes.trim(),
      done: false,
      createdAt: new Date().toISOString(),
    }, ...todos];
    saveTodos(newTodos);
    setForm({ title: '', category: 'other', priority: 'normal', dueDate: '', day: '', notes: '' });
  };

  const toggleTodo = (id) => {
    saveTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTodo = (id) => {
    saveTodos(todos.filter(t => t.id !== id));
  };

  const filtered = todos.filter(t =>
    filter === 'all' ? true : filter === 'done' ? t.done : !t.done
  );

  const active = todos.filter(t => !t.done).length;
  const today = new Date().toISOString().slice(0,10);

  return (
    <>
      <div
        className={`todo-overlay${isOpen ? ' open' : ''}`}
        onClick={onClose}
      />
      <div className={`todo-panel${isOpen ? ' open' : ''}`}>
        <div className="todo-header">
          <button className="todo-close" onClick={onClose}>✕</button>
          <h2>My Tasks</h2>
          <p>Groceries · Bookings · Reminders · Notes</p>
        </div>

        <div className="todo-add-form">
          <input
            className="todo-input"
            placeholder="Add a task…"
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            onKeyDown={e => { if (e.key === 'Enter') addTodo(); }}
          />
          <div className="todo-meta-row">
            <select
              className="todo-select"
              value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
            >
              <option value="other">📌 Other</option>
              <option value="groceries">🛒 Groceries</option>
              <option value="herbal">🌿 Herbal / Jamu</option>
              <option value="massage">💆 Massage / Urut</option>
              <option value="chinese">🔴 Chinese 坐月子</option>
              <option value="reminder">🔔 Reminder</option>
            </select>
            <select
              className="todo-select"
              value={form.priority}
              onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}
            >
              <option value="normal">Normal</option>
              <option value="high">⚠️ High priority</option>
            </select>
          </div>
          <div className="todo-meta-row">
            <input
              className="todo-date"
              type="date"
              value={form.dueDate}
              onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))}
              title="Due date"
            />
            <input
              className="todo-input"
              type="number"
              min="1"
              max="44"
              placeholder="Day # (optional)"
              value={form.day}
              onChange={e => setForm(f => ({ ...f, day: e.target.value }))}
              style={{ margin: 0 }}
            />
          </div>
          <textarea
            className="todo-notes-input"
            placeholder="Notes (optional)…"
            value={form.notes}
            onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
          />
          <button className="todo-add-btn" onClick={addTodo}>+ Add Task</button>
        </div>

        <div className="todo-filters">
          {['all','active','done'].map(f => (
            <button
              key={f}
              className={`todo-filter-btn${filter === f ? ' active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="todo-list">
          {filtered.length === 0 ? (
            <div className="todo-empty">
              {filter === 'done' ? 'No completed tasks yet.' : 'No tasks yet.\nAdd your first above ↑'}
            </div>
          ) : (
            filtered.map(t => {
              const isOverdue = t.dueDate && t.dueDate < today && !t.done;
              return (
                <div
                  key={t.id}
                  className={`todo-item${t.done ? ' done' : ''}${t.priority === 'high' ? ' priority-high' : ''}`}
                >
                  <button
                    className={`todo-check-btn${t.done ? ' checked' : ''}`}
                    onClick={() => toggleTodo(t.id)}
                    title="Toggle done"
                  >✓</button>
                  <div className="todo-item-body">
                    <div className="todo-item-title">{t.title}</div>
                    <div className="todo-item-meta">
                      <span className={`todo-tag cat-${t.category}`}>{catLabel(t.category)}</span>
                      {t.priority === 'high' && (
                        <span className="todo-tag" style={{ background:'#FFF0F0', color:'var(--merah)' }}>High</span>
                      )}
                      {t.dueDate && (
                        <span className={`todo-due${isOverdue ? ' overdue' : ''}`}>
                          {isOverdue ? '⚠️ ' : '📅 '}{formatDate(t.dueDate)}
                        </span>
                      )}
                      {t.day && <span className="todo-due">Day {t.day}</span>}
                    </div>
                    {t.notes && <div className="todo-notes-preview">{t.notes}</div>}
                  </div>
                  <button
                    className="todo-delete-btn"
                    onClick={() => deleteTodo(t.id)}
                    title="Delete"
                  >✕</button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
