import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/fm-tokens.css';
import './styles/fm.css';
import './styles/admin.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
