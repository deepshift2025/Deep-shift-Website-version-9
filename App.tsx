
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AssistantWidget from './components/AssistantWidget';
import WhatsappButton from './components/WhatsappButton';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Services from './pages/Services';
import About from './pages/About';
import Solutions from './pages/Solutions';
import NewsEvents from './pages/NewsEvents';
import NewsDetail from './pages/NewsDetail';
import AdminDashboard from './pages/AdminDashboard';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import Internships from './pages/Internships';
import ApplyInternship from './pages/ApplyInternship';
import ApplyJob from './pages/ApplyJob';
import Training from './pages/Training';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/about" element={<About />} />
            <Route path="/news-events" element={<NewsEvents />} />
            <Route path="/news-events/:id" element={<NewsDetail />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/careers/jobs" element={<Jobs />} />
            <Route path="/careers/jobs/:id" element={<JobDetail />} />
            <Route path="/careers/jobs/apply" element={<ApplyJob />} />
            <Route path="/careers/internships" element={<Internships />} />
            <Route path="/careers/internships/apply" element={<ApplyInternship />} />
            <Route path="/careers/training" element={<Training />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <WhatsappButton />
        <AssistantWidget />
      </div>
    </Router>
  );
};

export default App;
