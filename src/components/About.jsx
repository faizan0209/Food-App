import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-semibold text-center text-orange-600 mb-6">About Us</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-lg text-gray-700 mb-4">
            Welcome to our restaurant! We are passionate about providing you with the finest dining experience.
            Our mission is to deliver exceptional quality food and service in a welcoming atmosphere. Whether you are here for a casual meal with friends or a special celebration, we promise to make every dining experience memorable.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 mt-6">Our Story</h2>
          <p className="text-lg text-gray-700 mt-4">
            Founded in 2020, we set out to revolutionize the way people enjoy food by combining traditional cooking methods with modern twists. Our chefs are experts in crafting dishes that are as visually stunning as they are delicious.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
