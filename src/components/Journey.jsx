import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, FlaskConical, Settings, Rocket, Orbit, ChevronLeft, ChevronRight } from 'lucide-react';
import './Journey.css';

const milestones = [
    {
        id: 1,
        year: '2023',
        title: 'The Concept',
        description: 'Born from a simple idea: hydration that works as hard as you do. The initial sketches of the ZRSOFT can were drawn on a napkin.',
        icon: <Lightbulb size={48} className="journey__icon-svg" />
    },
    {
        id: 2,
        year: '2024',
        title: 'The Formula',
        description: 'Months of rigorous lab testing to perfect the zero-sugar, high-electrolyte blend. We pushed the boundaries of natural flavor engineering.',
        icon: <FlaskConical size={48} className="journey__icon-svg" />
    },
    {
        id: 3,
        year: '2025',
        title: 'The Prototype',
        description: 'The first physical cans rolled off the line. Sleek, matte, and undeniably premium. It wasn\'t just a drink; it was a statement.',
        icon: <Settings size={48} className="journey__icon-svg" />
    },
    {
        id: 4,
        year: '2026',
        title: 'The Launch',
        description: 'ZRSOFT hits the market, redefining the performance beverage category. The future of refreshment is officially here.',
        icon: <Rocket size={48} className="journey__icon-svg" />
    },
    {
        id: 5,
        year: 'BEYOND',
        title: 'The Evolution',
        description: 'We are already working on the next generation of cognitive enhancement and hydration technology. The journey has just begun.',
        icon: <Orbit size={48} className="journey__icon-svg" />
    }
];

export default function Journey() {
    const scrollRef = useRef(null);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = window.innerWidth > 768 ? 450 : window.innerWidth * 0.8;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="journey" id="journey">
            <div className="journey__container">
                <div className="journey__header-wrapper">
                    <div className="journey__header">
                        <motion.p
                            className="journey__label"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            Our Mission
                        </motion.p>
                        <motion.h2
                            className="journey__title"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        >
                            ZRSOFT Journey
                        </motion.h2>
                    </div>

                    {!isMobile && (
                        <div className="journey__controls">
                            <button className="journey__control-btn" onClick={() => scroll('left')} aria-label="Previous">
                                <ChevronLeft size={24} />
                            </button>
                            <button className="journey__control-btn" onClick={() => scroll('right')} aria-label="Next">
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    )}
                </div>

                <div className="journey__scroll-wrapper" ref={scrollRef}>
                    <div className="journey__track">

                        {/* A continuous glowing timeline line running behind the cards */}
                        <div className="journey__timeline-line" />

                        {milestones.map((milestone, index) => {
                            return (
                                <Card
                                    key={milestone.id}
                                    milestone={milestone}
                                    index={index}
                                />
                            );
                        })}
                    </div>
                </div>

                {isMobile ? (
                    <div className="journey__controls journey__controls--mobile">
                        <button className="journey__control-btn" onClick={() => scroll('left')} aria-label="Previous">
                            <ChevronLeft size={24} />
                        </button>
                        <button className="journey__control-btn" onClick={() => scroll('right')} aria-label="Next">
                            <ChevronRight size={24} />
                        </button>
                    </div>
                ) : (
                    <div className="journey__hint" style={{ marginTop: '20px' }}>
                        <span className="journey__hint-text">SCROLL OR USE ARROWS</span>
                    </div>
                )}
            </div>
        </section>
    );
}

// Separate Card component for distinct entering animations
function Card({ milestone, index }) {
    return (
        <motion.div
            className="journey__card-wrapper"
            initial={{ opacity: 0, y: 100, rotateY: 15 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
        >
            <div className="journey__node">
                <div className="journey__node-core" />
                <div className="journey__node-pulse" />
            </div>

            <div className="journey__card">
                <div className="journey__card-glow" />
                <div className="journey__hologram" />
                <div className="journey__card-content">
                    <div className="journey__card-header">
                        <span className="journey__badge">PHASE 0{milestone.id}</span>
                        <div className="journey__icon">{milestone.icon}</div>
                    </div>

                    <div className="journey__year">{milestone.year}</div>
                    <h3 className="journey__card-title">{milestone.title}</h3>
                    <p className="journey__card-desc">{milestone.description}</p>
                    <div className="journey__card-line" />
                </div>
            </div>
        </motion.div>
    );
}
