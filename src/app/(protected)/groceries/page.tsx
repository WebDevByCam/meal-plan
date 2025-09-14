import { getCurrentUser } from '@/lib/auth';
import { danielMealPlan } from '@/data/plans/daniel';
import { WeeklyMealPlan, MealFood } from '@/types';
import { redirect } from 'next/navigation';

// Function to extract all food items from the meal plan
function extractGroceryList(mealPlan: WeeklyMealPlan) {
  const groceries: Record<string, { quantity: number; unit: string; category: string }> = {};
  
  mealPlan.days.forEach((day) => {
    day.meals.forEach((meal) => {
      meal.foods.forEach((foodItem: MealFood) => {
        const foodName = foodItem.food.name;
        const quantity = foodItem.quantity;
        const unit = foodItem.unit || 'porción';
        
        // Categorize foods
        let category = 'Otros';
        const lowerName = foodName.toLowerCase();
        
        if (lowerName.includes('chicken') || lowerName.includes('pollo') || 
            lowerName.includes('salmon') || lowerName.includes('beef') || 
            lowerName.includes('egg') || lowerName.includes('carne') ||
            lowerName.includes('tilapia') || lowerName.includes('pork') ||
            lowerName.includes('turkey') || lowerName.includes('tuna') ||
            lowerName.includes('merluza')) {
          category = '🥩 Proteínas';
        } else if (lowerName.includes('rice') || lowerName.includes('bread') || 
                   lowerName.includes('potato') || lowerName.includes('arepa') ||
                   lowerName.includes('pasta') || lowerName.includes('oats') ||
                   lowerName.includes('yuca') || lowerName.includes('arroz')) {
          category = '🌾 Carbohidratos';
        } else if (lowerName.includes('broccoli') || lowerName.includes('spinach') ||
                   lowerName.includes('carrot') || lowerName.includes('tomato') ||
                   lowerName.includes('cucumber') || lowerName.includes('onion') ||
                   lowerName.includes('mushroom') || lowerName.includes('asparagus') ||
                   lowerName.includes('arugula') || lowerName.includes('cabbage') ||
                   lowerName.includes('salad')) {
          category = '🥬 Vegetales';
        } else if (lowerName.includes('avocado') || lowerName.includes('walnut') ||
                   lowerName.includes('oil') || lowerName.includes('nuts')) {
          category = '🥑 Grasas Saludables';
        } else if (lowerName.includes('yogurt') || lowerName.includes('milk') ||
                   lowerName.includes('cheese')) {
          category = '🥛 Lácteos';
        } else if (lowerName.includes('banana') || lowerName.includes('apple') ||
                   lowerName.includes('berries') || lowerName.includes('fruit')) {
          category = '🍎 Frutas';
        } else if (lowerName.includes('broth') || lowerName.includes('cream') ||
                   lowerName.includes('sauce') || lowerName.includes('coffee')) {
          category = '🥤 Líquidos/Salsas';
        }
        
        if (groceries[foodName]) {
          groceries[foodName].quantity += quantity;
        } else {
          groceries[foodName] = { quantity, unit, category };
        }
      });
    });
  });
  
  return groceries;
}

// Group groceries by category
function groupGroceriesByCategory(groceries: Record<string, { quantity: number; unit: string; category: string }>) {
  const grouped: Record<string, Array<{ name: string; quantity: number; unit: string; category: string }>> = {};
  
  Object.entries(groceries).forEach(([name, details]) => {
    const category = details.category;
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push({ name, ...details });
  });
  
  return grouped;
}

export default async function GroceriesPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  // For now, only show Daniel's grocery list
  if (user.username !== 'daniel' && user.username !== 'camilo') {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Lista de Compras No Disponible
        </h1>
        <p className="text-gray-600">
          Esta lista de compras estará disponible próximamente.
        </p>
      </div>
    );
  }

  const groceries = extractGroceryList(danielMealPlan);
  const groupedGroceries = groupGroceriesByCategory(groceries);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🛒 Lista de Compras Semanal
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Todos los ingredientes necesarios para el plan de Daniel de esta semana.
          <strong className="text-green-600"> Total de items: {Object.keys(groceries).length}</strong>
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(groupedGroceries).map(([category, items]) => (
          <div key={category} className="p-4 bg-white rounded-lg shadow-sm border-2 border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{items.length}</div>
              <div className="text-sm text-gray-600">{category}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Grocery List by Category */}
      <div className="space-y-6">
        {Object.entries(groupedGroceries).map(([category, items]) => (
          <div key={category} className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              {category}
            </h2>
            
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <span className="font-medium text-gray-900">{item.name}</span>
                  </div>
                  <div className="ml-3 text-right">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {Math.round(item.quantity * 10) / 10} {item.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Shopping Tips */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border-2 border-green-200">
        <h3 className="text-lg font-bold text-gray-900 mb-3">💡 Consejos de Compra</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <h4 className="font-semibold text-green-800 mb-2">Proteínas:</h4>
            <ul className="space-y-1 list-disc list-inside">
              <li>Compra pollo y pescado fresco o congelado</li>
              <li>Busca cortes magros de carne</li>
              <li>Los huevos pueden comprarse por cartón completo</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">Vegetales:</h4>
            <ul className="space-y-1 list-disc list-inside">
              <li>Compra vegetales de hoja verde frescos</li>
              <li>Puedes comprar vegetales congelados para facilidad</li>
              <li>Almacena correctamente para que duren toda la semana</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Print Button */}
      <div className="text-center">
        <button 
          onClick={() => window.print()}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
        >
          🖨️ Imprimir Lista de Compras
        </button>
      </div>
    </div>
  );
}
