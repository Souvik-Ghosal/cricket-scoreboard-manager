import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.scss';
import Layout from './Layouts/Layout';
import { ScoreboardContextProvider } from './contexts/ScoreboardContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ScoreboardContextProvider>
      <Layout>
        <App />
      </Layout>
    </ScoreboardContextProvider>
  </React.StrictMode>
);
