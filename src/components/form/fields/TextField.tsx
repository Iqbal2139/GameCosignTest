import React, { useEffect } from "react";
import { TextFieldProps } from "@/components/form/types";
import { Input } from "@/components/ui/input";

const TextFieldBase: React.ForwardRefRenderFunction<HTMLInputElement, TextFieldProps> = (
    { field, value, path, updateModelValue, ...props },
    ref
) => {
    useEffect(() => {
        console.log(`TextField ${path} mounted`);
        return () => {
            console.log(`TextField ${path} unmounted`);
        };
    }, []);

    useEffect(() => {
        console.log(`TextField ${path} rerendered`);
    });

    return (
        <Input
            ref={ref}
            name={field.name}
            id={path}
            value={value as string}
            onChange={(e) => updateModelValue(path, field, e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            {...props}
        />
    );
};

const TextField = React.memo(React.forwardRef(TextFieldBase), (prevProps, nextProps) => {
    return prevProps.value === nextProps.value;
});

TextField.displayName = 'TextField';

export { TextField };
