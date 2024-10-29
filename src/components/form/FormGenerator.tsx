// FormGenerator.tsx
'use client';
import React from 'react';
import { FormGeneratorProps } from "@/components/form/types";
import { FormGeneratorLoader } from "@/components/form/FormGeneratorLoader";
import PasswordField from "@/components/form/fields/PasswordField";
import { TextField } from "@/components/form/fields/TextField";

const FormGenerator = React.forwardRef<HTMLFormElement, FormGeneratorProps>(
    ({ schema, state: formGenState, model, updateModelValue }) => {
        if (formGenState.isLoading) {
            return <FormGeneratorLoader />;
        }

        return (
            <>
                {schema.definitions.map((field) => (
                    <div key={field.name} className="mb-4">
                        <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                            {field.label.text}
                        </label>
                        {field.type === "text" && (
                            <TextField
                                field={field}
                                path={field.name}
                                value={model?.[field.name] as string}
                                updateModelValue={updateModelValue}
                            />
                        )}
                        {field.type === "password" && (
                            <PasswordField
                                name={field.name}
                                label={field.label.text}
                                value={model?.[field.name] as string}
                                onChange={(value) => updateModelValue(field.name, field, value)}
                            />
                        )}
                    </div>
                ))}
            </>
        );
    }
);

FormGenerator.displayName = 'FormGenerator';

export { FormGenerator };
