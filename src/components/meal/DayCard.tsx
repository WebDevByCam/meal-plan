'use client';

import { DayPlan, MacroNutrients, Meal } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MealCard from './MealCard';
import { formatDateShort, capitalizeFirst } from '@/lib/utils';
import { Calendar, Droplets, Target } from 'lucide-react';

interface DayCardProps {
  dayPlan: DayPlan;
  targetNutrition: MacroNutrients;
  showDetails?: boolean;
  onMealEdit?: (meal: Meal) => void;
  onMealDelete?: (mealId: string) => void;
  editable?: boolean;
}

export default function DayCard({ 
  dayPlan, 
  targetNutrition, 
  showDetails = false, 
  onMealEdit, 
  onMealDelete, 
  editable = false 
}: DayCardProps) {
  // Calculate percentages
  const caloriePercent = Math.round((dayPlan.totalNutrition.calories / targetNutrition.calories) * 100);
  const proteinPercent = Math.round((dayPlan.totalNutrition.protein / targetNutrition.protein) * 100);
  const carbPercent = Math.round((dayPlan.totalNutrition.carbohydrates / targetNutrition.carbohydrates) * 100);
  const fatPercent = Math.round((dayPlan.totalNutrition.fat / targetNutrition.fat) * 100);

  // Get color based on percentage (green if close to 100%, yellow if under/over by reasonable margin)
  const getPercentColor = (percent: number) => {
    if (percent >= 90 && percent <= 110) return 'text-green-600';
    if (percent >= 80 && percent <= 120) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calendar size={20} className="text-blue-600" />
            <div>
              <CardTitle className="text-xl capitalize">
                {capitalizeFirst(dayPlan.day)}
              </CardTitle>
              <CardDescription>
                {dayPlan.date ? formatDateShort(dayPlan.date) : 'Meal Plan Day'}
              </CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold">
              <span className={getPercentColor(caloriePercent)}>
                {Math.round(dayPlan.totalNutrition.calories)}
              </span>
              <span className="text-gray-400">/{targetNutrition.calories}</span>
            </div>
            <div className="text-sm text-gray-500">calories</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Daily Nutrition Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Target size={14} className="text-blue-600" />
              <span className="text-sm font-semibold">Calories</span>
            </div>
            <div className={`text-lg font-bold ${getPercentColor(caloriePercent)}`}>
              {Math.round(dayPlan.totalNutrition.calories)}
            </div>
            <div className="text-xs text-gray-500">
              {caloriePercent}% of target
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-sm font-semibold text-green-600 mb-1">Protein</div>
            <div className={`text-lg font-bold ${getPercentColor(proteinPercent)}`}>
              {Math.round(dayPlan.totalNutrition.protein)}g
            </div>
            <div className="text-xs text-gray-500">
              {proteinPercent}% of target
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-sm font-semibold text-orange-600 mb-1">Carbs</div>
            <div className={`text-lg font-bold ${getPercentColor(carbPercent)}`}>
              {Math.round(dayPlan.totalNutrition.carbohydrates)}g
            </div>
            <div className="text-xs text-gray-500">
              {carbPercent}% of target
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-sm font-semibold text-purple-600 mb-1">Fat</div>
            <div className={`text-lg font-bold ${getPercentColor(fatPercent)}`}>
              {Math.round(dayPlan.totalNutrition.fat)}g
            </div>
            <div className="text-xs text-gray-500">
              {fatPercent}% of target
            </div>
          </div>
        </div>

        {/* Water Goal */}
        {dayPlan.waterGoal && (
          <div className="flex items-center space-x-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
            <Droplets size={16} className="text-blue-600" />
            <span>Daily water goal: <strong>{dayPlan.waterGoal}L</strong></span>
          </div>
        )}

        {/* Meals */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Meals for today</h3>
          <div className="grid gap-4">
            {dayPlan.meals.map((meal) => (
              <MealCard 
                key={meal.id} 
                meal={meal} 
                showDetails={showDetails}
                onEdit={onMealEdit}
                onDelete={onMealDelete}
                editable={editable}
              />
            ))}
          </div>
        </div>

        {/* Meal Summary */}
        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
          <div className="flex justify-between items-center">
            <span>Total meals for the day:</span>
            <span className="font-semibold">{dayPlan.meals.length}</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span>Meal types:</span>
            <span className="font-semibold">
              {Array.from(new Set(dayPlan.meals.map(meal => meal.type))).length} different meal types
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
