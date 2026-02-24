import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { LanguageProvider } from './contexts/LanguageContext';

export function render() {
  return renderToString(
    <React.StrictMode>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </React.StrictMode>
  );
}
