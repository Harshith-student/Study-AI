import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useTasks } from '../hooks/useTasks';
import { format } from 'date-fns';
import TaskCard from '../components/TaskCard';

const Revision = () => {
  const [date, setDate] = useState(new Date());
  const { tasks, toggleTaskStatus, deleteTask } = useTasks();

  const revisionTasks = tasks.filter(t => t.tab === 'Revision' || (t.title && t.title.toLowerCase().includes('revise')));

  const tasksForSelectedDate = revisionTasks.filter(t => {
    if (!t.deadline) return false;
    const taskDate = format(new Date(t.deadline), 'yyyy-MM-dd');
    const selectedDate = format(date, 'yyyy-MM-dd');
    return taskDate === selectedDate;
  });

  return (
    <div className="container">
      <h1 className="text-h1 mb-6">Revision Planner</h1>
      <div className="flex gap-lg flex-wrap items-start">
        <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--surface-color)', color: 'var(--text-primary)' }}>
           {/* We inject simple dark styles for react-calendar below via style tag since it usually has light mode defaults */}
          <style>{`
            .react-calendar { background: transparent; border: none; color: #fff; width: 350px; font-family: inherit; }
            .react-calendar__navigation button { color: #fff; min-width: 44px; background: none; font-size: 16px; margin-top: 8px; }
            .react-calendar__navigation button:enabled:hover { background-color: rgba(255,255,255,0.1); }
            .react-calendar__month-view__days__day--weekend { color: var(--danger-color); }
            .react-calendar__tile { color: #fff; }
            .react-calendar__tile:enabled:hover { background-color: rgba(255,255,255,0.1); border-radius: 8px; }
            .react-calendar__tile--now { background: rgba(88, 166, 255, 0.2); border-radius: 8px; }
            .react-calendar__tile--active { background: var(--primary-color) !important; border-radius: 8px; font-weight: bold; }
          `}</style>
          <Calendar 
            onChange={setDate} 
            value={date} 
            className="custom-calendar"
          />
        </div>
        <div className="flex-col gap-md flex-1" style={{ minWidth: '300px' }}>
          <h2 className="text-h2 mb-2">Schedule for {format(date, 'MMMM d, yyyy')}</h2>
          {tasksForSelectedDate.length === 0 ? (
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
              <p className="text-muted">No revision tasks scheduled for this day.</p>
            </div>
          ) : (
             tasksForSelectedDate.map(t => (
               <TaskCard key={t.id} task={t} onToggle={toggleTaskStatus} onDelete={deleteTask} />
             ))
          )}
          
          {revisionTasks.length > 0 && (
             <>
                <h3 className="text-h3 mt-6 mb-2">All Pending Revisions</h3>
                {revisionTasks.filter(t => t.status !== 'Completed').map(t => (
                  <div key={t.id} className="glass-panel" style={{ padding: '1rem', marginBottom: '0.5rem' }}>
                    <p className="text-body" style={{ fontWeight: 600 }}>{t.title}</p>
                    <p className="text-muted" style={{ fontSize: '0.8rem' }}>{t.subject || 'No Subject'} • {t.deadline ? format(new Date(t.deadline), 'MMM dd') : 'No Date Scheduled'}</p>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Revision;
