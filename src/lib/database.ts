import { User, WeeklyMealPlan } from '@/types';

// In-memory user database
export const users: User[] = [
  {
    id: 'user_camilo_admin',
    username: 'camilo',
    password: 'admin123', // Plain text as requested
    name: 'Camilo',
    email: 'camilo@mealplan.com',
    role: 'admin',
    profile: {
      height: 175, // cm
      weight: 70, // kg
      age: 25,
      gender: 'male',
      activityLevel: 'moderate',
      goal: 'maintain-weight'
    }
  },
  {
    id: 'user_daniel',
    username: 'daniel',
    password: 'daniel123',
    name: 'Daniel',
    email: 'daniel@mealplan.com',
    role: 'user',
    profile: {
      height: 172, // cm
      weight: 74, // kg
      age: 25,
      gender: 'male',
      activityLevel: 'light',
      goal: 'lose-weight'
    }
  },
  {
    id: 'user_selena',
    username: 'selena',
    password: 'selena123',
    name: 'Selena',
    email: 'selena@mealplan.com',
    role: 'user',
    profile: {
      height: 165, // cm
      weight: 60, // kg
      age: 26,
      gender: 'female',
      activityLevel: 'moderate',
      goal: 'maintain-weight'
    },
    isActive: false // Profile not available yet
  }
];

// In-memory meal plans storage
export const mealPlans: WeeklyMealPlan[] = [];

// User operations
export function findUserByUsername(username: string): User | undefined {
  return users.find(user => user.username.toLowerCase() === username.toLowerCase());
}

export function findUserById(id: string): User | undefined {
  return users.find(user => user.id === id);
}

export function validateUserCredentials(username: string, password: string): User | null {
  const user = findUserByUsername(username);
  if (user && user.password === password) {
    return user;
  }
  return null;
}

export function getAllUsers(): User[] {
  return users;
}

export function updateUser(userId: string, updates: Partial<User>): User | null {
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updates };
    return users[userIndex];
  }
  return null;
}

// Meal plan operations
export function getMealPlanByUserId(userId: string): WeeklyMealPlan | undefined {
  return mealPlans.find(plan => plan.userId === userId && plan.isActive);
}

export function getAllMealPlans(): WeeklyMealPlan[] {
  return mealPlans;
}

export function createMealPlan(plan: WeeklyMealPlan): WeeklyMealPlan {
  // Deactivate existing active plan for the user
  const existingPlanIndex = mealPlans.findIndex(p => p.userId === plan.userId && p.isActive);
  if (existingPlanIndex !== -1) {
    mealPlans[existingPlanIndex].isActive = false;
  }
  
  mealPlans.push(plan);
  return plan;
}

export function updateMealPlan(planId: string, updates: Partial<WeeklyMealPlan>): WeeklyMealPlan | null {
  const planIndex = mealPlans.findIndex(plan => plan.id === planId);
  if (planIndex !== -1) {
    mealPlans[planIndex] = { ...mealPlans[planIndex], ...updates, updatedAt: new Date().toISOString() };
    return mealPlans[planIndex];
  }
  return null;
}

export function deleteMealPlan(planId: string): boolean {
  const planIndex = mealPlans.findIndex(plan => plan.id === planId);
  if (planIndex !== -1) {
    mealPlans.splice(planIndex, 1);
    return true;
  }
  return false;
}

// Helper functions for development/testing
export function resetDatabase(): void {
  mealPlans.length = 0;
  console.log('Database reset: All meal plans cleared');
}

export function getDbStats(): { userCount: number; mealPlanCount: number } {
  return {
    userCount: users.length,
    mealPlanCount: mealPlans.length
  };
}
