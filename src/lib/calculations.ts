import { UserProfile, CalorieCalculation, MacroNutrients } from '@/types';

// Activity level multipliers for TDEE calculation
const ACTIVITY_MULTIPLIERS = {
  'sedentary': 1.2,      // Little to no exercise
  'light': 1.375,        // Light exercise 1-3 days/week
  'moderate': 1.55,      // Moderate exercise 3-5 days/week
  'active': 1.725,       // Heavy exercise 6-7 days/week
  'very-active': 1.9     // Very heavy physical work or 2x/day training
} as const;

// Goal adjustments (calories to add/subtract from TDEE)
const GOAL_ADJUSTMENTS = {
  'lose-weight': -500,   // 1 lb per week loss
  'maintain-weight': 0,
  'gain-weight': 300     // Lean muscle gain
} as const;

/**
 * Calculate Basal Metabolic Rate using Mifflin-St Jeor Equation
 * More accurate than Harris-Benedict for most people
 */
export function calculateBMR(profile: UserProfile): number {
  const { weight, height, age, gender } = profile;
  
  if (gender === 'male') {
    return (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else {
    return (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }
}

/**
 * Calculate Total Daily Energy Expenditure
 */
export function calculateTDEE(profile: UserProfile): number {
  const bmr = calculateBMR(profile);
  const multiplier = ACTIVITY_MULTIPLIERS[profile.activityLevel];
  return bmr * multiplier;
}

/**
 * Calculate target calories based on user's goal
 */
export function calculateTargetCalories(profile: UserProfile): number {
  const tdee = calculateTDEE(profile);
  const adjustment = GOAL_ADJUSTMENTS[profile.goal];
  return Math.round(tdee + adjustment);
}

/**
 * Calculate macro distribution optimized for muscle preservation during weight loss
 * Daniel needs 1.5g protein per kg bodyweight for muscle preservation
 */
export function calculateMacroDistribution(targetCalories: number, goal: UserProfile['goal'], weight?: number) {
  let proteinGrams: number;
  let proteinPercentage: number;
  let carbsPercentage: number;
  let fatPercentage: number;

  if (goal === 'lose-weight' && weight) {
    // For weight loss: 1.5g protein per kg bodyweight for muscle preservation
    proteinGrams = Math.round(weight * 1.5);
    const proteinCalories = proteinGrams * 4;
    proteinPercentage = proteinCalories / targetCalories;
    
    // Adjust remaining macros
    const remainingPercentage = 1 - proteinPercentage;
    carbsPercentage = remainingPercentage * 0.55; // 55% of remaining calories
    fatPercentage = remainingPercentage * 0.45;   // 45% of remaining calories
  } else {
    // Standard distributions for other goals
    switch (goal) {
      case 'gain-weight':
        proteinPercentage = 0.25;
        carbsPercentage = 0.45;
        fatPercentage = 0.30;
        break;
      case 'maintain-weight':
      default:
        proteinPercentage = 0.30;
        carbsPercentage = 0.40;
        fatPercentage = 0.30;
        break;
    }
    
    // Calculate protein grams from percentage
    const proteinCalories = targetCalories * proteinPercentage;
    proteinGrams = Math.round(proteinCalories / 4);
  }

  // Calculate calories for remaining macros
  const carbsCalories = targetCalories * carbsPercentage;
  const fatCalories = targetCalories * fatPercentage;

  // Convert calories to grams (protein already calculated, carbs: 4 cal/g, fat: 9 cal/g)
  const carbsGrams = Math.round(carbsCalories / 4);
  const fatGrams = Math.round(fatCalories / 9);

  return {
    protein: {
      grams: proteinGrams,
      calories: proteinGrams * 4,
      percentage: Math.round((proteinGrams * 4 / targetCalories) * 100)
    },
    carbohydrates: {
      grams: carbsGrams,
      calories: carbsCalories,
      percentage: Math.round(carbsPercentage * 100)
    },
    fat: {
      grams: fatGrams,
      calories: fatCalories,
      percentage: Math.round(fatPercentage * 100)
    }
  };
}

/**
 * Complete calorie and macro calculation for a user
 */
export function calculateNutritionTargets(profile: UserProfile): CalorieCalculation {
  const bmr = calculateBMR(profile);
  const tdee = calculateTDEE(profile);
  const targetCalories = calculateTargetCalories(profile);
  const macroDistribution = calculateMacroDistribution(targetCalories, profile.goal, profile.weight);

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    targetCalories,
    macroDistribution
  };
}

/**
 * Calculate the total nutrition of multiple foods/meals
 */
export function sumNutrition(nutritions: MacroNutrients[]): MacroNutrients {
  return nutritions.reduce(
    (total, nutrition) => ({
      calories: total.calories + nutrition.calories,
      protein: total.protein + nutrition.protein,
      carbohydrates: total.carbohydrates + nutrition.carbohydrates,
      fat: total.fat + nutrition.fat,
      fiber: (total.fiber || 0) + (nutrition.fiber || 0)
    }),
    { calories: 0, protein: 0, carbohydrates: 0, fat: 0, fiber: 0 }
  );
}

/**
 * Calculate percentage of target nutrition achieved
 */
export function calculateNutritionPercentage(
  actual: MacroNutrients, 
  target: MacroNutrients
): { calories: number; protein: number; carbohydrates: number; fat: number } {
  return {
    calories: target.calories > 0 ? Math.round((actual.calories / target.calories) * 100) : 0,
    protein: target.protein > 0 ? Math.round((actual.protein / target.protein) * 100) : 0,
    carbohydrates: target.carbohydrates > 0 ? Math.round((actual.carbohydrates / target.carbohydrates) * 100) : 0,
    fat: target.fat > 0 ? Math.round((actual.fat / target.fat) * 100) : 0
  };
}

/**
 * Get BMI and category
 */
export function calculateBMI(weight: number, height: number): { bmi: number; category: string } {
  const bmi = weight / Math.pow(height / 100, 2);
  
  let category: string;
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 25) category = 'Normal weight';
  else if (bmi < 30) category = 'Overweight';
  else category = 'Obese';

  return {
    bmi: Math.round(bmi * 10) / 10,
    category
  };
}

/**
 * Estimate ideal weight range based on height (BMI 20-25)
 */
export function calculateIdealWeightRange(height: number): { min: number; max: number } {
  const heightInM = height / 100;
  const minWeight = Math.round(20 * Math.pow(heightInM, 2));
  const maxWeight = Math.round(25 * Math.pow(heightInM, 2));
  
  return { min: minWeight, max: maxWeight };
}
