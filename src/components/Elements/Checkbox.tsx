import { type HTMLAttributes } from "react";

interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
  label: string;
  checked?: boolean;
  disabled?: boolean;
  categoryCount?: number;
}

export const Checkbox = ({ label, categoryCount, ...props }: CheckboxProps) => {
  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center">
        <input
          type="checkbox"
          id={label}
          className="w-4 h-4 border-gray-300 rounded text-primary-600 disabled:opacity-10"
          {...props}
        />
        <label
          htmlFor={label}
          className="ml-2 text-sm font-medium text-slate-500 disabled:opacity-25"
        >
          {label}
        </label>
      </div>
      <div className="text-sm text-slate-300">
        {categoryCount && <span>{categoryCount}</span>}
      </div>
    </div>
  );
};
