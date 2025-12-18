import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById } from '../services/api';

const Article = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            const data = await getArticleById(id);
            setArticle(data);
            setLoading(false);
        };
        fetchArticle();
    }, [id]);

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (!article) return <div className="text-center py-20 text-2xl font-bold">Article not found</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <header className="text-center mb-12">
                <span className="text-tech-green font-bold uppercase tracking-wider mb-4 block">
                    {article.category}
                </span>
                <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-tech-black">
                    {article.title}
                </h1>
                <div className="flex justify-center items-center text-gray-500 font-medium border-y border-gray-100 py-4 space-x-4">
                    <span>By <span className="text-black font-bold">{article.author}</span></span>
                    <span>•</span>
                    <span>{article.date}</span>
                </div>
            </header>

            <img
                src={article.image}
                alt={article.title}
                className="w-full h-[500px] object-cover rounded-lg mb-12 shadow-lg"
            />

            <article
                className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-tech-green hover:prose-a:text-green-700"
                dangerouslySetInnerHTML={{ __html: article.content }}
            />
        </div>
    );
};

export default Article;
