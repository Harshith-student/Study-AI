import React, { useState } from 'react';
import { useSubjects } from '../hooks/useSubjects';
import SubjectCard from '../components/SubjectCard';

const Subjects = () => {
  const { subjects, addSubject, deleteSubject } = useSubjects();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', color: '#58a6ff' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.name.trim()) {
      addSubject(formData);
      setFormData({ name: '', description: '', color: '#58a6ff' });
      setShowModal(false);
    }
  };

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-h1">Subjects</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ New Subject</button>
      </div>
      
      {subjects.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <p className="text-body text-muted">No subjects yet. Add one to get started!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {subjects.map(s => (
            <SubjectCard key={s.id} subject={s} onDelete={deleteSubject} onEdit={() => {}} />
          ))}
        </div>
      )}

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000}}>
          <div className="glass-panel" style={{ width: '400px', padding: '2rem' }}>
            <h2 className="text-h2 mb-4">Add Subject</h2>
            <form onSubmit={handleSubmit} className="flex-col gap-md">
              <input className="input-base" placeholder="Subject Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
              <textarea className="input-base" placeholder="Description" rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
              <div className="flex items-center gap-sm">
                 <span className="text-body">Color Label:</span>
                 <input type="color" value={formData.color} onChange={e => setFormData({ ...formData, color: e.target.value })} style={{ width: '40px', height: '40px', background: 'transparent', border: 'none', cursor: 'pointer' }} />
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
export default Subjects;
