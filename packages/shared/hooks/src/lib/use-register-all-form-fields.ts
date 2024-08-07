import { useEffect } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

export function useRegisterAllFormFields<TFieldValues extends FieldValues>(
  register: UseFormRegister<TFieldValues>,
  fields: Record<string, string>
) {
  useEffect(() => {
    Object.values(fields).forEach((key) => {
      register(key as Path<TFieldValues>);
    });
  }, [fields, register]);
}
