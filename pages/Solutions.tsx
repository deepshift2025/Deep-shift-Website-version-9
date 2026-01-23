import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Stethoscope, 
  Globe, 
  Sprout, 
  BookOpen, 
  Building2, 
  Users,
  CheckCircle2,
  ArrowRight,
  Zap,
  Gavel,
  Coins,
  Trophy,
  Activity,
  Shirt,
  Share2,
  UserPlus,
  MessageSquare,
  Target,
  Rocket,
  GraduationCap,
  Library,
  BrainCircuit,
  Apple,
  FileText,
  Clock,
  Compass
} from 'lucide-react';

const FEATURED_PRODUCTS = [
  {
    title: "AI UG LegalAid",
    category: "Legal & Justice",
    icon: <Gavel className="w-8 h-8" />,
    color: "innovation-orange",
    description: "Trained on Ugandan law and precedents. Provides affordable legal advice for citizens and high-speed research tools for lawyers, students, and police.",
    features: ["Case Law Analysis", "Legal Document Drafting", "Multilingual Support", "Practitioner Dashboard"]
  },
  {
    title: "AI SACCO Manager",
    category: "FinTech",
    icon: <Coins className="w-8 h-8" />,
    color: "innovation-blue",
    description: "Intelligent management for Savings and Credit Co-operatives. Automates credit scoring, loan approvals, and member communication.",
    features: ["Predictive Default Risk", "Automated Bookkeeping", "Member Voice Portal", "Financial Reporting"]
  },
  {
    title: "AI Tourism Assistant",
    category: "Tourism & Hospitality",
    icon: <Compass className="w-8 h-8" />,
    color: "innovation-orange",
    description: "An intelligent travel companion that analyzes regional tourism data to generate personalized itineraries, suggest optimal flights, and facilitate seamless bookings.",
    features: ["Smart Itinerary Generation", "Flight & Hotel Recommendations", "Trend Data Analysis", "Integrated Booking Support"]
  },
  {
    title: "AI School ERP",
    category: "Education",
    icon: <GraduationCap className="w-8 h-8" />,
    color: "innovation-blue",
    description: "Comprehensive administration system for schools and universities. Automates enrollment, fee collection, and institutional resource planning.",
    features: ["Financial Automation", "Student Information System", "Staff Management", "Smart Scheduling"]
  },
  {
    title: "AI Learning Hub (LMS)",
    category: "Education",
    icon: <Library className="w-8 h-8" />,
    color: "innovation-orange",
    description: "Adaptive Learning Management System. Delivers personalized curriculum, adaptive testing, and AI-assisted content creation for teachers.",
    features: ["Personalized Study Paths", "Automated Grading", "Teacher Co-pilot", "Learning Analytics"]
  },
  {
    title: "Automated Recruitment",
    category: "Human Resources",
    icon: <UserPlus className="w-8 h-8" />,
    color: "innovation-blue",
    description: "End-to-end talent acquisition. Matches CVs to JDs, conducts attitude assessments, and handles autonomous interviewing and onboarding.",
    features: ["JD Matching Engine", "Psychometric Profiling", "AI Video Interviews", "Digital Onboarding"]
  },
  {
    title: "Omni-Channel Voice Agents",
    category: "Customer Experience",
    icon: <MessageSquare className="w-8 h-8" />,
    color: "innovation-orange",
    description: "Advanced voice and text chatbots integrated with WhatsApp and Telegram. Designed to boost sales and convert leads 24/7.",
    features: ["Multi-platform Sync", "Natural Voice Synthesis", "Lead Conversion Logic", "Bilingual Capabilities"]
  },
  {
    title: "Leads Generation Pro",
    category: "Sales & Marketing",
    icon: <Target className="w-8 h-8" />,
    color: "innovation-blue",
    description: "Autonomous lead scoring and nurturing. Executes email and SMS campaigns with self-converting AI closing capabilities.",
    features: ["Intent Scoring", "Auto-Campaign Scaling", "Sentiment Analysis", "CRM Integration"]
  },
  {
    title: "AI Health Monitor",
    category: "Healthcare",
    icon: <Activity className="w-8 h-8" />,
    color: "innovation-orange",
    description: "Real-time health tracking and predictive diagnostic system for healthcare providers and remote patient monitoring.",
    features: ["Vitals Analysis", "Early Warning System", "Doctor-Patient Bridge", "History Summarization"]
  },
  {
    title: "Virtual Try-On",
    category: "Retail & Fashion",
    icon: <Shirt className="w-8 h-8" />,
    color: "innovation-blue",
    description: "AR-powered virtual fitting room using computer vision. Allows customers to try on clothes virtually, reducing returns and boosting sales.",
    features: ["Size Recommendation", "Real-time AR Overlay", "Catalog Integration", "Mobile-first Experience"]
  },
  {
    title: "Auto-Content Creator",
    category: "Media & Marketing",
    icon: <Share2 className="w-8 h-8" />,
    color: "innovation-orange",
    description: "AI-powered tool that generates content and auto-posts across all social platforms based on brand guidelines and trends.",
    features: ["Brand Voice Guardrails", "Multi-platform Scheduling", "Trend Spotting", "Visual Asset Generation"]
  },
  {
    title: "AI Sports Manager",
    category: "Sports & Leisure",
    icon: <Trophy className="w-8 h-8" />,
    color: "innovation-blue",
    description: "Performance tracking and management for athletes and clubs. Analyzes player data to optimize training and tactical decisions.",
    features: ["Tactical Simulation", "Injury Prediction", "Talent Scouting", "Performance Metrics"]
  }
];

const UNDER_DEVELOPMENT = [
  {
    title: "Prisoner Mental Wellness System",
    category: "Health & Social Justice",
    progress: 25,
    icon: <BrainCircuit className="w-6 h-6" />,
    description: "A digital platform designed to support mental health assessment, monitoring, and intervention for incarcerated individuals.",
    features: ["Behavioral Pattern Tracking", "Crisis Alert System", "Remote Counseling Link", "Recovery Progress Mapping"]
  },
  {
    title: "Nutritional Analysis System",
    category: "Personal Health",
    progress: 30,
    icon: <Apple className="w-6 h-6" />,
    description: "An AI-powered system capable of analyzing a photo or video of a meal to estimate nutritional content and dietary balance.",
    features: ["Calorie Estimation", "Macronutrient Breakdown", "Local Meal Recognition", "Dietary Advice Generator"]
  },
  {
    title: "Medical Records OCR",
    category: "HealthTech",
    progress: 40,
    icon: <FileText className="w-6 h-6" />,
    description: "An intelligent optical character recognition (OCR) solution for digitizing, extracting, and structuring data from legacy medical records.",
    features: ["Handwriting Digitization", "Auto-Categorization", "Secure Cloud Sync", "Historical Data Analysis"]
  },
  {
    title: "Crop Disease Detection",
    category: "Agriculture",
    progress: 35,
    icon: <Sprout className="w-6 h-6" />,
    description: "Computer vision for detecting and classifying leaf diseases in coffee and maize, providing immediate treatment recommendations.",
    features: ["Offline Vision Support", "Disease Spread Prediction", "Treatment Guides", "Farmer Mobile Dashboard"]
  }
];

const Solutions: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-navy py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-innovation-orange/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-innovation-blue/5 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-poppins font-bold text-white mb-6">
              Our <span className="text-innovation-orange">Proprietary</span> Solutions
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              From legal justice to financial management and education, we build high-impact AI systems designed specifically for the East African market.
            </p>
          </div>
        </div>
      </section>

      {/* Product Showcase Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-innovation-blue/10 text-innovation-blue px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              <Rocket size={14} /> <span>Ready for Deployment</span>
            </div>
            <h2 className="text-3xl font-poppins font-bold text-navy mb-4">Product Ecosystem</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Explore our diverse portfolio of AI-powered applications that are already transforming lives and businesses.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_PRODUCTS.map((product, i) => (
              <div 
                key={i} 
                className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors ${product.color === 'innovation-orange' ? 'bg-innovation-orange/10 text-innovation-orange group-hover:bg-innovation-orange group-hover:text-white' : 'bg-innovation-blue/10 text-innovation-blue group-hover:bg-innovation-blue group-hover:text-white'}`}>
                  {product.icon}
                </div>
                <div className="flex-grow">
                  <div className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${product.color === 'innovation-orange' ? 'text-innovation-orange' : 'text-innovation-blue'}`}>
                    {product.category}
                  </div>
                  <h3 className="text-2xl font-poppins font-bold text-navy mb-4 group-hover:text-navy transition-colors">{product.title}</h3>
                  <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="space-y-2 mb-8">
                    {product.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center text-xs text-gray-600">
                        <CheckCircle2 className={`mr-2 w-4 h-4 ${product.color === 'innovation-orange' ? 'text-innovation-orange' : 'text-innovation-blue'}`} />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                <Link 
                  to="/contact" 
                  className={`mt-auto w-full py-3 rounded-xl font-bold text-center border transition-all ${product.color === 'innovation-orange' ? 'border-innovation-orange text-innovation-orange hover:bg-innovation-orange hover:text-white' : 'border-innovation-blue text-innovation-blue hover:bg-innovation-blue hover:text-white'}`}
                >
                  Request Demo
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Under Development Section */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-innovation-orange/20 text-innovation-orange px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              <Clock size={14} /> <span>Coming Soon</span>
            </div>
            <h2 className="text-3xl font-poppins font-bold text-white mb-4">Products Under Development</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Innovation is a continuous journey. Here's a glimpse into the solutions currently in our lab.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {UNDER_DEVELOPMENT.map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-[40px] p-8 hover:bg-white/10 transition-all group">
                <div className="flex items-start justify-between mb-6">
                  <div className="bg-innovation-blue/20 p-4 rounded-2xl text-innovation-blue">
                    {item.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-innovation-orange font-bold text-2xl">{item.progress}%</div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Complete</div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-poppins font-bold text-white mb-2">{item.title}</h3>
                <div className="text-[10px] text-innovation-blue font-bold uppercase tracking-widest mb-4">{item.category}</div>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                  {item.description}
                </p>
                
                <div className="mb-6">
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-innovation-orange transition-all duration-1000" style={{ width: `${item.progress}%` }}></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-3">
                  {item.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center text-xs text-gray-400">
                      <Zap className="mr-2 w-3 h-3 text-innovation-blue" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 italic">
              Note: Most of these products are currently in early development stages, with completion levels below 50%.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Section - Re-integrating specific mentions */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-poppins font-bold text-navy mb-4">Solutions by Industry</h2>
            <p className="text-gray-500">We apply our technology across the continent's most critical sectors.</p>
          </div>

          <div className="space-y-12">
            {[
              {
                name: "Legal & Government",
                icon: <Building2 className="w-12 h-12 text-innovation-orange" />,
                desc: "Using AI to increase transparency and accessibility in the justice system.",
                highlight: "Our AI UG LegalAid system is currently helping thousands access legal insights trained on actual Uganda Law cases."
              },
              {
                name: "Education & Learning",
                icon: <GraduationCap className="w-12 h-12 text-innovation-blue" />,
                desc: "Modernizing the classroom and institutional management with adaptive intelligence.",
                highlight: "Our AI School ERP and Learning Hub (LMS) are transforming how institutions operate and students learn across the region."
              },
              {
                name: "Finance & SACCOs",
                icon: <Briefcase className="w-12 h-12 text-innovation-orange" />,
                desc: "Modernizing traditional savings circles with high-tech intelligence.",
                highlight: "From rural SACCOs to city banks, we automate the path to financial inclusion."
              },
              {
                name: "Retail & Commerce",
                icon: <Globe className="w-12 h-12 text-innovation-blue" />,
                desc: "Augmenting the shopping experience through AR and autonomous sales agents.",
                highlight: "Virtual Try-Ons and automated WhatsApp sales agents are boosting conversion rates for East African retailers."
              }
            ].map((industry, i) => (
              <div key={i} className="bg-white p-10 rounded-[40px] border border-gray-100 flex flex-col md:flex-row items-center gap-10 shadow-sm">
                <div className="bg-gray-50 p-6 rounded-3xl shrink-0">
                  {industry.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-poppins font-bold text-navy mb-2">{industry.name}</h3>
                  <p className="text-gray-600 mb-4">{industry.desc}</p>
                  <div className="bg-innovation-blue/5 border-l-4 border-innovation-blue p-4 rounded-r-xl">
                    <p className="text-sm font-medium text-navy italic">"{industry.highlight}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-innovation-orange/20 via-transparent to-innovation-blue/20"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-poppins font-bold text-white mb-6">Need a Custom Solution?</h2>
          <p className="text-xl text-gray-400 mb-10">
            Our lab specializes in building bespoke AI tools tailored to unique business challenges. Let's discuss your roadmap.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/contact" className="w-full sm:w-auto bg-innovation-orange text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-innovation-orange/20 transition-all">
              Consult with our Lab
            </Link>
            <Link to="/contact" className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
              Request Case Studies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;