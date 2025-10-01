import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../hooks/useTheme';

const Header = React.memo(() => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-moon-900 border-b border-moon-700 py-6 mb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <h1 className="werewolf-title text-4xl sm:text-5xl font-bold mb-2">
              🐺 Werewolf Role Picker
            </h1>
            <p className="text-moon-400 text-lg">
              Fair & Random Role Assignment for Your Game Night
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="btn-secondary p-3 rounded-full"
              title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;