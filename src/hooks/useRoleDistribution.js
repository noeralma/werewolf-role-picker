import { useState, useEffect, useMemo } from 'react';
import { getRoleDistribution } from '../data/roles';
import { validateRoleDistribution } from '../utils/shuffle';

/**
 * Custom hook for managing role distribution logic
 * Handles default distribution calculation and validation
 */
export const useRoleDistribution = (playerCount, customDistribution, onDistributionChange) => {
  const [internalCustomDistribution, setInternalCustomDistribution] = useState(customDistribution);

  // Calculate default distribution based on player count
  const defaultDistribution = useMemo(() => {
    if (playerCount < 3) return null;
    return getRoleDistribution(playerCount);
  }, [playerCount]);

  // Use custom distribution if available, otherwise use default
  const currentDistribution = internalCustomDistribution || defaultDistribution;

  // Validate the current distribution
  const validation = useMemo(() => {
    if (!currentDistribution || playerCount < 3) {
      return { isValid: true, issues: [], recommendations: [] };
    }
    return validateRoleDistribution(currentDistribution, playerCount);
  }, [currentDistribution, playerCount]);

  // Calculate total roles
  const totalRoles = useMemo(() => {
    if (!currentDistribution) return 0;
    return Object.values(currentDistribution).reduce((sum, count) => sum + count, 0);
  }, [currentDistribution]);

  // Reset custom distribution when player count changes significantly
  useEffect(() => {
    if (internalCustomDistribution && playerCount < 3) {
      setInternalCustomDistribution(null);
    }
  }, [playerCount, internalCustomDistribution]);

  // Sync with external customDistribution prop
  useEffect(() => {
    setInternalCustomDistribution(customDistribution);
  }, [customDistribution]);

  const handleRoleCountChange = (roleId, newCount) => {
    // Handle empty input for better mobile experience
    let count;
    if (newCount === '' || newCount === null || newCount === undefined) {
      count = 0;
    } else {
      count = Math.max(0, parseInt(newCount) || 0);
    }
    
    const updatedDistribution = {
      ...currentDistribution,
      [roleId]: count
    };
    setInternalCustomDistribution(updatedDistribution);
    if (onDistributionChange) {
      onDistributionChange(updatedDistribution);
    }
  };

  const resetToDefault = () => {
    setInternalCustomDistribution(null);
    if (onDistributionChange) {
      onDistributionChange(null);
    }
  };

  return {
    defaultDistribution,
    customDistribution: internalCustomDistribution,
    currentDistribution,
    validation,
    handleRoleCountChange,
    resetToDefault,
    totalRoles,
    hasCustomDistribution: internalCustomDistribution !== null
  };
};