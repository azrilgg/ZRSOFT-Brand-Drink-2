import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FAQ.css';

const faqData = [
    {
        question: 'What makes ZRSOFT different?',
        answer: 'Our unique blend focuses on cognitive performance without the crash. Each can is precisely formulated with nootropics, adaptogens, and premium electrolytes sourced from the finest botanical ingredients worldwide.',
    },
    {
        question: 'What are the key ingredients?',
        answer: 'ZRSOFT features a proprietary blend of L-theanine, lion\'s mane extract, ashwagandha, natural caffeine from green tea, B-vitamins, and a full electrolyte complex. Every ingredient is organic, sustainably sourced, and third-party tested.',
    },
    {
        question: 'Where can I buy ZRSOFT?',
        answer: 'ZRSOFT is available at premium retailers nationwide, select convenience stores, and directly through our website with free shipping on orders above $30. Use our store locator to find the nearest retailer.',
    },
    {
        question: 'Is there a subscription option?',
        answer: 'Yes! Our ZRSOFT Auto-Refresh subscription delivers your favorite flavors monthly at 15% off retail price. Customize your box, skip months, or cancel anytime. Premium refreshment on your schedule.',
    },
    {
        question: 'Is ZRSOFT suitable for everyone?',
        answer: 'ZRSOFT is designed for adults seeking premium refreshment with functional benefits. It contains natural caffeine (approximately 80mg per can). Consult your healthcare provider if you have specific dietary concerns.',
    },
];

const answerVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: 'auto', opacity: 1, transition: { height: { duration: 0.3 }, opacity: { duration: 0.2, delay: 0.1 } } },
    exit: { height: 0, opacity: 0, transition: { height: { duration: 0.3 }, opacity: { duration: 0.15 } } },
};

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

    return (
        <section className="faq" id="faq">
            <div className="faq__container">
                <div className="faq__header">
                    <p className="faq__label">FAQ</p>
                    <h2 className="faq__title">Got Questions?</h2>
                </div>

                <div className="faq__list">
                    {faqData.map((item, i) => (
                        <motion.div
                            key={i}
                            className="faq__item"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                            <button className="faq__question" onClick={() => toggle(i)}>
                                {item.question}
                                <span className={`faq__icon ${openIndex === i ? 'open' : ''}`}>+</span>
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        className="faq__answer"
                                        variants={answerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                    >
                                        <p className="faq__answer-text">{item.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
