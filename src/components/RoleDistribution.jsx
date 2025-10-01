import React from 'react';
import PropTypes from 'prop-types';
import { ROLES } from '../data/roles';
import { PLAYER_CONSTRAINTS } from '../constants/gameConfig';
import { useRoleDistribution } from '../hooks/useRoleDistribution';

const RoleDistribution = React.memo(({ playerCount, onDistributionChange, customDistribution }) => {
  const {
    currentDistribution,
    validation,
    handleRoleCountChange,
    resetToDefault,
    totalRoles
  } = useRoleDistribution(playerCount, customDistribution, onDistributionChange);

  // Helper function to organize roles by team
  const getRolesByTeam = () => {
    const werewolfRoles = [];
    const villageRoles = [];

    if (currentDistribution) {
      Object.entries(currentDistribution).forEach(([roleId, count]) => {
        if (count > 0) {
          const role = ROLES[roleId];
          if (role.team === 'werewolf') {
            werewolfRoles.push({ ...role, count });
          } else {
            villageRoles.push({ ...role, count });
          }
        }
      });
    }

    return { werewolfRoles, villageRoles };
  };

  const { werewolfRoles, villageRoles } = getRolesByTeam();

  return (
    <div className="role-card">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-moon-100 flex items-center gap-2">
          ⚖️ Role Distribution
        </h2>
        <button
          onClick={resetToDefault}
          className="btn-secondary text-sm"
        >
          Reset to Default
        </button>
      </div>

      {/* Validation Status */}
      <div className={`p-4 rounded-lg mb-6 ${
        validation.isValid 
          ? 'bg-green-900 border border-green-600' 
          : 'bg-blood-900 border border-blood-600'
      }`}>
        <div className="flex items-center gap-2 mb-2">
          <span className={validation.isValid ? 'text-green-400' : 'text-blood-400'}>
            {validation.isValid ? '✅' : '⚠️'}
          </span>
          <span className="font-medium text-moon-100">
            {validation.isValid ? 'Balanced Distribution' : 'Distribution Issues'}
          </span>
        </div>
        
        <div className="text-sm text-moon-300 space-y-1">
          <div>Total Roles: {totalRoles} / {playerCount}</div>
          <div>Werewolf Ratio: {validation.werewolfRatio}%</div>
        </div>

        {validation.issues.length > 0 && (
          <div className="mt-3 space-y-1">
            {validation.issues.map((issue, index) => (
              <div key={index} className="text-blood-300 text-sm">
                • {issue}
              </div>
            ))}
          </div>
        )}

        {validation.recommendations.length > 0 && (
          <div className="mt-3 space-y-1">
            <div className="text-moon-300 text-sm font-medium">Recommendations:</div>
            {validation.recommendations.map((rec, index) => (
              <div key={index} className="text-moon-400 text-sm">
                • {rec}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Werewolf Team */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-blood-400 mb-3 flex items-center gap-2">
          🐺 Werewolf Team
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {werewolfRoles.map((role) => (
            <div key={role.id} className="bg-blood-900 bg-opacity-30 rounded-lg p-3 border border-blood-600">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-moon-100 flex items-center gap-2">
                  {role.emoji} {role.name}
                </span>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={role.count}
                  onChange={(e) => handleRoleCountChange(role.id, parseInt(e.target.value) || 0)}
                  className="w-16 bg-moon-800 border border-moon-600 rounded px-2 py-1 text-center text-moon-100"
                />
              </div>
              <p className="text-xs text-moon-400 line-clamp-2">
                {role.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Village Team */}
      <div>
        <h3 className="text-lg font-bold text-moon-400 mb-3 flex items-center gap-2">
          🏘️ Village Team
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {villageRoles.map((role) => (
            <div key={role.id} className="bg-moon-900 bg-opacity-30 rounded-lg p-3 border border-moon-600">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-moon-100 flex items-center gap-2 text-sm">
                  {role.emoji} {role.name}
                </span>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={role.count}
                  onChange={(e) => handleRoleCountChange(role.id, parseInt(e.target.value) || 0)}
                  className="w-16 bg-moon-800 border border-moon-600 rounded px-2 py-1 text-center text-moon-100"
                />
              </div>
              <p className="text-xs text-moon-400 line-clamp-2">
                {role.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

RoleDistribution.propTypes = {
  playerCount: PropTypes.number.isRequired,
  onDistributionChange: PropTypes.func.isRequired,
  customDistribution: PropTypes.object
};

export default RoleDistribution;