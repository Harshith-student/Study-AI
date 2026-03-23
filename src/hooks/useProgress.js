import { useContext } from 'react';
import { StudyContext } from '../context/StudyContext';

export const useProgress = () => {
  const { tasks, subjects } = useContext(StudyContext);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const pendingTasks = tasks.filter(t => t.status === 'Pending').length;
  const overdueTasks = tasks.filter(t => {
    if (t.status === 'Completed' || !t.deadline) return false;
    return new Date(t.deadline) < new Date();
  }).length;
  const revisionTasks = tasks.filter(t => t.tab === 'Revision' || (t.title && t.title.toLowerCase().includes('revise'))).length;

  const completionPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const getSubjectProgress = () => {
    return subjects.map(sub => {
      const subTasks = tasks.filter(t => t.subjectId === sub.id || t.subject === sub.name);
      const subCompleted = subTasks.filter(t => t.status === 'Completed').length;
      return {
        name: sub.name,
        total: subTasks.length,
        completed: subCompleted,
        percentage: subTasks.length === 0 ? 0 : Math.round((subCompleted / subTasks.length) * 100)
      };
    });
  };

  return {
    totalTasks,
    completedTasks,
    pendingTasks,
    overdueTasks,
    revisionTasks,
    completionPercentage,
    getSubjectProgress
  };
};
