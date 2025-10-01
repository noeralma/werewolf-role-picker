import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { GAME_RULES, ROLE_EXPLANATIONS, GAME_VARIANTS } from '../data/gameRules';
import { ROLES } from '../data/roles';

const GameRules = React.memo(() => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedRole, setExpandedRole] = useState(null);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📖' },
    { id: 'setup', label: 'Setup', icon: '⚙️' },
    { id: 'phases', label: 'Game Phases', icon: '🌙' },
    { id: 'roles', label: 'Roles', icon: '🎭' },
    { id: 'tips', label: 'Strategy', icon: '💡' },
    { id: 'variants', label: 'Variants', icon: '🎲' }
  ];

  const renderOverview = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-moon-100 mb-4">{GAME_RULES.overview.title}</h3>
      {GAME_RULES.overview.content.map((paragraph, index) => (
        <p key={index} className="text-moon-300 leading-relaxed">
          {paragraph}
        </p>
      ))}
      
      <div className="mt-6 p-4 bg-blood-900 bg-opacity-30 rounded-lg border border-blood-600">
        <h4 className="font-bold text-blood-300 mb-2">Win Conditions</h4>
        {GAME_RULES.winConditions.content.map((condition, index) => (
          <p key={index} className="text-blood-200 text-sm">
            • {condition}
          </p>
        ))}
      </div>
    </div>
  );

  const renderSetup = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-moon-100 mb-4">{GAME_RULES.setup.title}</h3>
      {GAME_RULES.setup.content.map((step, index) => (
        <div key={index} className="flex items-start gap-3">
          <span className="flex-shrink-0 w-6 h-6 bg-blood-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
            {index + 1}
          </span>
          <p className="text-moon-300 leading-relaxed">{step}</p>
        </div>
      ))}
      
      <div className="mt-6 p-4 bg-werewolf-900 bg-opacity-30 rounded-lg border border-werewolf-600">
        <h4 className="font-bold text-werewolf-300 mb-2">Moderator Guidelines</h4>
        {GAME_RULES.moderatorGuidelines.content.map((guideline, index) => (
          <p key={index} className="text-werewolf-200 text-sm mb-1">
            • {guideline}
          </p>
        ))}
      </div>
    </div>
  );

  const renderPhases = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-moon-100 mb-4">{GAME_RULES.phases.title}</h3>
      
      {/* Night Phase */}
      <div className="bg-moon-900 bg-opacity-50 rounded-lg p-6 border border-moon-600">
        <h4 className="text-lg font-bold text-moon-200 mb-3 flex items-center gap-2">
          🌙 {GAME_RULES.phases.night.title}
        </h4>
        {GAME_RULES.phases.night.content.map((item, index) => (
          <p key={index} className="text-moon-300 text-sm mb-2">
            {item}
          </p>
        ))}
      </div>

      {/* Day Phase */}
      <div className="bg-yellow-900 bg-opacity-30 rounded-lg p-6 border border-yellow-600">
        <h4 className="text-lg font-bold text-yellow-200 mb-3 flex items-center gap-2">
          ☀️ {GAME_RULES.phases.day.title}
        </h4>
        {GAME_RULES.phases.day.content.map((item, index) => (
          <p key={index} className="text-yellow-300 text-sm mb-2">
            {item}
          </p>
        ))}
      </div>
    </div>
  );

  const renderRoles = () => {
    const werewolfRoles = Object.values(ROLES).filter(role => role.team === 'werewolf');
    const specialRoles = Object.values(ROLES).filter(role => role.type === 'special');
    const villagerRoles = Object.values(ROLES).filter(role => role.type === 'villager');

    const RoleCard = ({ role }) => (
      <div className="bg-moon-900 bg-opacity-50 rounded-lg border border-moon-600 overflow-hidden">
        <button
          onClick={() => setExpandedRole(expandedRole === role.id ? null : role.id)}
          className="w-full p-4 text-left hover:bg-moon-800 transition-colors duration-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{role.emoji}</span>
              <div>
                <h5 className="font-bold text-moon-100">{role.name}</h5>
                <p className="text-sm text-moon-400 capitalize">{role.team} Team</p>
              </div>
            </div>
            <span className="text-moon-400">
              {expandedRole === role.id ? '▼' : '▶'}
            </span>
          </div>
        </button>
        
        {expandedRole === role.id && (
          <div className="px-4 pb-4 border-t border-moon-700">
            <p className="text-moon-300 text-sm mb-3 mt-3">{role.description}</p>
            
            {role.abilities && (
              <div className="mb-3">
                <h6 className="font-medium text-moon-200 text-sm mb-1">Abilities:</h6>
                {role.abilities.map((ability, index) => (
                  <p key={index} className="text-moon-400 text-xs mb-1">• {ability}</p>
                ))}
              </div>
            )}
            
            <div className="text-xs text-moon-500">
              <strong>Win Condition:</strong> {role.winCondition}
            </div>
          </div>
        )}
      </div>
    );

    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-moon-100 mb-4">Role Descriptions</h3>
        
        {/* Werewolf Team */}
        <div>
          <h4 className="text-lg font-bold text-blood-400 mb-3 flex items-center gap-2">
            🐺 Werewolf Team
          </h4>
          <div className="grid gap-3">
            {werewolfRoles.map(role => (
              <RoleCard key={role.id} role={role} />
            ))}
          </div>
        </div>

        {/* Special Village Roles */}
        <div>
          <h4 className="text-lg font-bold text-werewolf-400 mb-3 flex items-center gap-2">
            ⭐ Special Village Roles
          </h4>
          <div className="grid gap-3">
            {specialRoles.map(role => (
              <RoleCard key={role.id} role={role} />
            ))}
          </div>
        </div>

        {/* Regular Villagers */}
        <div>
          <h4 className="text-lg font-bold text-moon-400 mb-3 flex items-center gap-2">
            👥 Regular Villagers
          </h4>
          <div className="grid gap-3">
            {villagerRoles.map(role => (
              <RoleCard key={role.id} role={role} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderTips = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-moon-100 mb-4">{GAME_RULES.tips.title}</h3>
      
      {/* Villager Tips */}
      <div className="bg-moon-900 bg-opacity-50 rounded-lg p-6 border border-moon-600">
        <h4 className="text-lg font-bold text-moon-200 mb-3 flex items-center gap-2">
          🏘️ Tips for Villagers
        </h4>
        {GAME_RULES.tips.villagers.map((tip, index) => (
          <p key={index} className="text-moon-300 text-sm mb-2">
            • {tip}
          </p>
        ))}
      </div>

      {/* Werewolf Tips */}
      <div className="bg-blood-900 bg-opacity-30 rounded-lg p-6 border border-blood-600">
        <h4 className="text-lg font-bold text-blood-200 mb-3 flex items-center gap-2">
          🐺 Tips for Werewolves
        </h4>
        {GAME_RULES.tips.werewolves.map((tip, index) => (
          <p key={index} className="text-blood-300 text-sm mb-2">
            • {tip}
          </p>
        ))}
      </div>
    </div>
  );

  const renderVariants = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-moon-100 mb-4">{GAME_VARIANTS.title}</h3>
      {GAME_VARIANTS.content.map((variant, index) => (
        <div key={index} className="bg-werewolf-900 bg-opacity-30 rounded-lg p-4 border border-werewolf-600">
          <h5 className="font-bold text-werewolf-200 mb-2">{variant.name}</h5>
          <p className="text-werewolf-300 text-sm">{variant.description}</p>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'setup': return renderSetup();
      case 'phases': return renderPhases();
      case 'roles': return renderRoles();
      case 'tips': return renderTips();
      case 'variants': return renderVariants();
      default: return renderOverview();
    }
  };

  return (
    <div className="role-card">
      <h2 className="text-2xl font-bold text-moon-100 mb-6 flex items-center gap-2">
        📚 Game Rules & Guide
      </h2>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-moon-700 pb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-blood-600 text-white shadow-lg'
                : 'bg-moon-700 text-moon-300 hover:bg-moon-600'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="max-h-96 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
});

GameRules.propTypes = {};

export default GameRules;