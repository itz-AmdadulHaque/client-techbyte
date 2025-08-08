"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface CounterProps {
  initialValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export default function ItemCounter({
  initialValue = 1,
  min = 1,
  max = 99,
  onChange,
}: CounterProps) {
  const [count, setCount] = useState(initialValue);

  const updateCount = (value: number) => {
    if (value < min || value > max) return;
    setCount(value);
    onChange?.(value);
  };

  return (
    <div className="flex items-center border-2 border-gray-300 w-32 rounded-lg">
      <Button
        variant="outline"
        onClick={() => updateCount(count - 1)}
        disabled={count <= min}
      >
        -
      </Button>
      <span className="w-12 h-full text-center">{count}</span>
      <Button
        variant="outline"
        onClick={() => updateCount(count + 1)}
        disabled={count >= max}
      >
        +
      </Button>
    </div>
  );
}
