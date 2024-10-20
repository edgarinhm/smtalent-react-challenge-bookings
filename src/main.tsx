import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'react-datepicker/dist/react-datepicker.css';
import './common/extensions/dayjs-extensions';
import './common/extensions/datepicker-extensions.ts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './common/context/AppProvider.tsx';
import { basename } from './common/constants/basename-constants.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <AppProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  </StrictMode>
);
