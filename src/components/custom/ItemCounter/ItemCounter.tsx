"use client";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { DependencyList } from 'react'; // Retain for now, just in case

// --- Utility Type and Hook (REMOVED) ---
// We remove useDebouncedEffect since the parent will handle debounce.

// --- Component Props and Definition ---

interface CounterProps {
  value: number; // ✨ REQUIRED: Always pass the controlled value from the parent
  min?: number;
  max?: number;
  onChange: (value: number) => void; // ✨ REQUIRED: Function to call on change
  loading?: boolean;
}

export default function ItemCounter({
  value, // Now required
  min = 1,
  max,
  onChange, // Now required
  loading = false,
}: CounterProps) {
  // We don't need local state for debouncing anymore.
  // The value prop passed from the parent is the source of truth.
  const count = value; 

  const updateCount = (newValue: number) => {
    // ⚠️ CRITICAL: Check if the parent is currently loading
    if (loading) return; 

    if (newValue < min) return;
    if (max && newValue > max) return;
    
    // Immediately call onChange. The parent will debounce the API call.
    onChange(newValue);
  };

  // Combine existing disabled conditions with the new loading state
  const isDecrementDisabled = count <= min || loading;
  const isIncrementDisabled = (max ? count >= max : false) || loading;
  const isAnyControlDisabled = loading; 

  return (
    <div 
      className={`flex items-center border-2 border-gray-300 w-32 rounded-lg ${
        isAnyControlDisabled ? 'opacity-50 cursor-not-allowed' : '' 
      }`}
    >
      <Button
        variant="outline"
        onClick={() => updateCount(count - 1)}
        disabled={isDecrementDisabled}
      >
        -
      </Button>
      <span className="w-12 h-full text-center flex items-center justify-center font-semibold">
        {count}
      </span>
      <Button
        variant="outline"
        onClick={() => updateCount(count + 1)}
        disabled={isIncrementDisabled}
      >
        +
      </Button>
    </div>
  );
}