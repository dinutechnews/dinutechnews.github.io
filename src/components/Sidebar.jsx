import React from 'react';

const Sidebar = () => {
    return (
        <aside className="space-y-8">
            {/* Newsletter */}
            <div className="bg-gray-50 p-6 rounded-lg text-center border border-gray-100">
                <h3 className="text-xl font-bold mb-2">The Daily Crunch</h3>
                <p className="text-gray-600 text-sm mb-4">Get the top tech stories delivered to your inbox.</p>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
                    <input
                        type="email"
                        placeholder="Your email"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-tech-green"
                    />
                    <button className="w-full btn-primary">
                        Subscribe
                    </button>
                </form>
            </div>

            {/* Trending (Mock) */}
            <div>
                <h3 className="text-lg font-black uppercase border-b-2 border-black pb-2 mb-4">Trending</h3>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="group cursor-pointer">
                            <span className="text-tech-green text-xs font-bold uppercase">Analysis</span>
                            <h4 className="font-bold text-sm leading-snug group-hover:text-tech-green">
                                Why Silicon Valley is betting big on nuclear fusion this year
                            </h4>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
