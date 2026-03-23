import { useContext } from 'react';
import { StudyContext } from '../context/StudyContext';

export const useSubjects = () => {
  const { subjects, setSubjects, topics, setTopics } = useContext(StudyContext);

  const addSubject = (subject) => {
    setSubjects([...subjects, { ...subject, id: Date.now().toString() }]);
  };

  const updateSubject = (id, updatedData) => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, ...updatedData } : s));
  };

  const deleteSubject = (id) => {
    setSubjects(subjects.filter(s => s.id !== id));
    // Cascade delete associated topics
    setTopics(topics.filter(t => t.subjectId !== id));
  };

  const addTopic = (topic) => {
    setTopics([...topics, { ...topic, id: Date.now().toString(), status: 'Not Started', difficulty: topic.difficulty || 'Medium' }]);
  };

  const updateTopic = (id, updatedData) => {
    setTopics(topics.map(t => t.id === id ? { ...t, ...updatedData } : t));
  };

  const deleteTopic = (id) => {
    setTopics(topics.filter(t => t.id !== id));
  };

  const getTopicsBySubject = (subjectId) => {
    return topics.filter(t => t.subjectId === subjectId);
  };

  return {
    subjects,
    addSubject,
    updateSubject,
    deleteSubject,
    topics,
    addTopic,
    updateTopic,
    deleteTopic,
    getTopicsBySubject
  };
};
