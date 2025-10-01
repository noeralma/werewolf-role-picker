import React, { useEffect, useState } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import PlayerInput from './components/PlayerInput';
import RoleDistribution from './components/RoleDistribution';
import RoleAssignment from './components/RoleAssignment';
import GameRules from './components/GameRules';
import { useGameState } from './hooks/useGameState';
import { getRoleDistribution } from './data/roles';
import { VIEW_STATES } from './constants/gameConfig';

function App() {
  const {
    players,
    customDistribution,
    assignments,
    activeView,
    canGenerateRoles,
    handlePlayersChange,
    handleDistributionChange,
    generateRoles,
    regenerateRoles,
    clearAssignments,
    setActiveView
  } = useGameState();

  const [isGenerating, setIsGenerating] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only trigger if not typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      if (e.key === '1') {
        setActiveView(VIEW_STATES.SETUP);
      } else if (e.key === '2') {
        setActiveView(VIEW_STATES.ASSIGNMENTS);
      } else if (e.key === '3') {
        setActiveView(VIEW_STATES.RULES);
      } else if (e.key === 'g' && canGenerateRoles && activeView === VIEW_STATES.SETUP) {
        handleGenerateRoles();
      } else if (e.key === 'r' && assignments.length > 0 && activeView === VIEW_STATES.ASSIGNMENTS) {
        handleRegenerateRoles();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [canGenerateRoles, activeView, assignments.length, setActiveView]);

  const handleGenerateRoles = async () => {
    setIsGenerating(true);
    try {
      await generateRoles();
      // Auto-switch to assignments view after generation
      setTimeout(() => setActiveView(VIEW_STATES.ASSIGNMENTS), 100);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerateRoles = async () => {
    setIsGenerating(true);
    try {
      await regenerateRoles();
    } finally {
      setIsGenerating(false);
    }
  };

  // Calculate distribution for display purposes
  const distribution = players.length >= 3 ? (customDistribution || getRoleDistribution(players.length)) : null;

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
      <Header />
      
      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setActiveView(VIEW_STATES.SETUP)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeView === VIEW_STATES.SETUP
                ? 'bg-blood-600 text-white shadow-lg'
                : 'bg-moon-700 text-moon-300 hover:bg-moon-600'
            }`}
            title="Press '1' for quick access"
          >
            🎯 Setup Game
          </button>
          <button
            onClick={() => setActiveView(VIEW_STATES.ASSIGNMENTS)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeView === VIEW_STATES.ASSIGNMENTS
                ? 'bg-blood-600 text-white shadow-lg'
                : 'bg-moon-700 text-moon-300 hover:bg-moon-600'
            }`}
            title="Press '2' for quick access"
          >
            🎭 Assignments {assignments.length > 0 && `(${assignments.length})`}
          </button>
          <button
            onClick={() => setActiveView(VIEW_STATES.RULES)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeView === VIEW_STATES.RULES
                ? 'bg-blood-600 text-white shadow-lg'
                : 'bg-moon-700 text-moon-300 hover:bg-moon-600'
            }`}
            title="Press '3' for quick access"
          >
            📚 Rules & Guide
          </button>
        </div>
        
        {/* Keyboard shortcuts hint */}
        <div className="text-center mt-4">
          <p className="text-moon-500 text-sm">
            💡 Tip: Use keyboard shortcuts - 1, 2, 3 to switch tabs • G to generate • R to regenerate
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {activeView === VIEW_STATES.SETUP && (
          <div className="space-y-8">
            {/* Player Input */}
            <PlayerInput
              onPlayersChange={handlePlayersChange}
              playerCount={players.length}
              players={players}
            />

            {/* Role Distribution */}
            {players.length >= 3 && (
              <RoleDistribution
                playerCount={players.length}
                onDistributionChange={handleDistributionChange}
                customDistribution={customDistribution}
              />
            )}

            {/* Generate Button */}
            {players.length > 0 && (
              <div className="text-center">
                <button
                  onClick={handleGenerateRoles}
                  disabled={!canGenerateRoles || isGenerating}
                  className={`px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform ${
                    canGenerateRoles && !isGenerating
                      ? 'btn-primary hover:scale-105 shadow-2xl'
                      : 'bg-moon-600 text-moon-400 cursor-not-allowed'
                  }`}
                  title={canGenerateRoles ? "Press 'G' for quick access" : ""}
                >
                  {isGenerating ? (
                    <>
                      <span className="inline-block animate-spin mr-2">🎲</span>
                      Generating Roles...
                    </>
                  ) : canGenerateRoles ? (
                    <>🎲 Generate Roles ({players.length} players)</>
                  ) : (
                    <>⚠️ Need at least 3 players ({players.length} current)</>
                  )}
                </button>
                
                {canGenerateRoles && !isGenerating && (
                  <p className="mt-4 text-moon-400 text-sm">
                    Using Fisher-Yates shuffle algorithm for optimal randomization
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {activeView === VIEW_STATES.ASSIGNMENTS && (
          <RoleAssignment
            assignments={assignments}
            onRegenerate={handleRegenerateRoles}
            onClear={clearAssignments}
            isGenerating={isGenerating}
          />
        )}

        {activeView === VIEW_STATES.RULES && <GameRules />}
      </div>

      {/* Footer */}
      <footer className="bg-moon-900 border-t border-moon-700 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-moon-400">
            <div className="flex items-center gap-2">
              <span className="text-blood-500">🎲</span>
              <span>Cryptographically Secure Randomization</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-moon-500">⚖️</span>
              <span>Balanced Role Distribution</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-werewolf-500">📱</span>
              <span>Responsive Design</span>
            </div>
          </div>
          <div className="mt-4 text-moon-500 text-sm">
            Built for flexible Werewolf games • Supports any number of players
          </div>
        </div>
      </footer>
    </div>
    </ErrorBoundary>
  );
}

export default App;