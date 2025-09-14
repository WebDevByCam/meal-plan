'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { WeeklyMealPlan, ApiResponse, Meal } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DayCard from '@/components/meal/DayCard';
import MealEditDialog from '@/components/meal/MealEditDialog';
import { foodDatabase } from '@/data/foods';
import { Calendar, ChevronLeft, ChevronRight, Target, Edit } from 'lucide-react';

export default function MealPlanPage() {
  const params = useParams();
  const username = params.username as string;
  
  const [mealPlan, setMealPlan] = useState<WeeklyMealPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDay, setSelectedDay] = useState(0);
  const [showAllDays, setShowAllDays] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/meal-plans/${username}`);
        const data: ApiResponse<WeeklyMealPlan> = await response.json();

        if (data.success && data.data) {
          setMealPlan(data.data);
        } else {
          setError(data.error || 'Failed to load meal plan');
        }
      } catch (err) {
        setError('An error occurred while loading the meal plan');
        console.error('Meal plan fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchMealPlan();
    }
  }, [username]);

  const handleEditMeal = (meal: Meal) => {
    setEditingMeal(meal);
    setIsEditDialogOpen(true);
  };

  const handleSaveMeal = async (updatedMeal: Meal) => {
    if (!mealPlan) return;

    try {
      const response = await fetch(`/api/meal-plans/${username}/meals/${updatedMeal.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMeal),
      });

      const data: ApiResponse<Meal> = await response.json();

      if (data.success) {
        // Update local state
        const updatedDays = mealPlan.days.map(day => ({
          ...day,
          meals: day.meals.map(meal => 
            meal.id === updatedMeal.id ? updatedMeal : meal
          ),
          totalNutrition: {
            calories: 0,
            protein: 0,
            carbohydrates: 0,
            fat: 0,
          }
        }));

        // Recalculate day totals
        updatedDays.forEach(day => {
          day.totalNutrition = day.meals.reduce(
            (total, meal) => ({
              calories: total.calories + meal.totalNutrition.calories,
              protein: total.protein + meal.totalNutrition.protein,
              carbohydrates: total.carbohydrates + meal.totalNutrition.carbohydrates,
              fat: total.fat + meal.totalNutrition.fat,
            }),
            { calories: 0, protein: 0, carbohydrates: 0, fat: 0 }
          );
        });

        setMealPlan({ ...mealPlan, days: updatedDays });
        setIsEditDialogOpen(false);
        setEditingMeal(null);
      } else {
        setError(data.error || 'Failed to update meal');
      }
    } catch (err) {
      setError('An error occurred while updating the meal');
      console.error('Meal update error:', err);
    }
  };

  const handleDeleteMeal = async (mealId: string) => {
    if (!mealPlan || !confirm('Are you sure you want to delete this meal?')) return;

    try {
      const response = await fetch(`/api/meal-plans/${username}/meals/${mealId}`, {
        method: 'DELETE',
      });

      const data: ApiResponse = await response.json();

      if (data.success) {
        // Update local state
        const updatedDays = mealPlan.days.map(day => ({
          ...day,
          meals: day.meals.filter(meal => meal.id !== mealId),
          totalNutrition: {
            calories: 0,
            protein: 0,
            carbohydrates: 0,
            fat: 0,
          }
        }));

        // Recalculate day totals
        updatedDays.forEach(day => {
          day.totalNutrition = day.meals.reduce(
            (total, meal) => ({
              calories: total.calories + meal.totalNutrition.calories,
              protein: total.protein + meal.totalNutrition.protein,
              carbohydrates: total.carbohydrates + meal.totalNutrition.carbohydrates,
              fat: total.fat + meal.totalNutrition.fat,
            }),
            { calories: 0, protein: 0, carbohydrates: 0, fat: 0 }
          );
        });

        setMealPlan({ ...mealPlan, days: updatedDays });
      } else {
        setError(data.error || 'Failed to delete meal');
      }
    } catch (err) {
      setError('An error occurred while deleting the meal');
      console.error('Meal delete error:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading meal plan...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-4">❌ {error}</div>
        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  if (!mealPlan) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-4">No meal plan found</div>
        <p className="text-gray-400">Contact your administrator to set up a meal plan.</p>
      </div>
    );
  }

  const currentDay = mealPlan.days[selectedDay];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 capitalize">
            {username}&apos;s Meal Plan
          </h1>
          <p className="text-gray-600 mt-1">
            {mealPlan.description}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant={isEditable ? "default" : "outline"}
            onClick={() => setIsEditable(!isEditable)}
          >
            <Edit size={18} className="mr-2" />
            {isEditable ? 'Disable Editing' : 'Enable Editing'}
          </Button>
          <Button
            variant={showAllDays ? "default" : "outline"}
            onClick={() => setShowAllDays(!showAllDays)}
          >
            <Calendar size={18} className="mr-2" />
            {showAllDays ? 'Show Single Day' : 'Show All Days'}
          </Button>
        </div>
      </div>

      {/* Meal Plan Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="text-blue-600" size={20} />
            <span>Nutrition Targets</span>
          </CardTitle>
          <CardDescription>
            Daily nutrition goals for this meal plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {mealPlan.targetNutrition.calories}
              </div>
              <div className="text-sm text-gray-600">Calories</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {mealPlan.targetNutrition.protein}g
              </div>
              <div className="text-sm text-gray-600">Protein</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {mealPlan.targetNutrition.carbohydrates}g
              </div>
              <div className="text-sm text-gray-600">Carbohydrates</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {mealPlan.targetNutrition.fat}g
              </div>
              <div className="text-sm text-gray-600">Fat</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Day Navigation or All Days View */}
      {!showAllDays ? (
        <>
          {/* Day Navigation */}
          <div className="flex items-center justify-between bg-white p-4 rounded-lg border">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedDay(Math.max(0, selectedDay - 1))}
              disabled={selectedDay === 0}
            >
              <ChevronLeft size={16} />
              Previous
            </Button>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Day {selectedDay + 1} of {mealPlan.days.length}
              </span>
              <div className="flex space-x-1">
                {mealPlan.days.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDay(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === selectedDay
                        ? 'bg-blue-600'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedDay(Math.min(mealPlan.days.length - 1, selectedDay + 1))}
              disabled={selectedDay === mealPlan.days.length - 1}
            >
              Next
              <ChevronRight size={16} />
            </Button>
          </div>

          {/* Single Day View */}
          <DayCard
            dayPlan={currentDay}
            targetNutrition={mealPlan.targetNutrition}
            showDetails={true}
            onMealEdit={handleEditMeal}
            onMealDelete={handleDeleteMeal}
            editable={isEditable}
          />
        </>
      ) : (
        /* All Days View */
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Complete Week Overview</h2>
          <div className="grid gap-6">
            {mealPlan.days.map((day, index) => (
              <DayCard
                key={day.day}
                dayPlan={day}
                targetNutrition={mealPlan.targetNutrition}
                showDetails={false}
                onMealEdit={handleEditMeal}
                onMealDelete={handleDeleteMeal}
                editable={isEditable}
              />
            ))}
          </div>
        </div>
      )}

      {/* Plan Info */}
      <Card className="bg-gray-50">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <strong>Plan Name:</strong> {mealPlan.name}
            </div>
            <div>
              <strong>Status:</strong> 
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                mealPlan.isActive 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {mealPlan.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div>
              <strong>Created:</strong> {new Date(mealPlan.createdAt).toLocaleDateString()}
            </div>
            <div>
              <strong>Last Updated:</strong> {new Date(mealPlan.updatedAt).toLocaleDateString()}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meal Edit Dialog */}
      {editingMeal && (
        <MealEditDialog
          meal={editingMeal}
          isOpen={isEditDialogOpen}
          onSave={handleSaveMeal}
          onClose={() => {
            setIsEditDialogOpen(false);
            setEditingMeal(null);
          }}
          availableFoods={foodDatabase}
        />
      )}
    </div>
  );
}
