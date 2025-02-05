import { use } from "framer-motion/m";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import axios from "axios";


const SuccessForm = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const session_id = searchParams.get('session_id');
    const token = localStorage.getItem('token');
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const memberId = decodedToken.id;

      const data = {session_id,memberId};
      
      console.log(memberId);
      
    console.log(session_id);

    useEffect(() => {
        const updateUser = async () =>{
            try {
                const response = await axios.post('http://167.99.228.40:5000/api/subscription/updateMemberStatus', data, {
                    headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` }
                  });
                  console.log(response);
                  localStorage.setItem('token',response.token);

              } catch (error) {
                console.error('Error fetching cars:', error);
              }
        }
        if(data.memberId && data.session_id){
            updateUser();
        }
      }, [data.memberId,data.session_id]);


    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-bold text-green-600">Payment Successful! ✅</h1>
                <p className="mt-4 text-gray-700">Thank you for your payment. Your subscription is now active.</p>
                <p className="mt-2 text-gray-600">You will be redirected to your dashboard shortly...</p>
                <button 
                    onClick={() => navigate("/member-login")}
                    className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                >
                    Go to Dashboard Now
                </button>
            </div>
        </div>
    );
};

export default SuccessForm;
