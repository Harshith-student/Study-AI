import React from 'react';
import { FiCheck, FiTrash2 } from 'react-icons/fi';
import { format } from 'date-fns';

const TaskCard = ({ task, onToggle, onDelete }) => {
  const isCompleted = task.status === 'Completed';
  
  return (
    <div className="glass-panel" style={{ padding: '1rem', opacity: isCompleted ? 0.6 : 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div className="flex gap-md items-center">
        <button 
          onClick={() => onToggle(task.id)}
          style={{ width: '24px', height: '24px', borderRadius: '50%', border: `2px solid ${isCompleted ? 'var(--success-color)' : 'var(--text-secondary)'}`, background: isCompleted ? 'var(--success-color)' : 'transparent', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          {isCompleted && <FiCheck size={14} />}
        </button>
        <div>
          <h4 className="text-body" style={{ textDecoration: isCompleted ? 'line-through' : 'none', fontWeight: 600 }}>{task.title}</h4>
          <div className="flex gap-sm text-muted mt-1" style={{ fontSize: '0.8rem', alignItems: 'center' }}>
            {task.subject && <span style={{ padding: '2px 8px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)' }}>{task.subject}</span>}
            {task.deadline && <span>• Due: {format(new Date(task.deadline), 'MMM dd, yyyy')}</span>}
            <span style={{ color: task.priority === 'High' ? 'var(--danger-color)' : task.priority === 'Medium' ? 'var(--warning-color)' : 'var(--success-color)' }}>• {task.priority || 'Medium'}</span>
          </div>
        </div>
      </div>
      <div>
        <button className="btn-surface" onClick={() => onDelete(task.id)} style={{ padding: '0.4rem', color: 'var(--danger-color)', borderRadius: '50%' }}>
          <FiTrash2 size={14} />
        </button>
      </div>
    </div>
  );
};
export default TaskCard;
