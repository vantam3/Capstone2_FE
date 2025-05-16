import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const Index = () => {
  return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1A0B2E] to-[#2A1B3E]">
      <div className="text-center max-w-md p-6">
        <div className="w-20 h-20 bg-gradient-to-br from-[#8A6FF8] to-[#A48EFF] rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg bg-gray-950">
          <span className="text-white text-2xl font-bold">AD</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Speak AI Pro</h1>
        <p className="text-xl text-gray-300 mb-8">
          Improve your English pronunciation with AI-powered feedback
        </p>
        <div className="space-y-4">
          <Button className="w-full text-white py-2 rounded-lg shadow-md border-0 bg-slate-950 hover:bg-slate-800">
            Start Learning
          </Button>
          <Link to="/admin">
            <Button variant="outline" className="w-full border-[#8A6FF8] text-slate-50 bg-slate-950 hover:bg-slate-800">
              Admin Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>;
};
export default Index;