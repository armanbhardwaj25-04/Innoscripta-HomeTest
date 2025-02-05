import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SkeletonLoader from "./components/SkeletonLoader";

// Lazy load components
const Home = React.lazy(() => import("./components/Home"));
const Content = React.lazy(() => import("./components/Content"));

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Suspense fallback={<SkeletonLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sources/:domain" element={<Content />} />
          <Route path="/categories/:category" element={<Content />} />
          <Route path="/search/:q" element={<Content />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
};

export default App;
