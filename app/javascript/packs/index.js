import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../components/App';

let root = null;

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("root");

  if (app) {
    if (!root) {
      root = createRoot(app);
    }

    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    );
  }
});
