import React, { useState } from 'react';
import { Link } from 'react-scroll';
import useScrollPosition from '../hooks/useScrollPosition';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const scrollPosition = useScrollPosition();
  
  const isScrolled = scrollPosition > 50;

  const navLinks = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Projects', to: 'projects' },
    { name: 'Skills', to: 'skills' },
    { name: 'Experience', to: 'experience' },
    { name: 'Contact', to: 'contact' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/10 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Icon */}
          <div className="flex-shrink-0">
            <Link
              to="home"
              smooth={true}
              duration={800}
              className="text-2xl font-bold text-cyan-400 cursor-pointer hover:text-cyan-300 transition-colors duration-200"
              onClick={closeMobileMenu}
            >
              🚀 Vijith BG
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  smooth={true}
                  duration={800}
                  spy={true}
                  offset={-64}
                  onSetActive={() => setActiveSection(link.to)}
                  className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-all duration-200 ${
                    activeSection === link.to
                      ? 'text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]'
                      : 'text-white/80 hover:text-cyan-400 hover:shadow-[0_0_10px_rgba(34,211,238,0.3)]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white/80 hover:text-cyan-400 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-400 transition-all duration-200"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              {!isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - Full-screen overlay with slide-in animation */}
      <div
        className={`md:hidden fixed inset-0 top-16 z-40 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <div className="h-full bg-black/95 backdrop-blur-md px-4 pt-6 pb-3 space-y-2">
          {navLinks.map((link, index) => (
            <Link
              key={link.to}
              to={link.to}
              smooth={true}
              duration={800}
              spy={true}
              offset={-64}
              onSetActive={() => setActiveSection(link.to)}
              onClick={closeMobileMenu}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms'
              }}
              className={`block px-4 py-4 rounded-lg text-lg font-medium cursor-pointer transition-all duration-200 min-h-[44px] ${
                activeSection === link.to
                  ? 'text-cyan-400 bg-white/10 shadow-[0_0_15px_rgba(34,211,238,0.5)] transform scale-105'
                  : 'text-white/80 hover:text-cyan-400 hover:bg-white/10 hover:shadow-[0_0_10px_rgba(34,211,238,0.3)] hover:transform hover:scale-105'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
