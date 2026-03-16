import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap, Brain, Droplets, Leaf,
    Flame, Sparkles, Dumbbell,
    Coffee, Beaker, Sun,
    Shield, Moon, Feather, Wind, Cpu,
    Star, TrendingUp, Award, Heart,
    ChevronRight, X
} from 'lucide-react';
import './Products.css';

// SVG Icons for Social Ordering
const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
);

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);

const products = [
    {
        id: 1,
        name: 'Blue Special',
        tag: 'Limited Edition',
        badge: 'ICONIC',
        badgeColor: '#1e90ff',
        title: 'THE NEW STANDARD.',
        desc: 'Our crown jewel — a cobalt-blue masterpiece engineered with rare botanicals and next-gen nootropics.',
        image: '/img-product/product 5 special.png',
        large: true,
        price: '$8.50',
        rating: 4.9,
        reviews: 2847,
        details: {
            tagline: 'Cognitive Performance Redefined',
            description: 'Crafted with a proprietary blend of ceremonial-grade nootropics, blue spirulina, and rare adaptogens. The Blue Special delivers sustained mental clarity and physical refreshment. Each can contains precisely calibrated ingredients for peak visionary performance.',
            ingredients: ['Ceremonial Blue Spirulina', 'L-Theanine 200mg', 'Natural Coffee Berry 80mg', 'Ashwagandha Root Extract', 'Magnesium Citrate', 'Electrolyte Matrix'],
            nutrition: { calories: '10', sugar: '0g', caffeine: '80mg', sodium: '110mg' },
            features: [
                { icon: <Zap size={24} />, label: 'Natural Energy' },
                { icon: <Brain size={24} />, label: 'Cognitive Boost' },
                { icon: <Droplets size={24} />, label: 'Hydration+' },
                { icon: <Leaf size={24} />, label: '100% Organic' },
            ],
        },
    },
    {
        id: 2,
        name: 'Original Gold',
        tag: 'Classic',
        badge: 'BEST SELLER',
        badgeColor: '#c5a55a',
        title: 'ORIGINAL ZERO.',
        desc: 'Where legends begin. Zero sugar, zero compromise — pure golden intensity in every sip.',
        image: '/img-product/product 1 gold.png',
        price: '$4.50',
        rating: 4.8,
        reviews: 4200,
        details: {
            tagline: 'The Original Formula',
            description: "The formula that started it all. A perfectly balanced, refreshing citrus blend featuring cold-pressed Yuzu and Sicilian lemon. Lightly carbonated and immensely crisp for daily hydration.",
            ingredients: ['Cold-Pressed Yuzu Extract', 'Sicilian Lemon Essence', 'Guarana Seed Extract', 'Electrolyte Complex', 'Vitamin C (Ascorbic Acid)', 'Filtered Carbonated Water'],
            nutrition: { calories: '5', sugar: '0g', caffeine: '100mg', sodium: '60mg' },
            features: [
                { icon: <Flame size={24} />, label: 'Zero Sugar' },
                { icon: <Sparkles size={24} />, label: 'Premium Taste' },
                { icon: <Dumbbell size={24} />, label: 'Electrolytes' },
                { icon: <Leaf size={24} />, label: 'Plant-Based' },
            ],
        },
    },
    {
        id: 3,
        name: 'Chocolate Volt',
        tag: 'New Flavor',
        badge: 'TRENDING',
        badgeColor: '#da9c5a',
        title: 'VOLT.',
        desc: 'Dark cocoa meets raw electric power — an indulgent surge that rewires your focus.',
        image: '/img-product/product 2 chocolate.png',
        price: '$5.50',
        rating: 4.8,
        reviews: 2450,
        details: {
            tagline: 'Deep Focus. Zero Crash.',
            description: "A masterclass in sustained energy. We combine Colombian Supremo bean extract with L-Theanine and organic Lion's Mane mushroom to deliver laser-sharp focus without the jitters. Perfect for deep work sessions and early morning clarity.",
            ingredients: ['Colombian Supremo Espresso', "Organic Lion's Mane Extract", 'L-Theanine', 'Ginseng Panax', 'B-Vitamin Complex', 'Sparkling Mineral Water'],
            nutrition: { calories: '15', sugar: '0g', caffeine: '120mg', sodium: '45mg' },
            features: [
                { icon: <Coffee size={24} />, label: 'Dark Cocoa' },
                { icon: <Zap size={24} />, label: 'Energy Surge' },
                { icon: <Brain size={24} />, label: 'Focus Blend' },
                { icon: <Droplets size={24} />, label: 'Serve Cold' },
            ],
        },
    },
    {
        id: 4,
        name: 'Citrus Burst',
        tag: 'Tropical',
        badge: 'FAN FAVORITE',
        badgeColor: '#ff8c00',
        title: 'SUNRISE.',
        desc: 'Sun-kissed Mediterranean citrus fused with adaptogenic power — your morning, reimagined.',
        image: '/img-product/product 3 oranye.png',
        price: '$6.50',
        rating: 4.7,
        reviews: 1840,
        details: {
            tagline: 'Ethereal Clarity',
            description: "A serene blend of Japanese Ceremonial Matcha and cooling mint that instantly clears mental fog. Enhanced with nootropics to lower cortisol levels and induce a state of tranquil, productive flow.",
            ingredients: ['Ceremonial Grade Matcha', 'Organic Peppermint Extract', 'Ashwagandha', 'Magnesium L-Threonate', 'Coconut Water Powder', 'Agave Inulin'],
            nutrition: { calories: '12', sugar: '0g', caffeine: '80mg', sodium: '30mg' },
            features: [
                { icon: <Sun size={24} />, label: 'Real Citrus' },
                { icon: <Zap size={24} />, label: 'Morning Boost' },
                { icon: <Leaf size={24} />, label: 'Adaptogens' },
                { icon: <Sparkles size={24} />, label: 'Vitamin C' },
            ],
        },
    },
    {
        id: 5,
        name: 'Berry Fusion',
        tag: 'Premium',
        badge: 'ELITE',
        badgeColor: '#8a2be2',
        title: 'ULTRAVIOLET.',
        desc: 'Deep berry complexity infused with cognitive enhancers — transcend ordinary refreshment.',
        image: '/img-product/product 4 purple.png',
        price: '$5.00',
        rating: 4.8,
        reviews: 2156,
        details: {
            tagline: 'Beyond Refreshment',
            description: "A deep, complex blend of blackcurrant, wild açaí, and mission fig, infused with L-theanine and lion's mane extract. Ultraviolet pushes the boundaries of what a luxury wellness drink can do for the mind.",
            ingredients: ['Wild Açaí Extract', 'Organic Blackcurrant', "Ceremonial Lion's Mane", 'L-Theanine 300mg', 'Resveratrol Extract', 'CoQ10'],
            nutrition: { calories: '10', sugar: '0g', caffeine: '60mg', sodium: '85mg' },
            features: [
                { icon: <Droplets size={24} />, label: 'Superberries' },
                { icon: <Beaker size={24} />, label: 'Nootropics' },
                { icon: <Moon size={24} />, label: 'Calm Focus' },
                { icon: <Shield size={24} />, label: 'Antioxidants' },
            ],
        },
    },
    {
        id: 6,
        name: 'Vanilla Opulence',
        tag: 'Ultra Premium',
        badge: 'NEW DROP',
        badgeColor: '#F3E5AB',
        title: 'COREWHITE.',
        desc: 'Cryo-aged Madagascar Vanilla meets silk-smooth white cacao — a flawlessly smooth sensory reset.',
        image: '/img-product/product 6.png',
        price: '$7.00',
        rating: 4.9,
        reviews: 987,
        details: {
            tagline: 'Seamlessly Smooth',
            description: "A sophisticated, high-fidelity blend of Madagascan vanilla bean and silk-smooth white cacao, precision-filtered for absolute purity. Infused with magnesium and rare botanicals to provide a luxury sensory reset.",
            ingredients: ['Cryo-Aged Madagascar Vanilla', 'White Cacao Distillate', 'Magnesium Glycinate', 'L-Theanine', 'Organic Maca Root', 'Oat Milk Serum'],
            nutrition: { calories: '25', sugar: '0g', caffeine: '40mg', sodium: '80mg' },
            features: [
                { icon: <Zap size={24} color="#60A5FA" />, label: 'Pure Electrolytes' },
                { icon: <Feather size={24} color="#F3E5AB" />, label: 'Silk Texture' },
                { icon: <Wind size={24} color="#99F6E4" />, label: 'Deep Calm' },
                { icon: <Cpu size={24} color="#E2E8F0" />, label: 'System Balance' },
            ],
        },
    },
];

// Floating particles component
function FloatingParticles() {
    return (
        <div className="products__particles">
            {Array.from({ length: 20 }).map((_, i) => (
                <div
                    key={i}
                    className="products__particle"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 8}s`,
                        animationDuration: `${6 + Math.random() * 8}s`,
                        width: `${2 + Math.random() * 4}px`,
                        height: `${2 + Math.random() * 4}px`,
                    }}
                />
            ))}
        </div>
    );
}

// Star rating component
function StarRating({ rating, reviews }) {
    return (
        <div className="products__rating">
            <div className="products__stars">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        size={14}
                        fill={star <= Math.floor(rating) ? '#c5a55a' : 'transparent'}
                        color="#c5a55a"
                        strokeWidth={1.5}
                    />
                ))}
            </div>
            <span className="products__rating-text">{rating}</span>
            <span className="products__reviews-count">({reviews.toLocaleString()})</span>
        </div>
    );
}

const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalContentVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, scale: 0.9, y: 30, transition: { duration: 0.3 } },
};

export default function Products() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');

    const mainProducts = products.slice(0, 3);
    const bottomProducts = products.slice(3);

    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
        setActiveTab('overview');
    };

    return (
        <section className="products" id="products">
            <FloatingParticles />

            <div className="products__header">
                <motion.div
                    className="products__header-badge"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <Sparkles size={16} />
                    <span>PREMIUM COLLECTION</span>
                </motion.div>
                <motion.p
                    className="products__label"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    The Elixir Vault
                </motion.p>
                <motion.h2
                    className="products__title"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    Unlock Your <span className="products__title-gradient">Formula</span>
                </motion.h2>
                <motion.p
                    className="products__subtitle"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    Six meticulously engineered formulas. Each one a masterpiece of flavor science and performance nutrition.
                </motion.p>
            </div>

            {/* Main Bento Grid */}
            <div className="products__grid">
                {mainProducts.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 60, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className={`products__card ${product.large ? 'products__card--large' : ''}`}
                        onClick={() => handleSelectProduct(product)}
                        whileHover={{ y: -8 }}
                    >
                        <div className="products__card-shimmer" />
                        <div className="products__card-badge" style={{ background: product.badgeColor, color: product.badgeColor === '#F3E5AB' ? '#1a1a1a' : '#fff' }}>
                            {product.badge === 'BEST SELLER' && <TrendingUp size={12} />}
                            {product.badge === 'TRENDING' && <TrendingUp size={12} />}
                            {product.badge === 'ICONIC' && <Award size={12} />}
                            {product.badge}
                        </div>
                        <img
                            src={product.image}
                            alt={product.name}
                            className="products__card-image"
                            loading="lazy"
                        />
                        <div className="products__card-overlay">
                            <span className="products__card-tag">{product.tag}</span>
                            <h3 className="products__card-title">{product.title}</h3>
                            <div className="products__card-price">{product.price}</div>
                            <p className="products__card-desc">{product.desc}</p>
                            <StarRating rating={product.rating} reviews={product.reviews} />
                            <span className="products__card-cta">
                                Explore <ChevronRight size={16} />
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Bottom Row */}
            <div className="products__bottom-row">
                {bottomProducts.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.7, delay: 0.2 + (index * 0.15), ease: [0.16, 1, 0.3, 1] }}
                        className="products__mini-card"
                        onClick={() => handleSelectProduct(product)}
                        whileHover={{ y: -6 }}
                    >
                        <div className="products__card-shimmer" />
                        <div className="products__card-badge" style={{ background: product.badgeColor, color: product.badgeColor === '#F3E5AB' ? '#1a1a1a' : '#fff' }}>
                            {product.badge === 'FAN FAVORITE' && <Heart size={12} />}
                            {product.badge === 'ELITE' && <Award size={12} />}
                            {product.badge === 'NEW DROP' && <Sparkles size={12} />}
                            {product.badge}
                        </div>
                        <img
                            src={product.image}
                            alt={product.name}
                            className="products__card-image"
                            loading="lazy"
                        />
                        <div className="products__card-overlay">
                            <span className="products__card-tag">{product.tag}</span>
                            <h3 className="products__card-title">{product.title}</h3>
                            <div className="products__card-price">{product.price}</div>
                            <p className="products__card-desc">{product.desc}</p>
                            <StarRating rating={product.rating} reviews={product.reviews} />
                            <span className="products__card-cta">
                                Explore <ChevronRight size={16} />
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Product Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        className="products__modal-backdrop"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={() => setSelectedProduct(null)}
                    >
                        <motion.div
                            className="products__modal"
                            variants={modalContentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="products__modal-close" onClick={() => setSelectedProduct(null)}>
                                <X size={20} />
                            </button>

                            <div className="products__modal-hero">
                                <div className="products__modal-hero-glow" style={{ background: selectedProduct.badgeColor }} />
                                <img
                                    src={selectedProduct.image}
                                    alt={selectedProduct.name}
                                    className="products__modal-image"
                                />
                                <div className="products__modal-hero-info">
                                    <span className="products__modal-badge" style={{ background: selectedProduct.badgeColor, color: selectedProduct.badgeColor === '#F3E5AB' ? '#1a1a1a' : '#fff' }}>
                                        {selectedProduct.badge}
                                    </span>
                                    <div className="products__modal-tagline">{selectedProduct.details.tagline}</div>
                                    <h2 className="products__modal-name">{selectedProduct.title}</h2>
                                    {selectedProduct.price && <div className="products__modal-price">{selectedProduct.price}</div>}
                                    <StarRating rating={selectedProduct.rating} reviews={selectedProduct.reviews} />
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="products__modal-tabs">
                                {['overview', 'ingredients', 'experience'].map((tab) => (
                                    <button
                                        key={tab}
                                        className={`products__modal-tab ${activeTab === tab ? 'active' : ''}`}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab === 'overview' && <Brain size={16} />}
                                        {tab === 'ingredients' && <Beaker size={16} />}
                                        {tab === 'experience' && <Sparkles size={16} />}
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </button>
                                ))}
                            </div>

                            <div className="products__modal-content">
                                <AnimatePresence mode="wait">
                                    {activeTab === 'overview' && (
                                        <motion.div
                                            key="overview"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.25 }}
                                            className="products__modal-tab-content"
                                        >
                                            <p className="products__modal-desc">{selectedProduct.details.description}</p>
                                            <div className="products__modal-features">
                                                {selectedProduct.details.features.map((f, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="products__modal-feature"
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: i * 0.1 }}
                                                    >
                                                        <div className="products__modal-feature-icon">{f.icon}</div>
                                                        <div className="products__modal-feature-label">{f.label}</div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === 'ingredients' && (
                                        <motion.div
                                            key="ingredients"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.25 }}
                                            className="products__modal-tab-content"
                                        >
                                            <h4 className="products__modal-section-title">Key Ingredients</h4>
                                            <div className="products__modal-ingredients">
                                                {selectedProduct.details.ingredients.map((ing, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="products__modal-ingredient"
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.08 }}
                                                    >
                                                        <Leaf size={14} />
                                                        <span>{ing}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                            <h4 className="products__modal-section-title" style={{ marginTop: '1.5rem' }}>Nutrition Facts</h4>
                                            <div className="products__modal-nutrition">
                                                {Object.entries(selectedProduct.details.nutrition).map(([key, val], i) => (
                                                    <motion.div
                                                        key={key}
                                                        className="products__modal-nutrition-item"
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: i * 0.1 }}
                                                    >
                                                        <span className="products__nutrition-value">{val}</span>
                                                        <span className="products__nutrition-label">{key}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === 'experience' && (
                                        <motion.div
                                            key="experience"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.25 }}
                                            className="products__modal-tab-content"
                                        >
                                            <div className="products__modal-experience">
                                                <div className="products__exp-item">
                                                    <div className="products__exp-header">
                                                        <span>Energy Boost</span>
                                                        <span className="products__exp-value">
                                                            {selectedProduct.id === 3 ? '95%' : selectedProduct.id === 1 ? '90%' : selectedProduct.id === 6 ? '70%' : '85%'}
                                                        </span>
                                                    </div>
                                                    <div className="products__exp-bar">
                                                        <motion.div
                                                            className="products__exp-fill"
                                                            initial={{ width: 0 }}
                                                            animate={{ width: selectedProduct.id === 3 ? '95%' : selectedProduct.id === 1 ? '90%' : selectedProduct.id === 6 ? '70%' : '85%' }}
                                                            transition={{ duration: 1, delay: 0.2 }}
                                                            style={{ background: 'linear-gradient(90deg, #1e90ff, #60a5fa)' }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="products__exp-item">
                                                    <div className="products__exp-header">
                                                        <span>Mental Clarity</span>
                                                        <span className="products__exp-value">
                                                            {selectedProduct.id === 5 ? '98%' : selectedProduct.id === 1 ? '95%' : selectedProduct.id === 6 ? '92%' : '88%'}
                                                        </span>
                                                    </div>
                                                    <div className="products__exp-bar">
                                                        <motion.div
                                                            className="products__exp-fill"
                                                            initial={{ width: 0 }}
                                                            animate={{ width: selectedProduct.id === 5 ? '98%' : selectedProduct.id === 1 ? '95%' : selectedProduct.id === 6 ? '92%' : '88%' }}
                                                            transition={{ duration: 1, delay: 0.4 }}
                                                            style={{ background: 'linear-gradient(90deg, #8a2be2, #c084fc)' }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="products__exp-item">
                                                    <div className="products__exp-header">
                                                        <span>Taste Profile</span>
                                                        <span className="products__exp-value">
                                                            {selectedProduct.id === 6 ? '97%' : selectedProduct.id === 3 ? '94%' : '90%'}
                                                        </span>
                                                    </div>
                                                    <div className="products__exp-bar">
                                                        <motion.div
                                                            className="products__exp-fill"
                                                            initial={{ width: 0 }}
                                                            animate={{ width: selectedProduct.id === 6 ? '97%' : selectedProduct.id === 3 ? '94%' : '90%' }}
                                                            transition={{ duration: 1, delay: 0.6 }}
                                                            style={{ background: 'linear-gradient(90deg, #c5a55a, #fbbf24)' }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="products__exp-item">
                                                    <div className="products__exp-header">
                                                        <span>Smoothness</span>
                                                        <span className="products__exp-value">
                                                            {selectedProduct.id === 6 ? '99%' : selectedProduct.id === 2 ? '92%' : '87%'}
                                                        </span>
                                                    </div>
                                                    <div className="products__exp-bar">
                                                        <motion.div
                                                            className="products__exp-fill"
                                                            initial={{ width: 0 }}
                                                            animate={{ width: selectedProduct.id === 6 ? '99%' : selectedProduct.id === 2 ? '92%' : '87%' }}
                                                            transition={{ duration: 1, delay: 0.8 }}
                                                            style={{ background: 'linear-gradient(90deg, #10b981, #6ee7b7)' }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Ordering CTA Section */}
                                <div className="products__modal-ordering">
                                    <p className="products__ordering-label">ORDER NOW</p>
                                    <div className="products__ordering-buttons">
                                        <a href="https://instagram.com/zrsoft" target="_blank" rel="noopener noreferrer" className="products__order-btn products__order-btn--ig">
                                            <InstagramIcon />
                                            <span>Instagram</span>
                                        </a>
                                        <a href="https://wa.me/num" target="_blank" rel="noopener noreferrer" className="products__order-btn products__order-btn--wa">
                                            <WhatsAppIcon />
                                            <span>WhatsApp</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
