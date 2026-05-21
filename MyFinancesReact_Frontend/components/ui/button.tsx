import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-300 hover:-translate-y-0.5 active:translate-y-0',
  secondary:
    'border border-indigo-600 text-indigo-600 bg-transparent hover:bg-indigo-50 focus:ring-indigo-300',
  ghost:
    'text-slate-600 bg-transparent hover:bg-slate-100 focus:ring-slate-300',
  destructive:
    'bg-red-500 text-white hover:bg-red-600 focus:ring-red-300 hover:-translate-y-0.5 active:translate-y-0',
}

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3.5 py-1.5 text-[13px] rounded-md',
  md: 'px-5 py-2.5 text-sm rounded-lg',
  lg: 'px-7 py-3.5 text-[15px] rounded-lg',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  )
)
Button.displayName = 'Button'
