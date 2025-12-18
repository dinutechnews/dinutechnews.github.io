import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
    return (
        <div className="flex flex-col md:flex-row gap-6 mb-8 pb-8 border-b border-gray-100 last:border-0 group">
            <div className="md:w-1/3 h-48 md:h-40 overflow-hidden rounded-lg bg-gray-100">
                <Link to={`/article/${article.id}`}>
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                </Link>
            </div>
            <div className="md:w-2/3 flex flex-col justify-center">
                <span className="text-tech-green font-bold text-xs uppercase tracking-wider mb-2">
                    {article.category}
                </span>
                <h2 className="text-xl md:text-2xl font-bold mb-2 leading-tight group-hover:text-tech-green transition-colors">
                    <Link to={`/article/${article.id}`}>
                        {article.title}
                    </Link>
                </h2>
                <p className="text-gray-600 text-sm md:text-base line-clamp-2 mb-3">
                    {article.excerpt}
                </p>
                <div className="text-xs text-gray-400 font-medium">
                    {article.author} • {article.date}
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;
