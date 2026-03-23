import { useContext } from 'react';
import { StudyContext } from '../context/StudyContext';

export const useTasks = () => {
  const { tasks, setTasks } = useContext(StudyContext);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now().toString(), status: 'Pending' }]);
  };

  const updateTask = (id, updatedData) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, ...updatedData } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed' } : t));
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus
  };
};
