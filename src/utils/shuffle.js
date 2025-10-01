// Fisher-Yates Shuffle Algorithm Implementation
// Provides cryptographically secure randomization for fair role distribution

/**
 * Fisher-Yates shuffle algorithm for optimal randomization
 * Time complexity: O(n), Space complexity: O(1)
 * Ensures each permutation has equal probability
 * 
 * @param {Array} array - Array to shuffle (will be modified in place)
 * @returns {Array} - The shuffled array
 */
export const fisherYatesShuffle = (array) => {
  // Create a copy to avoid mutating the original array
  const shuffled = [...array];
  
  // Start from the last element and work backwards
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Use crypto.getRandomValues for cryptographically secure randomness
    const randomBytes = new Uint32Array(1);
    crypto.getRandomValues(randomBytes);
    
    // Convert to a number between 0 and i (inclusive)
    const j = randomBytes[0] % (i + 1);
    
    // Swap elements at positions i and j
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
};

/**
 * Alternative shuffle using Math.random (fallback for environments without crypto)
 * @param {Array} array - Array to shuffle
 * @returns {Array} - The shuffled array
 */
export const mathRandomShuffle = (array) => {
  const shuffled = [...array];
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
};

/**
 * Secure shuffle that tries crypto first, falls back to Math.random
 * @param {Array} array - Array to shuffle
 * @returns {Array} - The shuffled array
 */
export const secureShuffle = (array) => {
  try {
    // Try to use cryptographically secure randomness
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      return fisherYatesShuffle(array);
    }
  } catch (error) {
    console.warn('Crypto API not available, falling back to Math.random');
  }
  
  // Fallback to Math.random
  return mathRandomShuffle(array);
};

/**
 * Shuffle roles and assign to players
 * @param {Array} roleList - List of role IDs to assign
 * @param {Array} playerNames - List of player names
 * @returns {Array} - Array of {player, role} objects
 */
export const assignRoles = (roleList, playerNames) => {
  if (roleList.length !== playerNames.length) {
    throw new Error(`Role count (${roleList.length}) must match player count (${playerNames.length})`);
  }
  
  // Shuffle the roles for random assignment
  const shuffledRoles = secureShuffle(roleList);
  
  // Create assignments
  return playerNames.map((playerName, index) => ({
    player: playerName.trim(),
    role: shuffledRoles[index],
    id: `${playerName.trim()}-${Date.now()}-${index}`
  }));
};

/**
 * Validate role distribution for game balance
 * @param {Object} distribution - Role distribution object
 * @param {number} playerCount - Total number of players
 * @returns {Object} - Validation result with isValid and issues
 */
export const validateRoleDistribution = (distribution, playerCount) => {
  const issues = [];
  const totalRoles = Object.values(distribution).reduce((sum, count) => sum + count, 0);
  
  // Check if total roles match player count
  if (totalRoles !== playerCount) {
    issues.push(`Total roles (${totalRoles}) doesn't match player count (${playerCount})`);
  }
  
  // Check werewolf ratio (should be roughly 25-30% for balance)
  const werewolfCount = (distribution.werewolf || 0) + (distribution.alpha_werewolf || 0);
  const werewolfRatio = werewolfCount / playerCount;
  
  if (werewolfRatio < 0.2) {
    issues.push('Too few werewolves - game may be too easy for villagers');
  } else if (werewolfRatio > 0.35) {
    issues.push('Too many werewolves - game may be too hard for villagers');
  }
  
  // Check for minimum villagers
  const villagerCount = distribution.villager || 0;
  if (villagerCount < Math.floor(playerCount * 0.4)) {
    issues.push('Too few regular villagers - special roles may be overwhelming');
  }
  
  return {
    isValid: issues.length === 0,
    issues,
    werewolfRatio: Math.round(werewolfRatio * 100),
    recommendations: generateRecommendations(distribution, playerCount)
  };
};

/**
 * Generate recommendations for role distribution
 * @param {Object} distribution - Current role distribution
 * @param {number} playerCount - Total number of players
 * @returns {Array} - Array of recommendation strings
 */
const generateRecommendations = (distribution, playerCount) => {
  const recommendations = [];
  const werewolfCount = (distribution.werewolf || 0) + (distribution.alpha_werewolf || 0);
  
  if (playerCount >= 30 && !distribution.medium) {
    recommendations.push('Consider adding a Medium for larger games');
  }
  
  if (playerCount >= 25 && !distribution.witch) {
    recommendations.push('Consider adding a Witch for more dynamic gameplay');
  }
  
  if (werewolfCount >= 6 && !distribution.vigilante) {
    recommendations.push('Consider adding a Vigilante to balance many werewolves');
  }
  
  return recommendations;
};

/**
 * Generate multiple shuffled role assignments for comparison
 * @param {Array} roleList - List of roles
 * @param {Array} playerNames - List of player names  
 * @param {number} count - Number of different assignments to generate
 * @returns {Array} - Array of assignment arrays
 */
export const generateMultipleAssignments = (roleList, playerNames, count = 3) => {
  const assignments = [];
  
  for (let i = 0; i < count; i++) {
    assignments.push(assignRoles(roleList, playerNames));
  }
  
  return assignments;
};