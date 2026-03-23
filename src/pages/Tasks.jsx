import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useSubjects } from '../hooks/useSubjects';
import TaskCard from '../components/TaskCard';

const Tasks = () => {
  const { tasks, addTask, deleteTask, toggleTaskStatus } = useTasks();
  const { subjects } = useSubjects();
  const [activeTab, setActiveTab] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', subject: '', deadline: '', priority: 'Medium', tab: 'Pending' });

  const tabs = ['All', 'Pending', 'Completed', 'Revision'];

  const filteredTasks = tasks.filter(t => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Revision') return t.tab === 'Revision' || t.title.toLowerCase().includes('revise');
    return t.status === activeTab;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.title.trim()) {
      addTask(formData);
      setFormData({ title: '', subject: '', deadline: '', priority: 'Medium', tab: 'Pending' });
      setShowModal(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-h1">Tasks</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ New Task</button>
      </div>

      <div className="flex gap-sm mb-6 scroll-x" style={{ borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem', overflowX: 'auto' }}>
        {tabs.map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ padding: '0.5rem 1rem', background: activeTab === tab ? 'var(--primary-color)' : 'transparent', color: activeTab === tab ? '#fff' : 'var(--text-secondary)', border: 'none', borderRadius: 'var(--border-radius-full)', fontWeight: 500, whiteSpace: 'nowrap' }}
          >
            {tab}
          </button>
        ))}
      </div>

      {filteredTasks.length === 0 ? (
         <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
           <p className="text-body text-muted">No tasks found for "{activeTab}". Enjoy your free time!</p>
         </div>
      ) : (
        <div className="flex-col gap-md">
          {filteredTasks.map(t => (
            <TaskCard key={t.id} task={t} onToggle={toggleTaskStatus} onDelete={deleteTask} />
          ))}
        </div>
      )}

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000}}>
          <div className="glass-panel" style={{ width: '400px', padding: '2rem' }}>
            <h2 className="text-h2 mb-4">Add Task</h2>
            <form onSubmit={handleSubmit} className="flex-col gap-md">
              <input className="input-base" placeholder="Task Title (e.g., Read chapter 1)" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
              
              <select className="input-base" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })}>
                <option value="">Select Subject (Optional)</option>
                {subjects.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
              </select>

              <div className="flex gap-sm">
                <input type="date" className="input-base" value={formData.deadline} onChange={e => setFormData({ ...formData, deadline: e.target.value })} style={{ flex: 1 }} />
                <select className="input-base" value={formData.priority} onChange={e => setFormData({ ...formData, priority: e.target.value })} style={{ flex: 1 }}>
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                </select>
              </div>

              <div className="flex gap-sm justify-between mt-2">
                <button type="button" className="btn btn-surface" onClick={() => setShowModal(false)} style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Tasks;
