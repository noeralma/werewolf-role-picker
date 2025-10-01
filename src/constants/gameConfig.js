/**
 * Game configuration constants
 * Centralizes magic numbers and configuration values
 */

// Player count constraints
export const PLAYER_CONSTRAINTS = {
  MIN_PLAYERS: 3,
  MAX_RECOMMENDED_PLAYERS: 50,
  LARGE_GROUP_THRESHOLD: 50
};

// UI Configuration
export const UI_CONFIG = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  MAX_VISIBLE_ASSIGNMENTS: 100
};

// Game balance ratios
export const BALANCE_RATIOS = {
  WEREWOLF_RATIO_MIN: 0.2,  // 20% minimum werewolves
  WEREWOLF_RATIO_MAX: 0.35, // 35% maximum werewolves
  SPECIAL_ROLE_RATIO: 0.3   // 30% special roles
};

// View states
export const VIEW_STATES = {
  SETUP: 'setup',
  ASSIGNMENTS: 'assignments',
  RULES: 'rules'
};

// Filter options for role assignments
export const FILTER_OPTIONS = {
  ALL: 'all',
  WEREWOLF: 'werewolf',
  VILLAGE: 'village',
  SPECIAL: 'special'
};

// Sort options for role assignments
export const SORT_OPTIONS = {
  PLAYER: 'player',
  ROLE: 'role',
  TEAM: 'team'
};

// Input methods for player setup
export const INPUT_METHODS = {
  COUNT: 'count',
  NAMES: 'names'
};

// Error messages
export const ERROR_MESSAGES = {
  MIN_PLAYERS: 'You need at least 3 players to start the game!',
  ROLE_GENERATION_ERROR: 'An error occurred while generating roles. Please try again.',
  ROLE_REGENERATION_ERROR: 'An error occurred while regenerating roles. Please try again.',
  VALIDATION_ERROR: 'Role distribution has validation issues. Please review and try again.'
};

// Success messages
export const SUCCESS_MESSAGES = {
  ROLES_GENERATED: 'Roles have been successfully generated!',
  ROLES_REGENERATED: 'Roles have been regenerated!',
  ASSIGNMENTS_CLEARED: 'Role assignments have been cleared.'
};

// Sample player names for quick setup
export const SAMPLE_NAMES = [
  'Alice', 'Bob', 'Charlie', 'Diana', 'Edward', 'Fiona', 'George', 'Hannah',
  'Ivan', 'Julia', 'Kevin', 'Luna', 'Marcus', 'Nina', 'Oscar', 'Penny',
  'Quinn', 'Rachel', 'Sam', 'Tina', 'Ulrich', 'Vera', 'Walter', 'Xara',
  'Yuki', 'Zoe', 'Aaron', 'Bella', 'Carlos', 'Delia', 'Ethan', 'Faith',
  'Gavin', 'Hope', 'Isaac', 'Jade', 'Kyle', 'Lily', 'Mason', 'Nora'
];