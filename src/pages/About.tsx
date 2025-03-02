import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="pt-20 pb-16 bg-sjsuBlue-light/5">
      <motion.section 
        className="py-16 bg-gradient-to-r from-sjsuBlue-light/30 to-sjsuBlue/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-sjsuBlue-dark">
            <span className="relative inline-block">
              About Us
            </span>
          </h1>
          <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
            The SJSU Concrete Canoe Team is a student-led engineering project that designs, builds, 
            and races a canoe made primarily of concrete. Our team competes annually at the ASCE 
            Mid-Pacific Student Conference against other universities.
          </p>
        </div>
      </motion.section>

      {/* Team Section with Membership Info */}
      <motion.section 
        id="team"
        className="py-16 bg-gradient-to-b from-white to-sjsuBlue/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-sjsuBlue">
            <span className="relative inline-block">
              Our Team
            </span>
          </h2>
          
          {/* Membership Card */}
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mb-12 border-t-4 border-sjsuBlue">
            <div className="p-8">
              <div className="flex justify-between items-start">
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6">Concrete Canoe Membership!</h3>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                  </svg>
                </button>
              </div>
              
              <ol className="list-decimal pl-5 space-y-6 text-gray-800">
                <li className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <p className="font-medium">Become a member of the SJSU American Society of Civil Engineers (ASCE) Student Chapter.</p>
                  </div>
                  <a 
                    href="https://www.asce.org/membership/join" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-2 md:mt-0 inline-block text-primary hover:underline font-medium"
                  >
                    ASCE Membership
                  </a>
                </li>
                
                <li className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <p className="font-medium">Attend ASCE general meetings posted on our Instagram.</p>
                  </div>
                  <a 
                    href="https://www.instagram.com/sjsuconcretecanoe" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-2 md:mt-0 inline-block text-primary hover:underline font-medium"
                  >
                    Instagram
                  </a>
                </li>
                
                <li>
                  <p className="font-medium mb-3">Express your interest in joining the Concrete Canoe team to the ASCE officers or the team captain through our Contact Page!</p>
                  <ul className="list-disc pl-8 space-y-1 text-gray-700">
                    <li>First Name, Last Name, Middle Initial</li>
                    <li>Email Address</li>
                    <li>Expected Graduation Date (MM/YY)</li>
                    <li>Undergraduate or Graduate Student</li>
                    <li>National ASCE Member #</li>
                    <li>SJSU ID #</li>
                  </ul>
                </li>
                
                <li>
                  <p className="font-medium">Our Team will get back to you asap once we have received your message. Let us know if you have any questions or concerns relating to this membership.</p>
                </li>
                
                <li>
                  <p className="font-medium">Our official club room, Engr 136, is now open for anyone interested in joining the SJSU Concrete Canoe team. Feel free to swing by anytime to chat with us and discover how you can be part of this amazing engineering adventure!</p>
                </li>
              </ol>
              
              <div className="mt-8 flex justify-center">
                <Link 
                  to="/contact" 
                  className="btn btn-primary"
                >
                  Contact Us to Join
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Modal for Membership Info */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white p-8 rounded-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto border-t-4 border-sjsuBlue" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-primary">Concrete Canoe Membership!</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <ol className="list-decimal pl-5 space-y-6 text-gray-800">
              <li className="flex flex-col">
                <div className="mb-2">
                  <p className="font-medium">Become a member of the SJSU American Society of Civil Engineers (ASCE) Student Chapter.</p>
                </div>
                <a 
                  href="https://www.asce.org/membership/join" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block text-primary hover:underline font-medium"
                >
                  ASCE Membership
                </a>
              </li>
              
              <li className="flex flex-col">
                <div className="mb-2">
                  <p className="font-medium">Attend ASCE general meetings posted on our Instagram.</p>
                </div>
                <a 
                  href="https://www.instagram.com/sjsuconcretecanoe" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block text-primary hover:underline font-medium"
                >
                  Instagram
                </a>
              </li>
              
              <li>
                <p className="font-medium mb-3">Express your interest in joining the Concrete Canoe team to the ASCE officers or the team captain through our Contact Page!</p>
                <ul className="list-disc pl-8 space-y-1 text-gray-700">
                  <li>First Name, Last Name, Middle Initial</li>
                  <li>Email Address</li>
                  <li>Expected Graduation Date (MM/YY)</li>
                  <li>Undergraduate or Graduate Student</li>
                  <li>National ASCE Member #</li>
                  <li>SJSU ID #</li>
                </ul>
              </li>
              
              <li>
                <p className="font-medium">Our Team will get back to you asap once we have received your message. Let us know if you have any questions or concerns relating to this membership.</p>
              </li>
              
              <li>
                <p className="font-medium">Our official club room, Engr 136, is now open for anyone interested in joining the SJSU Concrete Canoe team. Feel free to swing by anytime to chat with us and discover how you can be part of this amazing engineering adventure!</p>
              </li>
            </ol>
            
            <div className="mt-8 flex justify-end">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 mr-4"
              >
                Close
              </button>
              <Link 
                to="/contact" 
                className="btn btn-primary"
                onClick={() => setIsModalOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About; 