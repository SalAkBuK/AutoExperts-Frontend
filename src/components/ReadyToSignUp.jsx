import React from 'react';

const ReadyToSignUp = ({ scrollToServices }) => {
  return (
    <section className="bg-[#0A0D1C] text-white py-10 px-5 md:px-20">
      <h2 className="text-6xl font-bold mb-8 text-center md:text-left">
        <span className="text-orange-500 mr-2">/</span>READY TO SIGN UP?
      </h2>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-orange-500 mb-2">Higher Profits</h3>
          <p>
            AutoExperts enable the buyers to profit more per vehicle sourced on our auction platform due to our thorough inspection and data.
          </p>
        </div>
      </div>
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col mt-10">
          <h3 className="text-xl font-bold text-orange-500 mb-3">Less Time</h3>
          <p>
          By using AutoExperts's wholesale solutions, customers reporting saving 20 hours per month on
          average. That's less time out of the office and more time focusing on your customers.</p>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col mt-10">
          <h3 className="text-xl font-bold text-orange-500 mb-3">More Cars</h3>
          <p>
          AutoExpert consumer solutions helps dealer partners buy an average of 15 more vehicles per month from consumers.
</p>
        </div>
      </div>


      <div className="mt-10 flex justify-center">
      <button
          className="bg-orange-500 text-white px-6 py-3 rounded-1xl w-full text-3xl font-bold"
          onClick={scrollToServices} // Trigger the scroll function
        >
          Our Services
        </button>
      </div>
    </section>
  );
};

export default ReadyToSignUp;
