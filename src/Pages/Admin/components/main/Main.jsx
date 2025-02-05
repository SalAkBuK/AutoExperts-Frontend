import { FaFileAlt } from 'react-icons/fa';
import { IoCalendarOutline, IoNotificationsOutline } from "react-icons/io5";
import { MdMarkEmailUnread } from "react-icons/md";

const Main = () => {
  return (
    <div className="flex bg-indigo-600 bg-indigo-600 dark:bg-slate-900  px-4 py-3 items-center justify-between shadow-md fixed top-0 left-[15%] w-[85%] z-10">
      {/* Left Section */}
      <div className="text-indigo-100 font-bold text-xl md:text-2xl">
        Admin Portal
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <button className="flex items-center px-4 py-2 rounded-full bg-blue-900 text-white font-bold shadow-sm hover:bg-blue-400 transition-colors">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Main;
