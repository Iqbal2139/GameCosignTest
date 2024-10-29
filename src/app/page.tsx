import { cookies } from "next/headers";
import { logout } from "@/actions/logout";
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function Page() {
    const cookie = cookies().get('auth');
    if (!cookie) {
        redirect('auth/login');
    }

    return (
        <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
            <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
                    Home
                </h1>

                <ul className="space-y-4 text-center">
                    <li>
                        <Link 
                            href="/form" 
                            className="text-lg text-blue-500 hover:text-blue-700 hover:underline"
                        >
                            Form Link
                        </Link>
                    </li>
                </ul>
                
                <hr className="my-8 border-gray-300" />
                
                <form action={logout} className="flex justify-center">
                    <button 
                        type="submit" 
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-150 ease-in-out"
                    >
                        Logout
                    </button>
                </form>
            </div>
        </div>
    );
}
