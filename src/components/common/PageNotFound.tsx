import type { JSX } from "react";

const PageNotFound: React.FC = (): JSX.Element => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-gray-600 mb-8">Page not found</p>
                <a
                    href="/"
                    className="inline-flex items-center px-4 py-2 bg-coral-500 text-white rounded-lg hover:bg-coral-600 transition-colors"
                >
                    Go Home
                </a>
            </div>
        </div>
    );
};

export default PageNotFound;
