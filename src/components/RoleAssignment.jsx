import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ROLES } from '../data/roles';
import { FILTER_OPTIONS, SORT_OPTIONS } from '../constants/gameConfig';

const RoleAssignment = React.memo(({ assignments, onRegenerate, onClear, isGenerating = false }) => {
  const [filter, setFilter] = useState(FILTER_OPTIONS.ALL);
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.PLAYER);
  const [showDetails, setShowDetails] = useState(false);

  if (!assignments || assignments.length === 0) {
    return (
      <div className="role-card text-center">
        <div className="text-6xl mb-4">🎭</div>
        <h2 className="text-2xl font-bold text-moon-100 mb-4">No Roles Assigned</h2>
        <p className="text-moon-300">
          Set up your players and click "Generate Roles" to create assignments.
        </p>
      </div>
    );
  }

  const getFilteredAndSortedAssignments = useMemo(() => {
    let filtered = [...assignments];

    // Apply filter
     if (filter !== FILTER_OPTIONS.ALL) {
       filtered = filtered.filter(assignment => {
         const role = ROLES[assignment.role];
         if (filter === FILTER_OPTIONS.WEREWOLF) return role.team === 'werewolf';
         if (filter === FILTER_OPTIONS.VILLAGE) return role.team === 'village';
         if (filter === FILTER_OPTIONS.SPECIAL) return role.type === 'special';
         return true;
       });
     }

     // Apply sort
     filtered.sort((a, b) => {
       if (sortBy === SORT_OPTIONS.PLAYER) {
         return a.player.localeCompare(b.player);
       } else if (sortBy === SORT_OPTIONS.ROLE) {
         return ROLES[a.role].name.localeCompare(ROLES[b.role].name);
       } else if (sortBy === SORT_OPTIONS.TEAM) {
         const teamA = ROLES[a.role].team;
         const teamB = ROLES[b.role].team;
         if (teamA !== teamB) {
           return teamA === 'werewolf' ? -1 : 1;
         }
         return ROLES[a.role].name.localeCompare(ROLES[b.role].name);
       }
       return 0;
     });

    return filtered;
  }, [assignments, filter, sortBy]);

  const exportAssignments = () => {
     const text = assignments
       .map(assignment => {
         const role = ROLES[assignment.role];
         return `${assignment.player}: ${role.name} ${role.emoji}`;
       })
       .join('\n');
     
     const blob = new Blob([text], { type: 'text/plain' });
     const url = URL.createObjectURL(blob);
     const a = document.createElement('a');
     a.href = url;
     a.download = 'werewolf-roles.txt';
     document.body.appendChild(a);
     a.click();
     document.body.removeChild(a);
     URL.revokeObjectURL(url);
   };

   const copyToClipboard = () => {
     const text = assignments
       .map(assignment => {
         const role = ROLES[assignment.role];
         return `${assignment.player}: ${role.name} ${role.emoji}`;
       })
       .join('\n');
     
     navigator.clipboard.writeText(text).then(() => {
       alert('Assignments copied to clipboard!');
     });
   };

   const getTeamStats = () => {
     const stats = {
       werewolf: 0,
       village: 0,
       special: 0
     };

     assignments.forEach(assignment => {
       const role = ROLES[assignment.role];
       if (role.team === 'werewolf') {
         stats.werewolf++;
       } else {
         stats.village++;
         if (role.type === 'special') {
           stats.special++;
         }
       }
     });

     return stats;
   };

  const filteredAssignments = getFilteredAndSortedAssignments;
  const stats = getTeamStats();

  return (
    <div className="role-card">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-moon-100 flex items-center gap-2">
          🎭 Role Assignments
        </h2>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={onRegenerate} 
            disabled={isGenerating}
            className={`text-sm ${isGenerating ? 'btn-secondary opacity-50 cursor-not-allowed' : 'btn-primary'}`}
            title="Press 'R' for quick access"
          >
            {isGenerating ? (
              <>
                <span className="inline-block animate-spin mr-1">🎲</span>
                Regenerating...
              </>
            ) : (
              <>🎲 Regenerate</>
            )}
          </button>
          <button onClick={exportAssignments} className="btn-secondary text-sm">
            📥 Export
          </button>
          <button onClick={copyToClipboard} className="btn-secondary text-sm">
            📋 Copy
          </button>
          <button onClick={onClear} className="btn-secondary text-sm">
            🗑️ Clear
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-moon-900 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-moon-100">{assignments.length}</div>
          <div className="text-sm text-moon-400">Total Players</div>
        </div>
        <div className="bg-blood-900 bg-opacity-50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-blood-300">{stats.werewolf}</div>
          <div className="text-sm text-blood-400">Werewolves</div>
        </div>
        <div className="bg-moon-900 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-moon-300">{stats.village}</div>
          <div className="text-sm text-moon-400">Villagers</div>
        </div>
        <div className="bg-werewolf-900 bg-opacity-50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-werewolf-300">{stats.special}</div>
          <div className="text-sm text-werewolf-400">Special Roles</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-moon-300 text-sm mb-2">Filter by:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input-field w-full"
          >
            <option value={FILTER_OPTIONS.ALL}>All Roles</option>
            <option value={FILTER_OPTIONS.WEREWOLF}>Werewolves</option>
            <option value={FILTER_OPTIONS.VILLAGE}>Villagers</option>
            <option value={FILTER_OPTIONS.SPECIAL}>Special Roles</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-moon-300 text-sm mb-2">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field w-full"
          >
            <option value={SORT_OPTIONS.PLAYER}>Player Name</option>
            <option value={SORT_OPTIONS.ROLE}>Role Name</option>
            <option value={SORT_OPTIONS.TEAM}>Team</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className={`btn-secondary text-sm ${showDetails ? 'bg-blood-600' : ''}`}
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
        </div>
      </div>

      {/* Assignments List */}
       <div className="space-y-3 max-h-96 overflow-y-auto">
         {filteredAssignments.map((assignment) => {
           const role = ROLES[assignment.role];
           return (
            <div
              key={assignment.id}
              className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-lg ${
                role.team === 'werewolf'
                  ? 'bg-blood-900 bg-opacity-30 border-blood-600'
                  : role.type === 'special'
                  ? 'bg-werewolf-900 bg-opacity-30 border-werewolf-600'
                  : 'bg-moon-900 bg-opacity-30 border-moon-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{role.emoji}</span>
                  <div>
                    <div className="font-bold text-moon-100">{assignment.player}</div>
                    <div className={`text-sm ${
                      role.team === 'werewolf' ? 'text-blood-300' : 'text-moon-300'
                    }`}>
                      {role.name}
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  role.team === 'werewolf'
                    ? 'bg-blood-600 text-blood-100'
                    : role.type === 'special'
                    ? 'bg-werewolf-600 text-werewolf-100'
                    : 'bg-moon-600 text-moon-100'
                }`}>
                  {role.team === 'werewolf' ? 'Werewolf' : role.type === 'special' ? 'Special' : 'Villager'}
                </div>
              </div>
              
              {showDetails && (
                <div className="mt-3 pt-3 border-t border-moon-700">
                  <p className="text-sm text-moon-400 mb-2">{role.description}</p>
                  {role.abilities && (
                    <div className="text-xs text-moon-500">
                      <strong>Abilities:</strong> {role.abilities.join(', ')}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredAssignments.length === 0 && (
        <div className="text-center py-8 text-moon-400">
          No assignments match the current filter.
        </div>
      )}
    </div>
  );
});

RoleAssignment.propTypes = {
  assignments: PropTypes.arrayOf(PropTypes.shape({
    player: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired
  })).isRequired,
  onRegenerate: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  isGenerating: PropTypes.bool
};

export default RoleAssignment;