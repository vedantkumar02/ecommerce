import type { CheckboxProps } from "@/components/ui/types";

export default function Checkbox({
  label,
  id,
  checked,
  onChange,
  className = "",
  ...props
}: CheckboxProps) {
  const checkboxId =
    id ?? `checkbox-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <label
      htmlFor={checkboxId}
      className={`flex cursor-pointer items-center gap-2 text-sm text-gray-700 ${className}`}>
      <input
        id={checkboxId}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        {...props}
      />
      <span>{label}</span>
    </label>
  );
}
