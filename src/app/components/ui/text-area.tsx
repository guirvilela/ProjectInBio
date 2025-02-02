import { TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/utilts";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function TextArea({ ...rest }: TextAreaProps) {
  return (
    <textarea
      {...rest}
      className={cn(
        `w-full p-3 bg-background-secondary text-white placeholder:text-content-placeholder rounded-xl 
        border border-transparent hover:border-border-secondary hover:text-content-body active:border-border-tertiary `,
        rest.className
      )}
    ></textarea>
  );
}
