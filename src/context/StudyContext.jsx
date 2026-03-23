import React, { createContext, useState, useEffect } from 'react';

export const StudyContext = createContext();

export const StudyProvider = ({ children }) => {
  const loadData = (key, defaultData) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultData;
  };

  const [subjects, setSubjects] = useState(() => loadData('subjects', []));
  const [topics, setTopics] = useState(() => loadData('topics', []));
  const [tasks, setTasks] = useState(() => loadData('tasks', []));

  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
    localStorage.setItem('topics', JSON.stringify(topics));
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [subjects, topics, tasks]);

  return (
    <StudyContext.Provider value={{ subjects, setSubjects, topics, setTopics, tasks, setTasks }}>
      {children}
    </StudyContext.Provider>
  );
};
