import React from 'react';
import { Hero } from './components/Hero';
import { RecruitmentForm } from './components/RecruitmentForm';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      <Hero />
      <RecruitmentForm />
      
      <footer className="mt-20 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} InstaRecruit AI. Template by Senior React Engineer.</p>
        <div className="mt-2 flex justify-center space-x-4">
          <a href="#" className="hover:text-gray-500">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-gray-500">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};

export default App;