import React, { useState, useEffect } from 'react';
import { generateStudyContent, setApiKey, getApiKey } from '../services/aiService';
import { toast } from 'react-toastify';
import { FiSettings, FiCpu, FiMessageSquare, FiCopy } from 'react-icons/fi';

const AITools = () => {
  const [prompt, setPrompt] = useState('');
  const [type, setType] = useState('summary');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [showSettings, setShowSettings] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');

  useEffect(() => {
    setApiKeyInput(getApiKey() || '');
  }, []);

  const handleSaveKey = () => {
    setApiKey(apiKeyInput);
    setShowSettings(false);
    toast.success('API Key saved securely in your browser.');
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setLoading(true);
    setResult('');
    try {
      const res = await generateStudyContent(prompt, type);
      setResult(res);
    } catch (error) {
      toast.error(error.message);
      if (error.message.includes('API Key')) {
        setShowSettings(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-h1 flex items-center gap-sm"><FiCpu /> AI Assistant</h1>
        <button className="btn btn-surface" onClick={() => setShowSettings(!showSettings)}>
          <FiSettings /> Settings
        </button>
      </div>

      {showSettings && (
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', border: '1px solid var(--primary-color)' }}>
          <h3 className="text-h3 mb-2">Configure OpenAI API Key</h3>
          <p className="text-muted mb-4 text-sm">Your key is stored locally in your browser and never sent to our servers.</p>
          <div className="flex gap-sm">
            <input 
              type="password" 
              className="input-base" 
              placeholder="sk-..." 
              value={apiKeyInput} 
              onChange={e => setApiKeyInput(e.target.value)} 
            />
            <button className="btn btn-primary" onClick={handleSaveKey}>Save Key</button>
          </div>
        </div>
      )}

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <form onSubmit={handleGenerate} className="flex-col gap-md">
          <div>
            <label className="text-body mb-2" style={{ display: 'block' }}>What do you want to study?</label>
            <textarea 
              className="input-base" 
              rows={3} 
              placeholder="e.g., 'Explain React useEffect hook' or 'Binary Search Trees'"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              required
            ></textarea>
          </div>
          
          <div className="flex gap-md">
            <label className="flex items-center gap-sm cursor-pointer">
              <input type="radio" name="type" checked={type === 'summary'} onChange={() => setType('summary')} /> Summary
            </label>
            <label className="flex items-center gap-sm cursor-pointer">
              <input type="radio" name="type" checked={type === 'questions'} onChange={() => setType('questions')} /> Practice Questions
            </label>
            <label className="flex items-center gap-sm cursor-pointer">
              <input type="radio" name="type" checked={type === 'flashcards'} onChange={() => setType('flashcards')} /> Flashcards
            </label>
          </div>

          <button type="submit" className="btn btn-primary mt-2" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Generating...' : 'Generate Magic ✨'}
          </button>
        </form>
      </div>

      {result && (
        <div className="glass-panel" style={{ padding: '2rem', position: 'relative' }}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-h3 flex items-center gap-sm"><FiMessageSquare /> Result</h3>
            <button className="btn-surface" onClick={copyToClipboard} title="Copy result"><FiCopy /></button>
          </div>
          <div className="text-body" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>
            {result}
          </div>
        </div>
      )}
    </div>
  );
};

export default AITools;
