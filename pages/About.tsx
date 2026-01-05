
import React from 'react';
import { 
  Users, 
  Target, 
  Lightbulb, 
  Globe, 
  ShieldCheck, 
  Trophy, 
  GraduationCap, 
  Building2,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Cpu,
  Database,
  Terminal,
  Languages,
  UserCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="pt-20">
      {/* About Hero */}
      <section className="bg-navy py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-innovation-orange/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-innovation-blue/5 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-poppins font-bold text-white mb-6">
              Pioneering <span className="text-innovation-orange">Intelligence</span> <br />
              for the African Continent
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Deep Shift AI is East Africa's premier enterprise AI solutions provider. Based in the heart of Kampala, we are bridging the gap between global technology standards and local market needs.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-video bg-gray-100 rounded-[40px] overflow-hidden shadow-2xl relative border border-gray-100">
                <img 
                  src="https://i.postimg.cc/cJDgSwLB/national-ict-hub.jpg" 
                  alt="National ICT Innovation Hub Kampala" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl">
                  <div className="text-xs font-bold text-navy uppercase tracking-widest mb-1">Our Base</div>
                  <div className="text-sm font-semibold text-innovation-blue flex items-center">
                    <Building2 className="mr-2 w-4 h-4" /> National ICT Innovation Hub, Nakawa
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-poppins font-bold text-navy mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Founded with a mission to decentralize high-end AI capabilities, Deep Shift AI began at the National ICT Innovation Hub in Uganda. We recognized that while the global AI revolution was accelerating, many African enterprises were being left behind due to a lack of local context and infrastructure.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Today, we operate as a specialized lab where computer scientists, researchers, and linguists collaborate to build agentic systems and language models that understand the nuances of the East African Community.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-bold text-innovation-orange mb-1">2025</div>
                  <div className="text-xs text-gray-400 font-bold uppercase">Founded</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-innovation-blue">24+</div>
                  <div className="text-xs text-gray-400 font-bold uppercase">Specialized Personnel</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-12 rounded-[40px] shadow-sm border border-gray-100 hover:border-innovation-orange transition-colors">
              <div className="w-16 h-16 bg-innovation-orange/10 rounded-2xl flex items-center justify-center mb-8 text-innovation-orange">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-poppins font-bold text-navy mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To empower African businesses with proprietary, high-performance AI tools that drive operational efficiency, cultural inclusion, and sustainable growth.
              </p>
            </div>
            <div className="bg-white p-12 rounded-[40px] shadow-sm border border-gray-100 hover:border-innovation-blue transition-colors">
              <div className="w-16 h-16 bg-innovation-blue/10 rounded-2xl flex items-center justify-center mb-8 text-innovation-blue">
                <Globe size={32} />
              </div>
              <h3 className="text-2xl font-poppins font-bold text-navy mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the leading architect of Africa's digital intelligence, creating a future where technology speaks every local language and solves every local challenge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <h2 className="text-3xl font-poppins font-bold text-navy mb-4">Core Leadership</h2>
              <p className="text-gray-500 max-w-xl">Guiding the technical and strategic direction of the most ambitious AI lab in the region.</p>
            </div>
            <Link to="/contact" className="mt-6 md:mt-0 text-innovation-blue font-bold flex items-center hover:translate-x-2 transition-transform">
              Partner with us <ArrowRight className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
            {[
              { 
                name: "Dr. Eng Byamugisha Peter", 
                role: "Founder & CEO", 
                bio: "BSC Telcom Eng, MSC Cyber Sec, Phd.Cand - MIS, A.I, ML & NLP", 
                img: "https://i.postimg.cc/tgckcq2s/PETERW_(1).png" 
              },
              { 
                name: "Robert Ssali Balagadde", 
                role: "C.T.O", 
                bio: "PhD (Computer Science and Engineering), Professor (Associate). A.I & ML, NLP Expert", 
                img: "https://i.postimg.cc/VvR0fbL7/Robert-Balagadde.jpg" 
              },
              { 
                name: "Nalule Grace", 
                role: "CFO & Sales Manager", 
                bio: "CPA, Msc, Bsc Account & Finance specialist leading our fiscal strategy and regional growth.", 
                img: "https://i.postimg.cc/sfmQf6Cw/dolaz-ai-style-(1).png" 
              },
              { 
                name: "Prisca Kuula Angela", 
                role: "Administrator & Developer", 
                bio: "Bsc Computer Science. Overseeing lab operations and cross-functional software development projects.", 
                img: "https://i.postimg.cc/Gm7PNg9q/Whats_App_Image_2025_12_31_at_12_03_24_AMasad.jpg" 
              },
              { 
                name: "Kageiga Irene", 
                role: "Partner Relations & Sales Manager", 
                bio: "Driving high-impact enterprise partnerships and ecosystem engagement across East Africa.", 
                img: "https://i.postimg.cc/JhFxFrPN/irene.png" 
              },
              { 
                name: "Sammy Waliggo Numugera", 
                role: "Chief Instructor & Head of Training", 
                bio: "Lead curriculum designer for our Corporate Academy and technical capacity building programs.", 
                img: "https://i.postimg.cc/9FYs2XPT/sammy-waligoo-(1).png" 
              }
            ].map((member, i) => (
              <div key={i} className="bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all group border border-gray-100">
                <div className="aspect-square bg-gray-200 relative overflow-hidden">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div className="absolute bottom-4 right-4 flex space-x-2 translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
                    <button className="p-2 bg-navy text-white rounded-lg hover:bg-innovation-blue"><Linkedin size={16} /></button>
                    <button className="p-2 bg-navy text-white rounded-lg hover:bg-innovation-orange"><Mail size={16} /></button>
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="text-xl font-poppins font-bold text-navy mb-1">{member.name}</h4>
                  <div className="text-sm font-bold text-innovation-orange mb-4 uppercase tracking-wider">{member.role}</div>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Innovation Engine Highlight */}
          <div className="bg-navy rounded-[40px] p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-innovation-blue/10 via-transparent to-innovation-orange/10"></div>
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row gap-12 items-start mb-12">
                <div className="lg:w-1/2">
                  <div className="inline-flex items-center space-x-2 bg-innovation-orange/20 text-innovation-orange px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                    <Cpu size={14} className="mr-2" /> Our Intelligence Infrastructure
                  </div>
                  <h3 className="text-3xl font-poppins font-bold mb-6">The Innovation Engine</h3>
                  <p className="text-gray-400 mb-8 leading-relaxed">
                    Our multi-disciplinary team is composed of the brightest minds in East Africa. By combining deep technical expertise in machine learning with specialized linguistic research and local operational knowledge, we build AI that is both powerful and culturally relevant.
                  </p>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="text-innovation-blue font-bold text-lg mb-2">24 Specialized Personnel</div>
                    <p className="text-sm text-gray-400 italic">Working at the National ICT Innovation Hub, Nakawa.</p>
                  </div>
                </div>
                <div className="lg:w-1/2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { label: "ML Engineers", count: 3, icon: <Cpu className="w-4 h-4" />, color: "orange" },
                    { label: "NLP Experts", count: 2, icon: <Languages className="w-4 h-4" />, color: "blue" },
                    { label: "Backend Devs", count: 2, icon: <Terminal className="w-4 h-4" />, color: "orange" },
                    { label: "Linguists", count: 2, icon: <Languages className="w-4 h-4" />, color: "blue" },
                    { label: "Data Analyst", count: 1, icon: <Database className="w-4 h-4" />, color: "orange" },
                    { label: "Administrators", count: 2, icon: <UserCheck className="w-4 h-4" />, color: "blue" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center text-center group hover:bg-white/10 transition-colors">
                      <div className={`mb-2 ${stat.color === 'orange' ? 'text-innovation-orange' : 'text-innovation-blue'}`}>{stat.icon}</div>
                      <div className="text-2xl font-bold mb-1">{stat.count}</div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{stat.label}</div>
                    </div>
                  ))}
                  <div className="col-span-2 sm:col-span-3 bg-innovation-blue/20 border border-innovation-blue/30 p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <GraduationCap className="text-innovation-blue" />
                      <div className="text-[10px] font-bold uppercase tracking-widest text-innovation-blue">CS Student Volunteers</div>
                    </div>
                    <div className="text-2xl font-bold text-white">12</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-poppins font-bold text-navy mb-4">Strategic Partners</h2>
            <p className="text-gray-500">Collaborating with leading institutions to drive impact across the region.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="flex flex-col items-center p-10 bg-white rounded-[40px] border border-gray-100 group hover:border-innovation-orange transition-all shadow-sm">
              <div className="h-24 mb-6 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all overflow-hidden p-2">
                <img 
                  src="https://i.postimg.cc/kggGLMSm/logo-kiu.jpg" 
                  alt="Kampala International University Logo" 
                  className="h-full w-auto object-contain"
                />
              </div>
              <h4 className="text-xl font-bold font-poppins text-navy mb-4">Kampala International University</h4>
              <p className="text-center text-sm text-gray-600 leading-relaxed">
                Our primary academic partner, providing a pipeline of world-class technical talent and collaborating on deep research initiatives in NLP and African language processing.
              </p>
            </div>
            <div className="flex flex-col items-center p-10 bg-white rounded-[40px] border border-gray-100 group hover:border-innovation-blue transition-all shadow-sm">
              <div className="h-24 mb-6 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all overflow-hidden p-2">
                <img 
                  src="https://i.postimg.cc/MTm8WVkB/logo-NIIH.jpg" 
                  alt="National ICT Innovation Hub Logo" 
                  className="h-full w-auto object-contain"
                />
              </div>
              <h4 className="text-xl font-bold font-poppins text-navy mb-4">National ICT Innovation Hub</h4>
              <p className="text-center text-sm text-gray-600 leading-relaxed">
                As our physical home and strategic facilitator, the Hub provides the infrastructure and government backing necessary to scale AI innovation across Uganda.
              </p>
            </div>
            <div className="flex flex-col items-center p-10 bg-white rounded-[40px] border border-gray-100 group hover:border-innovation-orange transition-all shadow-sm">
              <div className="h-24 mb-6 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all overflow-hidden p-2">
                <img 
                  src="https://i.postimg.cc/wBqfgncY/GIIT-LOGO-FF.png" 
                  alt="GIIT Logo" 
                  className="h-full w-auto object-contain"
                />
              </div>
              <h4 className="text-xl font-bold font-poppins text-navy mb-4 text-center">Genius Institute of Information Technology (G.I.I.T)</h4>
              <p className="text-center text-sm text-gray-600 leading-relaxed">
                Based in Kampala, GIIT specializes in online computer science, coding, and AI education for all ages. We partner with them to deliver specialized training in Robotics, AI, and Machine Learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Careers CTA */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-innovation-orange/10 via-transparent to-innovation-blue/10"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-poppins font-bold text-white mb-6">Join the Shift</h2>
          <p className="text-xl text-gray-400 mb-10">
            We are always looking for passionate engineers, researchers, and linguists who want to build the future of AI in Africa.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/careers/jobs" className="w-full sm:w-auto bg-innovation-orange text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-innovation-orange/20 transition-all">
              Explore Openings
            </Link>
            <Link to="/careers/internships" className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
              Internship Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
