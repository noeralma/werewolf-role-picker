// Werewolf Game Roles Data
// Designed for flexible games (any number of players)

export const ROLE_TYPES = {
  WEREWOLF: 'werewolf',
  VILLAGER: 'villager',
  SPECIAL: 'special'
};

export const ROLES = {
  // Werewolf Team
  werewolf: {
    id: 'werewolf',
    name: 'Werewolf',
    type: ROLE_TYPES.WEREWOLF,
    team: 'werewolf',
    description: 'You are a werewolf. Each night, you and your fellow werewolves choose someone to eliminate. Your goal is to outnumber the villagers.',
    abilities: ['Can eliminate villagers at night', 'Knows other werewolves'],
    winCondition: 'Werewolves equal or outnumber villagers',
    emoji: '🐺',
    color: 'blood'
  },
  
  alpha_werewolf: {
    id: 'alpha_werewolf',
    name: 'Alpha Werewolf',
    type: ROLE_TYPES.WEREWOLF,
    team: 'werewolf',
    description: 'You are the Alpha Werewolf. You lead the werewolf pack and have the final say in night eliminations.',
    abilities: ['Leads werewolf discussions', 'Breaks ties in werewolf votes', 'Can eliminate villagers at night'],
    winCondition: 'Werewolves equal or outnumber villagers',
    emoji: '🐺👑',
    color: 'blood'
  },

  // Village Team - Special Roles
  seer: {
    id: 'seer',
    name: 'Seer',
    type: ROLE_TYPES.SPECIAL,
    team: 'village',
    description: 'You can see the true nature of players. Each night, choose someone to investigate and learn their role.',
    abilities: ['Investigate one player each night', 'Learn if target is werewolf or not'],
    winCondition: 'All werewolves are eliminated',
    emoji: '🔮',
    color: 'moon'
  },

  doctor: {
    id: 'doctor',
    name: 'Doctor',
    type: ROLE_TYPES.SPECIAL,
    team: 'village',
    description: 'You can protect players from werewolf attacks. Each night, choose someone to heal (including yourself).',
    abilities: ['Protect one player each night', 'Cannot protect the same player twice in a row'],
    winCondition: 'All werewolves are eliminated',
    emoji: '⚕️',
    color: 'moon'
  },

  detective: {
    id: 'detective',
    name: 'Detective',
    type: ROLE_TYPES.SPECIAL,
    team: 'village',
    description: 'You investigate players and gather information. You can learn about player connections and voting patterns.',
    abilities: ['Investigate voting patterns', 'Learn about player relationships'],
    winCondition: 'All werewolves are eliminated',
    emoji: '🕵️',
    color: 'moon'
  },

  bodyguard: {
    id: 'bodyguard',
    name: 'Bodyguard',
    type: ROLE_TYPES.SPECIAL,
    team: 'village',
    description: 'You protect important villagers. You can take a bullet for someone else.',
    abilities: ['Protect another player by sacrificing yourself', 'One-time use ability'],
    winCondition: 'All werewolves are eliminated',
    emoji: '🛡️',
    color: 'moon'
  },

  hunter: {
    id: 'hunter',
    name: 'Hunter',
    type: ROLE_TYPES.SPECIAL,
    team: 'village',
    description: 'When you die, you can take someone with you. Choose wisely!',
    abilities: ['When eliminated, can immediately eliminate another player'],
    winCondition: 'All werewolves are eliminated',
    emoji: '🏹',
    color: 'moon'
  },

  mayor: {
    id: 'mayor',
    name: 'Mayor',
    type: ROLE_TYPES.SPECIAL,
    team: 'village',
    description: 'Your vote counts double during the day phase. You are a leader in the village.',
    abilities: ['Vote counts as 2 votes', 'Can break ties in village votes'],
    winCondition: 'All werewolves are eliminated',
    emoji: '🏛️',
    color: 'moon'
  },

  priest: {
    id: 'priest',
    name: 'Priest',
    type: ROLE_TYPES.SPECIAL,
    team: 'village',
    description: 'You can bless players to protect them from werewolf attacks for one night.',
    abilities: ['Bless one player each night for protection', 'Cannot bless the same player twice'],
    winCondition: 'All werewolves are eliminated',
    emoji: '⛪',
    color: 'moon'
  },

  witch: {
    id: 'witch',
    name: 'Witch',
    type: ROLE_TYPES.SPECIAL,
    team: 'village',
    description: 'You have two potions: one to heal and one to poison. Use them wisely.',
    abilities: ['One healing potion (save someone)', 'One poison potion (eliminate someone)', 'Each potion can only be used once'],
    winCondition: 'All werewolves are eliminated',
    emoji: '🧙‍♀️',
    color: 'moon'
  },

  medium: {
    id: 'medium',
    name: 'Medium',
    type: ROLE_TYPES.SPECIAL,
    team: 'village',
    description: 'You can communicate with the dead and learn information from eliminated players.',
    abilities: ['Learn the role of eliminated players', 'Receive hints from dead players'],
    winCondition: 'All werewolves are eliminated',
    emoji: '👻',
    color: 'moon'
  },

  vigilante: {
    id: 'vigilante',
    name: 'Vigilante',
    type: ROLE_TYPES.SPECIAL,
    team: 'village',
    description: 'You can eliminate someone at night, but be careful not to kill innocent villagers.',
    abilities: ['Can eliminate one player at night', 'Limited uses (usually 1-2 times)'],
    winCondition: 'All werewolves are eliminated',
    emoji: '⚔️',
    color: 'moon'
  },

  // Regular Villagers
  villager: {
    id: 'villager',
    name: 'Villager',
    type: ROLE_TYPES.VILLAGER,
    team: 'village',
    description: 'You are an ordinary villager. Use your voice and vote to help eliminate the werewolves.',
    abilities: ['Vote during the day phase', 'Discuss and analyze behavior'],
    winCondition: 'All werewolves are eliminated',
    emoji: '👤',
    color: 'werewolf'
  }
};

// Special roles in order of priority (most important first)
const SPECIAL_ROLES_PRIORITY = [
  'alpha_werewolf', // Always include if werewolves > 1
  'seer',           // Essential for balance
  'doctor',         // Essential for balance
  'detective',      // Good for medium games
  'hunter',         // Adds strategy
  'mayor',          // Good for larger games
  'priest',         // Alternative protection
  'bodyguard',      // Additional protection
  'witch',          // Powerful but balanced
  'medium',         // Information gathering
  'vigilante'       // High risk/reward
];

// Function to calculate optimal role distribution for any player count
export const calculateRoleDistribution = (playerCount) => {
  if (playerCount < 3) {
    throw new Error('Minimum 3 players required');
  }

  const distribution = {};
  
  // Calculate werewolf count (roughly 25-30% of players, minimum 1)
  const werewolfCount = Math.max(1, Math.floor(playerCount * 0.27));
  
  // Always have at least 1 regular werewolf
  distribution.werewolf = Math.max(1, werewolfCount - 1);
  
  // Add alpha werewolf if there are multiple werewolves
  if (werewolfCount > 1) {
    distribution.alpha_werewolf = 1;
  }
  
  // Calculate remaining slots for special roles and villagers
  const usedSlots = Object.values(distribution).reduce((sum, count) => sum + count, 0);
  const remainingSlots = playerCount - usedSlots;
  
  // Determine how many special roles to include based on game size
  let specialRoleCount;
  if (playerCount <= 5) {
    specialRoleCount = Math.min(2, remainingSlots - 1); // Leave at least 1 villager
  } else if (playerCount <= 10) {
    specialRoleCount = Math.min(4, remainingSlots - 2); // Leave at least 2 villagers
  } else if (playerCount <= 20) {
    specialRoleCount = Math.min(6, remainingSlots - 3); // Leave at least 3 villagers
  } else {
    specialRoleCount = Math.min(8, remainingSlots - Math.floor(playerCount * 0.2)); // Leave at least 20% villagers
  }
  
  // Add special roles in priority order
  let addedSpecialRoles = 0;
  for (const roleId of SPECIAL_ROLES_PRIORITY) {
    if (addedSpecialRoles >= specialRoleCount) break;
    
    // Skip alpha_werewolf as it's already handled above
    if (roleId === 'alpha_werewolf') continue;
    
    distribution[roleId] = 1;
    addedSpecialRoles++;
  }
  
  // Fill remaining slots with villagers
  const finalUsedSlots = Object.values(distribution).reduce((sum, count) => sum + count, 0);
  distribution.villager = playerCount - finalUsedSlots;
  
  return distribution;
};

// Legacy role distributions for reference (kept for backward compatibility)
export const ROLE_DISTRIBUTION = {
  20: {
    werewolf: 4,
    alpha_werewolf: 1,
    seer: 1,
    doctor: 1,
    detective: 1,
    hunter: 1,
    mayor: 1,
    priest: 1,
    villager: 9
  },
  25: {
    werewolf: 5,
    alpha_werewolf: 1,
    seer: 1,
    doctor: 1,
    detective: 1,
    bodyguard: 1,
    hunter: 1,
    mayor: 1,
    priest: 1,
    witch: 1,
    villager: 11
  },
  30: {
    werewolf: 6,
    alpha_werewolf: 1,
    seer: 1,
    doctor: 1,
    detective: 1,
    bodyguard: 1,
    hunter: 1,
    mayor: 1,
    priest: 1,
    witch: 1,
    medium: 1,
    villager: 14
  },
  35: {
    werewolf: 7,
    alpha_werewolf: 1,
    seer: 1,
    doctor: 1,
    detective: 1,
    bodyguard: 1,
    hunter: 1,
    mayor: 1,
    priest: 1,
    witch: 1,
    medium: 1,
    vigilante: 1,
    villager: 17
  },
  40: {
    werewolf: 8,
    alpha_werewolf: 1,
    seer: 1,
    doctor: 1,
    detective: 1,
    bodyguard: 1,
    hunter: 1,
    mayor: 1,
    priest: 1,
    witch: 1,
    medium: 1,
    vigilante: 1,
    villager: 20
  }
};

// Function to get role distribution for a specific number of players
export const getRoleDistribution = (playerCount) => {
  // Use the new dynamic calculation for any player count
  return calculateRoleDistribution(playerCount);
};

// Function to create role list for assignment
export const createRoleList = (playerCount) => {
  const distribution = getRoleDistribution(playerCount);
  const roleList = [];
  
  Object.entries(distribution).forEach(([roleId, count]) => {
    for (let i = 0; i < count; i++) {
      roleList.push(roleId);
    }
  });
  
  return roleList;
};