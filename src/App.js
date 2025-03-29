import React from 'react';
import Upload from './components/Upload';

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated clouds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="cloud w-48 h-16" style={{ 
          top: '15%', 
          left: '-48px',
          animationDelay: '0s',
          opacity: '0.9'
        }} />
        <div className="cloud w-64 h-20" style={{ 
          top: '28%', 
          left: '-64px',
          animationDelay: '-15s',
          opacity: '0.85'
        }} />
        <div className="cloud w-56 h-14" style={{ 
          top: '45%', 
          left: '-56px',
          animationDelay: '-30s',
          opacity: '0.8'
        }} />
        <div className="cloud w-72 h-24" style={{ 
          top: '10%', 
          left: '-72px',
          animationDelay: '-45s',
          opacity: '0.95'
        }} />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <Upload />
      </div>
    </div>
  );
}

export default App;
