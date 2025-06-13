import React, { useState, useEffect, useRef } from 'react';

const Interactive3DScene = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [animationTime, setAnimationTime] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const animate = () => {
      setAnimationTime(prev => prev + 0.02);
    };
    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const x = (e.clientX - centerX) / rect.width;
        const y = (e.clientY - centerY) / rect.height;
        
        setMousePosition({ x: x * 15, y: y * 15 });
      }
    };

    if (isHovered) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      style={{
        width: '100%',
        height: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative',
        perspective: '1200px'
      }}
    >
      {/* Main 3D Container */}
      <div
        style={{
          width: '400px',
          height: '400px',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: `
            rotateX(${mousePosition.y}deg) 
            rotateY(${mousePosition.x}deg)
            scale(${isHovered ? 1.05 : 1})
          `,
          transition: 'transform 0.4s ease'
        }}
      >
        {/* Central Store */}
        <div
          style={{
            width: '140px',
            height: '140px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) translateZ(20px)',
            boxShadow: '0 20px 40px rgba(102, 126, 234, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            border: '4px solid rgba(255,255,255,0.3)',
            zIndex: 10,
            overflow: 'hidden'
          }}
        >
          {/* Store Icon */}
          <div style={{
            fontSize: '40px',
            marginBottom: '8px',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
          }}>
            🏪
          </div>
          
          {/* Store Name */}
          <div style={{
            fontSize: '14px',
            fontWeight: '800',
            color: '#ffffff',
            textAlign: 'center',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
            letterSpacing: '1px'
          }}>
            E-STORE
          </div>

          {/* Shimmer Effect */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
            transform: 'translateX(-100%)',
            animation: 'shimmer 3s infinite'
          }} />

          {/* Inner Glow */}
          <div style={{
            position: 'absolute',
            inset: '15px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 80%)',
            borderRadius: '50%'
          }} />
        </div>

        {/* Orbiting Product Bubbles */}
        {[
          { icon: '🛍️', color: '#ff6b6b', name: 'Shopping', size: 65 },
          { icon: '💳', color: '#4ecdc4', name: 'Payment', size: 70 },
          { icon: '📦', color: '#45b7d1', name: 'Products', size: 60 },
          { icon: '🚚', color: '#96ceb4', name: 'Delivery', size: 68 },
          { icon: '⭐', color: '#feca57', name: 'Reviews', size: 62 },
          { icon: '💎', color: '#ff9ff3', name: 'Premium', size: 66 }
        ].map((item, i) => {
          const angle = (i * Math.PI * 2) / 6 + animationTime;
          const radius = 120;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius * 0.8;
          const z = Math.sin(angle) * 25;
          const floatOffset = Math.sin(animationTime * 2 + i) * 8;
          
          return (
            <div
              key={i}
              style={{
                width: `${item.size}px`,
                height: `${item.size}px`,
                background: `radial-gradient(circle at 30% 30%, ${item.color}aa, ${item.color})`,
                borderRadius: '50%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `
                  translate(-50%, -50%)
                  translate3d(${x}px, ${y + floatOffset}px, ${z}px)
                `,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                border: `3px solid rgba(255,255,255,0.4)`,
                boxShadow: `
                  0 10px 25px ${item.color}30,
                  inset 0 1px 0 rgba(255,255,255,0.3)
                `,
                zIndex: z > 0 ? 8 : 5,
                backdropFilter: 'blur(10px)',
                overflow: 'hidden'
              }}
            >
              {/* Product Icon */}
              <span style={{
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                position: 'relative',
                zIndex: 2
              }}>
                {item.icon}
              </span>

              {/* Bubble Shine */}
              <div style={{
                position: 'absolute',
                top: '15%',
                left: '25%',
                width: '30%',
                height: '30%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)',
                borderRadius: '50%'
              }} />

              {/* Rotating Highlight */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: `conic-gradient(from ${animationTime * 100}deg, transparent, ${item.color}40, transparent)`,
                borderRadius: '50%',
                animation: 'rotate 4s linear infinite'
              }} />
            </div>
          );
        })}

        {/* Connecting Lines */}
        {[...Array(6)].map((_, i) => {
          const angle = (i * Math.PI * 2) / 6 + animationTime;
          const lineLength = 50;
          
          return (
            <div
              key={`line-${i}`}
              style={{
                width: '2px',
                height: `${lineLength}px`,
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transformOrigin: 'bottom center',
                transform: `
                  translate(-50%, -100%)
                  rotate(${angle * 180 / Math.PI}deg)
                  translateY(-70px)
                `,
                opacity: isHovered ? 0.8 : 0.4,
                transition: 'opacity 0.3s ease'
              }}
            />
          );
        })}

        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => {
          const particleAngle = (i * Math.PI * 2) / 15 + animationTime * 0.5;
          const particleRadius = 160 + Math.sin(animationTime * 3 + i) * 20;
          const x = Math.cos(particleAngle) * particleRadius;
          const y = Math.sin(particleAngle) * particleRadius * 0.6;
          
          return (
            <div
              key={`particle-${i}`}
              style={{
                width: '6px',
                height: '6px',
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '50%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0px)`,
                boxShadow: '0 0 12px rgba(102, 126, 234, 0.8)',
                opacity: isHovered ? 1 : 0.6,
                transition: 'opacity 0.3s ease',
                animation: `twinkle ${1.5 + (i % 3) * 0.5}s ease-in-out infinite alternate`
              }}
            />
          );
        })}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes twinkle {
          0% { 
            opacity: 0.3; 
            transform: translate(-50%, -50%) scale(0.8); 
          }
          100% { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1.2); 
          }
        }
      `}</style>
    </div>
  );
};

export default Interactive3DScene;
