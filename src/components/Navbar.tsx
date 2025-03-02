import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Disclosure, Transition } from '@headlessui/react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  
  // Change navbar style on scroll and close dropdown
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      // Close dropdown on scroll
      setDropdownOpen(false);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Animation variants
  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };
  
  const linkVariants = {
    hover: { 
      scale: 1.05,
      transition: { 
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };
  
  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: { 
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: { 
      scale: 0.95,
      transition: { 
        duration: 0.1,
        ease: "easeInOut"
      }
    }
  };
  
  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/images/Rectangle-178.png" 
            alt="SJSU Concrete Canoe" 
            className="h-12 w-auto"
          />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <motion.div 
            className="nav-link"
            whileHover="hover"
            variants={linkVariants}
          >
            <Link 
              to="/" 
              className={`${location.pathname === '/' ? 'text-primary after:w-full' : 'text-gray-800'}`}
            >
              Home
            </Link>
          </motion.div>
          
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onMouseEnter={() => setDropdownOpen(true)}
              className={`nav-link flex items-center ${
                location.pathname.includes('/about') ? 'text-primary' : 'text-gray-800'
              }`}
            >
              <span>About</span>
              <svg 
                className={`ml-1 h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {dropdownOpen && (
              <div 
                className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <Link 
                  to="/about" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Who we are
                </Link>
                <Link 
                  to="/about/team" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Our Team
                </Link>
              </div>
            )}
          </div>
          
          <motion.div 
            className="nav-link"
            whileHover="hover"
            variants={linkVariants}
          >
            <Link 
              to="/competitions" 
              className={`${location.pathname === '/competitions' ? 'text-primary after:w-full' : 'text-gray-800'}`}
            >
              Competitions
            </Link>
          </motion.div>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <motion.div
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
          >
            <Link 
              to="/contact" 
              className="btn btn-secondary"
            >
              Contact
            </Link>
          </motion.div>
          
          <motion.div
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
          >
            <Link 
              to="/donate" 
              className="btn btn-primary"
            >
              Donate
            </Link>
          </motion.div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Disclosure>
            {({ open, close }) => (
              <>
                <Disclosure.Button className="p-2 text-gray-800 focus:outline-none">
                  <svg 
                    className={`h-6 w-6 ${open ? 'hidden' : 'block'}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <svg 
                    className={`h-6 w-6 ${open ? 'block' : 'hidden'}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Disclosure.Button>
                
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel className="absolute top-full left-0 right-0 bg-white shadow-lg py-2 px-4 mt-2">
                    <div className="flex flex-col space-y-4 py-2">
                      <Link 
                        to="/" 
                        className={`block py-2 ${location.pathname === '/' ? 'text-primary' : 'text-gray-800'}`}
                      >
                        Home
                      </Link>
                      
                      <Disclosure>
                        {({ open: subOpen, close: subClose }) => (
                          <>
                            <Disclosure.Button 
                              className={`flex items-center justify-between py-2 ${
                                location.pathname.includes('/about') ? 'text-primary' : 'text-gray-800'
                              }`}
                            >
                              <span>About</span>
                              <svg 
                                className={`ml-1 h-4 w-4 transition-transform ${subOpen ? 'rotate-180' : ''}`} 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </Disclosure.Button>
                            
                            <Disclosure.Panel className="pl-4 py-2 space-y-2">
                              <Link 
                                to="/about" 
                                className="block py-1 text-gray-700"
                                onClick={() => {
                                  subClose();
                                  close();
                                }}
                              >
                                Who we are
                              </Link>
                              <Link 
                                to="/about/team" 
                                className="block py-1 text-gray-700"
                                onClick={() => {
                                  subClose();
                                  close();
                                }}
                              >
                                Our Team
                              </Link>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                      
                      <Link 
                        to="/competitions" 
                        className={`block py-2 ${location.pathname === '/competitions' ? 'text-primary' : 'text-gray-800'}`}
                      >
                        Competitions
                      </Link>
                      
                      <Link 
                        to="/contact" 
                        className={`block py-2 ${location.pathname === '/contact' ? 'text-primary' : 'text-gray-800'}`}
                      >
                        Contact
                      </Link>
                      
                      <Link 
                        to="/donate" 
                        className={`block py-2 ${location.pathname === '/donate' ? 'text-primary' : 'text-gray-800'}`}
                      >
                        Donate
                      </Link>
                    </div>
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 