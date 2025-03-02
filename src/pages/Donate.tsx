import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaMoneyBillWave, FaTools, FaArrowRight } from 'react-icons/fa';
import GoogleSheetsService from '../utils/googleSheetsService';

// Define donation package types
interface DonationPackage {
  id: string;
  name: string;
  amount: string;
  benefits: string[];
  redirectUrl: string;
  type: 'bronze' | 'gold' | 'platinum' | 'individual';
}

// Define material donation form fields
interface MaterialDonation {
  name: string;
  email: string;
  phone: string;
  company?: string;
  materials: string;
  quantity: string;
  estimatedValue?: string;
  comments?: string;
}

// Create a Google Sheets service instance
// The service now gets all configuration from environment variables on the server
const sheetsService = new GoogleSheetsService();

const Donate = () => {
  // State variables
  const [donationType, setDonationType] = useState<'material' | 'monetary' | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<DonationPackage | null>(null);
  const [materialForm, setMaterialForm] = useState<MaterialDonation>({
    name: '',
    email: '',
    phone: '',
    company: '',
    materials: '',
    quantity: '',
    estimatedValue: '',
    comments: ''
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  // Donation packages data
  const donationPackages: DonationPackage[] = [
    {
      id: 'bronze',
      name: 'Bronze Package',
      amount: '$200 - $499',
      benefits: [
        'Team T-shirt with Company Logo',
        'Thank You Certificate'
      ],
      redirectUrl: 'https://securelb.imodules.com/s/1771/lg23/form.aspx?sid=1771&gid=3&pgid=531&cid=1295',
      type: 'bronze'
    },
    {
      id: 'gold',
      name: 'Gold Package',
      amount: '$500 - $999',
      benefits: [
        '2 Team T-shirts with Company Logo',
        'Thank You Certificate',
        'Link to Competition Photos'
      ],
      redirectUrl: 'https://securelb.imodules.com/s/1771/lg23/form.aspx?sid=1771&gid=3&pgid=531&cid=1295',
      type: 'gold'
    },
    {
      id: 'platinum',
      name: 'Platinum Package',
      amount: '$999+',
      benefits: [
        '2 Team T-shirts with Company Logo',
        'Thank You Certificate',
        'Link to Competition Photos',
        'SJSU ASCE Networking Event booths'
      ],
      redirectUrl: 'https://securelb.imodules.com/s/1771/lg23/form.aspx?sid=1771&gid=3&pgid=531&cid=1295',
      type: 'platinum'
    },
    {
      id: 'individual',
      name: 'Individual Package',
      amount: 'Custom',
      benefits: [
        'Name or Company posted on website'
      ],
      redirectUrl: 'https://securelb.imodules.com/s/1771/lg23/form.aspx?sid=1771&gid=3&pgid=531&cid=1295',
      type: 'individual'
    }
  ];
  
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
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.98,
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.1,
        ease: "easeInOut"
      }
    }
  };
  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };
  
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2
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
  
  // Intersection observer hooks for scroll animations
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [optionsRef, optionsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [cardsRef, cardsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [infoRef, infoInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  // Handle donation selection
  const handleSelectPackage = (pkg: DonationPackage) => {
    setSelectedPackage(pkg);
  };
  
  // Handle donation confirmation and redirect
  const handleConfirmDonation = () => {
    if (selectedPackage) {
      window.open(selectedPackage.redirectUrl, '_blank');
      setSelectedPackage(null);
    }
  };

  // Handle donation type selection
  const handleDonationTypeSelect = (type: 'material' | 'monetary') => {
    setDonationType(type);
  };

  // Handle form input changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMaterialForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle material donation form submission
  const handleMaterialFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError(null);

    // Form validation
    if (!materialForm.name || !materialForm.email || !materialForm.phone || !materialForm.materials || !materialForm.quantity) {
      setFormError("Please fill out all required fields");
      setFormSubmitting(false);
      return;
    }

    try {
      // Validate the email format
      if (!/^\S+@\S+\.\S+$/.test(materialForm.email)) {
        setFormError("Please enter a valid email address");
        setFormSubmitting(false);
        return;
      }

      // Validate phone number (basic check for length)
      if (materialForm.phone.replace(/\D/g, '').length < 10) {
        setFormError("Please enter a valid phone number");
        setFormSubmitting(false);
        return;
      }

      // Submit donation using the Google Sheets service
      const result = await sheetsService.submitDonation(materialForm);
      
      if (result.success) {
        setFormSubmitted(true);
        // Reset the form after successful submission
        setMaterialForm({
          name: '',
          email: '',
          phone: '',
          company: '',
          materials: '',
          quantity: '',
          estimatedValue: '',
          comments: ''
        });
      } else {
        setFormError(result.message || "An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormError(error instanceof Error ? error.message : "An error occurred. Please try again later.");
    } finally {
      setFormSubmitting(false);
    }
  };

  // Initialize the sheet when the component mounts (only needed once)
  useEffect(() => {
    const initializeSheet = async () => {
      try {
        // When in production or when initializing for the first time
        if (import.meta.env.PROD || import.meta.env.VITE_INITIALIZE_SHEET === 'true') {
          const result = await sheetsService.initializeSheet();
          if (!result.success) {
            console.warn("Sheet initialization warning:", result.message);
          }
        }
      } catch (error) {
        console.error("Error initializing sheet:", error);
      }
    };

    // Call the initialization function
    initializeSheet();
  }, []);

  // Handle back to donation types
  const handleBackToDonationTypes = () => {
    setDonationType(null);
    setFormSubmitted(false);
    setFormError(null);
    setMaterialForm({
      name: '',
      email: '',
      phone: '',
      company: '',
      materials: '',
      quantity: '',
      estimatedValue: '',
      comments: ''
    });
  };
  
  return (
    <div className="pt-20 pb-16">
      {/* Hero Section */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-primary/90 to-secondary/90 text-white text-center"
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            variants={itemVariants}
          >
            Build Tomorrow's Engineering Legacy Today
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Help SJSU's Concrete Canoe Team Push Engineering Boundaries
          </motion.p>
        </div>
      </motion.section>
      
      {/* Donation Type Selection */}
      {!donationType && (
        <motion.section
          className="py-16"
          ref={optionsRef}
          initial="hidden"
          animate={optionsInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              variants={itemVariants}
            >
              How Would You Like to Support Us?
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Material Donations Option */}
              <motion.div
                className="bg-white rounded-2xl shadow-md overflow-hidden border-2 border-primary/20 hover:border-primary transition-all duration-300"
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => handleDonationTypeSelect('material')}
              >
                <div className="p-8 flex flex-col items-center text-center h-full">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <FaTools className="text-4xl text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Material Donations</h3>
                  <p className="text-gray-600 mb-6">Donate construction materials, tools, or other resources our team needs to build the perfect canoe.</p>
                  <div className="mt-auto">
                    <button 
                      className="flex items-center gap-2 bg-primary text-white py-2 px-6 rounded-full font-medium"
                    >
                      <span>Fill Out Form</span>
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </motion.div>
              
              {/* Monetary Donations Option */}
              <motion.div
                className="bg-white rounded-2xl shadow-md overflow-hidden border-2 border-secondary/20 hover:border-secondary transition-all duration-300"
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => handleDonationTypeSelect('monetary')}
              >
                <div className="p-8 flex flex-col items-center text-center h-full">
                  <div className="bg-secondary/10 p-4 rounded-full mb-4">
                    <FaMoneyBillWave className="text-4xl text-secondary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Monetary Donations</h3>
                  <p className="text-gray-600 mb-6">Support our team with financial contributions through the SJSU donation platform.</p>
                  <div className="mt-auto">
                    <button 
                      className="flex items-center gap-2 bg-secondary text-white py-2 px-6 rounded-full font-medium"
                    >
                      <span>Choose a Package</span>
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}
      
      {/* Material Donation Form */}
      {donationType === 'material' && !formSubmitted && (
        <motion.section
          className="py-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="flex justify-between items-center mb-8">
              <motion.h2 
                className="text-3xl font-bold"
                variants={itemVariants}
              >
                Material Donation Form
              </motion.h2>
              
              <motion.button
                className="text-gray-600 hover:text-primary"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleBackToDonationTypes}
              >
                Back to Options
              </motion.button>
            </div>
            
            {formError && (
              <motion.div 
                className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {formError}
              </motion.div>
            )}
            
            <motion.form 
              className="bg-white p-8 rounded-2xl shadow-md"
              variants={containerVariants}
              onSubmit={handleMaterialFormSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="col-span-1">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={materialForm.name}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                
                {/* Email Field */}
                <div className="col-span-1">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={materialForm.email}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                
                {/* Phone Field */}
                <div className="col-span-1">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={materialForm.phone}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                
                {/* Company Field */}
                <div className="col-span-1">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company (Optional)</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={materialForm.company}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                
                {/* Materials Field */}
                <div className="col-span-2">
                  <label htmlFor="materials" className="block text-sm font-medium text-gray-700 mb-1">Materials to Donate *</label>
                  <input
                    type="text"
                    id="materials"
                    name="materials"
                    value={materialForm.materials}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="E.g., Concrete mix, tools, safety equipment"
                    required
                  />
                </div>
                
                {/* Quantity Field */}
                <div className="col-span-1">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    value={materialForm.quantity}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="E.g., 5 bags, 3 sets"
                    required
                  />
                </div>
                
                {/* Estimated Value Field */}
                <div className="col-span-1">
                  <label htmlFor="estimatedValue" className="block text-sm font-medium text-gray-700 mb-1">Estimated Value (Optional)</label>
                  <input
                    type="text"
                    id="estimatedValue"
                    name="estimatedValue"
                    value={materialForm.estimatedValue}
                    onChange={handleFormChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="E.g., $100"
                  />
                </div>
                
                {/* Comments Field */}
                <div className="col-span-2">
                  <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">Additional Comments (Optional)</label>
                  <textarea
                    id="comments"
                    name="comments"
                    value={materialForm.comments}
                    onChange={handleFormChange}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Any additional information about your donation"
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-8 flex justify-center">
                <motion.button
                  type="submit"
                  className="bg-primary text-white py-3 px-8 rounded-full font-medium flex items-center gap-2 disabled:opacity-70"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  disabled={formSubmitting}
                >
                  {formSubmitting ? 'Submitting...' : 'Submit Donation Form'}
                </motion.button>
              </div>
            </motion.form>
          </div>
        </motion.section>
      )}

      {/* Form Submission Success */}
      {donationType === 'material' && formSubmitted && (
        <motion.section
          className="py-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.div 
              className="bg-white p-8 rounded-2xl shadow-md text-center"
              variants={itemVariants}
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold mb-4">Thank You for Your Donation!</h2>
              <p className="text-gray-600 mb-6">
                Your material donation form has been submitted successfully. Our team will contact you shortly to coordinate the donation details.
              </p>
              
              <motion.button
                className="bg-primary text-white py-3 px-8 rounded-full font-medium"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleBackToDonationTypes}
              >
                Back to Donation Options
              </motion.button>
            </motion.div>
          </div>
        </motion.section>
      )}
      
      {/* Donation Packages */}
      {donationType === 'monetary' && (
        <>
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
              <motion.h2 
                className="text-3xl font-bold"
                variants={itemVariants}
              >
                Monetary Donation Packages
              </motion.h2>
              
              <motion.button
                className="text-gray-600 hover:text-primary"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleBackToDonationTypes}
              >
                Back to Options
              </motion.button>
            </div>
          </div>

          <motion.section 
            className="py-8"
            ref={cardsRef}
            initial="hidden"
            animate={cardsInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {donationPackages.map((pkg) => (
                  <motion.div
                    key={pkg.id}
                    className={`donate-card ${pkg.type} cursor-pointer`}
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => handleSelectPackage(pkg)}
                  >
                    <div className="w-full p-6">
                      <h3 className="donate-card-heading">{pkg.name}</h3>
                      <h4 className="donate-card-subhead">{pkg.amount}</h4>
                      <div className="donate-card-text">
                        <p>◇ Benefits include:</p>
                        <ul>
                          {pkg.benefits.map((benefit, index) => (
                            <li key={index}>• {benefit}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
          
          {/* Additional Information */}
          <motion.section 
            className="py-16 bg-gray-50"
            ref={infoRef}
            initial="hidden"
            animate={infoInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <div className="container mx-auto px-4 max-w-4xl">
              <motion.h2 
                className="text-3xl font-bold text-center mb-8"
                variants={itemVariants}
              >
                Why Your Support Matters
              </motion.h2>
              
              <motion.p 
                className="text-lg mb-6 leading-relaxed"
                variants={itemVariants}
              >
                These donations will cover the hosting and organization expenses of team for the competition. Our main source of funding is company donations toward our ASCE Student Chapter. Our budget is low since we're starting from scratch. In donating you are supporting the next generation of Civil and Environmental Engineering student members here at San Jose State University.
              </motion.p>
              
              <motion.p 
                className="text-lg mb-8 leading-relaxed"
                variants={itemVariants}
              >
                About our ASCE chapter, we have member events such as Lunch-and-Learns, as well as the ASCE Mid Pacific Conference that our Student Chapter provides free of charge to our active student members. ASCE Student Chapter wishes to provide an interactive venue for all individuals or organizations who value and agree with the ASCE's purpose and mission.
              </motion.p>
              
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary"
                variants={itemVariants}
              >
                <h3 className="font-bold text-lg mb-2">Instructions for Monetary Donations:</h3>
                <p className="text-gray-700 mb-4">
                  When donating through the SJSU donation portal, please be sure to select "SJSU Concrete Canoe Club" from the designation options to ensure your contribution directly supports our team.
                </p>
                <p className="text-gray-700">
                  Please reach out to Sela Gaglia <a href="mailto:sela.gaglia@sjsu.edu" className="text-primary hover:underline">sela.gaglia@sjsu.edu</a> with the SJSU Tower Foundation for more detailed instructions on how to make your voluntary donation. For the SJSU Tax ID/W-9 form, please reach out to Maddeline Thomas <a href="mailto:maddeline.thomas@sjsu.edu" className="text-primary hover:underline">maddeline.thomas@sjsu.edu</a>.
                </p>
              </motion.div>
            </div>
          </motion.section>
        </>
      )}
      
      {/* Donation Modal */}
      <AnimatePresence>
        {selectedPackage && (
          <>
            <motion.div 
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={backdropVariants}
              onClick={() => setSelectedPackage(null)}
            >
              <motion.div 
                className={`bg-white rounded-2xl p-8 max-w-md w-full mx-4 donate-card ${selectedPackage.type} overflow-hidden`}
                variants={modalVariants}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{selectedPackage.name}</h3>
                  <p className="text-xl font-semibold">{selectedPackage.amount}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Benefits:</h4>
                  <ul className="space-y-1">
                    {selectedPackage.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <p className="mb-6 text-sm">
                  By clicking "Proceed to Donation", you will be redirected to the SJSU donation page where you can complete your contribution.
                </p>
                
                <div className="flex justify-between">
                  <motion.button
                    className="px-4 py-2 bg-gray-200 rounded-md text-gray-800"
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonVariants}
                    onClick={() => setSelectedPackage(null)}
                  >
                    Cancel
                  </motion.button>
                  
                  <motion.button
                    className="px-4 py-2 bg-primary text-white rounded-md"
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonVariants}
                    onClick={handleConfirmDonation}
                  >
                    Proceed to Donation
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Donate; 