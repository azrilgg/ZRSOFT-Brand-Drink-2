import { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import './Contact.css';

export default function Contact() {
    const sectionRef = useRef(null);
    const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success

    // Magnetic Button Logic
    const buttonRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!buttonRef.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = buttonRef.current.getBoundingClientRect();

        // Calculate distance from center of button
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        // Strength of magnetic pull (lower is stronger)
        const pull = 0.3;

        const x = (clientX - centerX) * pull;
        const y = (clientY - centerY) * pull;

        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('sending');
        setTimeout(() => setFormStatus('success'), 1500);
    };

    return (
        <section className="contact" id="contact" ref={sectionRef}>
            {/* Background glowing orbs */}
            <div className="contact__glow-orb contact__glow-orb--1" />
            <div className="contact__glow-orb contact__glow-orb--2" />

            <div className="contact__container">

                {/* Left Side: Typography & Socials */}
                <motion.div
                    className="contact__info"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <p className="contact__label">GET IN TOUCH</p>
                    <h2 className="contact__title">
                        LET'S<br />
                        <span className="contact__title-outline">CONNECT</span>
                    </h2>

                    <p className="contact__desc">
                        Partnerships, bulk orders, or just want to say hi? Drop us a line. We reply at the speed of light.
                    </p>

                    <a href="mailto:hello@zrsoft.com" className="contact__email">
                        hello@zrsoft.com
                        <span className="contact__email-line" />
                    </a>
                </motion.div>

                {/* Right Side: Glassmorphic Form */}
                <motion.div
                    className="contact__form-wrapper"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    <AnimatePresence>
                        {formStatus === 'success' && (
                            <motion.div
                                className="contact__success-overlay"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: 'spring' }}
                                >
                                    <CheckCircle2 size={80} className="contact__success-icon" />
                                </motion.div>
                                <h3 className="contact__success-title">MESSAGE SENT</h3>
                                <p className="contact__success-desc">We've received your transmission. Our team will be in touch shortly.</p>
                                <button type="button" className="contact__success-reset" onClick={() => setFormStatus('idle')}>
                                    SEND ANOTHER
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form className={`contact__form ${formStatus === 'success' ? 'hidden' : ''}`} onSubmit={handleSubmit}>
                        <div className="contact__form-grid">
                            <InputGroup name="name" type="text" label="YOUR NAME" />
                            <InputGroup name="email" type="email" label="EMAIL ADDRESS" />
                        </div>

                        <InputGroup name="subject" type="text" label="SUBJECT" />

                        <div className="contact__input-group">
                            <textarea id="message" required className="contact__input contact__textarea" placeholder=" "></textarea>
                            <label htmlFor="message" className="contact__input-label">MESSAGE</label>
                            <div className="contact__input-border" />
                        </div>

                        <div className="contact__submit-wrapper">
                            <motion.button
                                ref={buttonRef}
                                type="submit"
                                className={`contact__submit ${formStatus !== 'idle' ? 'submitted' : ''}`}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                animate={{ x: position.x, y: position.y }}
                                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
                                disabled={formStatus !== 'idle'}
                            >
                                <span className="contact__submit-text">
                                    {formStatus === 'idle' ? 'SEND MESSAGE' : formStatus === 'sending' ? 'SENDING...' : 'SENT'}
                                </span>
                                {formStatus === 'idle' && <ArrowUpRight className="contact__submit-icon" size={20} />}
                                <div className="contact__submit-glow" />
                            </motion.button>
                        </div>
                    </form>
                </motion.div>

            </div>
        </section>
    );
}

// Interactive Input Component with Mouse Tracking Glow Effect
function InputGroup({ name, type, label }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className="contact__input-group"
            onMouseMove={handleMouseMove}
        >
            {/* The mouse-following glow effect on the border */}
            <motion.div
                className="contact__input-glow"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            250px circle at ${mouseX}px ${mouseY}px,
                            rgba(30, 144, 255, 0.4),
                            transparent 80%
                        )
                    `
                }}
            />
            <input
                type={type}
                id={name}
                required
                className="contact__input"
                placeholder=" "
            />
            <label htmlFor={name} className="contact__input-label">{label}</label>
        </div>
    );
}
