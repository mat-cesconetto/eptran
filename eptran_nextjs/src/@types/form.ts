import React from 'react';

export interface FormFieldProps {
  label: string;
  type: string;
  id: string;
  name: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  maxLength?: number;
  children?: React.ReactNode;
}

