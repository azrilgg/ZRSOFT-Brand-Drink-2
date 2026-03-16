import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const PRIMARY_TEXT = "WE DON'T MAKE DRINKS. WE ENGINEER MOMENTS OF ABSOLUTE CLARITY.";
const SECONDARY_TEXT = "Every formula is precision-crafted with next-generation nootropics, rare adaptogens, and clinical-grade electrolytes. The result? A flavor profile that is bold, sharp, and intensely revitalizing — designed for those who refuse to settle.";

const stats = [
    { value: '10M+', label: 'Cans Delivered' },
    { value: '50+', label: 'Countries' },
    { value: '6', label: 'Formulas' },
    { value: '0g', label: 'Sugar Always' },
];

export default function About() {
    const sectionRef = useRef(null);
    const wordsRef = useRef([]);
    const secondaryRef = useRef(null);
    const lineRef = useRef(null);
    const statsRef = useRef(null);

    const words = PRIMARY_TEXT.split(' ');

    useEffect(() => {
        const wordEls = wordsRef.current;

        // Animate each word lighting up on scroll
        wordEls.forEach((el, i) => {
            if (!el) return;
            gsap.to(el, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: `${3 + (i / wordEls.length) * 45}% center`,
                    end: `${6 + (i / wordEls.length) * 45}% center`,
                    scrub: true,
                    onEnter: () => el.classList.add('lit'),
                    onLeaveBack: () => el.classList.remove('lit'),
                },
            });
        });

        // Fade in secondary text + stats
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: '30% center',
            onEnter: () => {
                secondaryRef.current?.classList.add('visible');
                lineRef.current?.classList.add('visible');
                statsRef.current?.classList.add('visible');
            },
            onLeaveBack: () => {
                secondaryRef.current?.classList.remove('visible');
                lineRef.current?.classList.remove('visible');
                statsRef.current?.classList.remove('visible');
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => {
                if (t.trigger === sectionRef.current || sectionRef.current?.contains(t.trigger)) {
                    t.kill();
                }
            });
        };
    }, []);

    return (
        <section className="about" id="about" ref={sectionRef}>
            {/* Ambient particles */}
            <div className="about__particles">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div
                        key={i}
                        className="about__particle"
                        style={{
                            left: `${10 + Math.random() * 80}%`,
                            top: `${10 + Math.random() * 80}%`,
                            animationDelay: `${Math.random() * 6}s`,
                            animationDuration: `${5 + Math.random() * 6}s`,
                            width: `${2 + Math.random() * 3}px`,
                            height: `${2 + Math.random() * 3}px`,
                        }}
                    />
                ))}
            </div>

            <div className="about__sticky">
                <p className="about__text-primary">
                    {words.map((word, i) => (
                        <span
                            key={i}
                            className="about__word"
                            ref={(el) => (wordsRef.current[i] = el)}
                        >
                            {word}
                        </span>
                    ))}
                </p>

                <p className="about__text-secondary" ref={secondaryRef}>
                    {SECONDARY_TEXT}
                </p>

                <div className="about__line" ref={lineRef} />

                {/* Stats Row */}
                <div className="about__stats" ref={statsRef}>
                    {stats.map((stat, i) => (
                        <div key={i} className="about__stat">
                            <span className="about__stat-value">{stat.value}</span>
                            <span className="about__stat-label">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
