import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import { ProviderWrapper as WalletProviderWrapper } from './context/WalletContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WalletProviderWrapper>
        <App/>
    </WalletProviderWrapper>
  </React.StrictMode>
);