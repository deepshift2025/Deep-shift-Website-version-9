
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Briefcase, 
  CheckCircle2, 
  Send, 
  Zap, 
  ShieldCheck, 
  Globe,
  Share2,
  Calendar
} from 'lucide-react';

interface JobPosting {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  description: string;
  tags: string[];
  deadline: string;
}

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<JobPosting | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedJobs = localStorage.getItem('ds_jobs');
    if (savedJobs) {
      const allJobs: JobPosting[] = JSON.parse(savedJobs);
      const found = allJobs.find(j => j.id === id);
      setJob(found || null);
    }
  }, [id]);

  if (!job) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Zap className="w-16 h-16 text-innovation-orange mx-auto mb-6" />
          <h2 className="text-3xl font-poppins font-bold text-navy mb-4">Job Not Found</h2>
          <Link to="/careers/jobs" className="inline-flex items-center bg-navy text-white px-8 py-3 rounded-2xl font-bold hover:bg-innovation-blue transition-all">
            <ArrowLeft size={18} className="mr-2" /> All Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-gray-50 mb-12">
        <div className="flex items-center justify-between">
          <Link to="/careers/jobs" className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-innovation-orange transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to Careers
          </Link>
          <button className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-navy transition-colors">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          <div className="lg:col-span-2">
            <div className="mb-10">
              <div className="flex items-center space-x-3 mb-6">
                <span className="bg-innovation-blue/10 text-innovation-blue px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{job.department}</span>
                <span className="bg-gray-100 text-gray-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{job.type}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-poppins font-bold text-navy mb-6 leading-tight">{job.title}</h1>
              <div className="flex flex-wrap gap-6 text-gray-400 text-sm font-bold uppercase tracking-widest">
                <div className="flex items-center"><MapPin className="w-5 h-5 mr-2 text-innovation-orange" /> {job.location}</div>
                <div className="flex items-center"><Briefcase className="w-5 h-5 mr-2 text-innovation-blue" /> Full-time Role</div>
                <div className="flex items-center text-red-500 bg-red-50 px-3 py-1 rounded-full"><Clock className="w-5 h-5 mr-2" /> Deadline: {job.deadline}</div>
              </div>
            </div>

            <div className="prose prose-lg prose-blue max-w-none text-gray-600 leading-relaxed space-y-8">
              <div className="bg-gray-50 p-8 rounded-[40px] border border-gray-100 mb-10">
                <h3 className="text-xl font-poppins font-bold text-navy mb-4">About the Role</h3>
                <p>{job.description}</p>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-poppins font-bold text-navy">Why join our mission?</h3>
                <p>At Deep Shift AI, we aren't just building another tech startup. We are architects of Africa's digital intelligence. As part of our team, you will have the opportunity to work at the forefront of AI research and enterprise deployment in the East African Community.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  {[
                    "Senior Engineering Mentorship",
                    "High-performance GPU Infrastructure",
                    "Cross-functional Regional Exposure",
                    "Impact-driven AI Projects",
                    "Collaborative Hub Environment",
                    "Competitive Career Growth"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center space-x-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                      <CheckCircle2 className="text-innovation-blue shrink-0" size={20} />
                      <span className="text-navy font-semibold text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-8">
              <div className="bg-navy rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-innovation-orange/10 rounded-bl-full"></div>
                <h3 className="text-xl font-poppins font-bold mb-6 flex items-center"><Send className="mr-3 text-innovation-orange" /> Apply for this position</h3>
                <p className="text-gray-400 text-sm mb-8">Ready to make your mark? Submit your professional application and join the Shift.</p>
                <Link 
                  to="/careers/jobs/apply" 
                  state={{ jobTitle: job.title }}
                  className="block w-full bg-innovation-orange text-white py-4 rounded-2xl font-bold text-center hover:shadow-xl hover:shadow-innovation-orange/20 transition-all mb-4"
                >
                  Start Application
                </Link>
                <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest font-bold">Standard response: 7 business days</p>
              </div>

              <div className="bg-gray-50 p-8 rounded-[40px] border border-gray-100">
                <h3 className="text-lg font-poppins font-bold text-navy mb-6">Tags & Tech</h3>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map(tag => (
                    <span key={tag} className="bg-white border border-gray-200 text-gray-500 px-4 py-2 rounded-xl text-xs font-bold shadow-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-innovation-blue/5 rounded-[40px] border border-innovation-blue/10">
                <div className="flex items-center space-x-3 mb-4">
                  <ShieldCheck className="text-innovation-blue" />
                  <span className="text-xs font-bold text-navy uppercase tracking-widest">Privacy Guaranteed</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">Your professional documents are handled under strict confidentiality protocols as per the Uganda Data Protection Act.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default JobDetail;
