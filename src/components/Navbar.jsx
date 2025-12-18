import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-black tracking-tighter text-tech-green">
                            D-Tech <span className="text-tech-black">Newz</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex space-x-8">
                        {['Startups', 'Apps', 'Gadgets', 'AI', 'Fintech'].map((item) => (
                            <Link
                                key={item}
                                to={`/category/${item.toLowerCase()}`}
                                className="text-sm font-bold uppercase text-gray-700 hover:text-tech-green transition-colors"
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>

                    {/* Search & Mobile Menu Button */}
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-500 hover:text-tech-green">
                            <Search size={20} />
                        </button>
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-gray-700 hover:text-tech-green focus:outline-none"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-200">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {['Startups', 'Apps', 'Gadgets', 'AI', 'Fintech'].map((item) => (
                            <Link
                                key={item}
                                to={`/category/${item.toLowerCase()}`}
                                className="block px-3 py-2 rounded-md text-base font-bold text-gray-700 hover:text-tech-green hover:bg-gray-50"
                                onClick={() => setIsOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
