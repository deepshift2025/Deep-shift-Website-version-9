
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, Search, ArrowRight, Sparkles, MousePointer2, Calendar, Clock } from 'lucide-react';

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

const Jobs: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedJobs = localStorage.getItem('ds_jobs');
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    }
  }, []);

  const filteredJobs = filter === 'All' 
    ? jobs 
    : jobs.filter(job => job.department === filter);

  return (
    <div className="pt-24 bg-white min-h-screen">
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-innovation-orange/5 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-poppins font-bold text-white mb-6">
              Join the <span className="text-innovation-orange">Shift</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              We're building the most ambitious AI lab in East Africa. Help us bridge the linguistic and digital divide for 300 million people.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2 bg-gray-50 p-1.5 rounded-2xl overflow-x-auto">
            {['All', 'Engineering', 'Research', 'Growth', 'Ops'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  filter === cat ? 'bg-white text-navy shadow-sm' : 'text-gray-400 hover:text-navy'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
             <MousePointer2 size={12} className="mr-2 text-innovation-orange" /> Double click for job details
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div 
                  key={job.id} 
                  onDoubleClick={() => navigate(`/careers/jobs/${job.id}`)}
                  className="bg-white border border-gray-100 rounded-[32px] p-8 hover:shadow-2xl transition-all group flex flex-col md:flex-row items-start md:items-center justify-between cursor-pointer select-none"
                >
                  <div className="max-w-2xl mb-6 md:mb-0">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="bg-innovation-blue/10 text-innovation-blue text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">{job.department}</span>
                      <span className="text-xs text-gray-400 font-bold uppercase tracking-widest flex items-center"><MapPin size={12} className="mr-1" /> {job.location}</span>
                      <span className="bg-red-50 text-red-500 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center">
                        <Clock size={12} className="mr-1.5" /> Deadline: {job.deadline}
                      </span>
                    </div>
                    <h3 className="text-2xl font-poppins font-bold text-navy mb-3 group-hover:text-innovation-orange transition-colors">{job.title}</h3>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed line-clamp-2">{job.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold text-gray-400 border border-gray-100 px-2 py-1 rounded-lg">#{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="w-full md:w-auto">
                    <Link 
                      to="/careers/jobs/apply" 
                      state={{ jobTitle: job.title }}
                      className="w-full md:w-auto bg-navy text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center hover:bg-innovation-blue transition-all group"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Apply Now <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-[40px] border border-dashed border-gray-200">
                <Sparkles className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <h3 className="font-poppins font-bold text-navy text-xl">No roles found</h3>
                <p className="text-gray-400 mt-2">Check back soon or follow us for updates.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Briefcase className="w-12 h-12 text-innovation-orange mx-auto mb-6" />
          <h2 className="text-3xl font-poppins font-bold text-navy mb-6">Don't see the right role?</h2>
          <p className="text-gray-500 mb-10 text-lg leading-relaxed">
            Join our Talent Network. We're always looking for brilliant minds to join the lab, even if we don't have a specific opening today.
          </p>
          <button className="bg-navy text-white px-12 py-4 rounded-2xl font-bold hover:bg-innovation-orange transition-all">
            Join Talent Network
          </button>
        </div>
      </section>
    </div>
  );
};

export default Jobs;
