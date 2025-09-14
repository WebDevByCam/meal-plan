// Test Daniel's nutrition calculations
const profile = {
  height: 172, // cm
  weight: 74,  // kg  
  age: 28,
  gender: 'male',
  activityLevel: 'light',
  goal: 'lose-weight'
};

// BMR calculation (Mifflin-St Jeor)
function calculateBMR(profile) {
  const { weight, height, age, gender } = profile;
  
  if (gender === 'male') {
    return (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else {
    return (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }
}

// TDEE calculation
function calculateTDEE(profile) {
  const bmr = calculateBMR(profile);
  const multipliers = {
    'sedentary': 1.2,
    'light': 1.375,
    'moderate': 1.55,
    'active': 1.725,
    'very-active': 1.9
  };
  return bmr * multipliers[profile.activityLevel];
}

// Target calories for weight loss
function calculateTargetCalories(profile) {
  const tdee = calculateTDEE(profile);
  const goalAdjustments = {
    'lose-weight': -500,
    'maintain-weight': 0,
    'gain-weight': 300
  };
  return Math.round(tdee + goalAdjustments[profile.goal]);
}

// Macro distribution for weight loss (higher protein for muscle preservation)
function calculateMacros(targetCalories) {
  const proteinPercentage = 0.35; // 35% protein for muscle preservation
  const carbsPercentage = 0.35;   // 35% carbs
  const fatPercentage = 0.30;     // 30% fat
  
  const proteinCalories = targetCalories * proteinPercentage;
  const carbsCalories = targetCalories * carbsPercentage;
  const fatCalories = targetCalories * fatPercentage;
  
  return {
    protein: Math.round(proteinCalories / 4), // 4 cal/g
    carbs: Math.round(carbsCalories / 4),     // 4 cal/g
    fat: Math.round(fatCalories / 9)          // 9 cal/g
  };
}

const bmr = calculateBMR(profile);
const tdee = calculateTDEE(profile);
const targetCalories = calculateTargetCalories(profile);
const macros = calculateMacros(targetCalories);

console.log('=== Daniel\'s Updated Calculations ===');
console.log(`Height: ${profile.height}cm, Weight: ${profile.weight}kg`);
console.log(`BMR: ${Math.round(bmr)} kcal/day`);
console.log(`TDEE: ${Math.round(tdee)} kcal/day`);
console.log(`Target (500 cal deficit): ${targetCalories} kcal/day`);
console.log(`Macros: ${macros.protein}g protein, ${macros.carbs}g carbs, ${macros.fat}g fat`);
console.log(`Macro percentages: ${35}% protein, ${35}% carbs, ${30}% fat`);
