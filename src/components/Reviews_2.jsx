// src/Testimonials.js
import React from 'react';

const testimonials = [
  {
    title: "Great Work",
    text: "Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.",
    name: "Leslie Alexander",
    position: "Facebook",
    image: "https://via.placeholder.com/40" // Replace with actual image URL
  },
  {
    title: "Awesome Design",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam sed do eiusmod",
    name: "Floyd Miles",
    position: "Designer",
    image: "https://via.placeholder.com/40" // Replace with actual image URL
  },
  {
    title: "Good Job",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam sed do eiusmod",
    name: "Dianne Russell",
    position: "Marketing",
    image: "https://via.placeholder.com/40" // Replace with actual image URL
  }
];

const Testimonials = () => {
  return (
    <div className="bg-[#0C0C1D] text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-left mb-12 mt-20">What our customers say</h2>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white text-black rounded-lg p-8 shadow-md w-full lg:w-1/3">
              <h3 className="text-xl font-semibold mb-4">{testimonial.title}</h3>
              <p className="text-gray-700 mb-6">"{testimonial.text}"</p>
              <div className="flex items-center">
                <img src={testimonial.image} alt={testimonial.name} className="w-10 h-10 rounded-full mr-4" />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-gray-600">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
