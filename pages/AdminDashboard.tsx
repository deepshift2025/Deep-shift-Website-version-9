import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  Image as ImageIcon, 
  Newspaper, 
  Save, 
  X,
  LogOut,
  ChevronRight,
  Upload,
  AlertCircle,
  FileImage,
  FileText,
  Download,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowLeft,
  Briefcase,
  Calendar,
  MapPin,
  Tag,
  CheckCircle2,
  GraduationCap,
  Megaphone,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
  Clock,
  MousePointer2,
  ArrowDown,
  Inbox,
  Mail,
  UserPlus,
  MessageSquare,
  ChevronDown,
  Info,
  Globe,
  FileDown,
  Phone,
  Code2
} from 'lucide-react';
import { INITIAL_NEWS_POSTS, INITIAL_GALLERY_IMAGES, INITIAL_TRAINING_POSTERS } from '../constants';

interface NewsPost {
  id: string;
  title: string;
  date: string;
  loc: string;
  desc: string;
  content: string;
  tag: string;
  images?: string[];
}

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

interface Announcement {
  id: string;
  title: string;
  message: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
  isActive: boolean;
  type: 'info' | 'promotion' | 'event';
  triggerType: 'timer' | 'scroll' | 'exit';
  triggerValue: number;
  frequency: 'once' | 'session' | 'daily';
}

interface ResourceFile {
  name: string;
  data: string; // Base64
}

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  interest: string;
  message: string;
  timestamp: string;
  status: 'new' | 'reviewed' | 'contacted';
}

interface JobApplication {
  id: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  dob?: string;
  nationality?: string;
  gender?: string;
  address?: string;
  university?: string;
  gradYear?: string;
  skills: string;
  experience: string;
  portfolio?: string;
  github?: string;
  reason?: string;
  cvData?: string; // Base64 PDF
  cvName?: string;
  timestamp: string;
  status: 'new' | 'interviewing' | 'rejected' | 'hired';
}

interface InternApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  dob?: string;
  nationality?: string;
  gender?: string;
  university: string;
  course: string;
  academicStatus?: string;
  yearOfStudy?: string;
  semester?: string;
  startDate?: string;
  endDate?: string;
  skills: string;
  reason: string;
  cvData?: string; // Base64 PDF
  cvName?: string;
  timestamp: string;
  status: 'new' | 'reviewed' | 'accepted' | 'rejected';
}

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'news' | 'jobs' | 'training' | 'gallery' | 'resources' | 'announcements' | 'submissions'>('news');
  const [submissionSubTab, setSubmissionSubTab] = useState<'inquiries' | 'jobs' | 'interns'>('inquiries');
  
  const [news, setNews] = useState<NewsPost[]>([]);
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [gallery, setGallery] = useState<string[]>([]);
  const [trainingPosters, setTrainingPosters] = useState<string[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [investorDeck, setInvestorDeck] = useState<ResourceFile | null>(null);
  
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [jobApps, setJobApps] = useState<JobApplication[]>([]);
  const [internApps, setInternApps] = useState<InternApplication[]>([]);

  const [editingPost, setEditingPost] = useState<NewsPost | null>(null);
  const [editingJob, setEditingJob] = useState<JobPosting | null>(null);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);

  useEffect(() => {
    const authStatus = sessionStorage.getItem('ds_admin_auth');
    if (authStatus === 'true') setIsAuthenticated(true);

    setNews(JSON.parse(localStorage.getItem('ds_news') || JSON.stringify(INITIAL_NEWS_POSTS)));
    setGallery(JSON.parse(localStorage.getItem('ds_gallery') || JSON.stringify(INITIAL_GALLERY_IMAGES)));
    setTrainingPosters(JSON.parse(localStorage.getItem('ds_training_posters') || JSON.stringify(INITIAL_TRAINING_POSTERS)));
    setJobs(JSON.parse(localStorage.getItem('ds_jobs') || '[]'));
    setAnnouncements(JSON.parse(localStorage.getItem('ds_announcements') || '[]'));
    setInquiries(JSON.parse(localStorage.getItem('ds_inquiries') || '[]'));
    setJobApps(JSON.parse(localStorage.getItem('ds_job_apps') || '[]'));
    setInternApps(JSON.parse(localStorage.getItem('ds_intern_apps') || '[]'));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === 'admin' && loginForm.password === '@Admin256') {
      setIsAuthenticated(true);
      sessionStorage.setItem('ds_admin_auth', 'true');
    } else {
      setLoginError('Invalid credentials.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('ds_admin_auth');
  };

  const saveNews = (updated: NewsPost[]) => { setNews(updated); localStorage.setItem('ds_news', JSON.stringify(updated)); };
  const saveJobs = (updated: JobPosting[]) => { setJobs(updated); localStorage.setItem('ds_jobs', JSON.stringify(updated)); };
  const saveGallery = (updated: string[]) => { setGallery(updated); localStorage.setItem('ds_gallery', JSON.stringify(updated)); };
  const saveAnnouncements = (updated: Announcement[]) => { setAnnouncements(updated); localStorage.setItem('ds_announcements', JSON.stringify(updated)); };
  const saveInquiries = (updated: ContactInquiry[]) => { setInquiries(updated); localStorage.setItem('ds_inquiries', JSON.stringify(updated)); };
  const saveJobApps = (updated: JobApplication[]) => { setJobApps(updated); localStorage.setItem('ds_job_apps', JSON.stringify(updated)); };
  const saveInternApps = (updated: InternApplication[]) => { setInternApps(updated); localStorage.setItem('ds_intern_apps', JSON.stringify(updated)); };

  const handleDownloadCV = (data: string, name: string) => {
    const link = document.createElement('a');
    link.href = data;
    link.download = name || 'applicant_cv.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const DossierField = ({ label, value, icon }: { label: string, value: any, icon?: React.ReactNode }) => {
    if (!value) return null;
    return (
      <div className="flex items-start space-x-3 group py-2 border-b border-gray-50 last:border-0">
        <div className="text-gray-400 mt-1">{icon}</div>
        <div className="flex-1">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</div>
          <div className="text-sm font-semibold text-navy leading-relaxed">{value}</div>
        </div>
      </div>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-navy flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-[40px] p-10 shadow-2xl">
          <h2 className="text-center text-2xl font-bold text-navy mb-8">Admin Console</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input required type="text" placeholder="Username" className="w-full bg-gray-50 rounded-xl px-4 py-3" value={loginForm.username} onChange={e => setLoginForm({...loginForm, username: e.target.value})} />
            <input required type="password" placeholder="Password" className="w-full bg-gray-50 rounded-xl px-4 py-3" value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} />
            <button type="submit" className="w-full bg-navy text-white py-4 rounded-xl font-bold">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-poppins font-bold text-navy flex items-center"><ShieldCheck className="mr-3 text-innovation-orange" /> Admin Control</h1>
          <button onClick={handleLogout} className="text-sm font-bold text-gray-400 hover:text-red-500 flex items-center"><LogOut size={16} className="mr-2" /> Logout</button>
        </div>

        <div className="flex flex-wrap gap-1 bg-gray-200 p-1 rounded-2xl w-fit mb-8">
          {['news', 'announcements', 'submissions', 'jobs', 'training', 'gallery'].map(t => (
            <button key={t} onClick={() => setActiveTab(t as any)} className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all uppercase tracking-widest ${activeTab === t ? 'bg-white text-navy shadow-sm' : 'text-gray-500'}`}>{t}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 sticky top-28 max-h-[80vh] overflow-y-auto custom-scrollbar">
              {activeTab === 'submissions' ? (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-navy flex items-center"><Inbox className="mr-2 text-innovation-orange" /> Dossier Viewer</h3>
                  {!selectedSubmission ? (
                    <div className="text-center py-20 text-gray-400 italic">Select a candidate to view dossier.</div>
                  ) : (
                    <div className="animate-in fade-in slide-in-from-top-4">
                      <div className="flex items-center space-x-4 mb-8 bg-gray-50 p-4 rounded-3xl">
                         <div className="w-14 h-14 bg-navy text-white rounded-2xl flex items-center justify-center font-bold text-xl">{selectedSubmission.fullName?.[0] || selectedSubmission.name?.[0]}</div>
                         <div>
                            <div className="text-sm font-bold text-navy">{selectedSubmission.fullName || selectedSubmission.name}</div>
                            <div className="text-[10px] text-innovation-orange font-bold uppercase tracking-widest">{selectedSubmission.jobTitle || selectedSubmission.interest || 'Internship'}</div>
                         </div>
                      </div>

                      <div className="space-y-4">
                         <div className="bg-gray-50/50 p-6 rounded-[32px] space-y-1">
                            <h4 className="text-xs font-black uppercase text-navy tracking-tighter mb-4 flex items-center"><UserIcon size={14} className="mr-2" /> Basic Info</h4>
                            <DossierField label="Email" value={selectedSubmission.email} icon={<Mail size={14}/>} />
                            <DossierField label="Phone" value={selectedSubmission.phone} icon={<Phone size={14}/>} />
                            <DossierField label="Nationality" value={selectedSubmission.nationality} icon={<Globe size={14}/>} />
                            <DossierField label="DOB" value={selectedSubmission.dob} icon={<Calendar size={14}/>} />
                            <DossierField label="Address" value={selectedSubmission.address} icon={<MapPin size={14}/>} />
                         </div>

                         <div className="bg-gray-50/50 p-6 rounded-[32px] space-y-1">
                            <h4 className="text-xs font-black uppercase text-navy tracking-tighter mb-4 flex items-center"><GraduationCap size={14} className="mr-2" /> Education</h4>
                            <DossierField label="Institution" value={selectedSubmission.university} />
                            <DossierField label="Course" value={selectedSubmission.course} />
                            <DossierField label="Grad Year" value={selectedSubmission.gradYear} />
                            <DossierField label="Current Status" value={selectedSubmission.academicStatus} />
                         </div>

                         <div className="bg-gray-50/50 p-6 rounded-[32px] space-y-1">
                            <h4 className="text-xs font-black uppercase text-navy tracking-tighter mb-4 flex items-center"><Code2 size={14} className="mr-2" /> Expertise</h4>
                            <DossierField label="Skills" value={selectedSubmission.skills} />
                            <DossierField label="Experience" value={selectedSubmission.experience} />
                            <DossierField label="Motivation" value={selectedSubmission.reason} />
                         </div>

                         {selectedSubmission.cvData && (
                           <button 
                             onClick={() => handleDownloadCV(selectedSubmission.cvData, selectedSubmission.cvName)}
                             className="w-full bg-innovation-blue text-white py-4 rounded-2xl font-bold flex items-center justify-center hover:bg-navy transition-all"
                           >
                             <FileDown size={20} className="mr-2" /> Download Applicant CV
                           </button>
                         )}
                      </div>
                      
                      <button onClick={() => setSelectedSubmission(null)} className="mt-8 text-xs font-bold text-gray-400 flex items-center mx-auto hover:text-navy"><X size={14} className="mr-1"/> Close Dossier</button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-20 text-center text-gray-400">Manage site content in the main area.</div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 min-h-[600px]">
              {activeTab === 'submissions' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 bg-gray-50 p-1.5 rounded-2xl w-fit">
                    <button onClick={() => setSubmissionSubTab('inquiries')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${submissionSubTab === 'inquiries' ? 'bg-white text-navy shadow-sm' : 'text-gray-400'}`}>Inquiries ({inquiries.length})</button>
                    <button onClick={() => setSubmissionSubTab('jobs')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${submissionSubTab === 'jobs' ? 'bg-white text-navy shadow-sm' : 'text-gray-400'}`}>Jobs ({jobApps.length})</button>
                    <button onClick={() => setSubmissionSubTab('interns')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${submissionSubTab === 'interns' ? 'bg-white text-navy shadow-sm' : 'text-gray-400'}`}>Interns ({internApps.length})</button>
                  </div>

                  <div className="space-y-3">
                    {submissionSubTab === 'jobs' && jobApps.map(item => (
                      <div key={item.id} className={`p-5 rounded-[32px] border flex items-center justify-between group transition-all ${item.status === 'new' ? 'bg-innovation-orange/5 border-innovation-orange/10' : 'bg-white border-gray-50'}`}>
                        <div className="flex items-center gap-4 truncate">
                           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${item.status === 'new' ? 'bg-innovation-orange text-white' : 'bg-gray-100 text-gray-400'}`}><UserPlus size={20}/></div>
                           <div className="truncate">
                              <div className="font-bold text-navy truncate">{item.fullName}</div>
                              <div className="text-[10px] text-gray-400 font-bold uppercase">{item.jobTitle} • {new Date(item.timestamp).toLocaleDateString()}</div>
                           </div>
                        </div>
                        <div className="flex items-center gap-2">
                           <button onClick={() => setSelectedSubmission(item)} className="p-2 bg-white text-gray-400 hover:text-innovation-blue rounded-xl shadow-sm border border-gray-100"><Eye size={16}/></button>
                           <button onClick={() => { if(window.confirm('Delete app?')) saveJobApps(jobApps.filter(x => x.id !== item.id)) }} className="p-2 bg-white text-gray-400 hover:text-red-500 rounded-xl shadow-sm border border-gray-100"><Trash2 size={16}/></button>
                        </div>
                      </div>
                    ))}

                    {submissionSubTab === 'interns' && internApps.map(item => (
                      <div key={item.id} className={`p-5 rounded-[32px] border flex items-center justify-between transition-all ${item.status === 'new' ? 'bg-innovation-blue/5 border-innovation-blue/10' : 'bg-white border-gray-50'}`}>
                        <div className="flex items-center gap-4 truncate">
                           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${item.status === 'new' ? 'bg-innovation-blue text-white' : 'bg-gray-100 text-gray-400'}`}><GraduationCap size={20}/></div>
                           <div className="truncate">
                              <div className="font-bold text-navy">{item.fullName}</div>
                              <div className="text-[10px] text-gray-400 font-bold uppercase">{item.university} • {item.course}</div>
                           </div>
                        </div>
                        <div className="flex items-center gap-2">
                           <button onClick={() => setSelectedSubmission(item)} className="p-2 bg-white text-gray-400 hover:text-innovation-blue rounded-xl shadow-sm border border-gray-100"><Eye size={16}/></button>
                           <button onClick={() => { if(window.confirm('Delete?')) saveInternApps(internApps.filter(x => x.id !== item.id)) }} className="p-2 bg-white text-gray-400 hover:text-red-500 rounded-xl shadow-sm border border-gray-100"><Trash2 size={16}/></button>
                        </div>
                      </div>
                    ))}

                    {submissionSubTab === 'inquiries' && inquiries.map(item => (
                      <div key={item.id} className={`p-5 rounded-[32px] border flex items-center justify-between transition-all ${item.status === 'new' ? 'bg-gray-50 border-gray-100' : 'bg-white'}`}>
                        <div className="flex items-center gap-4 truncate">
                           <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-2xl flex items-center justify-center"><Mail size={20}/></div>
                           <div className="truncate">
                              <div className="font-bold text-navy">{item.name}</div>
                              <div className="text-[10px] text-gray-400 font-bold uppercase">{item.interest} • {new Date(item.timestamp).toLocaleDateString()}</div>
                           </div>
                        </div>
                        <div className="flex items-center gap-2">
                           <button onClick={() => setSelectedSubmission(item)} className="p-2 bg-white text-gray-400 hover:text-innovation-blue rounded-xl shadow-sm border border-gray-100"><Eye size={16}/></button>
                           <button onClick={() => { if(window.confirm('Delete?')) saveInquiries(inquiries.filter(x => x.id !== item.id)) }} className="p-2 bg-white text-gray-400 hover:text-red-500 rounded-xl shadow-sm border border-gray-100"><Trash2 size={16}/></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'news' && (
                <div className="space-y-4">
                  <h3 className="font-bold text-navy">Corporate News ({news.length})</h3>
                  {news.map(p => (
                    <div key={p.id} className="p-4 bg-gray-50 rounded-2xl flex justify-between items-center group border border-transparent hover:border-gray-200 transition-all">
                       <div className="truncate">
                          <div className="text-[10px] text-gray-400 font-bold uppercase">{p.date}</div>
                          <div className="font-bold text-navy">{p.title}</div>
                       </div>
                       <div className="flex gap-2">
                          <button onClick={() => { if(window.confirm('Delete?')) saveNews(news.filter(x => x.id !== p.id)) }} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={16}/></button>
                       </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;