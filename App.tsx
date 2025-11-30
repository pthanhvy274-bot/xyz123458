import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Slide1, Slide2, Slide3, Slide4 } from './components/slides/Part1';
import { Slide5, Slide6, Slide7 } from './components/slides/Part2';
import { Slide8, Slide9, Slide10 } from './components/slides/Part3';
import { Slide11, Slide12, Slide13, SlideDemo, Slide14 } from './components/slides/Part4';

const SLIDES = [
  { component: Slide1, steps: 0 },
  { component: Slide2, steps: 0 },
  { component: Slide3, steps: 1 }, // Scale animate
  { component: Slide4, steps: 4 }, // 4 Popups
  { component: Slide5, steps: 0 },
  { component: Slide6, steps: 0 },
  { component: Slide7, steps: 0 },
  { component: Slide8, steps: 0 },
  { component: Slide9, steps: 3 }, // 3 Branches
  { component: Slide10, steps: 0 },
  { component: Slide11, steps: 0 },
  { component: Slide12, steps: 1 }, // Results highlight
  { component: Slide13, steps: 2 }, // 3 Cards (0,1,2)
  { component: SlideDemo, steps: 0 }, // System Demo Transition
  { component: Slide14, steps: 0 },
];

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev
  const isTransitioning = useRef(false);

  const totalSlides = SLIDES.length;
  const currentSlideConfig = SLIDES[currentIndex];

  const goNext = useCallback(() => {
    if (isTransitioning.current) return;

    // If current slide has more steps, increment step
    if (step < currentSlideConfig.steps) {
      setStep(prev => prev + 1);
    } else if (currentIndex < totalSlides - 1) {
      // Move to next slide
      isTransitioning.current = true;
      setDirection(1);
      setStep(0);
      setCurrentIndex(prev => prev + 1);
      setTimeout(() => { isTransitioning.current = false }, 800); // Debounce
    }
  }, [currentIndex, step, totalSlides, currentSlideConfig]);

  const goPrev = useCallback(() => {
    if (isTransitioning.current) return;

    if (step > 0) {
      setStep(prev => prev - 1);
    } else if (currentIndex > 0) {
      isTransitioning.current = true;
      setDirection(-1);
      // Determine max steps of previous slide
      const prevSlideSteps = SLIDES[currentIndex - 1].steps;
      setStep(prevSlideSteps); 
      setCurrentIndex(prev => prev - 1);
      setTimeout(() => { isTransitioning.current = false }, 800);
    }
  }, [currentIndex, step]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        goPrev();
      } else if (e.key === 'Escape') {
        setCurrentIndex(0);
        setStep(0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  // Mouse Wheel navigation (Throttled)
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 20) {
         clearTimeout(timeout);
         timeout = setTimeout(() => {
            if (e.deltaY > 0) goNext();
            else goPrev();
         }, 100);
      }
    };
    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [goNext, goPrev]);

  const CurrentComponent = SLIDES[currentIndex].component;

  return (
    <div 
      className="w-screen h-screen bg-black text-white relative overflow-hidden select-none"
      onClick={goNext}
    >
      <AnimatePresence initial={false} mode='wait' custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ opacity: 0, y: direction > 0 ? 50 : -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: direction > 0 ? -50 : 50, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-full h-full absolute top-0 left-0"
        >
          <CurrentComponent isActive={true} step={step} />
        </motion.div>
      </AnimatePresence>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800 z-50">
        <motion.div 
          className="h-full bg-tech-light"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / totalSlides) * 100}%` }}
        />
      </div>

      {/* Navigation Hints */}
      <div className="absolute bottom-4 right-4 z-50 flex gap-2">
         <button 
           onClick={(e) => { e.stopPropagation(); goPrev(); }}
           className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition backdrop-blur-md"
         >
           {/* Left Chevron Icon using SVG for simplicity in App.tsx without extra imports */}
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
         </button>
         <button 
           onClick={(e) => { e.stopPropagation(); goNext(); }}
           className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition backdrop-blur-md flex items-center gap-2 px-4"
         >
           <span className="text-sm font-mono">{currentIndex + 1} / {totalSlides}</span>
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
         </button>
      </div>
    </div>
  );
};

export default App;