import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <footer className="bg-tech-black text-white py-12 mt-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="mb-4 text-gray-400">&copy; 2025 D-Tech Newz. All rights reserved.</p>
                    <p className="text-sm text-gray-600">Designed for GitHub Pages & Firebase.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
