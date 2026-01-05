
import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Settings, 
  Bot, 
  Cpu, 
  BarChart, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Clock, 
  Users, 
  Globe, 
  ShieldCheck, 
  Layers,
  Search,
  PenTool,
  Briefcase,
  Database,
  LineChart,
  Network,
  Lock,
  MessageSquare,
  GraduationCap,
  Lightbulb,
  ClipboardCheck,
  Map,
  TrendingUp,
  Target,
  FileText
} from 'lucide-react';
import { INDUSTRIES } from '../constants';

const ServiceHeader = ({ title, icon, subtitle, colorClass = "innovation-orange" }: { title: string, icon: React.ReactNode, subtitle: string, colorClass?: string }) => (
  <div className="flex items-center space-x-4 mb-8">
    <div className={`p-4 bg-${colorClass}/10 rounded-2xl text-${colorClass}`}>
      {icon}
    </div>
    <div>
      <h2 className="text-3xl font-poppins font-bold text-navy">{title}</h2>
      <p className={`text-${colorClass} font-medium`}>{subtitle}</p>
    </div>
  </div>
);

const Section = ({ id, children, className = "" }: { id: string, children?: React.ReactNode, className?: string }) => (
  <section id={id} className={`py-24 scroll-mt-20 border-b border-gray-100 last:border-0 ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  </section>
);

const Services: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  const consultingServices = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Strategic AI Advisory",
      desc: "We define your AI 'North Star.' Our advisory services help boards and executives understand the competitive landscape and build a 3-5 year vision for AI integration.",
      points: ["Competitive benchmarking", "AI ethics & governance frameworks", "Board-level strategy sessions"]
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Technology Assessment",
      desc: "A deep-dive audit of your current digital stack. We identify bottlenecks in your legacy systems and evaluate if your infrastructure is ready for high-scale AI.",
      points: ["Cloud vs On-premise readiness", "Data pipeline latency audits", "Legacy integration mapping"]
    },
    {
      icon: <ClipboardCheck className="w-8 h-8" />,
      title: "AI Readiness Evaluation",
      desc: "Successful AI adoption is 20% tech and 80% organization. We assess your data quality, employee skills, and cultural readiness for automation.",
      points: ["Data governance maturity", "Skill gap analysis", "Organizational culture survey"]
    },
    {
      icon: <Map className="w-8 h-8" />,
      title: "Implementation Planning",
      desc: "We provide the technical blueprint. From selecting the right models to designing the architecture and milestone roadmaps for a seamless rollout.",
      points: ["Phased deployment roadmaps", "Vendor selection & management", "Technical architecture design"]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Change Management Support",
      desc: "Minimize friction and maximize adoption. We help you manage the human side of the 'Deep Shift' through structured communication and alignment.",
      points: ["Stakeholder alignment programs", "Internal AI communication strategy", "Incentive structure redesign"]
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "ROI Analysis",
      desc: "We prove the business case before you spend a shilling. Our analysts provide data-backed projections on efficiency, cost-saving, and revenue growth.",
      points: ["Cost-benefit modeling", "Efficiency gain benchmarking", "Revenue stream forecasting"]
    }
  ];

  return (
    <div className="bg-white">
      {/* Services Hero */}
      <section className="pt-32 pb-20 bg-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-innovation-orange/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-innovation-blue/5 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-poppins font-bold text-white mb-6">Enterprise AI Services</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Building the intelligent infrastructure for East Africa's leading organizations through custom automation, agents, and proprietary models.
          </p>
          
          {/* Quick Nav */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {[
              { label: 'Automation', target: 'automation' },
              { label: 'AI Agents', target: 'ai-agents' },
              { label: 'Custom LLMs', target: 'custom-llms' },
              { label: 'Consulting', target: 'consulting' },
              { label: 'Corporate Training', target: 'training' }
            ].map((item) => (
              item.target === 'training' ? (
                <Link 
                  key={item.label}
                  to="/careers/training"
                  className="px-6 py-2 rounded-full border border-white/10 text-white hover:bg-innovation-blue transition-all text-sm font-medium bg-white/5 backdrop-blur-sm"
                >
                  {item.label}
                </Link>
              ) : (
                <a 
                  key={item.label}
                  href={`#${item.target}`}
                  className="px-6 py-2 rounded-full border border-white/10 text-white hover:bg-innovation-blue transition-all text-sm font-medium bg-white/5 backdrop-blur-sm"
                >
                  {item.label}
                </a>
              )
            ))}
          </div>
        </div>
      </section>

      {/* 1. AI Automation Section */}
      <Section id="automation">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <ServiceHeader 
              title="AI Automation" 
              subtitle="The Efficiency Engine"
              icon={<Settings size={32} />} 
              colorClass="innovation-orange"
            />
            <p className="text-gray-600 mb-8 leading-relaxed">
              We help businesses identify and automate high-volume, repetitive processes. Our automation solutions integrate seamlessly with legacy systems to eliminate manual errors and drastically reduce operational overhead.
            </p>
            
            <div className="mb-10">
              <h3 className="font-poppins font-bold text-navy mb-4 flex items-center">
                <CheckCircle2 className="mr-2 text-innovation-orange" /> What We Automate
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Business process automation",
                  "Document processing & data extraction",
                  "Workflow optimization",
                  "Legacy system integration",
                  "Repetitive task elimination"
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 px-4 py-2 rounded-xl text-sm text-gray-700 flex items-center">
                    <ArrowRight className="mr-2 w-3 h-3 text-innovation-orange" /> {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h3 className="font-poppins font-bold text-navy mb-4 flex items-center">
                <Globe className="mr-2 text-innovation-blue" /> Industries Served
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Banking", "Healthcare", "Telecom", "Logistics", "Retail", "Manufacturing"].map((ind) => (
                  <span key={ind} className="bg-innovation-blue/10 text-innovation-blue px-3 py-1 rounded-full text-xs font-bold">{ind}</span>
                ))}
              </div>
            </div>

            <div className="bg-navy text-white p-8 rounded-[32px] shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-innovation-orange/10 rounded-bl-full"></div>
              <h4 className="font-bold mb-4 flex items-center"><Zap className="mr-2 text-innovation-orange" /> Impact Metrics</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-innovation-orange">~40%</div>
                  <div className="text-[10px] text-gray-400 uppercase">Cost Saving</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-[10px] text-gray-400 uppercase">Processing</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">99.9%</div>
                  <div className="text-[10px] text-gray-400 uppercase">Accuracy</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col justify-center">
             <div className="bg-white border-2 border-gray-100 p-8 rounded-[40px] shadow-sm relative group">
                <h4 className="font-poppins font-bold text-navy mb-6 flex items-center">
                  <Clock className="mr-2 text-innovation-orange" /> Typical Project Timeline
                </h4>
                <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                   {[
                     { step: "Phase 1", title: "Audit & Discovery", desc: "Process mapping and technical feasibility analysis (Week 1-2)." },
                     { step: "Phase 2", title: "Design & Prototype", desc: "Model selection and initial workflow design (Week 3-4)." },
                     { step: "Phase 3", title: "Build & Training", desc: "Developing custom automation agents and training on data (Week 5-7)." },
                     { step: "Phase 4", title: "Deployment", desc: "Seamless integration with legacy software and UAT (Week 8)." }
                   ].map((item, i) => (
                     <div key={i} className="relative pl-10 group/item">
                       <div className="absolute left-0 top-1 w-8 h-8 bg-white border-2 border-innovation-orange rounded-full z-10 flex items-center justify-center text-[10px] font-bold text-innovation-orange group-hover/item:bg-innovation-orange group-hover/item:text-white transition-colors">
                         {i+1}
                       </div>
                       <div className="font-bold text-navy text-sm mb-1">{item.title}</div>
                       <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                     </div>
                   ))}
                </div>
                <Link to="/contact" className="mt-10 w-full bg-innovation-orange text-white py-4 rounded-2xl font-bold flex items-center justify-center hover:shadow-xl hover:shadow-innovation-orange/20 transition-all">
                  Discuss Your Automation Needs <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
             </div>
          </div>
        </div>
      </Section>

      {/* 2. AI Agents & Agentic AI Section */}
      <Section id="ai-agents" className="bg-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
             <div className="bg-navy rounded-[40px] p-10 text-white shadow-2xl overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-innovation-blue/20 rounded-bl-full pointer-events-none"></div>
                <h3 className="font-poppins font-bold text-xl mb-6 flex items-center">
                  <Network className="mr-3 text-innovation-blue" /> Agentic Intelligence Stack
                </h3>
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center space-x-4">
                    <div className="w-10 h-10 bg-innovation-blue/20 rounded-lg flex items-center justify-center text-innovation-blue font-bold">A</div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest text-innovation-blue mb-1">Perception Layer</div>
                      <p className="text-[10px] text-gray-400">Ingesting real-time data from APIs, databases, and user inputs.</p>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center space-x-4">
                    <div className="w-10 h-10 bg-innovation-orange/20 rounded-lg flex items-center justify-center text-innovation-orange font-bold">B</div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest text-innovation-orange mb-1">Reasoning Engine</div>
                      <p className="text-[10px] text-gray-400">Multi-step planning and self-correction logic using Agentic AI.</p>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center space-x-4">
                    <div className="w-10 h-10 bg-innovation-blue/20 rounded-lg flex items-center justify-center text-innovation-blue font-bold">C</div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest text-innovation-blue mb-1">Action Controller</div>
                      <p className="text-[10px] text-gray-400">Executing tasks autonomously across your business software.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10">
                   <div className="flex justify-between items-center text-xs">
                     <span className="text-gray-500 font-mono tracking-tighter">NODE_EXEC_ID: DS_00459</span>
                     <span className="text-green-400 font-bold uppercase animate-pulse">Running</span>
                   </div>
                </div>
             </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <ServiceHeader 
              title="AI Agents & Agentic AI" 
              subtitle="Autonomous Task Execution"
              icon={<Bot size={32} />} 
              colorClass="innovation-blue"
            />
            <h3 className="text-xl font-poppins font-bold text-navy mb-4">What are AI Agents?</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Standard AI answers questions. **AI Agents solve problems.** Our agentic systems can independently plan, reason, and execute complex multi-step tasks—effectively acting as autonomous digital employees.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div>
                <h4 className="font-bold text-navy mb-3 flex items-center text-sm">
                  <Briefcase size={16} className="text-innovation-blue mr-2" /> Applications
                </h4>
                <ul className="text-xs text-gray-500 space-y-2">
                  <li className="flex items-center"><CheckCircle2 className="w-3 h-3 text-innovation-blue mr-2" /> Customer service automation</li>
                  <li className="flex items-center"><CheckCircle2 className="w-3 h-3 text-innovation-blue mr-2" /> Intelligent task delegation</li>
                  <li className="flex items-center"><CheckCircle2 className="w-3 h-3 text-innovation-blue mr-2" /> Research & data analysis</li>
                  <li className="flex items-center"><CheckCircle2 className="w-3 h-3 text-innovation-blue mr-2" /> Process monitoring & optimization</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-navy mb-3 flex items-center text-sm">
                  <Cpu size={16} className="text-innovation-orange mr-2" /> Technology Approach
                </h4>
                <ul className="text-xs text-gray-500 space-y-2">
                  <li className="flex items-center"><Zap className="w-3 h-3 text-innovation-orange mr-2" /> Self-directed problem solving</li>
                  <li className="flex items-center"><Zap className="w-3 h-3 text-innovation-orange mr-2" /> Memory-augmented reasoning</li>
                  <li className="flex items-center"><Zap className="w-3 h-3 text-innovation-orange mr-2" /> Tool-use capabilities</li>
                  <li className="flex items-center"><Zap className="w-3 h-3 text-innovation-orange mr-2" /> Adaptive feedback loops</li>
                </ul>
              </div>
            </div>
            
            <Link to="/contact" className="bg-navy text-white px-10 py-4 rounded-2xl font-bold hover:bg-innovation-blue transition-all inline-flex items-center shadow-lg">
              Explore AI Agent Solutions <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </Section>

      {/* 3. Custom LLM Development Section */}
      <Section id="custom-llms">
        <div className="text-center mb-16">
          <ServiceHeader 
            title="Custom LLM Development" 
            subtitle="Proprietary Business Intelligence"
            icon={<Database size={32} />} 
            colorClass="innovation-orange"
          />
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Stop relying on public models that risk your privacy. We build and fine-tune Large Language Models (LLMs) on your own business data, optimized for your domain.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
           <div className="p-8 rounded-[40px] bg-gray-50 border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-innovation-orange">
                <ShieldCheck size={32} />
              </div>
              <h4 className="text-xl font-poppins font-bold text-navy mb-4">Why Custom LLMs?</h4>
              <ul className="text-sm text-gray-500 space-y-3">
                <li>• Domain-specific knowledge</li>
                <li>• Brand voice consistency</li>
                <li>• Proprietary data training</li>
                <li>• Absolute privacy control</li>
                <li>• Multilingual capabilities</li>
              </ul>
           </div>
           
           <div className="lg:col-span-2 bg-navy rounded-[40px] p-10 text-white relative overflow-hidden flex flex-col justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-innovation-orange/10 to-transparent"></div>
              <h4 className="text-2xl font-poppins font-bold mb-8 relative z-10 flex items-center">
                <Settings className="mr-3 text-innovation-orange" /> Our LLM Process
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
                 {[
                   { step: 1, title: "Gathering", desc: "Requirements & scoping." },
                   { step: 2, title: "Curation", desc: "Data prep & cleaning." },
                   { step: 3, title: "Tuning", desc: "Model fine-tuning." },
                   { step: 4, title: "Validation", desc: "Rigorous testing." },
                   { step: 5, title: "Deployment", desc: "Production scaling." }
                 ].map((p, i) => (
                   <div key={i} className="text-center group">
                      <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 font-bold group-hover:bg-innovation-orange transition-colors">
                        {p.step}
                      </div>
                      <div className="font-bold text-xs mb-1">{p.title}</div>
                      <p className="text-[10px] text-gray-400">{p.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <div>
              <h3 className="font-poppins font-bold text-navy text-xl mb-6">Technical Capabilities</h3>
              <div className="space-y-4">
                 {[
                   { label: "Architecture", value: "Custom Transformers (GPT/Llama based)" },
                   { label: "Infrastructure", value: "GPU-accelerated Inference" },
                   { label: "Latency", value: "Sub-100ms response targets" },
                   { label: "Privacy", value: "On-Premise or Private Cloud" }
                 ].map((cap, i) => (
                   <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-sm text-gray-500">{cap.label}</span>
                      <span className="text-sm font-bold text-navy">{cap.value}</span>
                   </div>
                 ))}
              </div>
           </div>
           <div>
              <h3 className="font-poppins font-bold text-navy text-xl mb-6">Integration Options</h3>
              <div className="grid grid-cols-2 gap-4">
                 {[
                   { icon: <Globe />, label: "Public API" },
                   { icon: <Lock />, label: "Private Cloud" },
                   { icon: <Database />, label: "On-Premise" },
                   { icon: <Network />, label: "Edge/Mobile" }
                 ].map((opt, i) => (
                   <div key={i} className="bg-gray-50 p-6 rounded-3xl flex items-center space-x-4 border border-gray-100 hover:border-innovation-orange transition-colors">
                      <div className="text-innovation-orange">{opt.icon}</div>
                      <span className="text-sm font-bold text-navy">{opt.label}</span>
                   </div>
                 ))}
              </div>
              <Link to="/contact" className="mt-8 w-full bg-innovation-orange text-white py-4 rounded-2xl font-bold flex items-center justify-center shadow-xl shadow-innovation-orange/20">
                Start Your LLM Project <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
           </div>
        </div>
      </Section>

      {/* 4. AI Consulting Section - Expanded */}
      <Section id="consulting" className="bg-navy text-white rounded-[60px] my-10 mx-4 lg:mx-8 px-8 lg:px-20 py-24 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-innovation-blue/5 blur-[120px] rounded-full"></div>
        <div className="relative z-10">
          <div className="mb-20 text-center lg:text-left lg:max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-1.5 rounded-full mb-6">
              <BarChart className="text-innovation-blue w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Strategic Advisory</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-6">Strategic AI Consulting</h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              The 'Deep Shift' into AI requires more than just code. We provide the comprehensive roadmap and organizational alignment needed to turn technology into sustainable business value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
             {consultingServices.map((service, i) => (
               <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[40px] hover:bg-white/10 transition-all group flex flex-col h-full">
                  <div className="text-innovation-orange mb-6 group-hover:scale-110 transition-transform origin-left">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-poppins font-bold mb-4 text-white">{service.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed mb-8 flex-grow">{service.desc}</p>
                  <ul className="space-y-3">
                    {service.points.map((p, idx) => (
                      <li key={idx} className="flex items-center text-[11px] font-bold text-gray-300 uppercase tracking-tight">
                        <CheckCircle2 size={14} className="text-innovation-blue mr-2 shrink-0" /> {p}
                      </li>
                    ))}
                  </ul>
               </div>
             ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="lg:max-w-xl">
              <h3 className="text-2xl md:text-3xl font-poppins font-bold mb-4 flex items-center">
                <Target className="mr-3 text-innovation-orange" /> Ready for a Strategy Session?
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Our lab experts will walk you through a high-level assessment of your current operations and identify the immediate 'low-hanging fruit' for AI integration.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
               <Link to="/contact" className="bg-innovation-orange text-white px-10 py-5 rounded-2xl font-bold text-center hover:shadow-xl hover:shadow-innovation-orange/20 transition-all">
                 Book Consultation
               </Link>
               <Link to="/contact" className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-2xl font-bold text-center hover:bg-white/20 transition-all flex items-center justify-center">
                 <FileText className="mr-2 w-5 h-5" /> Request Services Pack
               </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* 5. AI Training & Education Section (Redirects to Careers/Training) */}
      <Section id="training">
        <div className="text-center mb-20">
          <ServiceHeader 
            title="AI Training & Education" 
            subtitle="Upskilling the Workforce"
            icon={<GraduationCap size={32} />} 
            colorClass="innovation-orange"
          />
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Empowering teams to leverage AI tools effectively in their daily workflow through role-specific, interactive workshops.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            {
              icon: <Briefcase />,
              title: "Office Professionals",
              desc: "Productivity hacks, data analysis assistants, and report automation.",
              duration: "1-2 Days",
              format: "Interactive Workshops"
            },
            {
              icon: <Search />,
              title: "For Researchers",
              desc: "Literature reviews, academic assistants, and automated data viz.",
              duration: "2-3 Days",
              format: "Hands-on Training"
            },
            {
              icon: <PenTool />,
              title: "Media & Content",
              desc: "AI for video, image generation, SEO, and content optimization.",
              duration: "1-2 Days",
              format: "Practical Workshops"
            },
            {
              icon: <Zap />,
              title: "Business Leaders",
              desc: "Strategy, governance, ROI, and ethical AI implementation.",
              duration: "Half-Day to 1 Day",
              format: "Executive Briefing"
            }
          ].map((prog, i) => (
            <div key={i} className="bg-white border-2 border-gray-100 p-8 rounded-[40px] shadow-sm hover:border-innovation-orange transition-all flex flex-col group">
               <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 text-navy group-hover:bg-innovation-orange group-hover:text-white transition-colors">
                 {prog.icon}
               </div>
               <h4 className="text-lg font-poppins font-bold text-navy mb-4">{prog.title}</h4>
               <p className="text-xs text-gray-500 mb-6 flex-grow">{prog.desc}</p>
               <div className="space-y-2 pt-4 border-t border-gray-100">
                  <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <Clock size={12} className="mr-2" /> {prog.duration}
                  </div>
                  <div className="flex items-center text-[10px] font-bold text-innovation-blue uppercase tracking-widest">
                    <Layers size={12} className="mr-2" /> {prog.format}
                  </div>
               </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           <div className="lg:col-span-2 bg-gray-50 rounded-[40px] p-10 border border-gray-100">
             <h3 className="text-2xl font-poppins font-bold text-navy mb-8">Delivery & Logistics</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                   <h4 className="font-bold text-sm uppercase text-innovation-orange tracking-widest mb-4">Delivery Options</h4>
                   <ul className="space-y-3">
                     {["On-site corporate training", "Public interactive workshops", "Virtual immersive sessions", "Custom curriculum development", "Post-training support packages"].map((opt) => (
                       <li key={opt} className="flex items-center text-sm text-gray-600">
                         <div className="w-1.5 h-1.5 bg-innovation-orange rounded-full mr-3"></div> {opt}
                       </li>
                     ))}
                   </ul>
                </div>
                <div>
                   <h4 className="font-bold text-sm uppercase text-innovation-blue tracking-widest mb-4">Pricing Models</h4>
                   <ul className="space-y-3">
                     {["Corporate packages (10-50 pax)", "Individual workshop registration", "Custom multi-session pricing", "Government & NGO discounts"].map((opt) => (
                       <li key={opt} className="flex items-center text-sm text-gray-600">
                         <div className="w-1.5 h-1.5 bg-innovation-blue rounded-full mr-3"></div> {opt}
                       </li>
                     ))}
                   </ul>
                </div>
             </div>
           </div>
           
           <div className="bg-innovation-orange rounded-[40px] p-10 text-white flex flex-col justify-center items-center text-center shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-150 duration-700"></div>
              <MessageSquare className="w-12 h-12 mb-6" />
              <h3 className="text-2xl font-poppins font-bold mb-4">Training Academy</h3>
              <p className="text-sm mb-8 opacity-90">Visit our dedicated Academy page to explore specific learning paths and request a proposal.</p>
              <Link to="/careers/training" className="w-full bg-navy text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-colors shadow-lg">
                Go to Training Academy
              </Link>
           </div>
        </div>
      </Section>
    </div>
  );
};

export default Services;
