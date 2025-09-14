'use client';

import { Meal } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, Edit, Trash2 } from 'lucide-react';

interface MealCardProps {
  meal: Meal;
  showDetails?: boolean;
  onEdit?: (meal: Meal) => void;
  onDelete?: (mealId: string) => void;
  editable?: boolean;
}

export default function MealCard({ 
  meal, 
  showDetails = false, 
  onEdit, 
  onDelete, 
  editable = false 
}: MealCardProps) {
  const getMealIcon = (mealType: string) => {
    switch (mealType) {
      case 'breakfast':
        return '🌅';
      case 'morning-snack':
        return '🍎';
      case 'lunch':
        return '🍽️';
      case 'afternoon-snack':
        return '🥜';
      case 'dinner':
        return '🌙';
      case 'evening-snack':
        return '🍓';
      default:
        return '🍴';
    }
  };

  const formatMealType = (type: string) => {
    return type
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{getMealIcon(meal.type)}</span>
            <div>
              <CardTitle className="text-lg">{meal.name}</CardTitle>
              <CardDescription className="text-sm">
                {formatMealType(meal.type)}
                {meal.preparationTime && (
                  <span className="ml-2 inline-flex items-center">
                    <Clock size={12} className="mr-1" />
                    {meal.preparationTime} min
                  </span>
                )}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <div className="text-lg font-semibold text-blue-600">
                {Math.round(meal.totalNutrition.calories)} cal
              </div>
            </div>
            {editable && (
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit?.(meal)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete?.(meal.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Macros Summary */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-sm font-semibold text-green-600">
              {Math.round(meal.totalNutrition.protein)}g
            </div>
            <div className="text-xs text-gray-500">Protein</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-orange-600">
              {Math.round(meal.totalNutrition.carbohydrates)}g
            </div>
            <div className="text-xs text-gray-500">Carbs</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-purple-600">
              {Math.round(meal.totalNutrition.fat)}g
            </div>
            <div className="text-xs text-gray-500">Fat</div>
          </div>
        </div>

        {/* Food Items */}
        {showDetails && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Ingredients:</h4>
            {meal.foods.map((mealFood, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-gray-700">{mealFood.food.name}</span>
                <div className="text-right">
                  <span className="text-gray-500">
                    {mealFood.quantity > 1 ? `${mealFood.quantity}x ` : ''}
                    {mealFood.food.servingSize}
                  </span>
                  <div className="text-xs text-gray-400">
                    {Math.round(mealFood.food.nutrition.calories * mealFood.quantity)} cal
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!showDetails && meal.foods.length > 0 && (
          <div className="text-sm text-gray-600">
            <span className="flex items-center">
              <Users size={12} className="mr-1" />
              {meal.foods.length} ingredient{meal.foods.length > 1 ? 's' : ''}
            </span>
          </div>
        )}

        {/* Instructions */}
        {showDetails && meal.instructions && (
          <div className="mt-3 pt-3 border-t">
            <h4 className="text-sm font-semibold text-gray-700 mb-1">Instructions:</h4>
            <p className="text-sm text-gray-600">{meal.instructions}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
