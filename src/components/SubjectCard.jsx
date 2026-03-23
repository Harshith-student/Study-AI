import React from 'react';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';

const SubjectCard = ({ subject, onDelete, onEdit }) => {
  return (
    <div className="glass-panel" style={{ padding: '1.5rem', borderTop: `4px solid ${subject.color || 'var(--primary-color)'}` }}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-h3">{subject.name}</h3>
        <div className="flex gap-sm">
          <button className="btn-surface" onClick={() => onEdit(subject)} style={{ padding: '0.4rem', borderRadius: '50%' }}><FiEdit2 size={14} /></button>
          <button className="btn-surface" onClick={() => onDelete(subject.id)} style={{ padding: '0.4rem', color: 'var(--danger-color)', borderRadius: '50%' }}><FiTrash2 size={14} /></button>
        </div>
      </div>
      <p className="text-muted">{subject.description}</p>
    </div>
  );
};
export default SubjectCard;
