import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, canAccessUserResource } from '@/lib/auth';
import { getMealPlanByUserId, updateMealPlan, findUserByUsername } from '@/lib/database';
import { ApiResponse, Meal } from '@/types';

// PUT /api/meal-plans/[username]/meals/[mealId]
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ username: string; mealId: string }> }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Authentication required'
      }, { status: 401 });
    }

  const params = await context.params;
  const targetUser = findUserByUsername(params.username);
    if (!targetUser) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'User not found'
      }, { status: 404 });
    }

    const canAccess = await canAccessUserResource(targetUser.id);
    if (!canAccess) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Access denied'
      }, { status: 403 });
    }

    const mealPlan = getMealPlanByUserId(targetUser.id);
    if (!mealPlan) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Meal plan not found'
      }, { status: 404 });
    }

    const updatedMeal: Meal = await request.json();

    // Find and update the meal in the meal plan
    let mealFound = false;
    const updatedDays = mealPlan.days.map(day => ({
      ...day,
      meals: day.meals.map(meal => {
  if (meal.id === params.mealId) {
          mealFound = true;
          return updatedMeal;
        }
        return meal;
      })
    }));

    if (!mealFound) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Meal not found'
      }, { status: 404 });
    }

    // Recalculate total nutrition for each day
    updatedDays.forEach(day => {
      day.totalNutrition = day.meals.reduce(
        (total, meal) => ({
          calories: total.calories + meal.totalNutrition.calories,
          protein: total.protein + meal.totalNutrition.protein,
          carbohydrates: total.carbohydrates + meal.totalNutrition.carbohydrates,
          fat: total.fat + meal.totalNutrition.fat,
          fiber: (total.fiber || 0) + (meal.totalNutrition.fiber || 0)
        }),
        { calories: 0, protein: 0, carbohydrates: 0, fat: 0, fiber: 0 }
      );
    });

    // Update the meal plan
    const updatedMealPlan = updateMealPlan(mealPlan.id, {
      days: updatedDays
    });

    if (!updatedMealPlan) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Failed to update meal plan'
      }, { status: 500 });
    }

    return NextResponse.json<ApiResponse<Meal>>({
      success: true,
      data: updatedMeal,
      message: 'Meal updated successfully'
    });

  } catch (error) {
    console.error('Update meal error:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

// DELETE /api/meal-plans/[username]/meals/[mealId]
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ username: string; mealId: string }> }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Authentication required'
      }, { status: 401 });
    }

  const params = await context.params;
  const targetUser = findUserByUsername(params.username);
    if (!targetUser) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'User not found'
      }, { status: 404 });
    }

    const canAccess = await canAccessUserResource(targetUser.id);
    if (!canAccess) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Access denied'
      }, { status: 403 });
    }

    const mealPlan = getMealPlanByUserId(targetUser.id);
    if (!mealPlan) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Meal plan not found'
      }, { status: 404 });
    }

    // Find and remove the meal from the meal plan
    let mealFound = false;
    const updatedDays = mealPlan.days.map(day => ({
      ...day,
      meals: day.meals.filter(meal => {
        if (meal.id === params.mealId) {
          mealFound = true;
          return false;
        }
        return true;
      })
    }));

    if (!mealFound) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Meal not found'
      }, { status: 404 });
    }

    // Recalculate total nutrition for each day
    updatedDays.forEach(day => {
      day.totalNutrition = day.meals.reduce(
        (total, meal) => ({
          calories: total.calories + meal.totalNutrition.calories,
          protein: total.protein + meal.totalNutrition.protein,
          carbohydrates: total.carbohydrates + meal.totalNutrition.carbohydrates,
          fat: total.fat + meal.totalNutrition.fat,
          fiber: (total.fiber || 0) + (meal.totalNutrition.fiber || 0)
        }),
        { calories: 0, protein: 0, carbohydrates: 0, fat: 0, fiber: 0 }
      );
    });

    // Update the meal plan
    const updatedMealPlan = updateMealPlan(mealPlan.id, {
      days: updatedDays
    });

    if (!updatedMealPlan) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Failed to update meal plan'
      }, { status: 500 });
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'Meal deleted successfully'
    });

  } catch (error) {
    console.error('Delete meal error:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
