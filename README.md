# Infinite Plasma - AI Powered Study Companion

A feature-rich, AI-powered study companion built with React and Vite. This application helps students organize their subjects, manage study tasks, track progress, plan revisions, and leverage AI for personalized study assistance.

## ✨ Features

- **AI Study Assistant**: Get contextual help, explanations, and summarizations powered by AI (via Gemini API/OpenRouter).
- **Subject & Topic Organization**: Neatly categorize your coursework into subjects and topics.
- **Task Management**: Create, edit, and track study tasks with varying priorities and deadlines.
- **Progress Tracking & Analytics**: Visualize your study habits, task completion rates, and subject proficiency using interactive charts (Recharts).
- **Revision Planning**: Built-in calendar functionality to schedule and review your revision sessions.
- **Dynamic Animations**: Smooth and engaging user interfaces powered by Framer Motion.
- **Rich Toast Notifications**: Real-time feedback for user actions.

## 🚀 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **State Management**: React Context API & Custom Hooks
- **Form Handling & Validation**: [React Hook Form](https://react-hook-form.com/) + [Yup](https://github.com/jquense/yup)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Calendar & Dates**: [React Calendar](https://github.com/wojtekmaj/react-calendar) + [date-fns](https://date-fns.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **API Requests**: [Axios](https://axios-http.com/)

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository** (if applicable) or download the project files.
2. **Navigate to the project directory**:
   ```bash
   cd infinite-plasma
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` or `.env.local` file in the root directory and add your required variables. For the AI functionality, you may need an API key:

```env
VITE_AI_API_KEY=your_api_key_here
```
*(Check the application settings or documentation for specific key requirements).*

### Running Locally

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## 🛠️ Scripts

- `npm run dev`: Starts the local development server.
- `npm run build`: Bundles the app for production.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs ESLint to check for code issues.
- `npm run deploy`: Builds and deploys the application to GitHub Pages.

## 📂 Project Structure

```
src/
├── assets/         # Static assets and images
├── components/     # Reusable React components (e.g., TaskCard)
├── context/        # React Context providers (StudyContext)
├── hooks/          # Custom React hooks (useSubjects, useTasks)
├── pages/          # Full page layouts and views
├── services/       # API and external integration logic (aiService)
├── App.css         # Main application styles
├── App.jsx         # Root component
├── index.css       # Global styles and Tailwind/Vanilla CSS setup
└── main.jsx        # Application entry point
```

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request or open an issue if you encounter any bugs or have feature suggestions.
