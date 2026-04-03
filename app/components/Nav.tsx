'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        maxWidth: 'calc(100% - 40px)',
        background: scrolled ? 'rgba(9,9,11,0.85)' : 'rgba(255,255,255,0.03)',
        border: '0.5px solid rgba(255,255,255,0.08)',
        borderRadius: '100px',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backdropFilter: 'blur(20px)',
        transition: 'background 0.3s ease',
      }}
    >
      <span style={{ color: '#fafafa', fontSize: '13px', fontWeight: 500 }}>
        Shreyansh Kanoongo
      </span>
      <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
        {links.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            style={{
              fontSize: '13px',
              fontWeight: 400,
              textDecoration: 'none',
              color: '#71717a',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fafafa')}
            onMouseLeave={e => (e.currentTarget.style.color = '#71717a')}
          >
            {label}
          </a>
        ))}
        <a
          href="#contact"
          style={{
            fontSize: '12px',
            fontWeight: 500,
            textDecoration: 'none',
            color: '#09090b',
            background: '#6366f1',
            padding: '6px 16px',
            borderRadius: '100px',
            transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Hire Me
        </a>
      </div>
    </motion.nav>
  );
}
