import { motion } from 'framer-motion';
import { Truck, ShieldCheck, RefreshCcw } from 'lucide-react';
import './Policy.css';

const policies = [
    {
        id: 1,
        title: 'GLOBAL SHIPPING',
        desc: 'Lightning-fast delivery across the globe. Free priority shipping on all orders over $50. Track your package in real-time.',
        icon: <Truck size={40} className="policy__icon-svg" />
    },
    {
        id: 2,
        title: 'QUALITY WARRANTY',
        desc: 'Every can is rigorously tested. If the flavor or carbonation doesn\'t meet our god-tier standards, we replace it immediately.',
        icon: <ShieldCheck size={40} className="policy__icon-svg" />
    },
    {
        id: 3,
        title: 'NO-HASSLE RETURNS',
        desc: 'Not entirely satisfied? Return any unopened cases within 30 days for a full, no-questions-asked refund.',
        icon: <RefreshCcw size={40} className="policy__icon-svg" />
    }
];

export default function Policy() {
    return (
        <section className="policy" id="policy">
            <div className="policy__container">
                <div className="policy__header">
                    <motion.p
                        className="policy__label"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Our Guarantee
                    </motion.p>
                    <motion.h2
                        className="policy__title"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    >
                        THE ZRSOFT PROMISE
                    </motion.h2>
                </div>

                <div className="policy__grid">
                    {policies.map((policy, index) => (
                        <motion.div
                            key={policy.id}
                            className="policy__card"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                            <div className="policy__card-glow" />
                            <div className="policy__icon-wrapper">
                                {policy.icon}
                                <div className="policy__icon-pulse" />
                            </div>
                            <h3 className="policy__card-title">{policy.title}</h3>
                            <p className="policy__card-desc">{policy.desc}</p>
                            <div className="policy__card-line" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
