import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("Deep Shift AI: Initializing application...");

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Deep Shift AI: Target container 'root' not found.");
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("Deep Shift AI: Application mounted successfully.");
} catch (error) {
  console.error("Deep Shift AI: Fatal error during mount:", error);
}