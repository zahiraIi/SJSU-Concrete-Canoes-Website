import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaYoutube, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaEnvelope, FaClock } from 'react-icons/fa';

interface FormData {
  name: string;
  email: string;
  message: string;
  agreement: boolean;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    agreement: false
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      agreement: e.target.checked
    }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message || !formData.agreement) {
      setIsError(true);
      return;
    }
    
    try {
      // Save form data to localStorage
      const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
      submissions.push({
        ...formData,
        id: Date.now(),
        date: new Date().toISOString()
      });
      localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
      
      // Reset form and show success message
      setFormData({
        name: '',
        email: '',
        message: '',
        agreement: false
      });
      setIsError(false);
      setIsSubmitted(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      setIsError(true);
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="pt-20 pb-16 bg-sjsuBlue-light/5">
      {/* Hero Section */}
      <motion.section 
        className="py-16 bg-gradient-to-r from-sjsuBlue-dark to-sjsuBlue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-white">Contact</h1>
          <div className="flex justify-center">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-1 text-sm">
                <li>
                  <a href="/" className="text-white/80 hover:text-white">Home</a>
                </li>
                <li className="flex items-center">
                  <span className="mx-1 text-white/60">/</span>
                  <span className="text-white">Contact</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </motion.section>

      {/* Google Map Section */}
      <motion.section
        className="py-0 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden border-b-4 border-sjsuBlue">
            <div className="h-96 w-full">
              <iframe 
                title="SJSU Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.3325395957377!2d-121.88296492393588!3d37.33521073559038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e2db1a4ac2e23%3A0xbdf1a6e633d79779!2sSan%20Jose%20State%20University!5e0!3m2!1sen!2sus!4v1708956720478!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section 
        className="py-8 bg-gradient-to-b from-sjsuBlue/10 to-sjsuBlue/5"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-sjsuBlue"
            >
              <h2 className="text-2xl font-semibold mb-6 text-sjsuBlue-dark">We would love to hear from you.</h2>
              <p className="text-gray-700 mb-6">
                If you are interested in joining us or supporting us let us know!
              </p>
              
              {isSubmitted && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  <p>Thank you! Your submission has been received!</p>
                </div>
              )}
              
              {isError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                  <p>Oops! Something went wrong while submitting the form. Please fill in all required fields.</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Nahom Zemene"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-sjsuBlue focus:border-sjsuBlue"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="sjsu@gmail.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-sjsuBlue focus:border-sjsuBlue"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="I want to join Concrete Canoe!"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-sjsuBlue focus:border-sjsuBlue"
                    required
                  ></textarea>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="agreement"
                        name="agreement"
                        type="checkbox"
                        checked={formData.agreement}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 border border-gray-300 rounded focus:ring-sjsuBlue"
                        required
                      />
                    </div>
                    <label htmlFor="agreement" className="ml-2 text-sm text-gray-700">
                      I understand the team at SJSU will be contacting me in regards to my submission
                    </label>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-sjsuBlue hover:bg-sjsuBlue-dark text-white font-medium rounded-full focus:outline-none shadow-md"
                >
                  Submit
                </button>
              </form>
            </motion.div>
            
            {/* Contact Information */}
            <motion.div
              variants={itemVariants}
              className="bg-sjsuBlue text-white rounded-lg shadow-md p-6"
            >
              <div className="mb-8 flex items-start">
                <FaMapMarkerAlt className="text-sjsuYellow-light mt-1 w-5 h-5 flex-shrink-0 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold mb-3">Address</h3>
                  <p className="text-white/90">
                    ASCE Student Chapter-San Jose State University<br />
                    Attn: CE Department<br />
                    1 Washington Sq, San Jose, CA 95192
                  </p>
                  <a 
                    href="https://goo.gl/maps/SJSU" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sjsuYellow-light hover:underline mt-2 inline-block"
                  >
                    Get directions
                  </a>
                </div>
              </div>
              
              <div className="mb-8 flex items-start">
                <FaEnvelope className="text-sjsuYellow-light mt-1 w-5 h-5 flex-shrink-0 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold mb-3">Email Support</h3>
                  <a 
                    href="mailto:sjsu.concretecanoe@gmail.com" 
                    className="text-sjsuYellow-light hover:underline"
                  >
                    sjsu.concretecanoe@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <FaClock className="text-sjsuYellow-light mt-1 w-5 h-5 flex-shrink-0 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold mb-3">Need Help?</h3>
                  <p className="text-white/90">
                    We can assist you Monday-Friday, 10:00 am - 6:00 pm PST
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact; 