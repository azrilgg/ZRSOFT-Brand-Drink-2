import { motion } from 'framer-motion';
import './CTA.css';

export default function CTA() {
    return (
        <section className="cta-section" id="cta">
            <div className="cta__container">
                <motion.div
                    className="cta__content"
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <h2 className="cta__title">Ready to reset?</h2>

                    <button
                        className="cta__button"
                        onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        <span className="cta__button-text">FIND YOUR FLAVOR</span>
                        <div className="cta__button-glow" />
                    </button>

                    {/* Decorative Circuit Lines inside CTA */}
                    <div className="cta__deco cta__deco--1" />
                    <div className="cta__deco cta__deco--2" />
                </motion.div>
            </div>
        </section>
    );
}
