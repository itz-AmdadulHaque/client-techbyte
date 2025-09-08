"use client";
import { Button } from "@/components/ui/button";

interface CounterProps {
  value?: number; // ✅ controlled value
  initialValue?: number; // ✅ fallback for uncontrolled
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export default function ItemCounter({
  value,
  initialValue = 1,
  min = 1,
  max,
  onChange,
}: CounterProps) {
  const count = value ?? initialValue; // ✅ use parent value if provided

  const updateCount = (newValue: number) => {
    if (newValue < min) return;
    if (max && newValue > max) return;
    onChange?.(newValue);
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
        disabled={max ? count >= max : false}
      >
        +
      </Button>
    </div>
  );
}
