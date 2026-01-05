
import React from 'react';
import { 
  GraduationCap, 
  Rocket, 
  Users, 
  Target, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Globe,
  Cpu,
  Bot,
  MessageSquare,
  BarChart3,
  Globe2,
  Server,
  Code2,
  Monitor,
  Terminal,
  Activity,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

const LEARNING_MODULES = [
  {
    category: "Core AI & Research",
    icon: <Cpu className="text-innovation-orange" />,
    items: [
      { name: "Machine Learning", desc: "Master supervised/unsupervised learning, neural networks, and model evaluation using industry-standard frameworks." },
      { name: "Natural Language Processing (NLP)", desc: "Build context-aware linguistic models specifically for low-resource East African languages." },
      { name: "Large Language Models (LLM)", desc: "Understand transformer architectures, fine-tuning techniques, and prompt engineering for enterprise use." }
    ]
  },
  {
    category: "Advanced AI Applications",
    icon: <Bot className="text-innovation-blue" />,
    items: [
      { name: "Agentic AI", desc: "Design autonomous agents capable of reasoning, planning, and executing multi-step business tasks." },
      { name: "AI Automations", desc: "Learn to identify and eliminate repetitive manual workflows through intelligent robotic process automation." },
      { name: "AI for Business", desc: "Develop strategic skills to assess ROI, ethical implications, and deployment roadmaps for corporate AI." }
    ]
  },
  {
    category: "Foundational Engineering",
    icon: <Terminal className="text-innovation-orange" />,
    items: [
      { name: "Web Development", desc: "Build high-performance, responsive user interfaces using React, TypeScript, and modern CSS frameworks." },
      { name: "Network Administration", desc: "Configure and manage secure server environments and local area networks at our Nakawa Hub lab." },
      { name: "Basic Computing", desc: "Master system internals, hardware optimization, CLI proficiency, and fundamental computer science theory." }
    ]
  }
];

const Internships: React.FC = () => {
  return (
    <div className="pt-24 bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-navy py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-innovation-blue/5 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-innovation-blue/20 text-innovation-blue px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-innovation-blue/30">
            <GraduationCap size={16} /> <span>Student & Graduate Lab</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-poppins font-bold text-white mb-6">
            Master the <span className="text-innovation-blue">Full AI Stack</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            From raw network infrastructure to advanced agentic intelligence. Join our immersive internship program and build the next decade of African technology.
          </p>
        </div>
      </section>

      {/* Curriculum Grid */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-navy mb-4">The Curriculum</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Our program is rigorous, hands-on, and focused on real-world implementation across nine core domains.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {LEARNING_MODULES.map((module, idx) => (
              <div key={idx} className="bg-gray-50 rounded-[40px] p-10 border border-gray-100 flex flex-col h-full hover:shadow-2xl hover:shadow-gray-200 transition-all group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-navy group-hover:text-white transition-colors">
                  {module.icon}
                </div>
                <h3 className="text-2xl font-poppins font-bold text-navy mb-10">{module.category}</h3>
                <div className="space-y-10 flex-grow">
                  {module.items.map((item, i) => (
                    <div key={i} className="relative pl-6 border-l border-gray-200">
                      <div className="absolute -left-[1px] top-0 h-4 w-0.5 bg-innovation-blue"></div>
                      <h4 className="font-bold text-navy mb-2 group-hover:text-innovation-orange transition-colors">{item.name}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab Experience */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-innovation-orange/5 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-video bg-white/5 rounded-[40px] overflow-hidden border border-white/10 relative">
                 <img 
                  src="https://i.postimg.cc/cJDgSwLB/national-ict-hub.jpg" 
                  alt="Deep Shift Lab" 
                  className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl hidden md:block">
                 <div className="text-navy font-bold flex items-center mb-1">
                   <Target className="text-innovation-orange mr-2" size={18} /> 100% Practical
                 </div>
                 <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Lab-Based Learning</div>
              </div>
            </div>
            <div>
               <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-6">Bridge the Gap</h2>
               <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                 Interning at Deep Shift AI isn't about fetching coffee. You'll be assigned to real engineering squads, working on projects that impact millions of lives. Our partners, including **Kampala International University**, help ensure our standards meet global academic and industry benchmarks.
               </p>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                 {[
                   "Senior Engineer Mentorship",
                   "Real-world GPU Projects",
                   "Regional Impact",
                   "Foundational IT Exposure"
                 ].map((item, i) => (
                   <div key={i} className="flex items-center space-x-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                     <CheckCircle2 className="text-innovation-blue shrink-0" size={18} />
                     <span className="text-white text-sm font-semibold">{item}</span>
                   </div>
                 ))}
               </div>
               <Link to="/careers/internships/apply" className="bg-innovation-blue text-white px-10 py-5 rounded-2xl font-bold hover:shadow-xl hover:shadow-innovation-blue/20 transition-all inline-flex items-center text-lg">
                 Apply for Next Cohort <ArrowRight className="ml-2" />
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Ticker */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-poppins font-bold text-navy mb-16">The Deep Shift Advantage</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Hands-on ML / NLP", icon: <Activity className="text-innovation-orange" /> },
              { label: "Linguistic Infrastructure", icon: <Globe2 className="text-innovation-blue" /> },
              { label: "Professional Certificate", icon: <ShieldCheck className="text-innovation-orange" /> },
              { label: "Enterprise IT Skills", icon: <Server className="text-innovation-blue" /> }
            ].map((benefit, i) => (
              <div key={i} className="p-8 rounded-[32px] bg-gray-50 border border-gray-100 group hover:bg-white hover:shadow-2xl transition-all">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-innovation-orange shadow-sm group-hover:rotate-6 transition-transform">
                  {benefit.icon}
                </div>
                <div className="font-bold text-navy text-sm leading-tight">{benefit.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Internships;
