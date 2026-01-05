
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Terminal, 
  Map, 
  Layers, 
  Cpu, 
  Smartphone, 
  Database, 
  BarChart3, 
  Code2, 
  Play, 
  BookOpen, 
  Download,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

const Projects: React.FC = () => {
  const navigate = useNavigate();

  const handleDownloadDeck = () => {
    const savedDeck = localStorage.getItem('ds_investor_deck');
    if (savedDeck) {
      const resource = JSON.parse(savedDeck);
      const link = document.createElement('a');
      link.href = resource.data;
      link.download = resource.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("The Investor Deck is currently being updated by our team. Please check back shortly or contact us directly at info@deepshiftai.com.");
    }
  };

  const handlePartnerWithUs = () => {
    navigate('/contact');
  };

  return (
    <div className="pt-24 pb-20">
      {/* Featured Project Header */}
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-2/3">
              <div className="inline-flex items-center space-x-2 bg-innovation-orange text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse mr-2"></span> Active Development
              </div>
              <h1 className="text-4xl md:text-6xl font-poppins font-bold text-white mb-4">Deep Shift Language Engine</h1>
              <p className="text-xl text-innovation-blue font-medium mb-6 italic tracking-tight">"The Linguistic Infrastructure for Africa's Digital Future"</p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 flex items-center space-x-2">
                  <BarChart3 className="text-innovation-blue w-5 h-5" />
                  <span className="text-white text-sm font-semibold">TRL 4 Prototype</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 flex items-center space-x-2">
                  <CheckCircle className="text-green-400 w-5 h-5" />
                  <span className="text-white text-sm font-semibold">60% Complete</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 flex items-center space-x-2">
                  <Clock className="text-innovation-orange w-5 h-5" />
                  <span className="text-white text-sm font-semibold">12-Month Roadmap</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 flex justify-center mt-10 lg:mt-0">
               <div className="relative">
                  <div className="w-48 h-48 bg-innovation-blue rounded-[40px] transform rotate-12 flex items-center justify-center animate-in zoom-in duration-1000">
                    <Smartphone className="w-24 h-24 text-white -rotate-12" />
                  </div>
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/20 rounded-[20px] backdrop-blur-md border border-white/30 flex items-center justify-center">
                    <Code2 className="text-white w-10 h-10" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-poppins font-bold text-navy mb-8">The Linguistic Gap</h2>
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  Of over 140 indigenous languages across East Africa and the Horn, only ~35 are digitally recognized, and fewer than 3 are context-aware on global platforms.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="text-2xl font-bold text-navy">$20B</div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Annual Loss in Trade Due to Barriers</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="text-2xl font-bold text-innovation-blue">29%</div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Lowest Global Internet Adoption Rate</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed italic border-l-4 border-innovation-orange pl-4 py-2">
                  "60% of people in our region have internet coverage but don't use it because of a lack of relevant local-language content."
                </p>
              </div>
            </div>
            <div className="bg-navy p-8 rounded-3xl relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid.png')] opacity-10"></div>
              <h3 className="text-white font-poppins font-bold mb-6 flex items-center">
                <Map className="mr-2 text-innovation-blue" /> Digital Exclusion Map
              </h3>
              <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center">
                <img 
                  src="https://i.postimg.cc/NMJd5ZzS/Gemini-Generated-Image-r484mur484mur484.png" 
                  alt="Linguistic Density Map" 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="text-white w-12 h-12 fill-white cursor-pointer" />
                </div>
              </div>
              <p className="text-center text-xs text-gray-500 mt-4">Simulation: Linguistic connectivity across EAC corridors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Two Products Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-navy mb-4">Two Products, One Intelligence</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">We provide the API infrastructure for developers and a consumer mobile interface for everyone else.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* API Product */}
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center mb-8">
                <Code2 className="text-innovation-blue w-8 h-8" />
              </div>
              <h3 className="text-2xl font-poppins font-bold text-navy mb-4">The Engine (B2B API)</h3>
              <ul className="space-y-4 mb-10">
                {[
                  "Context-aware translation (Idioms & Cultural nuances)",
                  "Local-to-Local language (No English bridge required)",
                  "Unsupervised self-learning from user feedback",
                  "Low-latency offline inference support"
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-gray-600 text-sm">
                    <CheckCircle className="text-innovation-blue w-4 h-4 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-gray-900 rounded-2xl p-6 mb-8 font-mono text-[10px] sm:text-xs text-gray-300 overflow-x-auto border-t-4 border-innovation-blue">
                <div className="flex space-x-2 mb-4 border-b border-white/10 pb-2">
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                </div>
                <code>
                  {`// Translate Luganda to Runyoro\n`}
                  {`const res = await deepShift.translate({\n`}
                  {`  text: "Otyo munnange?",\n`}
                  {`  from: "lg",\n`}
                  {`  to: "rn",\n`}
                  {`  context: "informal"\n`}
                  {`});\n\n`}
                  {`console.log(res.translation); // "Oliyo ota mwanyinange?"`}
                </code>
              </div>
              <button onClick={() => navigate('/contact')} className="w-full bg-navy text-white py-4 rounded-2xl font-bold hover:bg-innovation-blue transition-colors">Request API Access</button>
            </div>

            {/* Mobile App */}
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-innovation-orange rounded-2xl flex items-center justify-center mb-8">
                <Smartphone className="text-white w-8 h-8" />
              </div>
              <h3 className="text-2xl font-poppins font-bold text-navy mb-4">The Interface (Mobile App)</h3>
              <ul className="space-y-4 mb-10">
                {[
                  "Real-time voice-to-text translation",
                  "OCR Document scanning (ID Cards, Receipts)",
                  "Complete offline mode for remote areas",
                  "Designed for traders, farmers & healthcare workers"
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-gray-600 text-sm">
                    <CheckCircle className="text-innovation-orange w-4 h-4 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="aspect-[4/3] bg-gray-100 rounded-3xl overflow-hidden flex items-center justify-center relative border-4 border-gray-50">
                <img 
                  src="https://i.postimg.cc/mkpKWP4S/Gemini_Generated_Image_obfos7obfos7obfo.png" 
                  alt="App UI Preview" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-navy/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                   <button className="bg-white text-navy px-6 py-2 rounded-full font-bold flex items-center">
                     <Play className="mr-2 w-4 h-4 fill-navy" /> Watch Demo
                   </button>
                </div>
              </div>
              <button onClick={() => navigate('/careers/internships')} className="w-full bg-innovation-orange text-white py-4 rounded-2xl font-bold hover:bg-orange-600 transition-colors mt-8">Join Beta Program</button>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap & Investment */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl font-poppins font-bold text-navy mb-8">12-Month Roadmap</h2>
              <div className="space-y-8">
                {[
                  { q: 'Q1', title: 'Beta App Launch', desc: 'Runyoro/Lusoga language focus & API documentation portal launch.', color: 'innovation-blue' },
                  { q: 'Q2', title: 'Data Flywheel Activation', desc: 'Achieve 1,000 Daily Active Users (DAU) and start self-learning cycles.', color: 'innovation-orange' },
                  { q: 'Q3', title: 'Enterprise Pilots', desc: 'First deployment with healthcare NGOs and regional trade unions.', color: 'innovation-blue' },
                  { q: 'Q4', title: 'Multi-Language Scale', desc: 'Expand to 5 major EAC languages and target $15K MRR.', color: 'innovation-orange' }
                ].map((step, i) => (
                  <div key={i} className="flex space-x-6">
                    <div className={`text-${step.color} font-bold text-2xl font-poppins shrink-0 w-12`}>{step.q}</div>
                    <div className="pb-8 border-l-2 border-gray-100 pl-8 relative">
                      <div className={`absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-${step.color}`}></div>
                      <h4 className="font-bold text-navy mb-1">{step.title}</h4>
                      <p className="text-sm text-gray-500">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-navy rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 w-32 h-32 bg-innovation-blue/20 rounded-bl-full"></div>
               <h3 className="text-2xl font-poppins font-bold mb-8 flex items-center">
                 <LineChart className="mr-2 text-innovation-blue" /> Investment Opportunity
               </h3>
               <div className="space-y-6 mb-10">
                 <div className="flex justify-between items-center py-4 border-b border-white/10">
                   <span className="text-gray-400">Target Raise</span>
                   <span className="text-2xl font-bold">$250,000 USD</span>
                 </div>
                 <div className="flex justify-between items-center py-4 border-b border-white/10">
                   <span className="text-gray-400">Market Size (NLP 2030)</span>
                   <span className="text-2xl font-bold text-innovation-orange">$36.5B</span>
                 </div>
                 <div className="flex justify-between items-center py-4 border-b border-white/10">
                   <span className="text-gray-400">Addressable Users</span>
                   <span className="text-2xl font-bold text-innovation-blue">300M+</span>
                 </div>
               </div>
               <p className="text-sm text-gray-400 mb-10">
                 We are seeking strategic investment to expand our engineering team and scale data collection efforts across the East African Community.
               </p>
               <div className="flex flex-col space-y-3">
                 <button 
                  onClick={handleDownloadDeck}
                  className="bg-innovation-orange py-4 rounded-2xl font-bold flex items-center justify-center hover:opacity-90 transition-opacity"
                 >
                   <Download className="mr-2 w-5 h-5" /> Download Investor Deck
                 </button>
                 <button 
                  onClick={handlePartnerWithUs}
                  className="bg-innovation-blue py-4 rounded-2xl font-bold hover:opacity-90 transition-opacity"
                 >
                   Partner With Us
                 </button>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const LineChart = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
);

export default Projects;
