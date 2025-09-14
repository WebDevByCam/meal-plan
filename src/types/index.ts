// User related types
export interface User {
  id: string;
  username: string;
  password: string; // Plain text for now (as requested)
  name: string;
  email?: string;
  role: 'admin' | 'user';
  profile: UserProfile;
  isActive?: boolean; // For enabling/disabling user profiles
}

export interface UserProfile {
  height: number; // in cm
  weight: number; // in kg
  age: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  goal: 'lose-weight' | 'maintain-weight' | 'gain-weight';
}

// Nutrition related types
export interface MacroNutrients {
  calories: number;
  protein: number; // in grams
  carbohydrates: number; // in grams
  fat: number; // in grams
  fiber?: number; // in grams
}

export interface Food {
  id: string;
  name: string;
  nutrition: MacroNutrients;
  servingSize: string;
  category: FoodCategory;
}

export type FoodCategory = 
  | 'protein' 
  | 'carbs' 
  | 'vegetables' 
  | 'fruits' 
  | 'dairy' 
  | 'fats' 
  | 'snacks' 
  | 'beverages'
  | 'other';

// Meal related types
export interface Meal {
  id: string;
  name: string;
  type: MealType;
  foods: MealFood[];
  totalNutrition: MacroNutrients;
  preparationTime?: number; // in minutes
  instructions?: string;
  alternatives?: MealFood[][]; // Alternative food combinations
}

export interface MealFood {
  food: Food;
  quantity: number; // multiplier for serving size
  unit?: string; // specific unit for this meal food
  notes?: string; // additional notes
}

export type MealType = 'breakfast' | 'morning-snack' | 'lunch' | 'afternoon-snack' | 'dinner' | 'evening-snack';

// Meal plan related types
export interface DayPlan {
  day: string; // e.g., 'monday', 'tuesday', etc.
  date?: string; // ISO date string
  meals: Meal[];
  totalNutrition: MacroNutrients;
  waterGoal?: number; // in liters
  focus?: string; // Daily protein or theme focus
}

export interface WeeklyMealPlan {
  id: string;
  userId: string;
  name: string;
  description?: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  days: DayPlan[];
  targetNutrition: MacroNutrients; // Daily target
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Authentication types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthUser {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'user';
  profile: UserProfile;
}

export interface JWTPayload {
  userId: string;
  username: string;
  role: 'admin' | 'user';
  iat?: number;
  exp?: number;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginResponse {
  user: AuthUser;
  token: string;
}

// Calculation types
export interface CalorieCalculation {
  bmr: number; // Basal Metabolic Rate
  tdee: number; // Total Daily Energy Expenditure
  targetCalories: number; // Based on goal
  macroDistribution: {
    protein: { grams: number; calories: number; percentage: number };
    carbohydrates: { grams: number; calories: number; percentage: number };
    fat: { grams: number; calories: number; percentage: number };
  };
}

// Component props types
export interface MealCardProps {
  meal: Meal;
  onEdit?: (meal: Meal) => void;
  onDelete?: (mealId: string) => void;
  editable?: boolean;
}

export interface DayCardProps {
  dayPlan: DayPlan;
  targetNutrition: MacroNutrients;
  onEditMeal?: (meal: Meal) => void;
  editable?: boolean;
}
