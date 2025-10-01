// Werewolf Game Rules and Instructions

export const GAME_RULES = {
  overview: {
    title: "Game Overview",
    content: [
      "Werewolf is a social deduction game where players are secretly assigned roles as either werewolves or villagers.",
      "The werewolves know each other and try to eliminate villagers during the night phase.",
      "The villagers must work together during the day to identify and eliminate the werewolves.",
      "The game alternates between night and day phases until one team achieves their win condition."
    ]
  },
  
  setup: {
    title: "Game Setup",
    content: [
      "1. Gather players in a circle or designated area (minimum 3 players recommended)",
      "2. Use this role picker to randomly assign roles to all players",
      "3. Each player receives their role card privately",
      "4. Players should not reveal their roles to others (except werewolves to each other)",
      "5. Choose a moderator who will guide the game phases"
    ]
  },
  
  phases: {
    title: "Game Phases",
    night: {
      title: "Night Phase",
      content: [
        "All players close their eyes and 'go to sleep'",
        "The moderator calls each role to perform their night action:",
        "• Werewolves wake up and silently choose a victim to eliminate",
        "• Seer wakes up and chooses someone to investigate",
        "• Doctor wakes up and chooses someone to protect",
        "• Other special roles perform their abilities as applicable",
        "Players return to sleep after their actions"
      ]
    },
    day: {
      title: "Day Phase",
      content: [
        "All players wake up and the moderator announces what happened during the night",
        "If someone was eliminated, they are removed from the game",
        "Players discuss and try to identify the werewolves",
        "Players vote to eliminate someone they suspect is a werewolf",
        "The player with the most votes is eliminated",
        "Eliminated players reveal their role and are out of the game"
      ]
    }
  },
  
  winConditions: {
    title: "Win Conditions",
    content: [
      "Village Team Wins: All werewolves are eliminated",
      "Werewolf Team Wins: Werewolves equal or outnumber the remaining villagers",
      "The game ends immediately when either win condition is met"
    ]
  },
  
  tips: {
    title: "Strategy Tips",
    villagers: [
      "Pay attention to voting patterns and behavior",
      "Special roles should use their abilities wisely",
      "Work together to share information (but be careful of werewolves)",
      "Don't reveal your role unless absolutely necessary",
      "Look for inconsistencies in players' stories"
    ],
    werewolves: [
      "Blend in with the villagers during day discussions",
      "Coordinate with your fellow werewolves subtly",
      "Target special roles like the Seer and Doctor first",
      "Create confusion and misdirect suspicion",
      "Vote strategically to eliminate key villagers"
    ]
  },
  
  moderatorGuidelines: {
    title: "Moderator Guidelines",
    content: [
      "Keep the game moving at a steady pace",
      "Ensure all players understand their roles",
      "Maintain neutrality and don't give hints",
      "Keep track of who has been eliminated and their roles",
      "Announce night results clearly in the morning",
      "Facilitate discussions but don't participate in voting",
      "End the game when win conditions are met"
    ]
  }
};

export const ROLE_EXPLANATIONS = {
  title: "Detailed Role Explanations",
  content: {
    werewolfTeam: {
      title: "Werewolf Team",
      description: "These players work together to eliminate villagers and take control of the town.",
      roles: ["werewolf", "alpha_werewolf"]
    },
    villageTeam: {
      title: "Village Team", 
      description: "These players work together to identify and eliminate all werewolves.",
      specialRoles: ["seer", "doctor", "detective", "bodyguard", "hunter", "mayor", "priest", "witch", "medium", "vigilante"],
      regularRoles: ["villager"]
    }
  }
};

export const GAME_VARIANTS = {
  title: "Game Variants",
  content: [
    {
      name: "Speed Werewolf",
      description: "Shorter discussion times and faster-paced gameplay for experienced players"
    },
    {
      name: "Silent Werewolf", 
      description: "Werewolves cannot communicate during night phase, making coordination harder"
    },
    {
      name: "One Night Werewolf",
      description: "Single night phase followed by discussion and voting - great for quick games"
    },
    {
      name: "Werewolf with Apps",
      description: "Use smartphone apps for role assignment and night phase management"
    }
  ]
};