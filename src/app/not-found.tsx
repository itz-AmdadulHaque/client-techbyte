// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            <p className="mt-2 text-gray-500">Sorry, the page you are looking for does not exist.</p>
            <Link href="/" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
                Go Home
            </Link>
        </div>
    );
}
