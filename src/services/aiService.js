import axios from 'axios';

export const setApiKey = (key) => {
  localStorage.setItem('openai_api_key', key);
};

export const getApiKey = () => {
  return localStorage.getItem('openai_api_key');
};

export const generateStudyContent = async (prompt, type = 'summary') => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('API Key is missing. Please configure your OpenAI API key in the AI Assistant settings.');
  }

  let systemMessage = 'You are an expert AI study assistant meant to help students. ';
  if (type === 'summary') {
    systemMessage += 'Provide a concise, easy-to-understand summary of the requested topic with key bullet points.';
  } else if (type === 'questions') {
    systemMessage += 'Provide 3-5 practice questions of varying difficulty for the requested topic.';
  } else if (type === 'flashcards') {
    systemMessage += 'Provide 5 flashcards for the requested topic in a Q: ... A: ... format.';
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('AI Generation Error:', error);
    throw new Error(error.response?.data?.error?.message || 'Failed to generate content. Check your API key or network connection.');
  }
};
