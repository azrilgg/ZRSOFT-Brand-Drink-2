import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 180;
const FRAME_PATH = '/img-ezgif/ezgif-frame-';

function generateParticles(count) {
    const types = ['circuit', 'molecule', 'line'];
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        type: types[i % types.length],
        left: `${Math.random() * 100}%`,
        animDuration: `${8 + Math.random() * 12}s`,
        animDelay: `${Math.random() * 10}s`,
        size: 0.5 + Math.random() * 1,
    }));
}

export default function Hero() {
    const sectionRef = useRef(null);
    const stickyRef = useRef(null);
    const canvasRef = useRef(null);
    const headingRef = useRef(null);
    const imagesRef = useRef([]);
    const frameIndexRef = useRef({ value: 0 });
    const lastDrawnFrameRef = useRef(-1);
    const renderTaskRef = useRef(null);

    const particles = useMemo(() => generateParticles(20), []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const images = [];
        let loadedCount = 0;

        // Preload all frames
        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            img.src = `${FRAME_PATH}${String(i).padStart(3, '0')}.jpg`;
            img.onload = () => {
                loadedCount++;
                // Guarantee the canvas is sized and painted using the exact first frame
                if (i === 1) {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    lastDrawnFrameRef.current = 0; // Sync with GSAP frame tracking
                }
            };
            images.push(img);
        }
        imagesRef.current = images;

        // GSAP ScrollTrigger for frame sequence
        const tl = gsap.to(frameIndexRef.current, {
            value: FRAME_COUNT - 1,
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.5,
                onUpdate: () => {
                    const idx = Math.round(frameIndexRef.current.value);

                    // Only render if the frame actually changed
                    if (idx !== lastDrawnFrameRef.current) {
                        const img = images[idx];
                        if (img && img.complete) {
                            // Cancel any pending render to avoid queue buildup
                            if (renderTaskRef.current) {
                                cancelAnimationFrame(renderTaskRef.current);
                            }
                            // Schedule render optimally
                            renderTaskRef.current = requestAnimationFrame(() => {
                                // No clearRect needed for full-size JPEGs; saves CPU cycles
                                ctx.drawImage(img, 0, 0);
                                lastDrawnFrameRef.current = idx;
                            });
                        }
                    }
                },
            },
        });

        // Fade heading on scroll
        gsap.to(headingRef.current, {
            opacity: 0,
            y: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: '15% top',
                scrub: true,
            },
        });

        // Scale down and close the entire Hero section perfectly synced with About overlap
        gsap.to(stickyRef.current, {
            scale: 0.75,
            opacity: 0,
            borderRadius: '80px',
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'bottom bottom', // Start exactly when the About section enters the viewport
                end: 'bottom top',      // End exactly when the About section covers the viewport
                scrub: true,
            },
        });

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, []);

    return (
        <section className="hero" id="hero" ref={sectionRef}>
            <div className="hero__sticky" ref={stickyRef}>
                {/* Glow Effects */}
                <div className="hero__glow" />
                <div className="hero__glow-gold" />

                {/* Floating Particles */}
                <div className="hero__particles">
                    {particles.map((p) => (
                        <div
                            key={p.id}
                            className={`hero__particle hero__particle--${p.type}`}
                            style={{
                                left: p.left,
                                animationDuration: p.animDuration,
                                animationDelay: p.animDelay,
                                transform: `scale(${p.size})`,
                            }}
                        />
                    ))}
                </div>

                {/* 3D Can Canvas */}
                <canvas ref={canvasRef} className="hero__canvas" />

                {/* Heading */}
                <div className="hero__heading" ref={headingRef}>
                    <h1 className="hero__title">
                        ZRSOFT. <br />REFRESH. REBOOT.
                    </h1>
                    <p className="hero__subtitle">The Future of Refreshment</p>
                </div>

                {/* Scroll Hint */}
                <div className="hero__scroll-hint">
                    <span>Scroll</span>
                    <div className="hero__scroll-line" />
                </div>
            </div>
        </section>
    );
}
