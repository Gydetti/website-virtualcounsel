'use client';

import { cn } from '@/lib/utils';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import { createContext, forwardRef, useContext, useId } from 'react';
import type { ComponentPropsWithoutRef, ElementRef, FormHTMLAttributes } from 'react';

const FormContext = createContext<{
  id: string;
} | null>(null);
FormContext.displayName = 'FormContext';

const Form = forwardRef<ElementRef<'form'>, ComponentPropsWithoutRef<'form'>>(
  ({ className, ...props }, ref) => {
    const id = useId();
    return (
      <FormContext.Provider value={{ id }}>
        <form ref={ref} className={cn('space-y-6', className)} {...props} />
      </FormContext.Provider>
    );
  }
);
Form.displayName = 'Form';

const FormField = forwardRef<
  ElementRef<typeof Slot>,
  ComponentPropsWithoutRef<typeof Slot> & { name: string }
>(({ name, ...props }, ref) => {
  const context = useContext(FormContext);
  if (!context) throw new Error('FormField must be used within a Form');
  return <Slot ref={ref} id={`${context.id}-${name}`} {...props} />;
});
FormField.displayName = 'FormField';

const FormLabel = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & { name: string }
>(({ name, ...props }, ref) => {
  const context = useContext(FormContext);
  if (!context) throw new Error('FormLabel must be used within a Form');
  return <LabelPrimitive.Root ref={ref} htmlFor={`${context.id}-${name}`} {...props} />;
});
FormLabel.displayName = 'FormLabel';

export { Form, FormField, FormLabel };
