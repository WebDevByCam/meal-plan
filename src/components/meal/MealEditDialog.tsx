'use client';

import { useState, useEffect } from 'react';
import { Meal, Food, MealFood, MealType, MacroNutrients } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Save, X } from 'lucide-react';

interface MealEditDialogProps {
  meal: Meal;
  isOpen: boolean;
  onSave: (updatedMeal: Meal) => void;
  onClose: () => void;
  availableFoods: Food[];
}

export default function MealEditDialog({ 
  meal, 
  isOpen, 
  onSave, 
  onClose, 
  availableFoods 
}: MealEditDialogProps) {
  const [editedMeal, setEditedMeal] = useState<Meal>({ ...meal });
  const [selectedFoodId, setSelectedFoodId] = useState<string>('');
  const [foodQuantity, setFoodQuantity] = useState<number>(1);

  // Reset form when meal changes
  useEffect(() => {
    setEditedMeal({ ...meal });
  }, [meal]);

  // Calculate total nutrition for the meal
  const calculateTotalNutrition = (foods: MealFood[]): MacroNutrients => {
    return foods.reduce(
      (total, mealFood) => ({
        calories: total.calories + (mealFood.food.nutrition.calories * mealFood.quantity),
        protein: total.protein + (mealFood.food.nutrition.protein * mealFood.quantity),
        carbohydrates: total.carbohydrates + (mealFood.food.nutrition.carbohydrates * mealFood.quantity),
        fat: total.fat + (mealFood.food.nutrition.fat * mealFood.quantity),
        fiber: (total.fiber || 0) + ((mealFood.food.nutrition.fiber || 0) * mealFood.quantity)
      }),
      { calories: 0, protein: 0, carbohydrates: 0, fat: 0, fiber: 0 }
    );
  };

  // Update meal when foods change
  useEffect(() => {
    setEditedMeal(prev => ({
      ...prev,
      totalNutrition: calculateTotalNutrition(prev.foods)
    }));
  }, [editedMeal.foods]);

  const handleAddFood = () => {
    if (!selectedFoodId || foodQuantity <= 0) return;

    const selectedFood = availableFoods.find(f => f.id === selectedFoodId);
    if (!selectedFood) return;

    const newMealFood: MealFood = {
      food: selectedFood,
      quantity: foodQuantity
    };

    setEditedMeal(prev => ({
      ...prev,
      foods: [...prev.foods, newMealFood]
    }));

    // Reset selection
    setSelectedFoodId('');
    setFoodQuantity(1);
  };

  const handleRemoveFood = (index: number) => {
    setEditedMeal(prev => ({
      ...prev,
      foods: prev.foods.filter((_, i) => i !== index)
    }));
  };

  const handleUpdateFoodQuantity = (index: number, newQuantity: number) => {
    if (newQuantity <= 0) return;

    setEditedMeal(prev => ({
      ...prev,
      foods: prev.foods.map((mealFood, i) => 
        i === index ? { ...mealFood, quantity: newQuantity } : mealFood
      )
    }));
  };

  const handleSave = () => {
    if (!editedMeal.name.trim()) return;

    const updatedMeal: Meal = {
      ...editedMeal,
      totalNutrition: calculateTotalNutrition(editedMeal.foods)
    };

    onSave(updatedMeal);
    onClose();
  };

  const mealTypeOptions: { value: MealType; label: string }[] = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'morning-snack', label: 'Morning Snack' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'afternoon-snack', label: 'Afternoon Snack' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'evening-snack', label: 'Evening Snack' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Meal</DialogTitle>
          <DialogDescription>
            Modify meal details, add or remove ingredients, and adjust quantities.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="meal-name">Meal Name</Label>
              <Input
                id="meal-name"
                value={editedMeal.name}
                onChange={(e) => setEditedMeal(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter meal name"
              />
            </div>

            <div>
              <Label htmlFor="meal-type">Meal Type</Label>
              <Select
                value={editedMeal.type}
                onValueChange={(value: MealType) => setEditedMeal(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select meal type" />
                </SelectTrigger>
                <SelectContent>
                  {mealTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="prep-time">Preparation Time (minutes)</Label>
              <Input
                id="prep-time"
                type="number"
                value={editedMeal.preparationTime || 0}
                onChange={(e) => setEditedMeal(prev => ({ 
                  ...prev, 
                  preparationTime: parseInt(e.target.value) || 0 
                }))}
                min={0}
              />
            </div>

            <div>
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea
                id="instructions"
                value={editedMeal.instructions || ''}
                onChange={(e) => setEditedMeal(prev => ({ ...prev, instructions: e.target.value }))}
                placeholder="Enter cooking instructions..."
                rows={4}
              />
            </div>
          </div>

          {/* Nutrition Summary */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Nutrition Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round(editedMeal.totalNutrition.calories)}
                    </div>
                    <div className="text-sm text-gray-500">Calories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">
                      {Math.round(editedMeal.totalNutrition.protein)}g
                    </div>
                    <div className="text-sm text-gray-500">Protein</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-orange-600">
                      {Math.round(editedMeal.totalNutrition.carbohydrates)}g
                    </div>
                    <div className="text-sm text-gray-500">Carbs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-purple-600">
                      {Math.round(editedMeal.totalNutrition.fat)}g
                    </div>
                    <div className="text-sm text-gray-500">Fat</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add Food Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Add Ingredient</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Select value={selectedFoodId} onValueChange={setSelectedFoodId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ingredient" />
                  </SelectTrigger>
                  <SelectContent className="max-h-48">
                    {availableFoods.map((food) => (
                      <SelectItem key={food.id} value={food.id}>
                        <div className="flex flex-col">
                          <span>{food.name}</span>
                          <span className="text-sm text-gray-500">
                            {food.nutrition.calories} cal per {food.servingSize}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={foodQuantity}
                    onChange={(e) => setFoodQuantity(parseFloat(e.target.value) || 1)}
                    min={0.1}
                    step={0.1}
                    placeholder="Quantity"
                    className="w-24"
                  />
                  <Button onClick={handleAddFood} disabled={!selectedFoodId} className="flex-1">
                    <Plus size={16} className="mr-2" />
                    Add Ingredient
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Current Ingredients */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Current Ingredients</h3>
          <div className="space-y-2">
            {editedMeal.foods.map((mealFood, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{mealFood.food.name}</div>
                  <div className="text-sm text-gray-500">
                    {Math.round(mealFood.food.nutrition.calories * mealFood.quantity)} cal
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={mealFood.quantity}
                    onChange={(e) => handleUpdateFoodQuantity(index, parseFloat(e.target.value) || 1)}
                    min={0.1}
                    step={0.1}
                    className="w-20"
                  />
                  <span className="text-sm text-gray-500">×</span>
                  <Badge variant="secondary">
                    {mealFood.food.servingSize}
                  </Badge>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveFood(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
            
            {editedMeal.foods.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No ingredients added yet. Add some ingredients to create your meal.
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            <X size={16} className="mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!editedMeal.name.trim() || editedMeal.foods.length === 0}>
            <Save size={16} className="mr-2" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
