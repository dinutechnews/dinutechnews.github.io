import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Article from './pages/Article';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/category/:category" element={<CategoryWrapper />} />
        </Routes>
      </Layout>
    </Router>
  );
}

const CategoryWrapper = () => {
  const { category } = React.useParams(); // Need to import useParams or pass it down
  return <Home category={category} />;
};

export default App;
