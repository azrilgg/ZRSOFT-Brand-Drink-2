import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap, Brain, Droplets, Leaf, Star, Beaker,
    ChevronRight, X, Flame, Coffee, Sun, Shield, Moon, Wind, Feather, Cpu
} from 'lucide-react';
import './Carousel.css';

const carouselItems = [
    {
        id: 1,
        image: '/img-product/product 1 gold.png',
        title: 'ORIGINAL GOLD',
        subtitle: 'The Gold Standard',
        description: 'The pure, unadulterated classic. Formulated with our signature blend of nootropics and electrolytes to keep you at peak performance.',
        features: ['ZERO SUGAR', 'L-THEANINE', 'B-VITAMINS'],
        color: 'var(--accent-gold)',
        rating: 4.8,
        reviews: 5123,
        tasteBold: 85,
        tasteSweet: 40,
        tasteFresh: 70,
        detailFeatures: [
            { icon: <Flame size={18} />, label: 'Zero Sugar', desc: 'Clean energy with no sugar crash' },
            { icon: <Zap size={18} />, label: 'Natural Boost', desc: '75mg plant-based caffeine' },
            { icon: <Brain size={18} />, label: 'Focus Blend', desc: 'L-Theanine + B-Vitamins' },
        ]
    },
    {
        id: 2,
        image: '/img-product/product 2 chocolate.png',
        title: 'VOLT',
        subtitle: 'Dark Energy',
        description: 'For those who need an intense, deep push. A bold and rich profile that delivers sustained, crash-free energy for your longest sessions.',
        features: ['DOUBLE CAF', 'MACA ROOT', 'GINSENG'],
        color: '#da9c5a',
        rating: 4.7,
        reviews: 1893,
        tasteBold: 95,
        tasteSweet: 65,
        tasteFresh: 30,
        detailFeatures: [
            { icon: <Coffee size={18} />, label: 'Premium Cocoa', desc: 'Rich dark chocolate infusion' },
            { icon: <Zap size={18} />, label: 'Double Charge', desc: '90mg natural caffeine' },
            { icon: <Brain size={18} />, label: 'Deep Focus', desc: 'MCT Oil + L-Carnitine' },
        ]
    },
    {
        id: 3,
        image: '/img-product/product 3 oranye.png',
        title: 'SUNRISE',
        subtitle: 'Tropical Citrus',
        description: 'Awaken your senses with a bright, crisp blend of citrus and exotic fruits. The perfect morning primer for high-cognitive demanded tasks.',
        features: ['VITAMIN C', 'ELECTROLYTES', 'NOOTROPICS'],
        color: '#ff8c00',
        rating: 4.6,
        reviews: 3241,
        tasteBold: 50,
        tasteSweet: 60,
        tasteFresh: 95,
        detailFeatures: [
            { icon: <Sun size={18} />, label: 'Real Citrus', desc: 'Mediterranean orange extract' },
            { icon: <Leaf size={18} />, label: 'Adaptogens', desc: 'Ashwagandha + Ginseng' },
            { icon: <Droplets size={18} />, label: 'Hydration', desc: 'Vitamin C + Electrolytes' },
        ]
    },
    {
        id: 4,
        image: '/img-product/product 4 purple.png',
        title: 'ULTRAVIOLET',
        subtitle: 'Berry Fusion',
        description: 'A smooth, mixed-berry flavor profile designed for creative flow state. Enhanced with adaptogens to manage stress and improve clarity.',
        features: ['ASHWAGANDHA', 'ANTIOXIDANTS', 'FOCUS'],
        color: '#8a2be2',
        rating: 4.8,
        reviews: 2156,
        tasteBold: 70,
        tasteSweet: 80,
        tasteFresh: 60,
        detailFeatures: [
            { icon: <Droplets size={18} />, label: 'Superberries', desc: 'Açaí + Blackcurrant blend' },
            { icon: <Beaker size={18} />, label: 'Nootropics', desc: "Lion's Mane + L-Theanine" },
            { icon: <Shield size={18} />, label: 'Antioxidants', desc: 'Resveratrol + CoQ10' },
        ]
    },
    {
        id: 5,
        image: '/img-product/product 5 special.png',
        title: 'BLUE SPECIAL',
        subtitle: 'Limited Edition',
        description: 'Our crown jewel. A mysterious, electrifying flavor that pushes the boundaries of performance beverage engineering. Available for a limited time.',
        features: ['MYSTERY FLAVOR', 'MAX FOCUS', 'LIMITED'],
        color: 'var(--accent-blue)',
        rating: 4.9,
        reviews: 2847,
        tasteBold: 80,
        tasteSweet: 55,
        tasteFresh: 85,
        detailFeatures: [
            { icon: <Zap size={18} />, label: 'Natural Energy', desc: 'Proprietary energy complex' },
            { icon: <Brain size={18} />, label: 'Cognitive Boost', desc: 'Nootropic + Adaptogen stack' },
            { icon: <Leaf size={18} />, label: '100% Organic', desc: 'All natural ingredients' },
        ]
    },
    {
        id: 6,
        image: '/img-product/product 6.png',
        title: 'COREWHITE',
        subtitle: 'Vanilla Opulence',
        description: 'Cryo-aged Madagascar Vanilla fused with silk-smooth white cacao. Precision-filtered for absolute purity and a flawlessly smooth sensory experience.',
        features: ['MADAGASCAR VANILLA', 'WHITE CACAO', 'MAGNESIUM'],
        color: '#F3E5AB',
        rating: 4.9,
        reviews: 987,
        tasteBold: 45,
        tasteSweet: 90,
        tasteFresh: 75,
        detailFeatures: [
            { icon: <Feather size={18} />, label: 'Silk Texture', desc: 'Ultra-smooth mouthfeel' },
            { icon: <Wind size={18} />, label: 'Deep Calm', desc: 'Magnesium glycinate blend' },
            { icon: <Cpu size={18} />, label: 'System Balance', desc: 'Electrolyte + Vitamin D3' },
        ]
    }
];

// Swipe detection logic
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

// Star rating component
function StarRating({ rating, reviews, color }) {
    return (
        <div className="carousel__rating">
            <div className="carousel__stars">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        size={12}
                        fill={star <= Math.floor(rating) ? '#c5a55a' : 'transparent'}
                        color="#c5a55a"
                        strokeWidth={1.5}
                    />
                ))}
            </div>
            <span className="carousel__rating-text">{rating}</span>
            <span className="carousel__reviews-text">({reviews.toLocaleString()})</span>
        </div>
    );
}

// Taste Profile Bar
function TasteBar({ label, value, color, delay }) {
    return (
        <div className="carousel__taste-item">
            <div className="carousel__taste-header">
                <span>{label}</span>
                <span className="carousel__taste-value">{value}%</span>
            </div>
            <div className="carousel__taste-bar">
                <motion.div
                    className="carousel__taste-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
                    style={{ background: color }}
                />
            </div>
        </div>
    );
}

export default function Carousel() {
    const [page, setPage] = useState(0);
    const [direction, setDirection] = useState(0);
    const [showDetail, setShowDetail] = useState(false);

    const itemsLength = carouselItems.length;

    // Wrap around index
    const activeIndex = ((page % itemsLength) + itemsLength) % itemsLength;
    const activeItem = carouselItems[activeIndex];

    const paginate = useCallback((newDirection) => {
        setDirection(newDirection);
        setPage((prev) => prev + newDirection);
        setShowDetail(false);
    }, []);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') paginate(1);
            if (e.key === 'ArrowLeft') paginate(-1);
            if (e.key === 'Escape') setShowDetail(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [paginate]);

    return (
        <section className="carousel-section" id="carousel">
            {/* Ambient background glow */}
            <div className="carousel__ambient" />

            <div className="carousel__header">
                <motion.div
                    className="carousel__header-pill"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <Beaker size={14} />
                    <span>6 FORMULAS</span>
                </motion.div>
                <motion.p
                    className="carousel__label"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    The Archive
                </motion.p>
                <motion.h2
                    className="carousel__title"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                >
                    Every Formula. <span className="carousel__title-accent">One Destination.</span>
                </motion.h2>
            </div>

            <div className="carousel__container">
                <div className="carousel__viewport">
                    <AnimatePresence initial={false} custom={direction}>
                        {carouselItems.map((item, index) => {
                            // Calculate relative position to active index
                            let offset = index - activeIndex;

                            // Adjust for circular wrap-around to show adjacent cards correctly
                            if (offset < -Math.floor(itemsLength / 2)) offset += itemsLength;
                            if (offset > Math.floor(itemsLength / 2)) offset -= itemsLength;

                            const isCenter = offset === 0;
                            const isEdge = Math.abs(offset) > 1;

                            const xTranslate = offset * 110;

                            return (
                                <motion.div
                                    key={item.id}
                                    className={`carousel__item ${isCenter ? 'active' : ''}`}
                                    custom={direction}
                                    initial={false}
                                    animate={{
                                        x: `${xTranslate}%`,
                                        scale: isCenter ? 1 : 0.75,
                                        rotateY: offset * -15,
                                        z: isCenter ? 0 : -100,
                                        opacity: isEdge ? 0 : isCenter ? 1 : 0.5,
                                        zIndex: isCenter ? 10 : 5 - Math.abs(offset),
                                        filter: isCenter ? 'blur(0px) brightness(1)' : 'blur(4px) brightness(0.4)'
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30,
                                        mass: 0.8
                                    }}
                                    drag={isCenter ? "x" : false}
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.2}
                                    onDragEnd={(e, { offset, velocity }) => {
                                        const swipe = swipePower(offset.x, velocity.x);
                                        if (swipe < -swipeConfidenceThreshold) paginate(1);
                                        else if (swipe > swipeConfidenceThreshold) paginate(-1);
                                    }}
                                    onClick={() => {
                                        if (!isCenter) {
                                            if (offset > 0) paginate(1);
                                            if (offset < 0) paginate(-1);
                                        }
                                    }}
                                >
                                    <div className="carousel__card">
                                        <div className="carousel__card-glow" style={{ background: item.color }} />
                                        <div className="carousel__card-shimmer" />
                                        <img src={item.image} alt={item.title} className="carousel__image" draggable="false" />
                                        <motion.div
                                            className="carousel__info"
                                            animate={{ opacity: isCenter ? 1 : 0, y: isCenter ? 0 : 20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <h3 className="carousel__item-title">{item.title}</h3>
                                            <p className="carousel__item-subtitle" style={{ color: item.color }}>{item.subtitle}</p>

                                            <AnimatePresence>
                                                {isCenter && (
                                                    <motion.div
                                                        className="carousel__item-details"
                                                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                                        animate={{ opacity: 1, height: 'auto', marginTop: 15 }}
                                                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <p className="carousel__item-desc">{item.description}</p>
                                                        <div className="carousel__item-features">
                                                            {item.features.map(feat => (
                                                                <span key={feat} className="carousel__feature" style={{ borderColor: item.color, color: item.color }}>
                                                                    {feat}
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <button
                                                            className="carousel__explore-btn"
                                                            onClick={(e) => { e.stopPropagation(); setShowDetail(true); }}
                                                            style={{ borderColor: item.color, color: item.color }}
                                                        >
                                                            Deep Dive <ChevronRight size={16} />
                                                        </button>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Navigation Controls */}
                <div className="carousel__controls">
                    <button className="carousel__btn" onClick={() => paginate(-1)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>
                    <div className="carousel__indicators">
                        {carouselItems.map((_, i) => (
                            <button
                                key={i}
                                className={`carousel__dot ${i === activeIndex ? 'active' : ''}`}
                                onClick={() => {
                                    setDirection(i > activeIndex ? 1 : -1);
                                    setPage(page + (i - activeIndex));
                                    setShowDetail(false);
                                }}
                            />
                        ))}
                    </div>
                    <button className="carousel__btn" onClick={() => paginate(1)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                </div>

                <div className="carousel__hint">
                    <span className="carousel__hint-text">DRAG OR CLICK TO EXPLORE</span>
                </div>
            </div>

            {/* Detail Panel Overlay */}
            <AnimatePresence>
                {showDetail && (
                    <motion.div
                        className="carousel__detail-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setShowDetail(false)}
                    >
                        <motion.div
                            className="carousel__detail-panel"
                            initial={{ opacity: 0, y: 60, scale: 0.92 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 40, scale: 0.95 }}
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="carousel__detail-close" onClick={() => setShowDetail(false)}>
                                <X size={18} />
                            </button>

                            <div className="carousel__detail-hero">
                                <div className="carousel__detail-glow" style={{ background: activeItem.color }} />
                                <img src={activeItem.image} alt={activeItem.title} className="carousel__detail-img" />
                                <div className="carousel__detail-hero-text">
                                    <h3 className="carousel__detail-title">{activeItem.title}</h3>
                                    <p className="carousel__detail-subtitle" style={{ color: activeItem.color }}>{activeItem.subtitle}</p>
                                    <StarRating rating={activeItem.rating} reviews={activeItem.reviews} />
                                </div>
                            </div>

                            <div className="carousel__detail-body">
                                {/* Features */}
                                <div className="carousel__detail-section">
                                    <h4 className="carousel__detail-section-title">Key Benefits</h4>
                                    <div className="carousel__detail-features">
                                        {activeItem.detailFeatures.map((feat, i) => (
                                            <motion.div
                                                key={i}
                                                className="carousel__detail-feature"
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 + i * 0.1 }}
                                            >
                                                <div className="carousel__detail-feature-icon" style={{ color: activeItem.color }}>
                                                    {feat.icon}
                                                </div>
                                                <div>
                                                    <div className="carousel__detail-feature-label">{feat.label}</div>
                                                    <div className="carousel__detail-feature-desc">{feat.desc}</div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Taste Profile */}
                                <div className="carousel__detail-section">
                                    <h4 className="carousel__detail-section-title">Taste Profile</h4>
                                    <div className="carousel__taste-profile">
                                        <TasteBar label="Bold" value={activeItem.tasteBold} color={activeItem.color} delay={0.3} />
                                        <TasteBar label="Sweet" value={activeItem.tasteSweet} color={activeItem.color} delay={0.5} />
                                        <TasteBar label="Fresh" value={activeItem.tasteFresh} color={activeItem.color} delay={0.7} />
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="carousel__detail-tags">
                                    {activeItem.features.map((feat) => (
                                        <span key={feat} className="carousel__detail-tag" style={{ borderColor: activeItem.color, color: activeItem.color }}>
                                            {feat}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
