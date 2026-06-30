'use client';

import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

export function FormField({
  label,
  name,
  type = 'text',
  value,
  placeholder,
  error,
  onChange,
  onBlur,
}: FormFieldProps) {
  const hasError = Boolean(error);

  return (
    <div data-field={name}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={hasError}
        className={`w-full px-4 py-2 border rounded focus:outline-none transition ${
          hasError
            ? 'border-red-500 bg-red-50 focus:border-red-500'
            : 'border-gray-300 focus:border-blue-500'
        }`}
      />
      {hasError && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
