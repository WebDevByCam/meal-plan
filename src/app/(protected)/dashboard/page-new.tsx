import { getCurrentUser } from '@/lib/auth';
import { calculateNutritionTargets, calculateBMI } from '@/lib/calculations';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { danielMealPlan } from '@/data/plans/daniel';

export default async function Dashboard() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  // Calculate nutrition targets for the user
  const nutritionTargets = calculateNutritionTargets(user.profile);
  const bmiData = calculateBMI(user.profile.weight, user.profile.height);

  // Calculate today's meal (for simplicity, show Monday's plan)
  const today = new Date();
  const dayIndex = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDay = dayNames[dayIndex];
  
  // Find today's meal plan
  const todayPlan = danielMealPlan.days.find(day => day.day === currentDay) || danielMealPlan.days[0];
  const nextMeal = todayPlan.meals[0]; // Show first meal for simplicity

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          👋 ¡Hola, {user.name}!
        </h1>
        <p className="text-gray-600">
          Aquí tienes un resumen de tu plan de alimentación y objetivos.
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-lg border-2 border-blue-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {nutritionTargets.targetCalories}
            </div>
            <div className="text-sm text-gray-600 mt-1">Calorías/día</div>
          </div>
        </div>
        
        <div className="p-6 bg-gradient-to-r from-red-50 to-red-100 rounded-xl shadow-lg border-2 border-red-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">
              {nutritionTargets.macroDistribution.protein.grams}g
            </div>
            <div className="text-sm text-gray-600 mt-1">Proteína/día</div>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl shadow-lg border-2 border-green-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {bmiData.bmi}
            </div>
            <div className="text-sm text-gray-600 mt-1">IMC Actual</div>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl shadow-lg border-2 border-purple-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              {user.profile.weight}kg
            </div>
            <div className="text-sm text-gray-600 mt-1">Peso Actual</div>
          </div>
        </div>
      </div>

      {/* Today's Focus */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🍽️ Comida de Hoy</h2>
        
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-6 border-2 border-orange-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900 capitalize">
              {nextMeal.type.replace('-', ' ')}
            </h3>
            <div className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
              {todayPlan.focus && `🎯 ${todayPlan.focus}`}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Ingredients */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Ingredientes:</h4>
              <ul className="space-y-2">
                {nextMeal.foods.slice(0, 4).map((food, idx: number) => (
                  <li key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{food.food.name}</span>
                    <span className="text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {food.quantity} {food.unit || 'porción'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nutrition */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Información Nutricional:</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="font-bold text-orange-600 text-lg">
                    {Math.round(nextMeal.totalNutrition.calories)}
                  </div>
                  <div className="text-xs text-gray-500">kcal</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="font-bold text-red-600 text-lg">
                    {Math.round(nextMeal.totalNutrition.protein)}g
                  </div>
                  <div className="text-xs text-gray-500">proteína</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Link 
          href="/meal-plan" 
          className="block p-6 bg-gradient-to-r from-green-50 to-emerald-100 rounded-xl shadow-lg border-2 border-green-200 hover:shadow-xl transition-shadow group"
        >
          <div className="flex items-center space-x-4">
            <div className="text-4xl">📅</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700">
                Ver Plan Completo
              </h3>
              <p className="text-gray-600 text-sm">
                Revisa todas las comidas de la semana
              </p>
            </div>
          </div>
        </Link>

        <Link 
          href="/groceries" 
          className="block p-6 bg-gradient-to-r from-orange-50 to-amber-100 rounded-xl shadow-lg border-2 border-orange-200 hover:shadow-xl transition-shadow group"
        >
          <div className="flex items-center space-x-4">
            <div className="text-4xl">🛒</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-700">
                Lista de Compras
              </h3>
              <p className="text-gray-600 text-sm">
                Ingredientes necesarios para la semana
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Profile Summary */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 Tu Perfil</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Datos Físicos:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-gray-600">Altura:</span>
                <span className="font-medium">{user.profile.height} cm</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Peso:</span>
                <span className="font-medium">{user.profile.weight} kg</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">IMC:</span>
                <span className={`font-medium ${
                  bmiData.bmi < 25 ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {bmiData.bmi} ({bmiData.category})
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Objetivos:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-gray-600">Meta:</span>
                <span className="font-medium capitalize">
                  {user.profile.goal.replace('-', ' ')}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Actividad:</span>
                <span className="font-medium capitalize">{user.profile.activityLevel}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Proteína objetivo:</span>
                <span className="font-medium text-red-600">
                  {Math.round(user.profile.weight * 1.5)}g/día
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
