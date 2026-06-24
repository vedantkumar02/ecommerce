import type { ButtonHTMLAttributes, InputHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "outline";
export type ButtonSize = "sm" | "md";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
};
