import {
  useForm as useRHForm,
  FieldValues,
  UseFormProps,
  UseFormSetValue,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnyZodObject } from 'zod';

interface FormOptions<
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object
> extends UseFormProps<TFieldValues, TContext> {
  schema: AnyZodObject | undefined;
}

export function useForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object
>(options: FormOptions<TFieldValues, TContext>) {
  const { setValue, ...otherProps } = useRHForm<TFieldValues, TContext>({
    mode: 'all',
    ...options,
    resolver: options.schema ? zodResolver(options.schema) : undefined,
  });

  const setValueCustom: UseFormSetValue<TFieldValues> = (
    name,
    value,
    setValueOpts
  ) => {
    return setValue(name, value, {
      shouldDirty: true,
      shouldValidate: true,
      ...setValueOpts,
    });
  };

  return {
    setValue: setValueCustom,
    ...otherProps,
  };
}
