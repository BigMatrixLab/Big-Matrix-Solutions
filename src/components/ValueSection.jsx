import React from 'react';
import { Target, Eye, Sparkles, Check } from 'lucide-react';

const ValueSection = ({ icon, title, description, items, reversed = false }) => {
    const icons = {
        target: Target,
        eye: Eye,
        stars: Sparkles,
    };

    const IconComponent = icons[icon] || Target;

    // Gradient starts from content and fades to icon side
    const cardBg = {
        background: reversed
            ? 'linear-gradient(270deg, #f0f4ff 0%, #e0e7ff 100%)'
            : 'linear-gradient(90deg, #f0f4ff 0%, #e0e7ff 100%)',
        borderRadius: '32px',
        boxShadow: '0 6px 32px 0 rgba(59,130,246,0.07)',
        padding: '0',
        marginBottom: '0',
    };

    // Use flexbox to keep both sides in a single row, swapping order with flex-row-reverse
    return (
        <div className={`row align-items-center mb-5 py-4 d-flex ${reversed ? 'flex-row-reverse' : ''}`} style={cardBg}>
            {/* Visual Side */}
            <div className="col-lg-4 col-md-12 d-flex justify-content-center p-4" style={{minWidth: 0}}>
                <div 
                    style={{
                        position: 'relative',
                        width: '200px',
                        height: '200px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'radial-gradient(circle, #eff6ff 0%, #ffffff 70%)',
                        borderRadius: '50%'
                    }}
                >
                    {/* Decorative Ring */}
                    <div style={{
                        position: 'absolute',
                        inset: '-10px',
                        border: '2px dashed #dbeafe',
                        borderRadius: '50%',
                        opacity: 0.6
                    }} />
                    
                    <IconComponent 
                        size={90} 
                        strokeWidth={1.5} 
                        style={{ 
                            color: '#3b82f6',
                            filter: 'drop-shadow(0 10px 15px rgba(59, 130, 246, 0.2))'
                        }} 
                    />
                </div>
            </div>

            {/* Content Side */}
            <div className="col-lg-8 col-md-12 px-lg-5 d-flex align-items-center">
                <div className="ps-lg-4 w-100">
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#3b82f6',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '1.5px',
                        fontSize: '1.25rem',
                       
                    }}>
                        <span style={{ width: '24px', height: '2px', background: '#3b82f6' }}></span>
                        {title}
                    </div>

                    <h2 style={{ 
                        fontSize: '2.25rem', 
                        fontWeight: '800', 
                        color: '#1e293b', 
                        marginBottom: '1.5rem',
                        lineHeight: '1.2'
                    }}>
                        Empowering your <span style={{ color: '#3b82f6' }}>future.</span>
                    </h2>

                    {description && (
                        <p style={{ 
                            fontSize: '1.1rem', 
                            lineHeight: '1.7', 
                            color: '#64748b', 
                            marginBottom: '2rem'
                        }}>
                            {description}
                        </p>
                    )}

                    <div className="d-grid gap-3">
                        {items && items.map((item, index) => (
                            <div 
                                key={index} 
                                style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '12px',
                                    padding: '16px',
                                    borderRadius: '12px',
                                    background: '#ffffff',
                                    border: '1px solid #f1f5f9',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                                    transition: 'transform 0.2s ease',
                                    cursor: 'default'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(8px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                            >
                                <div style={{
                                    background: '#dbeafe',
                                    borderRadius: '50%',
                                    padding: '4px',
                                    display: 'flex'
                                }}>
                                    <Check size={16} color="#2563eb" strokeWidth={3} />
                                </div>
                                <p style={{ 
                                    margin: 0, 
                                    color: '#334155', 
                                    fontWeight: '500',
                                    fontSize: '0.95rem' 
                                }}>
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ValueSection;