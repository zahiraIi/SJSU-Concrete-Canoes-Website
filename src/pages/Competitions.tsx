import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Competitions = () => {
  // Competitions data
  const competitions = [
    {
      id: "axiom",
      name: "AXIOM",
      years: "2015 - 2016",
      description: "Axiom, a standout SJSU creation, earned second overall, second in final product, and third in design report.",
      subtext: "The 25-member team, supported by $9,000 in sponsorships, excelled against competitors like UC Berkeley and Tongji University.",
      images: [
        { src: '/images/2016-Axiom-Booth.png', alt: 'Team at competition booth', caption: 'Our booth at the 2016 competition', rotation: -2 },
        { src: '/images/2016-Axiom-awards.png', alt: 'Team with awards', caption: 'Celebrating our awards at AXIOM', rotation: 1.5 },
        { src: '/images/Axiom-Team-water.png', alt: 'Team at water competition', caption: 'The team during water testing', rotation: -1 },
        { src: '/images/2016-Axiom-other.png', alt: 'Axiom design', caption: 'The design process for Axiom', rotation: 2 },
        { src: '/images/Axion-Team.png', alt: 'Concrete mixing', caption: 'The Axiom team in action', rotation: -1.5 },
      ]
    },
    {
      id: "noes-arc",
      name: "NOE'S ARC",
      years: "2023 - 2024",
      description: "After a COVID-19 hiatus, SJSU's Concrete Canoe team faced limited resources, fewer mentors, and little experience.",
      subtext: "Yet, their resilience and teamwork drove a successful comeback at the 2024 MidPac competition.",
      images: [
        { src: '/images/Rowing-on-Cavlier.png', alt: 'Rowing the canoe', caption: 'Testing our canoe on the water', rotation: 2 },
        { src: '/images/2023-concrete-canoe-team.jpg', alt: '2023 Concrete Canoe Team', caption: 'Our team preparing for competition', rotation: -1.5 },
        { src: '/images/Rectangle-178.png', alt: 'Concrete canoe competition', caption: 'Competition day excitement', rotation: 1 },
        { src: '/images/IMG_2455.png', alt: 'Team working on the canoe', caption: 'The team pouring concrete for the canoe', rotation: -2 },
        { src: '/images/IMG_2493-2.png', alt: 'Finishing the canoe', caption: 'Finalizing the canoe surface', rotation: 1.5 },
      ]
    }
  ];

  // Component for photo gallery with arrow navigation
  const CompetitionGallery = ({ images }: { images: any[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const goToPrevious = () => {
      const isFirstImage = currentIndex === 0;
      const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
    };
    
    const goToNext = () => {
      const isLastImage = currentIndex === images.length - 1;
      const newIndex = isLastImage ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    };

    // Function to get a group of 3 images (or fewer for the last group)
    const getCurrentImageGroup = () => {
      const startIdx = Math.floor(currentIndex / 3) * 3;
      return images.slice(startIdx, startIdx + 3);
    };

    return (
      <div className="relative pb-8">
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={goToPrevious}
            className="bg-sjsuBlue/80 hover:bg-sjsuBlue text-white p-2 rounded-full transition-colors"
            aria-label="Previous photos"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="w-6"></div>
          <button 
            onClick={goToNext}
            className="bg-sjsuBlue/80 hover:bg-sjsuBlue text-white p-2 rounded-full transition-colors"
            aria-label="Next photos"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {getCurrentImageGroup().map((image, idx) => (
            <motion.div
              key={idx}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ 
                scale: 1.05, 
                zIndex: 10,
                boxShadow: '0 20px 25px rgba(0,0,0,0.2)' 
              }}
            >
              <div 
                className="bg-white p-4 border-2 border-gray-200 shadow-lg rounded-sm polaroid" 
                style={{ transform: `rotate(${image.rotation}deg)` }}
              >
                <div className="overflow-hidden mb-3">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-52 object-cover"
                    onError={(e) => {
                      console.error(`Failed to load image: ${image.src}`);
                      (e.target as HTMLImageElement).src = "/images/placeholders/competition-placeholder.jpg";
                      (e.target as HTMLImageElement).classList.add('border-2', 'border-dashed', 'border-gray-300');
                    }}
                  />
                </div>
                
                {/* Caption */}
                <p className="text-center font-hand text-gray-700 text-sm pt-1">{image.caption}</p>
                
                {/* Tape decoration */}
                <div className="absolute top-0 right-1/4 w-16 h-4 bg-blue-200 opacity-60 transform -translate-y-1/2 rotate-6"></div>
                {idx % 2 === 0 && (
                  <div className="absolute bottom-0 left-1/4 w-14 h-4 bg-yellow-100 opacity-60 transform translate-y-1/2 -rotate-3"></div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Navigation dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: Math.ceil(images.length / 3) }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx * 3)}
              className={`w-3 h-3 rounded-full transition-colors ${
                Math.floor(currentIndex / 3) === idx ? 'bg-sjsuBlue' : 'bg-gray-300'
              }`}
              aria-label={`Go to gallery ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="pt-20 pb-16 bg-gray-50">
      {/* Header Section */}
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-sketch text-sjsuBlue mb-4">
            Competitions Gallery
          </h1>
          <nav className="flex justify-center items-center space-x-2 text-gray-500 mb-12">
            <Link to="/" className="hover:text-sjsuBlue transition-colors">Home</Link>
            <span>›</span>
            <span className="text-gray-700">Competitions</span>
          </nav>
        </motion.div>
      </div>

      {/* Competition Gallery */}
      <div className="container mx-auto px-6">
        {competitions.map((competition, index) => (
          <motion.section 
            key={competition.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-32 last:mb-0"
          >
            <div className="flex flex-col items-center mb-12">
              {/* Competition title/name */}
              <h2 className="text-5xl md:text-6xl font-bold text-sjsuBlue mb-4">{competition.name}</h2>
              
              <h3 className="text-3xl md:text-4xl font-sketch mb-8">{competition.years}</h3>
              
              <div className="max-w-3xl text-center">
                <p className="text-lg mb-2">{competition.description}</p>
                <p className="text-lg mb-4">{competition.subtext}</p>
              </div>
            </div>

            {/* Photo Gallery with navigation */}
            <CompetitionGallery images={competition.images} />
          </motion.section>
        ))}
      </div>

      {/* Call to Action */}
      <section className="py-16 mt-16 bg-sjsuBlue relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-8 bg-sjsuYellow transform -skew-y-2"></div>
        <div className="container mx-auto px-6 text-white relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-sketch mb-8 transform -rotate-1">Join Our Competition Team</h2>
            <p className="text-xl mb-8 font-hand">
              Interested in being part of our next competition? We're always looking for passionate students to join our team!
            </p>
            <Link 
              to="/contact" 
              className="btn-artistic py-4 px-8 text-lg bg-sjsuYellow text-sjsuBlue border-sjsuYellow hover:bg-sjsuYellow/90 inline-block"
            >
              Get Involved
            </Link>
          </motion.div>
        </div>
        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#FFFFFF" opacity=".3"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#FFFFFF" opacity=".5"></path>
          </svg>
        </div>
      </section>
    </div>
  );
};

export default Competitions;