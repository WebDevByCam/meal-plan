import { Food } from '@/types';

// Extended food database for meal editing
export const foodDatabase: Food[] = [
  // Proteins
  {
    id: 'chicken-breast',
    name: 'Grilled Chicken Breast',
    nutrition: { calories: 165, protein: 31, carbohydrates: 0, fat: 3.6 },
    servingSize: '100g',
    category: 'protein'
  },
  {
    id: 'salmon',
    name: 'Atlantic Salmon',
    nutrition: { calories: 208, protein: 25.4, carbohydrates: 0, fat: 12.4 },
    servingSize: '100g',
    category: 'protein'
  },
  {
    id: 'eggs',
    name: 'Large Eggs',
    nutrition: { calories: 155, protein: 13, carbohydrates: 1.1, fat: 11 },
    servingSize: '2 eggs',
    category: 'protein'
  },
  {
    id: 'greek-yogurt',
    name: 'Plain Greek Yogurt',
    nutrition: { calories: 100, protein: 17, carbohydrates: 6, fat: 0.4 },
    servingSize: '150g',
    category: 'dairy'
  },
  {
    id: 'tuna',
    name: 'Canned Tuna in Water',
    nutrition: { calories: 116, protein: 26, carbohydrates: 0, fat: 0.8 },
    servingSize: '100g',
    category: 'protein'
  },
  {
    id: 'turkey-breast',
    name: 'Lean Turkey Breast',
    nutrition: { calories: 135, protein: 30, carbohydrates: 0, fat: 1 },
    servingSize: '100g',
    category: 'protein'
  },
  {
    id: 'tofu',
    name: 'Firm Tofu',
    nutrition: { calories: 144, protein: 15, carbohydrates: 3, fat: 9 },
    servingSize: '100g',
    category: 'protein'
  },
  {
    id: 'cottage-cheese',
    name: 'Low-fat Cottage Cheese',
    nutrition: { calories: 98, protein: 11, carbohydrates: 3.4, fat: 4.3 },
    servingSize: '100g',
    category: 'dairy'
  },

  // Carbohydrates
  {
    id: 'brown-rice',
    name: 'Cooked Brown Rice',
    nutrition: { calories: 112, protein: 2.6, carbohydrates: 23, fat: 0.9 },
    servingSize: '100g',
    category: 'carbs'
  },
  {
    id: 'oats',
    name: 'Rolled Oats',
    nutrition: { calories: 389, protein: 16.9, carbohydrates: 66.3, fat: 6.9 },
    servingSize: '100g',
    category: 'carbs'
  },
  {
    id: 'sweet-potato',
    name: 'Baked Sweet Potato',
    nutrition: { calories: 103, protein: 2.3, carbohydrates: 24, fat: 0.1 },
    servingSize: '1 medium',
    category: 'carbs'
  },
  {
    id: 'whole-wheat-bread',
    name: 'Whole Wheat Bread',
    nutrition: { calories: 80, protein: 4, carbohydrates: 12, fat: 1.5 },
    servingSize: '1 slice',
    category: 'carbs'
  },
  {
    id: 'quinoa',
    name: 'Cooked Quinoa',
    nutrition: { calories: 120, protein: 4.4, carbohydrates: 22, fat: 1.9 },
    servingSize: '100g',
    category: 'carbs'
  },
  {
    id: 'white-rice',
    name: 'Cooked White Rice',
    nutrition: { calories: 130, protein: 2.7, carbohydrates: 28, fat: 0.3 },
    servingSize: '100g',
    category: 'carbs'
  },
  {
    id: 'pasta',
    name: 'Whole Wheat Pasta',
    nutrition: { calories: 124, protein: 5.3, carbohydrates: 25, fat: 1.1 },
    servingSize: '100g cooked',
    category: 'carbs'
  },
  {
    id: 'potato',
    name: 'Baked Potato',
    nutrition: { calories: 93, protein: 2.5, carbohydrates: 21, fat: 0.1 },
    servingSize: '1 medium',
    category: 'carbs'
  },

  // Vegetables
  {
    id: 'broccoli',
    name: 'Steamed Broccoli',
    nutrition: { calories: 34, protein: 2.8, carbohydrates: 7, fat: 0.4 },
    servingSize: '100g',
    category: 'vegetables'
  },
  {
    id: 'spinach',
    name: 'Fresh Spinach',
    nutrition: { calories: 23, protein: 2.9, carbohydrates: 3.6, fat: 0.4 },
    servingSize: '100g',
    category: 'vegetables'
  },
  {
    id: 'mixed-greens',
    name: 'Mixed Green Salad',
    nutrition: { calories: 15, protein: 1.5, carbohydrates: 3, fat: 0.2 },
    servingSize: '100g',
    category: 'vegetables'
  },
  {
    id: 'carrots',
    name: 'Raw Carrots',
    nutrition: { calories: 41, protein: 0.9, carbohydrates: 10, fat: 0.2 },
    servingSize: '100g',
    category: 'vegetables'
  },
  {
    id: 'bell-peppers',
    name: 'Bell Peppers',
    nutrition: { calories: 31, protein: 1, carbohydrates: 7, fat: 0.3 },
    servingSize: '100g',
    category: 'vegetables'
  },
  {
    id: 'asparagus',
    name: 'Steamed Asparagus',
    nutrition: { calories: 20, protein: 2.2, carbohydrates: 3.9, fat: 0.1 },
    servingSize: '100g',
    category: 'vegetables'
  },
  {
    id: 'cucumber',
    name: 'Fresh Cucumber',
    nutrition: { calories: 16, protein: 0.7, carbohydrates: 4, fat: 0.1 },
    servingSize: '100g',
    category: 'vegetables'
  },
  {
    id: 'tomatoes',
    name: 'Cherry Tomatoes',
    nutrition: { calories: 18, protein: 0.9, carbohydrates: 3.9, fat: 0.2 },
    servingSize: '100g',
    category: 'vegetables'
  },

  // Fruits
  {
    id: 'banana',
    name: 'Medium Banana',
    nutrition: { calories: 105, protein: 1.3, carbohydrates: 27, fat: 0.4 },
    servingSize: '1 medium',
    category: 'fruits'
  },
  {
    id: 'mixed-berries',
    name: 'Mixed Berries',
    nutrition: { calories: 57, protein: 0.7, carbohydrates: 14, fat: 0.3 },
    servingSize: '100g',
    category: 'fruits'
  },
  {
    id: 'apple',
    name: 'Medium Apple',
    nutrition: { calories: 95, protein: 0.5, carbohydrates: 25, fat: 0.3 },
    servingSize: '1 medium',
    category: 'fruits'
  },
  {
    id: 'strawberries',
    name: 'Fresh Strawberries',
    nutrition: { calories: 32, protein: 0.7, carbohydrates: 7.7, fat: 0.3 },
    servingSize: '100g',
    category: 'fruits'
  },
  {
    id: 'blueberries',
    name: 'Fresh Blueberries',
    nutrition: { calories: 57, protein: 0.7, carbohydrates: 14, fat: 0.3 },
    servingSize: '100g',
    category: 'fruits'
  },
  {
    id: 'orange',
    name: 'Medium Orange',
    nutrition: { calories: 62, protein: 1.2, carbohydrates: 15, fat: 0.2 },
    servingSize: '1 medium',
    category: 'fruits'
  },
  {
    id: 'grapes',
    name: 'Fresh Grapes',
    nutrition: { calories: 69, protein: 0.6, carbohydrates: 18, fat: 0.2 },
    servingSize: '100g',
    category: 'fruits'
  },

  // Healthy Fats
  {
    id: 'avocado',
    name: 'Avocado',
    nutrition: { calories: 160, protein: 2, carbohydrates: 8.5, fat: 14.7 },
    servingSize: '1/2 medium',
    category: 'fats'
  },
  {
    id: 'almonds',
    name: 'Raw Almonds',
    nutrition: { calories: 164, protein: 6, carbohydrates: 6, fat: 14 },
    servingSize: '28g (24 almonds)',
    category: 'fats'
  },
  {
    id: 'olive-oil',
    name: 'Extra Virgin Olive Oil',
    nutrition: { calories: 120, protein: 0, carbohydrates: 0, fat: 14 },
    servingSize: '1 tbsp',
    category: 'fats'
  },
  {
    id: 'walnuts',
    name: 'Raw Walnuts',
    nutrition: { calories: 185, protein: 4.3, carbohydrates: 3.9, fat: 18.5 },
    servingSize: '28g',
    category: 'fats'
  },
  {
    id: 'peanut-butter',
    name: 'Natural Peanut Butter',
    nutrition: { calories: 188, protein: 8, carbohydrates: 8, fat: 16 },
    servingSize: '2 tbsp',
    category: 'fats'
  },
  {
    id: 'chia-seeds',
    name: 'Chia Seeds',
    nutrition: { calories: 58, protein: 2, carbohydrates: 5, fat: 3.7 },
    servingSize: '1 tbsp',
    category: 'fats'
  },
  {
    id: 'coconut-oil',
    name: 'Coconut Oil',
    nutrition: { calories: 117, protein: 0, carbohydrates: 0, fat: 14 },
    servingSize: '1 tbsp',
    category: 'fats'
  },

  // Additional Proteins
  {
    id: 'protein-powder',
    name: 'Whey Protein Powder',
    nutrition: { calories: 120, protein: 24, carbohydrates: 2, fat: 1 },
    servingSize: '1 scoop (30g)',
    category: 'protein'
  },
  {
    id: 'black-beans',
    name: 'Cooked Black Beans',
    nutrition: { calories: 132, protein: 8.9, carbohydrates: 24, fat: 0.5 },
    servingSize: '100g',
    category: 'protein'
  },
  {
    id: 'chickpeas',
    name: 'Cooked Chickpeas',
    nutrition: { calories: 164, protein: 8.9, carbohydrates: 27, fat: 2.6 },
    servingSize: '100g',
    category: 'protein'
  },
  {
    id: 'lean-beef',
    name: 'Lean Ground Beef (93/7)',
    nutrition: { calories: 152, protein: 22, carbohydrates: 0, fat: 7 },
    servingSize: '100g',
    category: 'protein'
  },

  // Dairy & Alternatives
  {
    id: 'milk',
    name: '1% Low-fat Milk',
    nutrition: { calories: 42, protein: 3.4, carbohydrates: 5, fat: 1 },
    servingSize: '100ml',
    category: 'dairy'
  },
  {
    id: 'almond-milk',
    name: 'Unsweetened Almond Milk',
    nutrition: { calories: 13, protein: 0.6, carbohydrates: 0.3, fat: 1.1 },
    servingSize: '100ml',
    category: 'dairy'
  },
  {
    id: 'cheese',
    name: 'Part-skim Mozzarella',
    nutrition: { calories: 85, protein: 6.1, carbohydrates: 1, fat: 6.3 },
    servingSize: '28g',
    category: 'dairy'
  },

  // Condiments & Seasonings
  {
    id: 'lemon-juice',
    name: 'Fresh Lemon Juice',
    nutrition: { calories: 7, protein: 0.1, carbohydrates: 2.1, fat: 0 },
    servingSize: '1 tbsp',
    category: 'fruits'
  },
  {
    id: 'balsamic-vinegar',
    name: 'Balsamic Vinegar',
    nutrition: { calories: 5, protein: 0, carbohydrates: 1, fat: 0 },
    servingSize: '1 tbsp',
    category: 'vegetables'
  },
  {
    id: 'herbs',
    name: 'Fresh Herbs (mixed)',
    nutrition: { calories: 1, protein: 0.1, carbohydrates: 0.2, fat: 0 },
    servingSize: '1 tbsp',
    category: 'vegetables'
  }
];

// Helper functions for food management
export function getFoodById(id: string): Food | undefined {
  return foodDatabase.find(food => food.id === id);
}

export function getFoodsByCategory(category: Food['category']): Food[] {
  return foodDatabase.filter(food => food.category === category);
}

export function searchFoods(query: string): Food[] {
  const lowercaseQuery = query.toLowerCase();
  return foodDatabase.filter(food => 
    food.name.toLowerCase().includes(lowercaseQuery) ||
    food.category.toLowerCase().includes(lowercaseQuery)
  );
}

export function getAllFoodCategories(): Food['category'][] {
  return Array.from(new Set(foodDatabase.map(food => food.category)));
}
