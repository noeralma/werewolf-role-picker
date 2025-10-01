import { useState, useCallback } from 'react';
import { createRoleList, getRoleDistribution } from '../data/roles';
import { assignRoles, validateRoleDistribution } from '../utils/shuffle';

/**
 * Custom hook for managing game state and role generation logic
 * Separates business logic from UI components
 */
export const useGameState = () => {
  const [players, setPlayers] = useState([]);
  const [customDistribution, setCustomDistribution] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [activeView, setActiveView] = useState('setup');

  const handlePlayersChange = useCallback((newPlayers) => {
    setPlayers(newPlayers);
    // Clear assignments when players change
    if (assignments.length > 0) {
      setAssignments([]);
    }
  }, [assignments.length]);

  const handleDistributionChange = useCallback((newDistribution) => {
    setCustomDistribution(newDistribution);
    // Clear assignments when distribution changes
    if (assignments.length > 0) {
      setAssignments([]);
    }
  }, [assignments.length]);

  const generateRoles = useCallback(() => {
    if (players.length < 3) {
      alert('You need at least 3 players to start the game!');
      return;
    }

    try {
      // Use custom distribution if provided, otherwise get default
      const distribution = customDistribution || getRoleDistribution(players.length);
      
      // Validate the distribution
      const validation = validateRoleDistribution(distribution, players.length);
      if (validation.issues.length > 0) {
        const proceed = window.confirm(
          `Role distribution has issues:\n${validation.issues.join('\n')}\n\nDo you want to proceed anyway?`
        );
        if (!proceed) return;
      }

      // Create role list and assign to players
      const roleList = createRoleList(distribution);
      const newAssignments = assignRoles(roleList, players);
      
      setAssignments(newAssignments);
      setActiveView('assignments');
    } catch (error) {
      console.error('Error generating roles:', error);
      alert('An error occurred while generating roles. Please try again.');
    }
  }, [players, customDistribution]);

  const regenerateRoles = useCallback(() => {
    if (assignments.length === 0) return;
    
    try {
      const distribution = customDistribution || getRoleDistribution(players.length);
      const roleList = createRoleList(distribution);
      const newAssignments = assignRoles(roleList, players);
      setAssignments(newAssignments);
    } catch (error) {
      console.error('Error regenerating roles:', error);
      alert('An error occurred while regenerating roles. Please try again.');
    }
  }, [players, customDistribution, assignments.length]);

  const clearAssignments = useCallback(() => {
    setAssignments([]);
    setActiveView('setup');
  }, []);

  const canGenerateRoles = players.length >= 3;

  return {
    // State
    players,
    customDistribution,
    assignments,
    activeView,
    canGenerateRoles,
    
    // Actions
    handlePlayersChange,
    handleDistributionChange,
    generateRoles,
    regenerateRoles,
    clearAssignments,
    setActiveView
  };
};