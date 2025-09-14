# 🍽️ Meal Planner

A modern, personalized meal planning web application built with Next.js 14, TypeScript, and Tailwind CSS. This application helps users track their nutrition goals and follow customized meal plans based on their individual profiles.

## ✨ Features

- **User Authentication**: Simple login system with JWT
- **Personalized Nutrition**: BMR calculation using Mifflin-St Jeor equation
- **Meal Planning**: 7-day meal plan with detailed nutrition tracking
- **Progressive Web App (PWA)**: Install on any device, offline capability
- **Meal Editing**: Complete CRUD operations with 80+ food database
- **Real-time Nutrition**: Instant calorie and macro calculations
- **Responsive Design**: Works on desktop and mobile devices
- **Admin Panel**: Camilo can view all users and their meal plans
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Material-UI (MUI)** for advanced components
- **Anime.js** for smooth animations
- **Lucide React** for icons

### Backend
- **Next.js API Routes** for server-side logic
- **JWT Authentication** with HTTP-only cookies
- **In-memory Database** for development (easily replaceable)
- **Middleware** for route protection

### Development Tools
- **ESLint** for code quality
- **PostCSS** for CSS processing
- **TypeScript** strict mode enabled

## 📁 Project Structure

```
meal-plan/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication routes
│   │   │   └── login/
│   │   ├── (protected)/       # Protected routes
│   │   │   ├── dashboard/
│   │   │   └── meal-plans/[username]/
│   │   ├── api/               # API routes
│   │   │   ├── auth/
│   │   │   └── meal-plans/
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── auth/             # Authentication components
│   │   ├── meal/             # Meal-related components
│   │   └── layout/           # Layout components
│   ├── lib/                  # Utility functions
│   │   ├── auth.ts           # Authentication helpers
│   │   ├── calculations.ts   # Calorie & macro calculations
│   │   ├── database.ts       # In-memory database
│   │   └── utils.ts          # General utilities
│   ├── types/                # TypeScript definitions
│   ├── hooks/                # Custom React hooks
│   └── data/                 # Static data
│       └── plans/            # Meal plans
├── middleware.ts             # Route protection
├── tailwind.config.ts        # Tailwind configuration
├── components.json           # shadcn/ui configuration
└── .env.local               # Environment variables
```

## 🎯 What's New

### � Progressive Web App (PWA)
- Install on any device for native app experience
- Offline functionality with cached meal plans
- Automatic updates and faster loading

### ✏️ Meal Editing System
- Complete meal editing with 80+ food database
- Add/remove ingredients with real-time nutrition updates
- Adjust quantities with decimal precision (0.5, 1.5, etc.)
- Delete unwanted meals

**See [PWA_GUIDE.md](PWA_GUIDE.md) for detailed installation and usage instructions**

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/WebDevByCam/meal-plan.git
   cd meal-plan
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # .env.local is already created with default values
   # You can modify the JWT_SECRET if needed
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### 🔐 Demo Accounts

| Username | Password | Role | Description |
|----------|----------|------|-------------|
| `camilo` | `admin123` | Admin | Full access to all features |
| `daniel` | `daniel123` | User | Has a complete meal plan |
| `selena` | `selena123` | User | Basic user account |

## 📊 Nutrition Calculations

### Calorie Calculation
- **BMR**: Uses Mifflin-St Jeor Equation
- **TDEE**: BMR × Activity Level Multiplier
- **Target**: TDEE ± Goal Adjustment

### Activity Levels
- **Sedentary**: 1.2x (little to no exercise)
- **Light**: 1.375x (light exercise 1-3 days/week)
- **Moderate**: 1.55x (moderate exercise 3-5 days/week)
- **Active**: 1.725x (heavy exercise 6-7 days/week)
- **Very Active**: 1.9x (very heavy physical work)

### Macro Distribution
- **Weight Loss**: 35% Protein, 35% Carbs, 30% Fat
- **Maintenance**: 30% Protein, 40% Carbs, 30% Fat
- **Weight Gain**: 30% Protein, 40% Carbs, 30% Fat

## 🎨 UI Components

### Custom Components
- **MealCard**: Displays individual meals with nutrition info
- **DayCard**: Shows complete daily meal plan
- **Navigation**: Main app navigation with logout
- **Dashboard**: User overview with stats

### shadcn/ui Components
- Button, Card, Input, Label
- Fully customizable and accessible
- Consistent design system

## 🔒 Authentication & Security

- **JWT Tokens**: Secure session management
- **HTTP-only Cookies**: XSS protection
- **Route Protection**: Middleware-based security
- **Role-based Access**: Admin vs User permissions

## 📱 Responsive Design

- **Mobile-first**: Optimized for all screen sizes
- **Grid Layouts**: Responsive meal plan displays
- **Touch-friendly**: Mobile-optimized interactions
- **Progressive Enhancement**: Works without JavaScript

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Other Platforms
The app works on any platform that supports Next.js:
- Netlify
- Railway
- Heroku
- AWS Amplify

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Adding New Meal Plans
1. Create a new file in `src/data/plans/`
2. Follow the structure in `daniel.ts`
3. Add the plan to the database in `lib/database.ts`

### Adding New Users
1. Update the `users` array in `lib/database.ts`
2. Include profile information for nutrition calculations

## 🎯 Future Enhancements

### Planned Features
- [ ] Real database integration (PostgreSQL/MongoDB)
- [ ] Meal plan editing interface
- [ ] Food database with search
- [ ] Progress tracking and analytics
- [ ] Shopping list generation
- [ ] Mobile app (React Native)
- [ ] Social features and meal sharing
- [ ] Integration with fitness trackers

### Technical Improvements
- [ ] Unit and integration tests
- [ ] Performance monitoring
- [ ] Error tracking (Sentry)
- [ ] Caching strategies
- [ ] Database migrations
- [ ] API rate limiting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Camilo** - [@WebDevByCam](https://github.com/WebDevByCam)

Built as a learning project to explore modern web development technologies and help with personal nutrition planning.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide](https://lucide.dev/) for clean, consistent icons
- Daniel for being the inspiration and first user! 🎉

---

## 🧪 Testing the App

### Login Credentials
1. **Login as Daniel** (regular user):
   - Username: `daniel`
   - Password: `daniel123`
   - Features: View and edit meal plans, PWA installation

2. **Login as Selena** (regular user):
   - Username: `selena`
   - Password: `selena123`
   - Features: View meal plans, different nutrition calculations

3. **Login as Camilo** (admin):
   - Username: `camilo`
   - Password: `admin123`
   - Features: Admin panel, view all users

### PWA Testing
- Try installing the app using browser's install prompt
- Test offline functionality by going offline after first visit
- Check meal editing features in Daniel's meal plan

### Editing Features
- Go to any meal plan page
- Click "Enable Editing" to show edit buttons
- Click edit icon (✏️) on any meal to modify
- Try adding ingredients, changing quantities, deleting meals

---

*Happy meal planning! 🍽️*
