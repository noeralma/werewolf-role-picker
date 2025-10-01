# 🐺 Werewolf Role Picker

An advanced React-based role assignment system for large-scale Werewolf/Mafia games, optimized for 20-40 players with cryptographically secure randomization.

## 🌐 Live Demo

**🚀 [Try it now!](https://noeralma.github.io/werewolf-role-picker/)**

## ✨ Features

- **🎲 Fisher-Yates Shuffle Algorithm**: Cryptographically secure role randomization
- **⚖️ Balanced Distribution**: Intelligent role balancing for fair gameplay
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **🎭 Comprehensive Roles**: 15+ unique roles with detailed descriptions
- **📚 Built-in Game Rules**: Complete guide and strategy tips
- **🔄 Multiple Assignments**: Generate multiple role sets for comparison
- **📊 Export Options**: Copy or export role assignments
- **🌙 Dark/Light Theme**: Toggle between themes with system preference detection
- **⌨️ Keyboard Shortcuts**: Quick navigation and actions (1,2,3 for tabs, G/R for generate/regenerate)
- **🔄 Loading States**: Visual feedback during role generation
- **♿ Accessibility**: Enhanced keyboard navigation and screen reader support

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

The built files will be in the `dist` directory, ready for deployment.

## 🎮 How to Use

### 1. Setup Players
- **Option A**: Enter player count (20-40) and generate sample names
- **Option B**: Paste a list of player names (one per line)

### 2. Customize Roles (Optional)
- View the default role distribution
- Adjust role counts if needed
- System validates balance automatically

### 3. Generate Assignments
- Click "Generate Roles" to create assignments
- Uses Fisher-Yates shuffle for optimal randomization
- View assignments by team or role type

### 4. Manage Game
- Export assignments for distribution
- Regenerate if needed
- Access comprehensive game rules

## 🎭 Available Roles

### Werewolf Team
- **Werewolf**: Basic werewolf role
- **Alpha Werewolf**: Leader with special abilities
- **Werewolf Cub**: Young werewolf with growth potential

### Village Team
- **Villager**: Basic village role
- **Seer**: Can investigate players
- **Doctor**: Can protect players
- **Bodyguard**: Protects specific players
- **Hunter**: Revenge kill ability
- **Mayor**: Double voting power
- **Priest**: Can bless players

### Special Roles
- **Fool**: Wins if lynched
- **Cupid**: Creates lovers
- **Witch**: Has potions for healing/killing
- **Little Girl**: Can peek during werewolf phase
- **Wild Child**: Role changes based on model

## 🛠️ Technical Details

### Architecture
- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom werewolf theme
- **Randomization**: Crypto.getRandomValues() with Fisher-Yates fallback
- **State Management**: React hooks and context

### Key Algorithms
- **Fisher-Yates Shuffle**: Ensures unbiased randomization
- **Role Balancing**: Maintains optimal werewolf-to-villager ratios
- **Validation System**: Prevents unbalanced game setups

### Performance
- Optimized for 40+ players
- Responsive design for all devices
- Fast role generation and assignment

## 📦 Deployment

### Static Hosting (Recommended)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to:
   - Netlify
   - Vercel
   - GitHub Pages
   - Any static hosting service

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🎯 Game Balance

The system automatically maintains optimal game balance:

- **20-25 players**: 4-5 werewolves, 2-3 special roles
- **26-30 players**: 5-6 werewolves, 3-4 special roles  
- **31-35 players**: 6-7 werewolves, 4-5 special roles
- **36-40 players**: 7-8 werewolves, 5-6 special roles

## 🔧 Customization

### Adding New Roles
1. Edit `src/data/roles.js`
2. Add role definition with description, abilities, and team
3. Update role distribution logic

### Styling Changes
1. Modify `tailwind.config.js` for theme colors
2. Update `src/index.css` for custom styles
3. Edit component styles in respective files

## 📄 License

MIT License - feel free to use for your werewolf games!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🐛 Troubleshooting

### Common Issues

**Build Errors**: Ensure Node.js 16+ and clean `node_modules`
```bash
rm -rf node_modules package-lock.json
npm install
```

**Styling Issues**: Verify Tailwind CSS configuration
```bash
npm run build
```

**Role Generation Errors**: Check browser console for validation messages

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review game rules in the app
3. Ensure proper player count (20-40)

---

**Built for epic werewolf games! 🌙🐺**