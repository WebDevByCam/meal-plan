import { getCurrentUser } from '@/lib/auth';
import { danielMealPlan } from '@/data/plans/daniel';
import { Meal, DayPlan, MealFood } from '@/types';
import { redirect } from 'next/navigation';

// Simple Meal Card Component
function SimpleMealCard({ meal, dayColor }: { meal: Meal; dayColor: string }) {
  return (
    <div className={`p-4 rounded-lg shadow-sm border-2 ${dayColor} bg-white`}>
      <h4 className="font-semibold text-gray-900 mb-3 text-lg capitalize">
        {meal.type.replace('-', ' ')}
      </h4>
      
      {/* Food Items */}
      <div className="space-y-2 mb-4">
  {meal.foods.map((foodItem: MealFood, idx: number) => (
          <div key={idx} className="flex justify-between items-center text-sm">
            <span className="text-gray-700 font-medium">
              {foodItem.food.name}
            </span>
            <span className="text-gray-600 bg-gray-100 px-2 py-1 rounded">
              {foodItem.quantity} {foodItem.unit || 'porción'}
            </span>
          </div>
        ))}
      </div>

      {/* Nutrition Summary */}
      <div className="pt-3 border-t border-gray-200">
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="text-center">
            <div className="font-bold text-orange-600 text-lg">
              {Math.round(meal.totalNutrition.calories)}
            </div>
            <div className="text-gray-500">kcal</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-red-600 text-lg">
              {Math.round(meal.totalNutrition.protein)}g
            </div>
            <div className="text-gray-500">proteína</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-blue-600 text-lg">
              {Math.round(meal.totalNutrition.carbohydrates)}g
            </div>
            <div className="text-gray-500">carbs</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-yellow-600 text-lg">
              {Math.round(meal.totalNutrition.fat)}g
            </div>
            <div className="text-gray-500">grasa</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple Day Card Component
function SimpleDayCard({ day, index }: { day: DayPlan; index: number }) {
  const dayColors = [
    'border-red-200 bg-red-50',
    'border-blue-200 bg-blue-50', 
    'border-green-200 bg-green-50',
    'border-yellow-200 bg-yellow-50',
    'border-purple-200 bg-purple-50',
    'border-pink-200 bg-pink-50',
    'border-indigo-200 bg-indigo-50'
  ];
  
  const dayColor = dayColors[index % dayColors.length];
  
  const dayNames: Record<string, string> = {
    'monday': 'Lunes',
    'tuesday': 'Martes', 
    'wednesday': 'Miércoles',
    'thursday': 'Jueves',
    'friday': 'Viernes',
    'saturday': 'Sábado',
    'sunday': 'Domingo'
  };

  return (
    <div className={`p-6 rounded-xl shadow-lg ${dayColor} border-2`}>
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-1">
          {dayNames[day.day] || day.day}
        </h3>
        {day.focus && (
          <p className="text-sm text-gray-600 font-medium">
            🎯 Enfoque: {day.focus}
          </p>
        )}
      </div>

      {/* Daily Totals */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
        <h4 className="font-semibold text-gray-900 mb-3">Total del Día</h4>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(day.totalNutrition.calories)}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Calorías</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">
              {Math.round(day.totalNutrition.protein)}g
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Proteína</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(day.totalNutrition.carbohydrates)}g
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Carbos</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">
              {Math.round(day.totalNutrition.fat)}g
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Grasa</div>
          </div>
        </div>
      </div>

      {/* Meals */}
      <div className="space-y-4">
  {day.meals.map((meal) => (
          <SimpleMealCard 
            key={meal.id} 
            meal={meal} 
            dayColor="border-gray-200"
          />
        ))}
      </div>
    </div>
  );
}

export default async function MealPlanPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  // For now, only show Daniel's plan
  if (user.username !== 'daniel' && user.username !== 'camilo') {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Plan de Comidas No Disponible
        </h1>
        <p className="text-gray-600">
          Este plan de comidas estará disponible próximamente.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          📅 Plan Semanal de Daniel
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Plan balanceado para pérdida de peso gradual manteniendo masa muscular. 
          <strong className="text-blue-600"> Target: 1810 kcal/día • 111g proteína</strong>
        </p>
      </div>

      {/* Weekly Overview */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
        {danielMealPlan.days.map((day, index) => (
          <SimpleDayCard key={day.day} day={day} index={index} />
        ))}
      </div>

      {/* Weekly Summary */}
      <div className="mt-8 p-6 bg-white rounded-xl shadow-lg border-2 border-blue-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
          📊 Resumen Semanal
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(danielMealPlan.days.reduce((sum, day) => sum + day.totalNutrition.calories, 0) / 7)}
            </div>
            <div className="text-sm text-gray-600">Promedio kcal/día</div>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="text-2xl font-bold text-red-600">
              {Math.round(danielMealPlan.days.reduce((sum, day) => sum + day.totalNutrition.protein, 0) / 7)}g
            </div>
            <div className="text-sm text-gray-600">Promedio proteína/día</div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(danielMealPlan.days.reduce((sum, day) => sum + day.totalNutrition.carbohydrates, 0) / 7)}g
            </div>
            <div className="text-sm text-gray-600">Promedio carbos/día</div>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="text-2xl font-bold text-yellow-600">
              {Math.round(danielMealPlan.days.reduce((sum, day) => sum + day.totalNutrition.fat, 0) / 7)}g
            </div>
            <div className="text-sm text-gray-600">Promedio grasa/día</div>
          </div>
        </div>
      </div>
    </div>
  );
}
