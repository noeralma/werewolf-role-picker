import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SAMPLE_NAMES, INPUT_METHODS, PLAYER_CONSTRAINTS } from '../constants/gameConfig';

const PlayerInput = React.memo(({ onPlayersChange, playerCount, players }) => {
  const [inputMethod, setInputMethod] = useState(INPUT_METHODS.COUNT);
  const [playerNames, setPlayerNames] = useState('');
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (inputMethod === INPUT_METHODS.COUNT) {
      // Generate generic player names
      const names = Array.from({ length: count }, (_, i) => `Player ${i + 1}`);
      onPlayersChange(names);
    } else {
      // Parse player names from textarea
      const names = playerNames
        .split('\n')
        .map(name => name.trim())
        .filter(name => name.length > 0);
      onPlayersChange(names);
    }
  }, [inputMethod, count, playerNames, onPlayersChange]);

  const handleCountChange = (e) => {
    const newCount = Math.max(1, parseInt(e.target.value) || 1);
    setCount(newCount);
  };

  const handleNamesChange = (e) => {
    setPlayerNames(e.target.value);
  };

  const generateSampleNames = () => {
    const selectedNames = SAMPLE_NAMES.slice(0, count);
    setPlayerNames(selectedNames.join('\n'));
    setInputMethod(INPUT_METHODS.NAMES);
  };

  return (
    <div className="role-card">
      <h2 className="text-2xl font-bold text-moon-100 mb-6 flex items-center gap-2">
        👥 Player Setup
      </h2>
      
      {/* Input Method Toggle */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={() => setInputMethod(INPUT_METHODS.COUNT)}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
            inputMethod === INPUT_METHODS.COUNT
              ? 'bg-blood-600 text-white shadow-lg'
              : 'bg-moon-700 text-moon-300 hover:bg-moon-600'
          }`}
        >
          Player Count
        </button>
        <button
          onClick={() => setInputMethod(INPUT_METHODS.NAMES)}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
            inputMethod === INPUT_METHODS.NAMES
              ? 'bg-blood-600 text-white shadow-lg'
              : 'bg-moon-700 text-moon-300 hover:bg-moon-600'
          }`}
        >
          Player Names
        </button>
      </div>

      {inputMethod === INPUT_METHODS.COUNT ? (
        <div className="space-y-4">
          <div>
            <label className="block text-moon-300 mb-2 font-medium">
              Number of Players
            </label>
            <input
              type="number"
              min="1"
              value={count}
              onChange={handleCountChange}
              className="input-field w-full text-center text-xl font-bold"
            />
          </div>
          <div className="text-center">
            <button
              onClick={generateSampleNames}
              className="btn-secondary text-sm"
            >
              Use Sample Names Instead
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-moon-300 mb-2 font-medium">
              Player Names (one per line)
            </label>
            <textarea
              value={playerNames}
              onChange={handleNamesChange}
              placeholder="Enter player names, one per line..."
              className="input-field w-full h-40 resize-none"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 text-sm">
            <button
              onClick={generateSampleNames}
              className="btn-secondary flex-1"
            >
              Generate Sample Names
            </button>
            <button
              onClick={() => setInputMethod(INPUT_METHODS.COUNT)}
              className="btn-secondary flex-1"
            >
              Use Player Count Instead
            </button>
          </div>
        </div>
      )}

      {/* Player Count Display */}
      <div className="mt-6 p-4 bg-moon-900 rounded-lg border border-moon-600">
        <div className="flex justify-between items-center text-moon-300">
          <span>Total Players:</span>
          <span className="text-2xl font-bold text-blood-400">{playerCount}</span>
        </div>
        {playerCount < PLAYER_CONSTRAINTS.MIN_RECOMMENDED && (
          <p className="text-amber-400 text-sm mt-2">
            ℹ️ Small groups may have limited role variety
          </p>
        )}
        {playerCount > PLAYER_CONSTRAINTS.MAX_RECOMMENDED && (
          <p className="text-amber-400 text-sm mt-2">
            ℹ️ Large groups may require extended game time
          </p>
        )}
      </div>
    </div>
  );
});

PlayerInput.propTypes = {
  onPlayersChange: PropTypes.func.isRequired,
  playerCount: PropTypes.number.isRequired,
  players: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default PlayerInput;