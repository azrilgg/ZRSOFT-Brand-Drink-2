import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Twitter, Youtube, Music } from 'lucide-react';
import './Navbar.css';

const menuItems = ['Home', 'The Lineup', 'Find ZRSOFT', 'Our Story', 'Support'];
const socialLinks = [
    { name: 'Instagram', icon: <Instagram size={18} /> },
    { name: 'Twitter', icon: <Twitter size={18} /> },
    { name: 'TikTok', icon: <Music size={18} /> },
    { name: 'YouTube', icon: <Youtube size={18} /> },
];

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: { opacity: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const itemVariants = {
    hidden: { opacity: 0, x: -60, filter: 'blur(10px)' },
    visible: (i) => ({
        opacity: 1, x: 0, filter: 'blur(0px)',
        transition: { delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
    exit: (i) => ({
        opacity: 0, x: -40, filter: 'blur(5px)',
        transition: { delay: i * 0.04, duration: 0.3 },
    }),
};

const sidebarVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.5 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 100);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const scrollToSection = (item) => {
        setIsOpen(false);
        const sectionMap = {
            'Home': 'hero',
            'The Lineup': 'carousel',
            'Find ZRSOFT': 'products',
            'Our Story': 'journey',
            'Support': 'contact',
        };
        const el = document.getElementById(sectionMap[item]);
        if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 400);
    };

    return (
        <>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
                <div className="navbar__logo">
                    <img src="/img-logo/logo ZRSOFT .jpeg" alt="ZRSOFT" className="navbar__logo-img" />
                    <span className="navbar__logo-text">ZRSOFT</span>
                </div>

                <div className={`navbar__burger ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                    <span className="navbar__burger-line" />
                    <span className="navbar__burger-line" />
                    <span className="navbar__burger-line" />
                </div>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div className="navbar__overlay"
                        variants={overlayVariants} initial="hidden" animate="visible" exit="exit"
                    >
                        <div className="navbar__overlay-content">
                            <div className="navbar__menu">
                                {menuItems.map((item, i) => (
                                    <motion.div key={item} className="navbar__menu-item"
                                        custom={i} variants={itemVariants} initial="hidden" animate="visible" exit="exit"
                                        onClick={() => scrollToSection(item)}
                                    >
                                        {item}
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div className="navbar__sidebar"
                                variants={sidebarVariants} initial="hidden" animate="visible" exit="exit"
                            >
                                <div>
                                    <div className="navbar__sidebar-label">Contact</div>
                                    <div className="navbar__sidebar-text">
                                        hello@zrsoft.com<br />
                                        +62 812 3456 7890
                                    </div>
                                </div>
                                <div>
                                    <div className="navbar__sidebar-label">Follow Us</div>
                                    <div className="navbar__socials">
                                        {socialLinks.map(({ name, icon }) => (
                                            <a key={name} href="#" className="navbar__social-link" aria-label={name}>
                                                {icon}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
