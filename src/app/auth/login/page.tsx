'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormGenerator } from "@/components/form/FormGenerator";
import { useFormGen } from "@/components/form/useFormGen";
import { FormSchema, FormModel } from "@/components/form/types";
import { Button } from "@/components/ui/button";
import React from 'react';

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Define the schema for the login form
    const schema: FormSchema = {
        name: "login-form",
        definitions: [
            {
                name: "email",
                type: "text",
                label: { text: "Username" },
                rules: [{ name: "required" }],
            },
            {
                name: "password",
                type: "password",
                label: { text: "Password" },
                rules: [{ name: "required" }],
            },
        ],
    };

    // Initialize form state and handlers with useFormGen
    const { state, model, updateModelValue, handleSubmit } = useFormGen({
        schema: schema,
        model: { email: "", password: "" },
    });

    // Define the login submit handler
    const handleLogin = async (data: FormModel) => {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.status === 200) {
            let returnUrl = searchParams.get('return');
            returnUrl = returnUrl ? decodeURIComponent(returnUrl) : '/';
            router.push(returnUrl);
        } else {
            console.error('Login failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl mb-6">Login</h1>
                <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
                    <FormGenerator
                        schema={schema}
                        state={state}
                        model={model}
                        updateModelValue={updateModelValue}
                    />
                    <Button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-150 ease-in-out"
                    >
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
}
