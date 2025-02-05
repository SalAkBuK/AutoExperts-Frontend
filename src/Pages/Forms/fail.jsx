import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FailureForm = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to the plans page after 5 seconds
        const timer = setTimeout(() => {
            navigate("/");
        }, 5000);

        return () => clearTimeout(timer); // Cleanup on unmount
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-bold text-red-600">Payment Failed ❌</h1>
                <p className="mt-4 text-gray-700">Oops! Something went wrong with your payment.</p>
                <p className="mt-2 text-gray-600">You will be redirected to the plans page shortly...</p>
                <div className="mt-6">
                    <button 
                        onClick={() => navigate("/forms/plans")}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        Try Again
                    </button>
                    <button 
                        onClick={() => navigate("/dashboard")}
                        className="ml-4 px-6 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FailureForm;
