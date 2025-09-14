import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, canAccessUserResource } from '@/lib/auth';
import { getMealPlanByUserId, findUserByUsername, createMealPlan } from '@/lib/database';
import { danielMealPlan } from '@/data/plans/daniel';
import { ApiResponse, WeeklyMealPlan } from '@/types';

// GET /api/meal-plans/[username]
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ username: string }> }
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

    // Check if current user can access this resource
    const canAccess = await canAccessUserResource(targetUser.id);
    if (!canAccess) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Access denied'
      }, { status: 403 });
    }

    // Get meal plan for the user
    let mealPlan = getMealPlanByUserId(targetUser.id);

    // If no meal plan exists and this is Daniel, create his default plan
    if (!mealPlan && targetUser.username === 'daniel') {
      mealPlan = createMealPlan(danielMealPlan);
    }

    if (!mealPlan) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'No meal plan found for this user'
      }, { status: 404 });
    }

    return NextResponse.json<ApiResponse<WeeklyMealPlan>>({
      success: true,
      data: mealPlan,
      message: 'Meal plan retrieved successfully'
    });

  } catch (error) {
    console.error('Get meal plan error:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
