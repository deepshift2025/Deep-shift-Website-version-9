
import React, { useState } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Search, 
  PenTool, 
  Zap, 
  CheckCircle2, 
  Clock, 
  Users, 
  Globe, 
  BarChart3, 
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  BookOpen,
  Layout,
  Laptop,
  Monitor,
  Code,
  Layers,
  ChevronRight,
  Trophy,
  Target,
  Shield,
  Gavel,
  Stethoscope,
  TrendingUp,
  Terminal,
  Brain
} from 'lucide-react';
import { Link } from 'react-router-dom';

const TRAINING_PROGRAMS = [
  {
    id: 'office',
    icon: <Briefcase className="w-8 h-8" />,
    title: 'For Office Professionals',
    subtitle: 'The Productivity Multiplier',
    color: 'innovation-orange',
    desc: 'Master the tools that turn hours of work into seconds. This program focuses on administrative efficiency and data management.',
    learn: [
      'Advanced Prompt Engineering for daily tasks',
      'Automating email and calendar management',
      'AI-powered document drafting & summarization',
      'Building custom GPTs for specific office workflows',
      'Excel AI: Natural language data analysis'
    ],
    details: {
      duration: "2 Days (12 Hours)",
      tools: ["Microsoft Copilot", "ChatGPT Plus", "Gemini Business", "Claude 3.5"],
      modules: [
        { title: "Foundations of Generative AI", desc: "Understanding how LLMs work and the art of 'Single-Shot' vs 'Chain-of-Thought' prompting." },
        { title: "The Modern Inbox", desc: "Using AI to prioritize emails, draft replies in your voice, and manage complex schedules." },
        { title: "Document Superpowers", desc: "Drafting reports, summarizing long PDF threads, and creating professional presentations from scratch." },
        { title: "Data Analysis for Non-Techies", desc: "Using natural language to query spreadsheets, generate charts, and find trends in business data." }
      ]
    }
  },
  {
    id: 'educators',
    icon: <BookOpen className="w-8 h-8" />,
    title: 'AI for Educators',
    subtitle: 'Empowering the Classroom',
    color: 'innovation-blue',
    desc: 'Transform teaching and learning. Learn how to use AI to personalize student experiences and reduce administrative burden.',
    learn: [
      'Automated grading and feedback systems',
      'Generating personalized lesson plans',
      'AI for inclusive education and accessibility',
      'Teaching students about AI ethics',
      'Detecting AI-generated academic work'
    ],
    details: {
      duration: "2 Days (10 Hours)",
      tools: ["MagicSchool AI", "Canva for Education", "Quizizz AI", "Grammarly"],
      modules: [
        { title: "The AI-Assisted Teacher", desc: "Automating lesson planning, rubric creation, and administrative reporting." },
        { title: "Personalized Learning Paths", desc: "Using AI to adapt content to different student levels and learning styles." },
        { title: "Ethics in the Classroom", desc: "Addressing academic integrity, bias, and teaching AI literacy to students." },
        { title: "Content Generation", desc: "Creating high-quality educational videos, diagrams, and reading materials instantly." }
      ]
    }
  },
  {
    id: 'sales-marketing',
    icon: <TrendingUp className="w-8 h-8" />,
    title: 'AI for Sales & Marketing',
    subtitle: 'Revenue Acceleration',
    color: 'innovation-orange',
    desc: 'Supercharge your growth engine. Learn to use AI for high-conversion copy, lead scoring, and automated customer journeys.',
    learn: [
      'Autonomous lead generation techniques',
      'Personalized email outreach at scale',
      'AI-driven market research and sentiment analysis',
      'Generating high-converting ad creative',
      'Predictive analytics for sales forecasting'
    ],
    details: {
      duration: "2 Days (14 Hours)",
      tools: ["HubSpot AI", "Apollo.io", "Jasper", "AdCreative.ai", "Midjourney"],
      modules: [
        { title: "Generative Copywriting", desc: "Training AI on brand voice to create consistent social posts, blogs, and ads." },
        { title: "Intelligent Prospecting", desc: "Using AI agents to find, score, and research potential clients automatically." },
        { title: "Customer Journey Automation", desc: "Building triggers and AI-driven responses for the entire sales funnel." },
        { title: "Analytics & ROI", desc: "Tracking campaign performance and predicting future trends using ML models." }
      ]
    }
  },
  {
    id: 'developers',
    icon: <Terminal className="w-8 h-8" />,
    title: 'AI for Developers',
    subtitle: 'The Augmented Engineer',
    color: 'innovation-blue',
    desc: 'Ship faster with higher quality. Learn to integrate AI into your coding workflow, from architecture to testing.',
    learn: [
      'Mastering GitHub Copilot and Cursor',
      'Automated unit test generation',
      'Legacy code refactoring with LLMs',
      'Building RAG (Retrieval Augmented Generation) apps',
      'Deploying and fine-tuning open-source models'
    ],
    details: {
      duration: "3 Days (18 Hours)",
      tools: ["GitHub Copilot", "Cursor", "LangChain", "v0.dev", "Hugging Face"],
      modules: [
        { title: "Pair Programming with AI", desc: "Advanced prompting for complex logic, debugging, and boilerplate generation." },
        { title: "Building AI-Powered Apps", desc: "Integrating LLM APIs, managing context windows, and vector databases." },
        { title: "Testing & Documentation", desc: "Automating docstring creation, READMEs, and comprehensive test suites." },
        { title: "Model Deployment", desc: "Understanding quantization and hosting models locally vs. cloud providers." }
      ]
    }
  },
  {
    id: 'cybersecurity',
    icon: <Shield className="w-8 h-8" />,
    title: 'AI in Cybersecurity',
    subtitle: 'Intelligent Defense',
    color: 'innovation-orange',
    desc: 'Protect your infrastructure with predictive intelligence. Learn how AI is used for threat hunting and incident response.',
    learn: [
      'Detecting anomalies in network traffic',
      'AI-powered phishing and malware detection',
      'Automating security operations (SOAR)',
      'Understanding adversarial AI attacks',
      'Identity and access management with ML'
    ],
    details: {
      duration: "3 Days (15 Hours)",
      tools: ["Microsoft Sentinel", "Splunk AI", "Darktrace", "ThreatConnect"],
      modules: [
        { title: "Threat Detection Models", desc: "Building and monitoring ML models that identify zero-day vulnerabilities." },
        { title: "Automated Incident Response", desc: "Using AI to triage alerts and execute containment strategies in milliseconds." },
        { title: "The Dark Side: Adversarial AI", desc: "How attackers use AI and how to defend against prompt injection and data poisoning." },
        { title: "Compliance & Auditing", desc: "Using AI to ensure continuous compliance with frameworks like ISO 27001." }
      ]
    }
  },
  {
    id: 'legal',
    icon: <Gavel className="w-8 h-8" />,
    title: 'For Legal Practitioners',
    subtitle: 'Algorithmic Justice',
    color: 'innovation-blue',
    desc: 'Modernize your practice. Learn to use AI for high-speed research, contract analysis, and document drafting.',
    learn: [
      'AI-powered case law research',
      'Automated contract review and risk flagging',
      'Drafting legal pleadings and correspondence',
      'AI for discovery and litigation support',
      'Ethics and confidentiality in legal AI'
    ],
    details: {
      duration: "2 Days (10 Hours)",
      tools: ["Casetext CoCounsel", "Luminance", "Harvey AI", "Custom Legal LLMs"],
      modules: [
        { title: "The AI Associate", desc: "Summarizing depositions, identifying relevant precedents, and searching case files." },
        { title: "Contract Intelligence", desc: "Scanning agreements for non-standard clauses and missing protections." },
        { title: "Client Communication", desc: "Drafting clear, concise legal explanations for non-lawyers using AI." },
        { title: "Ethical Compliance", desc: "Navigating attorney-client privilege and the duty of competence in the AI era." }
      ]
    }
  },
  {
    id: 'medical',
    icon: <Stethoscope className="w-8 h-8" />,
    title: 'For Medical Practitioners',
    subtitle: 'Precision Healthcare',
    color: 'innovation-orange',
    desc: 'Enhance patient outcomes. Learn to use AI for diagnostics, administrative relief, and personalized treatment planning.',
    learn: [
      'AI-assisted medical imaging analysis',
      'Automating clinical notes and documentation',
      'Predictive analytics for patient triage',
      'AI for personalized drug dosage and treatment',
      'Privacy and HIPAA/Data Act compliance'
    ],
    details: {
      duration: "2 Days (12 Hours)",
      tools: ["Med-PaLM 2", "Glass Health", "DAX Copilot", "Radiology AI toolsets"],
      modules: [
        { title: "Clinical Decision Support", desc: "Using AI to cross-reference symptoms with vast medical databases for diagnosis assistance." },
        { title: "Reducing Burnout", desc: "Automating EHR documentation and administrative paperwork using ambient voice AI." },
        { title: "Predictive Health Monitoring", desc: "Analyzing patient data trends to anticipate and prevent critical events." },
        { title: "Data Security in Health", desc: "Managing sensitive patient information within secure, air-gapped AI environments." }
      ]
    }
  },
  {
    id: 'research',
    icon: <Search className="w-8 h-8" />,
    title: 'For Researchers',
    subtitle: 'Accelerated Discovery',
    color: 'innovation-blue',
    desc: 'Empower your research team with AI that can synthesize vast amounts of literature and data patterns instantly.',
    learn: [
      'AI-assisted literature reviews and mapping',
      'Automated data cleaning and visualization',
      'Grant proposal and technical report generation',
      'Citation management and academic ethics',
      'Primary data analysis with AI agents'
    ],
    details: {
      duration: "3 Days (18 Hours)",
      tools: ["Elicit", "Consensus", "ResearchRabbit", "Zotero AI", "Julius AI"],
      modules: [
        { title: "AI-Powered Literature Synthesis", desc: "Finding peer-reviewed sources and synthesizing common themes across hundreds of papers in minutes." },
        { title: "Data Wrangling with LLMs", desc: "Cleaning messy datasets, identifying outliers, and generating descriptive statistics using code-generation agents." },
        { title: "Academic Integrity & Ethics", desc: "Navigating the ethical landscape of AI in academia, managing citations, and avoiding hallucination risks." },
        { title: "Proposal Engineering", desc: "Structure high-impact grant applications and technical reports using structured AI drafting techniques." }
      ]
    }
  },
  {
    id: 'media',
    icon: <PenTool className="w-8 h-8" />,
    title: 'For Media & Content',
    subtitle: 'Generative Excellence',
    color: 'innovation-orange',
    desc: 'Unlock the future of storytelling. Learn to integrate generative AI into your creative pipeline without losing brand voice.',
    learn: [
      'Text-to-Image & Text-to-Video production',
      'Algorithmic SEO and content optimization',
      'Social media automation and trend spotting',
      'AI voiceovers and multi-language dubbing',
      'Copyright and ethical AI in creative fields'
    ],
    details: {
      duration: "2 Days (12 Hours)",
      tools: ["Midjourney", "Canva Magic", "ElevenLabs", "HeyGen", "Jasper"],
      modules: [
        { title: "Visual Prompting Masterclass", desc: "Creating high-fidelity brand assets, social media graphics, and concept art using diffusion models." },
        { title: "The AI Video Pipeline", desc: "Generating avatars, realistic voiceovers, and short-form video content from simple text scripts." },
        { title: "SEO & Brand Voice Strategy", desc: "Training AI on your brand's unique style to produce consistent, high-ranking copy at scale." },
        { title: "Legal & Copyright Framework", desc: "Understanding the current landscape of AI ownership and how to protect your creative rights." }
      ]
    }
  },
  {
    id: 'leaders',
    icon: <Zap className="w-8 h-8" />,
    title: 'For Business Leaders',
    subtitle: 'The Strategic Advantage',
    color: 'innovation-blue',
    desc: 'An executive-level briefing on navigating the AI revolution. Focus on ROI, governance, and long-term strategy.',
    learn: [
      'Identifying high-ROI AI opportunities',
      'Governance, ethics, and data privacy compliance',
      'Managing AI-driven organizational change',
      'Build vs. Buy: Selecting the right AI stack',
      'Understanding the Uganda Data Protection Act'
    ],
    details: {
      duration: "1 Day (6 Hours)",
      tools: ["Enterprise AI Dashboards", "ROI Calculators", "Risk Assessment Frameworks"],
      modules: [
        { title: "The AI Economy for Executives", desc: "A non-technical deep dive into how AI is disrupting your specific industry vertical." },
        { title: "ROI & Capability Mapping", desc: "Frameworks for identifying which departments to automate first based on cost-benefit analysis." },
        { title: "Ethics, Policy & Compliance", desc: "Implementing the Uganda Data Protection Act and ensuring your AI usage is bias-free and secure." },
        { title: "Organizational Transformation", desc: "Strategies for upskilling your workforce and overcoming employee resistance to automation." }
      ]
    }
  }
];

const Training: React.FC = () => {
  const [selectedId, setSelectedId] = useState(TRAINING_PROGRAMS[0].id);
  
  const activeProgram = TRAINING_PROGRAMS.find(p => p.id === selectedId) || TRAINING_PROGRAMS[0];

  return (
    <div className="pt-24 bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-navy py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-innovation-orange/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-innovation-blue/5 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-innovation-orange/20 text-innovation-orange px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-innovation-orange/30">
            <GraduationCap size={16} /> <span>Corporate Academy</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-poppins font-bold text-white mb-6 leading-tight">
            Empower Your Workforce <br />
            with <span className="text-innovation-blue">Applied Intelligence</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10">
            AI is only as powerful as the people who operate it. We provide world-class, role-specific training to ensure your organization stays ahead of the curve.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <a href="#explorer" className="bg-innovation-orange text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl hover:shadow-innovation-orange/20 transition-all">
               Explore Programs
             </a>
             <Link to="/contact" state={{ interest: 'Corporate Training' }} className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all">
               Request Proposal
             </Link>
          </div>
        </div>
      </section>

      {/* Program Explorer (Deep Dive) */}
      <section id="explorer" className="py-24 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-poppins font-bold text-navy mb-4">Program Explorer</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Select a path below to see a detailed curriculum and toolset breakdown.</p>
          </div>

          <div className="bg-white rounded-[48px] shadow-2xl shadow-navy/5 border border-gray-100 overflow-hidden flex flex-col lg:flex-row min-h-[750px]">
            {/* Sidebar Navigation */}
            <div className="lg:w-80 bg-gray-50 border-r border-gray-100 p-6 flex flex-col gap-2 overflow-y-auto custom-scrollbar max-h-[850px] lg:max-h-none">
              {TRAINING_PROGRAMS.map((prog) => (
                <button
                  key={prog.id}
                  onClick={() => setSelectedId(prog.id)}
                  className={`w-full text-left p-5 rounded-2xl transition-all flex items-center space-x-4 border ${
                    selectedId === prog.id 
                    ? 'bg-white border-innovation-orange/20 shadow-md ring-1 ring-innovation-orange/5' 
                    : 'bg-transparent border-transparent hover:bg-white/50 text-gray-500'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${selectedId === prog.id ? (prog.color === 'innovation-orange' ? 'bg-innovation-orange text-white' : 'bg-innovation-blue text-white') : 'bg-gray-100 text-gray-400'}`}>
                    {React.cloneElement(prog.icon as React.ReactElement, { size: 20 })}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-navy leading-tight">{prog.title}</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-0.5">{prog.subtitle}</div>
                  </div>
                </button>
              ))}

              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="bg-navy rounded-2xl p-5 text-white">
                  <div className="flex items-center space-x-2 text-innovation-orange mb-3">
                    <Target size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest">Custom Paths</span>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-relaxed mb-4">Need a mix of modules? We build custom curricula for specialized teams.</p>
                  <Link to="/contact" className="text-xs font-bold flex items-center hover:text-innovation-orange transition-colors">
                    Talk to an Expert <ChevronRight size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 lg:p-12 animate-in fade-in duration-500 slide-in-from-right-4 overflow-y-auto custom-scrollbar max-h-[850px] lg:max-h-none">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                  <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 ${activeProgram.color === 'innovation-orange' ? 'bg-innovation-orange/10 text-innovation-orange' : 'bg-innovation-blue/10 text-innovation-blue'}`}>
                    <Clock size={12} /> <span>{activeProgram.details.duration}</span>
                  </div>
                  <h3 className="text-3xl font-poppins font-bold text-navy">{activeProgram.title}</h3>
                  <p className="text-gray-500 mt-2">{activeProgram.desc}</p>
                </div>
                <Link to="/contact" state={{ interest: activeProgram.title }} className="shrink-0 bg-navy text-white px-8 py-3 rounded-xl font-bold hover:bg-innovation-orange transition-all flex items-center shadow-lg">
                  Request Info Pack <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Modules */}
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center">
                    <Layers size={14} className="mr-2 text-innovation-orange" /> Curriculum Modules
                  </h4>
                  <div className="space-y-6">
                    {activeProgram.details.modules.map((mod, idx) => (
                      <div key={idx} className="group">
                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-xs font-bold text-gray-400 group-hover:bg-innovation-orange/10 group-hover:text-innovation-orange transition-colors shrink-0">
                            0{idx + 1}
                          </div>
                          <div>
                            <h5 className="font-bold text-navy text-sm mb-1 group-hover:text-innovation-orange transition-colors">{mod.title}</h5>
                            <p className="text-xs text-gray-500 leading-relaxed">{mod.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side: Tools & Learning */}
                <div className="space-y-10">
                  <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center">
                      <Monitor size={14} className="mr-2 text-innovation-blue" /> Tools You'll Master
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeProgram.details.tools.map((tool) => (
                        <span key={tool} className="bg-white px-4 py-2 rounded-xl text-xs font-bold text-navy border border-gray-200 flex items-center shadow-sm">
                          <Code size={12} className="mr-2 text-innovation-blue opacity-50" /> {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center">
                      <Trophy size={14} className="mr-2 text-innovation-orange" /> Key Outcomes
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {activeProgram.learn.map((outcome, idx) => (
                        <div key={idx} className="flex items-start space-x-3 text-xs text-gray-600 bg-white p-3 rounded-xl border border-gray-50 shadow-sm">
                          <CheckCircle2 size={16} className={`shrink-0 ${activeProgram.color === 'innovation-orange' ? 'text-innovation-orange' : 'text-innovation-blue'}`} />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Options */}
      <section className="py-24 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">Flexible Delivery Options</h2>
              <p className="text-gray-400 mb-10 text-lg">We bring our expertise to you, wherever you are. Select the format that best fits your company culture.</p>
              
              <div className="space-y-8">
                {[
                  { icon: <Users />, title: "On-Site Workshops", desc: "Interactive, face-to-face sessions at your office premises. Best for team-building and complex workflow mapping." },
                  { icon: <Globe />, title: "Virtual Immersion", desc: "High-definition remote training via video conference. Includes live coding, screen sharing, and collaborative tasks." },
                  { icon: <Layout />, title: "Custom Hybrid", desc: "A blend of recorded foundational modules and live expert Q&A sessions tailored to your schedules." }
                ].map((item, i) => (
                  <div key={i} className="flex space-x-6 items-start">
                    <div className="p-3 bg-white/5 rounded-2xl text-innovation-orange">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-white/5 rounded-[60px] overflow-hidden border border-white/10 relative p-8 flex items-center justify-center">
                 <img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000" 
                  alt="Training Session" 
                  className="w-full h-full object-cover rounded-[40px] opacity-40 grayscale"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent"></div>
                 <div className="absolute bottom-12 left-12 right-12 bg-white p-8 rounded-3xl shadow-2xl">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-innovation-orange rounded-full flex items-center justify-center text-white">
                        <Sparkles />
                      </div>
                      <div>
                        <div className="text-navy font-bold">100% Practical</div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase">No Theory, Just Tools</div>
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs italic">"The training at Deep Shift AI transformed how our marketing team handles data. We saved 15 hours a week within the first month."</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Models */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-poppins font-bold text-navy mb-4">Investment Tiers</h2>
            <p className="text-gray-500">Transparent pricing models designed for impact at any scale.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Corporate Package",
                group: "10-50 Pax",
                icon: <Briefcase />,
                features: ["Custom Curriculum", "On-site Delivery", "Post-training Support", "Certification Exam"],
                color: "navy"
              },
              {
                title: "Executive Coaching",
                group: "1-on-1 or Small Team",
                icon: <Zap />,
                features: ["Strategic Roadmapping", "Strict Confidentiality", "Tech Stack Audit", "Direct Expert Access"],
                color: "innovation-orange"
              },
              {
                title: "NGO & Government",
                group: "Scalable Solutions",
                icon: <ShieldCheck />,
                features: ["Accessibility Focused", "Compliance Support", "Subsidized Rates", "Impact Reporting"],
                color: "innovation-blue"
              }
            ].map((plan, i) => (
              <div key={i} className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 flex flex-col h-full hover:border-innovation-orange/20 transition-all">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${plan.color === 'navy' ? 'bg-navy text-white' : plan.color === 'innovation-orange' ? 'bg-innovation-orange text-white' : 'bg-innovation-blue text-white'}`}>
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-poppins font-bold text-navy mb-2">{plan.title}</h3>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-8">{plan.group}</div>
                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-center text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-gray-200 rounded-full mr-3"></div> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className={`w-full py-4 rounded-2xl font-bold text-center transition-all ${plan.color === 'innovation-orange' ? 'bg-innovation-orange text-white' : 'bg-navy text-white'}`}>
                  Request Pricing
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-innovation-orange rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-innovation-orange/30">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <MessageSquare className="w-16 h-16 text-white mx-auto mb-8 opacity-80" />
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-white mb-8">Ready to Upskill Your Team?</h2>
              <p className="text-white/80 text-xl max-w-2xl mx-auto mb-12">
                Download our training catalog or request a customized proposal for your organization today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                 <Link to="/contact" className="w-full sm:w-auto bg-navy text-white px-12 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all">
                   Request Training Proposal
                 </Link>
                 <a href="#" className="text-white font-bold flex items-center hover:translate-x-2 transition-transform">
                   Download Catalog <ArrowRight className="ml-2" />
                 </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Training;
