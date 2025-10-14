'use client'; // error.tsx must be a client component

export default function Error({ error }: { error: Error }) {
    const handleReload = () => {
        // Force a full page reload
        window.location.reload();
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-4xl font-bold text-red-600">Something went wrong!</h1>
            <p className="mt-2 text-gray-600">{error.message}</p>

            <button
                onClick={handleReload}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
                Try again
            </button>
        </div>
    );
}
