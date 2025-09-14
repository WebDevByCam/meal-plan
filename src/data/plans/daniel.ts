import { WeeklyMealPlan, DayPlan, Meal, MealFood, MacroNutrients } from '@/types';

// Helper function to create meal food entries
function createMealFood(name: string, qty: number, unit: string, note?: string): MealFood {
  return {
    food: {
      id: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name,
      nutrition: { calories: 0, protein: 0, carbohydrates: 0, fat: 0 }, // Will be calculated
      servingSize: `${qty} ${unit}`,
      category: 'other'
    },
    quantity: qty,
    unit,
    notes: note
  };
}

// Helper function to create meals with alternatives
function createMeal(
  id: string, 
  name: string, 
  type: import('@/types').MealType,
  items: Array<{ name: string; qty: number; unit: string; note?: string }>,
  alternatives?: Array<Array<{ name: string; qty: number; unit: string; note?: string }>>
): Meal {
  const foods = items.map(item => createMealFood(item.name, item.qty, item.unit, item.note));
  
  // Calculate total nutrition (placeholder - will be updated with real food data)
  const totalNutrition: MacroNutrients = {
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fat: 0
  };

  const meal: Meal = {
    id,
    name,
    type,
    foods,
    totalNutrition,
    preparationTime: 15,
    instructions: `Prepare ${name} as specified.`,
    alternatives: alternatives?.map(alt => 
      alt.map(item => createMealFood(item.name, item.qty, item.unit, item.note))
    )
  };

  return meal;
}

// Daniel's Updated 7-Day Meal Plan
export const danielMealPlan: WeeklyMealPlan = {
  id: 'daniel-week-1',
  userId: 'user_daniel',
  name: "Daniel's Weight Loss Plan - Week 1",
  description: 'Colombian-inspired balanced meal plan for gradual weight loss with muscle preservation. Target: 1810 kcal/day (500 cal deficit).',
  startDate: '2024-01-01T00:00:00.000Z',
  endDate: '2024-01-07T23:59:59.999Z',
  targetNutrition: {
    calories: 1810, // Updated target based on new profile (500 cal deficit)
    protein: 111,   // 1.5g per kg bodyweight (74kg * 1.5 = 111g)
    carbohydrates: 158, // Adjusted for remaining calories
    fat: 60         // 30% of calories
  },
  isActive: true,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  days: [
    // Monday - Salmon Focus
    {
      day: 'monday',
      date: '2024-01-01',
      waterGoal: 2.5,
      focus: 'Salmon',
      meals: [
        createMeal('mon-breakfast', 'Breakfast', 'breakfast', [
          { name: 'Egg', qty: 2, unit: 'unit' },
          { name: 'Egg white', qty: 3, unit: 'unit' },
          { name: 'Sautéed spinach', qty: 150, unit: 'g' },
          { name: 'Corn arepa', qty: 40, unit: 'g' },
          { name: 'Avocado', qty: 40, unit: 'g' }
        ], [
          [{ name: 'Whole-wheat bread', qty: 60, unit: 'g' }, { name: 'Egg', qty: 2, unit: 'unit' }],
          [{ name: 'Lactose-free Greek yogurt', qty: 150, unit: 'g' }, { name: 'Berries', qty: 80, unit: 'g' }, { name: 'No-sugar granola', qty: 20, unit: 'g' }]
        ]),
        createMeal('mon-lunch', 'Lunch', 'lunch', [
          { name: 'Grilled salmon', qty: 150, unit: 'g' },
          { name: 'Brown rice (cooked)', qty: 100, unit: 'g' },
          { name: 'Steamed broccoli', qty: 100, unit: 'g' },
          { name: 'Steamed carrot', qty: 100, unit: 'g' },
          { name: 'Light vegetable broth', qty: 250, unit: 'ml' }
        ], [
          [{ name: 'Grilled tilapia', qty: 150, unit: 'g' }],
          [{ name: 'Grilled trout', qty: 150, unit: 'g' }]
        ]),
        createMeal('mon-dinner', 'Dinner', 'dinner', [
          { name: 'Pumpkin cream', qty: 200, unit: 'g' },
          { name: 'Baked sweet potato', qty: 100, unit: 'g' },
          { name: 'Chicken breast', qty: 150, unit: 'g' }
        ], [
          [{ name: 'Turkey breast', qty: 150, unit: 'g' }],
          [{ name: 'Hake (merluza)', qty: 150, unit: 'g' }]
        ])
      ],
      totalNutrition: { calories: 1810, protein: 118, carbohydrates: 175, fat: 58 }
    },

    // Tuesday - Chicken Breast Focus
    {
      day: 'tuesday',
      date: '2024-01-02',
      waterGoal: 2.5,
      focus: 'Chicken breast',
      meals: [
        createMeal('tue-breakfast', 'Breakfast', 'breakfast', [
          { name: 'Lactose-free Greek yogurt', qty: 200, unit: 'g' },
          { name: 'Banana', qty: 100, unit: 'g' },
          { name: 'Walnuts', qty: 15, unit: 'g' }
        ], [
          [{ name: 'Unsweetened plant milk', qty: 200, unit: 'ml' }, { name: 'Lactose-free protein powder', qty: 30, unit: 'g' }, { name: 'Fruit (any)', qty: 100, unit: 'g' }],
          [{ name: 'Egg', qty: 2, unit: 'unit' }, { name: 'Egg white', qty: 2, unit: 'unit' }, { name: 'Whole-wheat bread', qty: 60, unit: 'g' }]
        ]),
        createMeal('tue-lunch', 'Lunch', 'lunch', [
          { name: 'Grilled chicken breast', qty: 160, unit: 'g' },
          { name: 'Whole-wheat pasta (cooked)', qty: 100, unit: 'g' },
          { name: 'Tomato basil sauce', qty: 80, unit: 'g' },
          { name: 'Arugula', qty: 60, unit: 'g' },
          { name: 'Cucumber', qty: 40, unit: 'g' },
          { name: 'Tomato cream (no dairy cream)', qty: 250, unit: 'ml' }
        ], [
          [{ name: 'Grilled white fish', qty: 150, unit: 'g' }],
          [{ name: 'Lean beef', qty: 150, unit: 'g' }]
        ]),
        createMeal('tue-dinner', 'Dinner', 'dinner', [
          { name: 'Egg', qty: 2, unit: 'unit' },
          { name: 'Egg white', qty: 3, unit: 'unit' },
          { name: 'Mushrooms', qty: 100, unit: 'g' },
          { name: 'Whole-grain arepa', qty: 40, unit: 'g' }
        ], [
          [{ name: 'Canned tuna in water (drained)', qty: 120, unit: 'g' }],
          [{ name: 'Lactose-free fresh cheese', qty: 60, unit: 'g' }]
        ])
      ],
      totalNutrition: { calories: 1820, protein: 115, carbohydrates: 182, fat: 60 }
    },

    // Wednesday - Beef Focus
    {
      day: 'wednesday',
      date: '2024-01-03',
      waterGoal: 2.5,
      focus: 'Beef',
      meals: [
        createMeal('wed-breakfast', 'Breakfast', 'breakfast', [
          { name: 'Whole-wheat sandwich bread', qty: 80, unit: 'g' },
          { name: 'Turkey ham', qty: 60, unit: 'g' },
          { name: 'Avocado', qty: 40, unit: 'g' },
          { name: 'Black coffee', qty: 250, unit: 'ml' }
        ], [
          [{ name: 'Yuca arepa', qty: 50, unit: 'g' }, { name: 'Egg', qty: 1, unit: 'unit' }],
          [{ name: 'Lactose-free Greek yogurt', qty: 150, unit: 'g' }, { name: 'Fruit (any)', qty: 120, unit: 'g' }]
        ]),
        createMeal('wed-lunch', 'Lunch', 'lunch', [
          { name: 'Lean beef stew (sudado)', qty: 150, unit: 'g' },
          { name: 'White potato', qty: 100, unit: 'g' },
          { name: 'Yuca', qty: 50, unit: 'g' },
          { name: 'White rice (cooked)', qty: 80, unit: 'g' },
          { name: 'Tomato', qty: 60, unit: 'g' },
          { name: 'Cucumber', qty: 40, unit: 'g' },
          { name: 'Defatted beef broth', qty: 250, unit: 'ml' }
        ], [
          [{ name: 'Chicken breast', qty: 150, unit: 'g' }],
          [{ name: 'Lean pork', qty: 150, unit: 'g' }]
        ]),
        createMeal('wed-dinner', 'Dinner', 'dinner', [
          { name: 'Spinach cream', qty: 200, unit: 'g' },
          { name: 'Grilled tilapia', qty: 150, unit: 'g' },
          { name: 'Sweet potato', qty: 80, unit: 'g' }
        ], [
          [{ name: 'Hake (merluza)', qty: 150, unit: 'g' }],
          [{ name: 'Chicken breast', qty: 150, unit: 'g' }]
        ])
      ],
      totalNutrition: { calories: 1800, protein: 112, carbohydrates: 170, fat: 58 }
    },

    // Thursday - Pork Focus
    {
      day: 'thursday',
      date: '2024-01-04',
      waterGoal: 2.5,
      focus: 'Pork',
      meals: [
        createMeal('thu-breakfast', 'Breakfast', 'breakfast', [
          { name: 'Egg', qty: 2, unit: 'unit' },
          { name: 'Egg white', qty: 2, unit: 'unit' },
          { name: 'Tomato', qty: 60, unit: 'g' },
          { name: 'Onion', qty: 30, unit: 'g' },
          { name: 'Whole-grain arepa', qty: 40, unit: 'g' }
        ], [
          [{ name: 'Whole-wheat bread', qty: 60, unit: 'g' }, { name: 'Avocado', qty: 40, unit: 'g' }],
          [{ name: 'Lactose-free Greek yogurt', qty: 180, unit: 'g' }, { name: 'Fruit (any)', qty: 100, unit: 'g' }]
        ]),
        createMeal('thu-lunch', 'Lunch', 'lunch', [
          { name: 'Lean pork loin', qty: 150, unit: 'g' },
          { name: 'Brown rice (cooked)', qty: 100, unit: 'g' },
          { name: 'Sautéed asparagus', qty: 100, unit: 'g' },
          { name: 'Defatted chicken broth', qty: 250, unit: 'ml' }
        ], [
          [{ name: 'Chicken breast', qty: 150, unit: 'g' }],
          [{ name: 'Lean beef', qty: 150, unit: 'g' }]
        ]),
        createMeal('thu-dinner', 'Dinner', 'dinner', [
          { name: 'Big salad (arugula, cucumber, carrot)', qty: 250, unit: 'g' },
          { name: 'Chicken breast', qty: 150, unit: 'g' },
          { name: 'Mashed potato', qty: 80, unit: 'g' }
        ], [
          [{ name: 'White fish', qty: 150, unit: 'g' }],
          [{ name: 'Turkey breast', qty: 150, unit: 'g' }]
        ])
      ],
      totalNutrition: { calories: 1825, protein: 120, carbohydrates: 185, fat: 55 }
    },

    // Friday - Chicken (Arroz con Pollo) Focus
    {
      day: 'friday',
      date: '2024-01-05',
      waterGoal: 2.5,
      focus: 'Chicken (Arroz con Pollo)',
      meals: [
        createMeal('fri-breakfast', 'Breakfast', 'breakfast', [
          { name: 'Lactose-free Greek yogurt', qty: 200, unit: 'g' },
          { name: 'Oats', qty: 30, unit: 'g' },
          { name: 'Apple', qty: 70, unit: 'g' }
        ], [
          [{ name: 'Egg', qty: 2, unit: 'unit' }, { name: 'Whole-wheat bread', qty: 60, unit: 'g' }],
          [{ name: 'Unsweetened plant milk', qty: 200, unit: 'ml' }, { name: 'Lactose-free protein powder', qty: 30, unit: 'g' }, { name: 'Fruit (any)', qty: 120, unit: 'g' }]
        ]),
        createMeal('fri-lunch', 'Lunch - Arroz con Pollo', 'lunch', [
          { name: 'Chicken breast (diced)', qty: 150, unit: 'g' },
          { name: 'White rice (for arroz con pollo)', qty: 80, unit: 'g' },
          { name: 'Peas', qty: 30, unit: 'g' },
          { name: 'Carrot', qty: 50, unit: 'g' },
          { name: 'Bell pepper', qty: 20, unit: 'g' },
          { name: 'Purple cabbage + carrot salad', qty: 150, unit: 'g' },
          { name: 'Vegetable cream', qty: 250, unit: 'ml' }
        ], [
          [{ name: 'Lean beef (stir-fried)', qty: 150, unit: 'g' }],
          [{ name: 'White fish', qty: 150, unit: 'g' }]
        ]),
        createMeal('fri-dinner', 'Dinner', 'dinner', [
          { name: 'Grilled salmon', qty: 150, unit: 'g' },
          { name: 'Baked sweet potato', qty: 100, unit: 'g' },
          { name: 'Steamed veggie mix', qty: 150, unit: 'g' }
        ], [
          [{ name: 'Grilled tilapia', qty: 150, unit: 'g' }],
          [{ name: 'Chicken breast', qty: 150, unit: 'g' }]
        ])
      ],
      totalNutrition: { calories: 1815, protein: 110, carbohydrates: 178, fat: 56 }
    },

    // Saturday - Colombian Comfort (Flex Day)
    {
      day: 'saturday',
      date: '2024-01-06',
      waterGoal: 2.5,
      focus: 'Colombian comfort, controlled',
      meals: [
        createMeal('sat-breakfast', 'Breakfast', 'breakfast', [
          { name: 'Cheese arepa (lactose-free cheese)', qty: 50, unit: 'g' },
          { name: 'Egg', qty: 2, unit: 'unit' },
          { name: 'Black coffee', qty: 250, unit: 'ml' }
        ], [
          [{ name: 'Corn arepa', qty: 60, unit: 'g' }, { name: 'Scrambled eggs', qty: 2, unit: 'unit' }],
          [{ name: 'Lean beef broth', qty: 300, unit: 'ml' }, { name: 'Small arepa', qty: 40, unit: 'g' }]
        ]),
        createMeal('sat-lunch', 'Lunch - Ajiaco', 'lunch', [
          { name: 'Ajiaco (no dairy cream)', qty: 450, unit: 'g', note: 'Shredded chicken 150 g + total potato 150 g + corn + guascas' }
        ], [
          [{ name: 'Light chicken sancocho', qty: 450, unit: 'g' }],
          [{ name: 'Vegetable soup with chicken', qty: 400, unit: 'g' }]
        ]),
        createMeal('sat-dinner', 'Dinner', 'dinner', [
          { name: 'Oven BBQ wings', qty: 200, unit: 'g' },
          { name: 'Cabbage & carrot salad', qty: 150, unit: 'g' }
        ], [
          [{ name: 'Lean churrasco', qty: 180, unit: 'g' }],
          [{ name: 'Grilled chicken breast', qty: 170, unit: 'g' }]
        ])
      ],
      totalNutrition: { calories: 1900, protein: 105, carbohydrates: 195, fat: 68 }
    },

    // Sunday - Roasts & Stews (Flex Day)
    {
      day: 'sunday',
      date: '2024-01-07',
      waterGoal: 2.5,
      focus: 'Roasts & stews, controlled',
      meals: [
        createMeal('sun-breakfast', 'Breakfast', 'breakfast', [
          { name: 'Lean beef broth', qty: 300, unit: 'ml' },
          { name: 'Beef in broth (lean)', qty: 150, unit: 'g' },
          { name: 'Small arepa', qty: 40, unit: 'g' }
        ], [
          [{ name: 'Chicken broth', qty: 300, unit: 'ml' }, { name: 'Corn arepa', qty: 50, unit: 'g' }],
          [{ name: 'Scrambled eggs', qty: 2, unit: 'unit' }, { name: 'Whole-wheat bread', qty: 40, unit: 'g' }]
        ]),
        createMeal('sun-lunch', 'Lunch', 'lunch', [
          { name: 'Oven pork ribs (leaned)', qty: 200, unit: 'g' },
          { name: 'Mashed potato', qty: 100, unit: 'g' },
          { name: 'Fresh salad', qty: 150, unit: 'g' }
        ], [
          [{ name: 'Lean pork loin', qty: 180, unit: 'g' }],
          [{ name: 'Roasted chicken (skinless)', qty: 180, unit: 'g' }]
        ]),
        createMeal('sun-dinner', 'Dinner', 'dinner', [
          { name: 'Light beef goulash', qty: 350, unit: 'g', note: 'Beef 150 g + veggies' },
          { name: 'White rice (cooked)', qty: 80, unit: 'g' }
        ], [
          [{ name: 'Chicken stew (sudado)', qty: 350, unit: 'g' }],
          [{ name: 'Beef stew (sudado)', qty: 350, unit: 'g' }]
        ])
      ],
      totalNutrition: { calories: 1950, protein: 108, carbohydrates: 190, fat: 72 }
    }
  ]
};

// Calculate average daily nutrition
const totalCalories = danielMealPlan.days.reduce((sum, day) => sum + day.totalNutrition.calories, 0);
const avgCalories = Math.round(totalCalories / danielMealPlan.days.length);

console.log(`Daniel's plan average: ${avgCalories} kcal/day (Target: ${danielMealPlan.targetNutrition.calories})`);
