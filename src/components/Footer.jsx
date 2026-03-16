import { motion } from 'framer-motion';
import { Instagram, Twitter, Youtube, Music } from 'lucide-react';
import './Footer.css';

const socialLinks = [
    { name: 'Instagram', icon: <Instagram size={20} /> },
    { name: 'Twitter', icon: <Twitter size={20} /> },
    { name: 'TikTok', icon: <Music size={20} /> },
    { name: 'YouTube', icon: <Youtube size={20} /> },
];

export default function Footer() {
    return (
        <footer className="footer" id="footer">
            <div className="footer__container">
                <motion.div
                    className="footer__top"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    {/* Brand */}
                    <div className="footer__brand">
                        <div className="footer__logo">
                            <img src="/img-logo/logo ZRSOFT .jpeg" alt="ZRSOFT" className="footer__logo-img" />
                            <span className="footer__logo-text">ZRSOFT</span>
                        </div>
                        <p className="footer__tagline">
                            Premium canned refreshment engineered for cognitive performance. Refresh. Reboot. Repeat.
                        </p>
                        <div className="footer__socials">
                            {socialLinks.map(({ name, icon }) => (
                                <a key={name} href="#" className="footer__social-icon" aria-label={name}>
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="footer__links-group">
                        <div className="footer__links-col">
                            <h4 className="footer__links-title">Product</h4>
                            <a href="#products" className="footer__link">The Lineup</a>
                            <a href="#" className="footer__link">New Releases</a>
                            <a href="#" className="footer__link">Subscriptions</a>
                            <a href="#" className="footer__link">Bulk Orders</a>
                        </div>
                        <div className="footer__links-col">
                            <h4 className="footer__links-title">Company</h4>
                            <a href="#about" className="footer__link">Our Story</a>
                            <a href="#" className="footer__link">Careers</a>
                            <a href="#" className="footer__link">Press</a>
                            <a href="#" className="footer__link">Partners</a>
                        </div>
                        <div className="footer__links-col">
                            <h4 className="footer__links-title">Support</h4>
                            <a href="#faq" className="footer__link">FAQ</a>
                            <a href="#" className="footer__link">Contact</a>
                            <a href="#" className="footer__link">Shipping</a>
                            <a href="#" className="footer__link">Returns</a>
                        </div>
                    </div>
                </motion.div>

                <div className="footer__divider" />

                <motion.div
                    className="footer__bottom"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <p className="footer__copyright">© 2026 ZRSOFT. All rights reserved.</p>
                    <div className="footer__legal">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Cookie Policy</a>
                    </div>
                </motion.div>
            </div>

            {/* Watermark */}
            <div className="footer__watermark">
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="0.5" />
                    <circle cx="100" cy="100" r="60" stroke="white" strokeWidth="0.3" />
                    <circle cx="100" cy="100" r="40" stroke="white" strokeWidth="0.3" />
                    <path d="M100 20 L100 180" stroke="white" strokeWidth="0.3" />
                    <path d="M20 100 L180 100" stroke="white" strokeWidth="0.3" />
                    <path d="M40 40 L160 160" stroke="white" strokeWidth="0.2" />
                    <path d="M160 40 L40 160" stroke="white" strokeWidth="0.2" />
                    {/* Leaf shape */}
                    <path d="M100 60 Q120 80 100 120 Q80 80 100 60Z" stroke="white" strokeWidth="0.5" fill="none" />
                    <path d="M100 60 L100 120" stroke="white" strokeWidth="0.3" />
                    {/* Circuit lines */}
                    <path d="M60 100 L80 100 L80 80" stroke="white" strokeWidth="0.3" />
                    <path d="M140 100 L120 100 L120 120" stroke="white" strokeWidth="0.3" />
                    <circle cx="80" cy="80" r="2" fill="white" fillOpacity="0.5" />
                    <circle cx="120" cy="120" r="2" fill="white" fillOpacity="0.5" />
                </svg>
            </div>
        </footer>
    );
}
