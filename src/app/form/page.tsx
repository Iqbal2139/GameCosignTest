'use client';
import { logout } from "@/actions/logout";
import { FormModel, FormSchema } from "@/components/form/types";
import { useFormGen } from "@/components/form/useFormGen";
import { FormGenerator } from "@/components/form/FormGenerator";
import { Button } from "@/components/ui/button";

export default function FormPage() {
    const schema: FormSchema = {
        name: "simple-form",
        definitions: [
            {
                name: "first_name",
                type: "text",
                label: { text: "First Name" },
                rules: [{ name: "required" }]
            },
            {
                name: "last_name",
                type: "text",
                label: { text: "Last Name" },
                rules: [{ name: "required" }]
            },
        ],
    };

    const { state, model, updateModelValue, handleSubmit } = useFormGen({
        schema: schema,
        model: { first_name: "", last_name: "" }
    });

    const logSubmit = async (data: FormModel) => {
        console.log(data); // Logs the form data upon submission
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Form Page</h1>
                <form onSubmit={handleSubmit(logSubmit)} className="space-y-6">
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
                        Submit
                    </Button>
                </form>
                <hr className="my-8 border-gray-300" />
                <form onSubmit={(e) => { e.preventDefault(); logout(); }} className="flex justify-center">
                    <button 
                        type="submit" 
                        className="w-full max-w-xs bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-150 ease-in-out"
                    >
                        Logout
                    </button>
                </form>
            </div>
        </div>
    );
}
