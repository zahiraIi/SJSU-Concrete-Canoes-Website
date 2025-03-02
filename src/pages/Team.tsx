import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaLinkedin } from 'react-icons/fa';

const Team = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Abdalrahman (Abdul) Alkamez",
      role: "Team Captain",
      image: "/images/Professional-Abdul.png",
      socials: {
        linkedin: "https://linkedin.com/in/abdalrahmanalkamez"
      }
    },
    {
      id: 2,
      name: "Teresa Le",
      role: "Mix Lead Officer",
      image: "/images/teresa.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/teresa-nt-le/"
      }
    },
    {
      id: 3,
      name: "Ismael Cruz",
      role: "Officer",
      image: "/images/ismael.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/ismaelcruzgraciano/"
      }
    },
    {
      id: 4,
      name: "Naomi Kaw",
      role: "Officer",
      image: "/images/naomi.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/naomi-kaw-773379265/"
      }
    },
    {
      id: 5,
      name: "Andrew Gomez",
      role: "Officer",
      image: "/images/Andrew-card.png",
      socials: {
        linkedin: "https://www.linkedin.com/in/andrew-gomez-eit-876432241/"
      }
    },
    {
      id: 6,
      name: "German Ramirez",
      role: "Rowing Captain",
      image: "/images/german.png",
      socials: {
        linkedin: "https://www.linkedin.com/in/german-ramirez-a4317a290/"
      }
    },
    {
      id: 7,
      name: "Erica Hooper",
      role: "Officer",
      image: "/images/erica.png",
      socials: {
        linkedin: "https://www.linkedin.com/in/erica-hooper-aa7718247/"
      }
    },
    {
      id: 8,
      name: "Ben Pham",
      role: "Lead Website Designer",
      image: "/images/Ben-Pham-Card.png",
      socials: {
        linkedin: "https://www.linkedin.com/in/ben-dat-pham-civil/"
      }
    },
    {
      id: 9,
      name: "Yaser Osman",
      role: "Website Designer",
      image: "/images/yaser-Osman.png",
      socials: {
        linkedin: "https://www.linkedin.com/in/yaser-osman-9a99b4343/"
      }
    }
  ];

  return (
    <div className="pt-20 pb-16">
      <motion.section 
        className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">Our Team</h1>
          <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
            Meet the passionate individuals behind our success.
          </p>
        </div>
      </motion.section>

      {/* Team Members Section */}
      <motion.section 
        className="py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="relative inline-block">
              Meet Our Team
            </span>
          </h2>
          
          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {teamMembers.map(member => (
              <motion.div 
                key={member.id}
                className="bg-gradient-to-b from-gray-50 to-gray-100 rounded-3xl shadow-md overflow-hidden"
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * member.id }}
              >
                <div className="p-6 flex flex-col items-center">
                  <div className="w-40 h-40 rounded-full overflow-hidden mb-4 bg-gray-200">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/images/Ellipse-5.png";
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-1">{member.name}</h3>
                  <p className="text-gray-600 mb-4 text-center">{member.role}</p>
                  <div className="flex space-x-4">
                    <a 
                      href={member.socials.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-blue-600 transition-colors"
                      aria-label={`LinkedIn profile of ${member.name}`}
                    >
                      <FaLinkedin className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Join Our Team Section */}
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="relative inline-block">
              Join Our Team
            </span>
          </h2>
          
          {/* Membership Card */}
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mb-12">
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
          <div className="bg-white p-8 rounded-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
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

export default Team; 