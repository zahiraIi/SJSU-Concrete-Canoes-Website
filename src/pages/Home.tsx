import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <div className="pt-16">
        {/* Hero Section with artistic elements */}
        <section className="relative h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/2023-concrete-canoe-team.jpg" 
              alt="SJSU Concrete Canoe Team" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-sjsuBlue/80 via-sjsuBlue/40 to-black/60"></div>
          </div>
          
          <div className="container mx-auto px-6 z-10 text-white pb-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="max-w-3xl tilted-reverse"
            >
              <h1 className="text-4xl md:text-6xl font-sketch mb-6 leading-tight">
                <span className="text-white inline-block" style={{ textShadow: '3px 3px 5px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.5), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>
                  SJSU Concrete Canoe Team
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-16 font-hand" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)' }}>
                Engineering innovation through teamwork and dedication
              </p>
              <div className="flex flex-wrap gap-6">
                <Link 
                  to="/about" 
                  className="btn-artistic btn-artistic-primary py-4 px-8 text-lg"
                >
                  Learn More
                </Link>
                <Link 
                  to="/donate" 
                  className="btn-artistic btn-artistic-secondary py-4 px-8 text-lg"
                >
                  Support Us
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Team Showcase Section with Carousel - Artistic Style */}
        <section className="py-24 bg-white relative">
          {/* Artistic background elements */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-sjsuYellow/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-sjsuBlue/20 rounded-full translate-x-1/2 translate-y-1/2"></div>
          
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16"
            >
              <h2 className="text-3xl font-sketch text-center mb-8 tilted">
                <span className="relative inline-block">
                  Meet Our Dedicated Team
                </span>
              </h2>
              <p className="text-center text-lg mb-16 max-w-3xl mx-auto font-hand text-gray-700">
                Our team of passionate engineering students brings together diverse skills and 
                perspectives to create innovative concrete canoe designs.
              </p>
              
              <TeamPhotoCarousel />
            </motion.div>
          </div>
        </section>
        
        {/* Competition Highlights - Artistic Style */}
        <section className="py-24 bg-sjsuBlue/5 relative">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl font-sketch text-center mb-8 tilted-reverse">
                <span className="relative inline-block">
                  Competition Highlights
                </span>
              </h2>
              <p className="text-center text-lg mb-16 max-w-3xl mx-auto font-hand text-gray-700">
                Explore our journey through regional and national concrete canoe competitions.
              </p>
            
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <motion.div 
                  className="artistic-card"
                  whileHover={{ y: -5, boxShadow: '8px 8px 0 rgba(0, 0, 0, 0.2)' }}
                >
                  <div className="h-60 overflow-hidden -mx-2 -mt-2 mb-4 polaroid">
                    <img 
                      src="/images/2016-Axiom-Booth.png" 
                      alt="Regional Competitions" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1508108712903-49b7ef9b1df8";
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-sketch mb-3 text-sjsuBlue">
                    <span className="relative inline-block">Regional Competitions</span>
                  </h3>
                  <p className="text-gray-700 mb-4 font-hand text-lg">Our team consistently performs well in the ASCE Mid-Pacific Regional Conference.</p>
                  <Link to="/competitions" className="inline-flex items-center font-hand text-lg text-sjsuBlue hover:text-sjsuBlue-dark">
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
             
                <motion.div 
                  className="artistic-card"
                  whileHover={{ y: -5, boxShadow: '8px 8px 0 rgba(0, 0, 0, 0.2)' }}
                >
                  <div className="h-60 overflow-hidden -mx-2 -mt-2 mb-4 polaroid">
                    <img 
                      src="/images/Rowing-on-Cavlier.png" 
                      alt="Racing Excellence" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1564061155715-d0c23049027b";
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-sketch mb-3 text-sjsuBlue">
                    <span className="relative inline-block">Racing Excellence</span>
                  </h3>
                  <p className="text-gray-700 mb-4 font-hand text-lg">Our skilled rowing team trains rigorously to perform in the water races.</p>
                  <Link to="/competitions" className="inline-flex items-center font-hand text-lg text-sjsuBlue hover:text-sjsuBlue-dark">
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
             
                <motion.div 
                  className="artistic-card"
                  whileHover={{ y: -5, boxShadow: '8px 8px 0 rgba(0, 0, 0, 0.2)' }}
                >
                  <div className="h-60 overflow-hidden -mx-2 -mt-2 mb-4 polaroid">
                    <img 
                      src="/images/2016-Axiom-awards.png" 
                      alt="Awards & Recognition" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1569173112611-52a7cd38bea9";
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-sketch mb-3 text-sjsuBlue">
                    <span className="relative inline-block">Awards & Recognition</span>
                  </h3>
                  <p className="text-gray-700 mb-4 font-hand text-lg">Our innovative designs and technical reports have earned us numerous awards.</p>
                  <Link to="/competitions" className="inline-flex items-center font-hand text-lg text-sjsuBlue hover:text-sjsuBlue-dark">
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Call to Action - Artistic Style */}
        <section className="py-20 px-6 bg-gradient-to-br from-sjsuBlue to-sjsuBlue-dark text-white text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-8 bg-sjsuYellow transform -skew-y-2"></div>
          
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-3xl md:text-4xl font-sketch mb-8 transform -rotate-1">
              <span className="relative inline-block">Join Our Journey</span>
            </h2>
            <p className="text-xl mb-16 font-hand">
              Support our team and be part of our concrete canoe engineering adventure
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              <Link to="/contact" className="btn-artistic py-4 px-8 text-lg bg-white text-sjsuBlue border-white hover:bg-white/90">
                Contact Us
              </Link>
              <Link to="/donate" className="btn-artistic py-4 px-8 text-lg bg-sjsuYellow text-sjsuBlue border-sjsuYellow hover:bg-sjsuYellow/90">
                Donate Now
              </Link>
            </div>
          </div>
          
          {/* Decorative bottom wave */}
          <div className="absolute bottom-0 left-0 w-full">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#E5A823" opacity=".3"></path>
              <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#E5A823" opacity=".5"></path>
            </svg>
          </div>
        </section>
      </div>
    </>
  );
}

// Team Photo Carousel Component with Artistic Style
const TeamPhotoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Team photos array
  const teamPhotos = [
    {
      src: "/images/Axiom-Team-water.png",
      alt: "SJSU Concrete Canoe Team in action",
      caption: "Team at the water competition"
    },
    {
      src: "/images/2023-concrete-canoe-team.jpg",
      alt: "2023 SJSU Concrete Canoe Team",
      caption: "Our 2023 team members"
    },
    {
      src: "/images/2016-Axiom-Booth.png",
      alt: "Team at competition booth",
      caption: "Presenting our design at competitions"
    },
    {
      src: "/images/Rowing-on-Cavlier.png",
      alt: "Team racing",
      caption: "Racing excellence on the water"
    }
  ];
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % teamPhotos.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + teamPhotos.length) % teamPhotos.length);
  };
  
  return (
    <div className="relative h-[500px] overflow-hidden artistic-card transform -rotate-1">
      {/* Current Photo */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
      >
        <img 
          src={teamPhotos[currentIndex].src} 
          alt={teamPhotos[currentIndex].alt} 
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/images/2023-concrete-canoe-team.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
          <div className="p-6 text-white w-full">
            <h3 className="text-2xl font-sketch mb-2">
              <span className="relative inline-block">Building Excellence</span>
            </h3>
            <p className="mb-4 font-hand text-lg">{teamPhotos[currentIndex].caption}</p>
            <div className="flex justify-between items-center">
              <Link to="/about/team" className="btn-artistic bg-sjsuYellow text-black border-sjsuYellow inline-block px-5 py-2 text-lg font-hand">
                Meet The Team
              </Link>
              <div className="flex gap-2">
                <span className="text-white/80 text-sm font-hand">
                  {currentIndex + 1} / {teamPhotos.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Navigation Buttons - Artistic Style */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-sjsuYellow text-sjsuBlue p-3 rounded-full z-10 border-2 border-black transition-colors duration-300"
        aria-label="Previous photo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-sjsuYellow text-sjsuBlue p-3 rounded-full z-10 border-2 border-black transition-colors duration-300"
        aria-label="Next photo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Navigation Dots - Artistic Style */}
      <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-3 z-10">
        {teamPhotos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-4 h-4 rounded-full border-2 border-white transition-all ${
              currentIndex === index ? "bg-sjsuYellow scale-125 border-sjsuYellow" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}; 