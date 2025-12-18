import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '../services/api';
import ArticleCard from '../components/ArticleCard';
import Sidebar from '../components/Sidebar';

const Home = ({ category }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            const data = await getArticles();
            if (category) {
                setArticles(data.filter(a => a.category.toLowerCase() === category.toLowerCase()));
            } else {
                setArticles(data);
            }
            setLoading(false);
        };
        fetchNews();
    }, [category]);

    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    const heroArticle = articles[0];
    const feedArticles = articles.slice(1);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Hero Section */}
            {heroArticle && (
                <div className="relative h-[500px] w-full mb-12 rounded-lg overflow-hidden group">
                    <img
                        src={heroArticle.image}
                        alt={heroArticle.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12">
                        <span className="bg-tech-green text-white px-2 py-1 text-xs font-bold uppercase tracking-wider w-fit mb-4">
                            {heroArticle.category}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight max-w-4xl hover:underline">
                            <Link to={`/article/${heroArticle.id}`}>{heroArticle.title}</Link>
                        </h1>
                        <div className="flex items-center text-gray-300 text-sm font-medium">
                            <span>{heroArticle.author}</span>
                            <span className="mx-2">•</span>
                            <span>{heroArticle.date}</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Feed */}
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-black uppercase border-b-2 border-black pb-2 mb-8">The Latest</h2>
                    {feedArticles.map(article => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <Sidebar />
                </div>
            </div>
        </div>
    );
};

export default Home;
