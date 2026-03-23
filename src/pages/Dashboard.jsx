import React from 'react';
import { useProgress } from '../hooks/useProgress';
import ProgressChart from '../components/ProgressChart';
import { FiCheckCircle, FiClock, FiAlertCircle, FiTrendingUp } from 'react-icons/fi';

const StatCard = ({ title, value, icon, color }) => (
  <div className="glass-panel" style={{ padding: '1.5rem', flex: '1 1 200px' }}>
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-body text-muted">{title}</h3>
      <div style={{ color }}>{icon}</div>
    </div>
    <p className="text-h2">{value}</p>
  </div>
);

const Dashboard = () => {
  const { totalTasks, completedTasks, pendingTasks, overdueTasks, completionPercentage, getSubjectProgress } = useProgress();

  const chartData = [
    { name: 'Completed', value: completedTasks },
    { name: 'Pending', value: pendingTasks },
    { name: 'Overdue', value: overdueTasks }
  ].filter(d => d.value > 0);

  const subjectProgress = getSubjectProgress();

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-h1">Dashboard</h1>
        <div className="glass-panel" style={{ padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <FiTrendingUp style={{ color: 'var(--primary-color)' }} />
          <span className="text-h3">{completionPercentage}% Completed</span>
        </div>
      </div>

      <div className="flex gap-md mb-8 flex-wrap">
        <StatCard title="Total Tasks" value={totalTasks} icon={<FiCheckCircle size={24} />} color="var(--primary-color)" />
        <StatCard title="Completed" value={completedTasks} icon={<FiCheckCircle size={24} />} color="var(--success-color)" />
        <StatCard title="Pending" value={pendingTasks} icon={<FiClock size={24} />} color="var(--warning-color)" />
        <StatCard title="Overdue" value={overdueTasks} icon={<FiAlertCircle size={24} />} color="var(--danger-color)" />
      </div>

      <div className="flex gap-lg flex-wrap">
        <div className="glass-panel flex-1" style={{ padding: '2rem', minWidth: '300px' }}>
          <h2 className="text-h3 mb-4">Overall Progress</h2>
          <ProgressChart data={chartData} />
        </div>

        <div className="flex-col gap-md flex-1" style={{ minWidth: '300px' }}>
          <h2 className="text-h3">Subject Progress</h2>
          {subjectProgress.length === 0 ? (
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
              <p className="text-muted">No subjects added yet. Add tasks and subjects to see progress.</p>
            </div>
          ) : (
            subjectProgress.map(sp => (
              <div key={sp.name} className="glass-panel" style={{ padding: '1.2rem' }}>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-body">{sp.name}</h4>
                  <span className="text-muted" style={{ fontSize: '0.9rem' }}>{sp.percentage}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'var(--surface-border)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${sp.percentage}%`, height: '100%', background: 'var(--primary-color)', transition: 'width 0.5s ease' }}></div>
                </div>
                <p className="text-muted mt-2" style={{ fontSize: '0.8rem' }}>{sp.completed} of {sp.total} tasks completed</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
