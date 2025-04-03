import { useEffect, useState } from "react";
import { TokensSupported } from "./TokensSupported";
import { Button } from "./ui/button";

interface AmountPickerProps {
  onChange: (amount: string) => void;
  defaultAmount?: string;
  maxAmount?: number;
}

const PRESET_AMOUNTS = [
  { value: "1", label: "$1" },
  { value: "5", label: "$5" },
  { value: "20", label: "$20" },
  { value: "100", label: "$100" },
];

const MAX_AMOUNT = 10000;

export function AmountPicker({ onChange, defaultAmount = "1", maxAmount = MAX_AMOUNT }: AmountPickerProps) {
  const [amount, setAmount] = useState<string>(defaultAmount);
  const [displayValue, setDisplayValue] = useState<string>(defaultAmount);

  // Format the amount with commas for display
  useEffect(() => {
    // Strip commas from the amount to get raw value
    const rawValue = amount.replace(/,/g, "");

    // Handle empty input or invalid numbers
    if (!rawValue || rawValue === "0" || Number.isNaN(Number(rawValue))) {
      setDisplayValue("0");
      return;
    }

    // Format the number with commas
    const formatted = Number(rawValue).toLocaleString("en-US", {
      maximumFractionDigits: 2,
      useGrouping: true,
    });
    setDisplayValue(formatted);
  }, [amount]);

  const handleAmountSelect = (value: string) => {
    setAmount(value);
    onChange(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove all non-numeric characters except decimal point
    let value = e.target.value.replace(/[^0-9.]/g, "");

    // If the input is empty, set to zero
    if (!value) {
      setAmount("0");
      onChange("0");
      return;
    }

    // Parse the value and enforce max amount
    const numValue = Number.parseFloat(value);
    if (numValue > maxAmount) {
      value = maxAmount.toString();
    }

    setAmount(value);
    onChange(value);
  };

  // Calculate font size based on display length
  const displayLength = displayValue.length;
  const fontSize = displayLength > 3 ? `calc(4.5rem - ${Math.min(displayLength - 3, 5) * 0.5}rem)` : "4.5rem";

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center mt-4 mb-5" style={{ minHeight: "90px" }}>
        <div className="flex justify-center w-full items-center h-full">
          <div className="flex items-baseline" style={{ fontSize }}>
            <span className="font-medium relative z-10" style={{ marginRight: "0.12em" }}>
              $
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={displayValue}
              onChange={handleInputChange}
              className="font-bold bg-transparent border-none focus:outline-none focus:ring-0 p-0 cursor-pointer"
              style={{
                caretColor: "var(--primary)",
                width: `${Math.max(displayLength * 0.7, 1)}em`,
                minWidth: "1em",
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 w-full max-w-sm mb-2">
        {PRESET_AMOUNTS.map((preset) => (
          <Button
            key={preset.value}
            onClick={() => handleAmountSelect(preset.value)}
            variant="outline"
            className={`h-12 text-base font-semibold rounded-2xl bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:text-secondary-foreground cursor-pointer ${
              amount === preset.value ? "border-2 border-selected-border" : "border-border"
            }`}
          >
            {preset.label}
          </Button>
        ))}
      </div>

      <TokensSupported />
    </div>
  );
}
