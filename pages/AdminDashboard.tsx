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
  ArrowDown
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
  // Display Rules
  triggerType: 'timer' | 'scroll' | 'exit';
  triggerValue: number; // seconds or percentage
  frequency: 'once' | 'session' | 'daily';
}

interface ResourceFile {
  name: string;
  data: string; // Base64
}

const JOBS_DATA_INITIAL = [
  {
    id: '1',
    title: 'Senior AI Engineer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Nakawa Hub, Kampala',
    description: 'Lead the development of agentic AI systems and optimize inference for low-resource environments. You will work on fine-tuning models for local languages and building robust digital agents for enterprise clients.',
    tags: ['Python', 'PyTorch', 'Agents'],
    deadline: '2025-12-31'
  },
  {
    id: '2',
    title: 'NLP Research Scientist',
    department: 'Research',
    type: 'Full-time',
    location: 'Remote / Kampala',
    description: 'Conduct primary research into East African linguistic patterns to improve our local language NLP engine. Focus on Luganda, Swahili, and Runyoro context-aware translation logic.',
    tags: ['NLP', 'Transformers', 'Linguistics'],
    deadline: '2025-12-15'
  }
];

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'news' | 'jobs' | 'training' | 'gallery' | 'resources' | 'announcements'>('news');
  const [news, setNews] = useState<NewsPost[]>([]);
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [gallery, setGallery] = useState<string[]>([]);
  const [trainingPosters, setTrainingPosters] = useState<string[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [investorDeck, setInvestorDeck] = useState<ResourceFile | null>(null);
  
  const [editingPost, setEditingPost] = useState<NewsPost | null>(null);
  const [editingJob, setEditingJob] = useState<JobPosting | null>(null);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);

  const [newPost, setNewPost] = useState<Omit<NewsPost, 'id'>>({ 
    title: '', 
    date: new Date().toISOString().split('T')[0], 
    loc: '', 
    desc: '', 
    content: '',
    tag: 'News',
    images: [] 
  });

  const [newJob, setNewJob] = useState<Omit<JobPosting, 'id'>>({
    title: '',
    department: 'Engineering',
    type: 'Full-time',
    location: '',
    description: '',
    tags: [],
    deadline: ''
  });

  const [newAnnouncement, setNewAnnouncement] = useState<Omit<Announcement, 'id'>>({
    title: '',
    message: '',
    image: '',
    ctaText: '',
    ctaLink: '',
    isActive: false,
    type: 'info',
    triggerType: 'timer',
    triggerValue: 3,
    frequency: 'session'
  });

  const [jobTagInput, setJobTagInput] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [trainingImageUrl, setTrainingImageUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const trainingFileInputRef = useRef<HTMLInputElement>(null);
  const deckInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const authStatus = sessionStorage.getItem('ds_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }

    const savedNews = localStorage.getItem('ds_news');
    const savedGallery = localStorage.getItem('ds_gallery');
    const savedTraining = localStorage.getItem('ds_training_posters');
    const savedDeck = localStorage.getItem('ds_investor_deck');
    const savedJobs = localStorage.getItem('ds_jobs');
    const savedAnnouncements = localStorage.getItem('ds_announcements');
    
    if (savedNews) setNews(JSON.parse(savedNews));
    else {
      setNews(INITIAL_NEWS_POSTS as NewsPost[]);
      localStorage.setItem('ds_news', JSON.stringify(INITIAL_NEWS_POSTS));
    }

    if (savedGallery) setGallery(JSON.parse(savedGallery));
    else {
      setGallery(INITIAL_GALLERY_IMAGES);
      localStorage.setItem('ds_gallery', JSON.stringify(INITIAL_GALLERY_IMAGES));
    }

    if (savedTraining) setTrainingPosters(JSON.parse(savedTraining));
    else {
      setTrainingPosters(INITIAL_TRAINING_POSTERS);
      localStorage.setItem('ds_training_posters', JSON.stringify(INITIAL_TRAINING_POSTERS));
    }

    if (savedJobs) setJobs(JSON.parse(savedJobs));
    else {
      setJobs(JOBS_DATA_INITIAL);
      localStorage.setItem('ds_jobs', JSON.stringify(JOBS_DATA_INITIAL));
    }

    if (savedAnnouncements) setAnnouncements(JSON.parse(savedAnnouncements));

    if (savedDeck) setInvestorDeck(JSON.parse(savedDeck));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === 'admin' && loginForm.password === '@Admin256') {
      setIsAuthenticated(true);
      sessionStorage.setItem('ds_admin_auth', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Please contact your system administrator.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('ds_admin_auth');
    window.location.hash = '/';
  };

  const saveNews = (updatedNews: NewsPost[]) => {
    setNews(updatedNews);
    localStorage.setItem('ds_news', JSON.stringify(updatedNews));
  };

  const saveJobs = (updatedJobs: JobPosting[]) => {
    setJobs(updatedJobs);
    localStorage.setItem('ds_jobs', JSON.stringify(updatedJobs));
  };

  const saveGallery = (updatedGallery: string[]) => {
    setGallery(updatedGallery);
    localStorage.setItem('ds_gallery', JSON.stringify(updatedGallery));
  };

  const saveTraining = (updated: string[]) => {
    setTrainingPosters(updated);
    localStorage.setItem('ds_training_posters', JSON.stringify(updated));
  };

  const saveAnnouncements = (updated: Announcement[]) => {
    setAnnouncements(updated);
    localStorage.setItem('ds_announcements', JSON.stringify(updated));
  };

  // --- ANNOUNCEMENTS LOGIC ---
  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = [{ ...newAnnouncement, id: Date.now().toString() }, ...announcements];
    saveAnnouncements(updated);
    setNewAnnouncement({ title: '', message: '', image: '', ctaText: '', ctaLink: '', isActive: false, type: 'info', triggerType: 'timer', triggerValue: 3, frequency: 'session' });
  };

  const handleEditAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAnnouncement) return;
    const updated = announcements.map(a => a.id === editingAnnouncement.id ? editingAnnouncement : a);
    saveAnnouncements(updated);
    setEditingAnnouncement(null);
  };

  const toggleAnnouncement = (id: string) => {
    const updated = announcements.map(a => 
      a.id === id ? { ...a, isActive: !a.isActive } : { ...a, isActive: false }
    );
    saveAnnouncements(updated);
  };

  const handleDeleteAnnouncement = (id: string) => {
    if (window.confirm('Are you sure you want to permanently delete this announcement?')) {
      const updated = announcements.filter(a => a.id !== id);
      saveAnnouncements(updated);
    }
  };

  // --- JOBS LOGIC ---
  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = [{ ...newJob, id: Date.now().toString() }, ...jobs];
    saveJobs(updated);
    setNewJob({ title: '', department: 'Engineering', type: 'Full-time', location: '', description: '', tags: [], deadline: '' });
    setJobTagInput('');
  };

  const handleEditJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob) return;
    const updated = jobs.map(j => j.id === editingJob.id ? editingJob : j);
    saveJobs(updated);
    setEditingJob(null);
  };

  const handleDeleteJob = (id: string) => {
    if (window.confirm('Delete this job posting forever?')) {
      const updated = jobs.filter(j => j.id !== id);
      saveJobs(updated);
    }
  };

  // --- TAG HANDLING ---
  const handleJobTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && jobTagInput.trim()) {
      e.preventDefault();
      const currentTags = editingJob ? editingJob.tags : newJob.tags;
      if (!currentTags.includes(jobTagInput.trim())) {
        if (editingJob) {
          setEditingJob({ ...editingJob, tags: [...editingJob.tags, jobTagInput.trim()] });
        } else {
          setNewJob({ ...newJob, tags: [...newJob.tags, jobTagInput.trim()] });
        }
      }
      setJobTagInput('');
    }
  };

  const removeJobTag = (tag: string) => {
    if (editingJob) {
      setEditingJob({ ...editingJob, tags: editingJob.tags.filter(t => t !== tag) });
    } else {
      setNewJob({ ...newJob, tags: newJob.tags.filter(t => t !== tag) });
    }
  };

  const handleDeckUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== 'application/pdf') return;
    const reader = new FileReader();
    reader.onload = () => {
      const resource = { name: file.name, data: reader.result as string };
      setInvestorDeck(resource);
      localStorage.setItem('ds_investor_deck', JSON.stringify(resource));
    };
    reader.readAsDataURL(file);
  };

  const handleNewsFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    const newImageStrings: string[] = [];
    
    for (const file of files) {
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file as Blob);
      });
      newImageStrings.push(base64);
    }

    if (editingPost) {
      setEditingPost({ ...editingPost, images: [...(editingPost.images || []), ...newImageStrings] });
    } else {
      setNewPost({ ...newPost, images: [...(newPost.images || []), ...newImageStrings] });
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleTrainingFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    const newStrings: string[] = [];
    for (const file of files) {
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file as Blob);
      });
      newStrings.push(base64);
    }
    saveTraining([...newStrings, ...trainingPosters]);
    if (trainingFileInputRef.current) trainingFileInputRef.current.value = '';
  };

  const removeNewsImage = (index: number) => {
    if (editingPost) {
      const updated = (editingPost.images || []).filter((_, i) => i !== index);
      setEditingPost({ ...editingPost, images: updated });
    } else {
      const updated = (newPost.images || []).filter((_, i) => i !== index);
      setNewPost({ ...newPost, images: updated });
    }
  };

  const addImageUrlToNews = () => {
    if (!newImageUrl.trim()) return;
    if (editingPost) {
      setEditingPost({ ...editingPost, images: [...(editingPost.images || []), newImageUrl] });
    } else {
      setNewPost({ ...newPost, images: [...(newPost.images || []), newImageUrl] });
    }
    setNewImageUrl('');
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-navy flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-[40px] p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-innovation-orange/5 rounded-bl-full pointer-events-none"></div>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center mx-auto mb-4 p-3">
              <img src="https://i.postimg.cc/Mpsm3pDq/21.png" alt="DS" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-2xl font-poppins font-bold text-navy">Lab Console</h2>
            <p className="text-gray-400 text-sm mt-1 uppercase tracking-widest font-bold">Authorized Access Only</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Identity</label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  required
                  type="text" 
                  placeholder="Username" 
                  className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-4 py-4 text-sm focus:ring-2 focus:ring-innovation-orange transition-all"
                  value={loginForm.username}
                  onChange={e => setLoginForm({...loginForm, username: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Access Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  required
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-12 py-4 text-sm focus:ring-2 focus:ring-innovation-orange transition-all"
                  value={loginForm.password}
                  onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            {loginError && (
              <div className="flex items-center text-red-500 text-[10px] font-bold uppercase tracking-tight bg-red-50 p-3 rounded-xl border border-red-100">
                <AlertCircle size={14} className="mr-2 shrink-0" /> {loginError}
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-navy text-white py-4 rounded-2xl font-bold text-lg hover:bg-innovation-orange transition-all shadow-xl shadow-navy/10 active:scale-95 mt-4"
            >
              Verify Access
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <Link to="/" className="text-xs font-bold text-gray-400 hover:text-navy flex items-center justify-center group">
              <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Return to Public Site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-poppins font-bold text-navy flex items-center">
              <ShieldCheck className="mr-3 text-innovation-orange" /> Admin Control Center
            </h1>
          </div>
          <button onClick={handleLogout} className="flex items-center text-sm font-bold text-gray-400 hover:text-red-500 transition-colors">
            <LogOut size={16} className="mr-2" /> End Session
          </button>
        </div>

        <div className="flex flex-wrap gap-1 bg-gray-200 p-1 rounded-2xl w-fit mb-8">
          <button onClick={() => setActiveTab('news')} className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center transition-all ${activeTab === 'news' ? 'bg-white text-navy shadow-sm' : 'text-gray-500 hover:text-navy'}`}>
            <Newspaper size={16} className="mr-2" /> News
          </button>
          <button onClick={() => setActiveTab('announcements')} className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center transition-all ${activeTab === 'announcements' ? 'bg-white text-navy shadow-sm' : 'text-gray-500 hover:text-navy'}`}>
            <Megaphone size={16} className="mr-2" /> Pop-ups
          </button>
          <button onClick={() => setActiveTab('jobs')} className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center transition-all ${activeTab === 'jobs' ? 'bg-white text-navy shadow-sm' : 'text-gray-500 hover:text-navy'}`}>
            <Briefcase size={16} className="mr-2" /> Jobs
          </button>
          <button onClick={() => setActiveTab('training')} className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center transition-all ${activeTab === 'training' ? 'bg-white text-navy shadow-sm' : 'text-gray-500 hover:text-navy'}`}>
            <GraduationCap size={16} className="mr-2" /> Training
          </button>
          <button onClick={() => setActiveTab('gallery')} className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center transition-all ${activeTab === 'gallery' ? 'bg-white text-navy shadow-sm' : 'text-gray-500 hover:text-navy'}`}>
            <ImageIcon size={16} className="mr-2" /> Gallery
          </button>
          <button onClick={() => setActiveTab('resources')} className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center transition-all ${activeTab === 'resources' ? 'bg-white text-navy shadow-sm' : 'text-gray-500 hover:text-navy'}`}>
            <FileText size={16} className="mr-2" /> Resources
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 sticky top-28 max-h-[80vh] overflow-y-auto custom-scrollbar">
              {activeTab === 'news' && (
                <>
                  <h3 className="text-xl font-poppins font-bold text-navy mb-6">{editingPost ? 'Edit Post' : 'Create Post'}</h3>
                  <form 
                    onSubmit={editingPost 
                      ? (e) => { e.preventDefault(); saveNews(news.map(p => p.id === editingPost.id ? editingPost : p)); setEditingPost(null); } 
                      : (e) => { e.preventDefault(); saveNews([{ ...newPost, id: Date.now().toString() }, ...news]); setNewPost({ title: '', date: new Date().toISOString().split('T')[0], loc: '', desc: '', content: '', tag: 'News', images: [] }); }
                    } 
                    className="space-y-4"
                  >
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Title</label>
                      <input required placeholder="Post Title" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-innovation-orange" value={editingPost ? editingPost.title : newPost.title} onChange={e => editingPost ? setEditingPost({...editingPost, title: e.target.value}) : setNewPost({...newPost, title: e.target.value})} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Date</label>
                        <input required type="date" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-innovation-orange" value={editingPost ? editingPost.date : newPost.date} onChange={e => editingPost ? setEditingPost({...editingPost, date: e.target.value}) : setNewPost({...newPost, date: e.target.value})} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Category</label>
                        <select className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-innovation-orange" value={editingPost ? editingPost.tag : newPost.tag} onChange={e => editingPost ? setEditingPost({...editingPost, tag: e.target.value}) : setNewPost({...newPost, tag: e.target.value})}>
                           <option>News</option>
                           <option>Event</option>
                           <option>Corporate</option>
                           <option>Press Release</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                        <input required placeholder="e.g. Kampala, Uganda" className="w-full bg-gray-50 border-none rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-innovation-orange" value={editingPost ? editingPost.loc : newPost.loc} onChange={e => editingPost ? setEditingPost({...editingPost, loc: e.target.value}) : setNewPost({...newPost, loc: e.target.value})} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Short Description</label>
                      <textarea required placeholder="Short summary..." rows={2} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-innovation-orange" value={editingPost ? editingPost.desc : newPost.desc} onChange={e => editingPost ? setEditingPost({...editingPost, desc: e.target.value}) : setNewPost({...newPost, desc: e.target.value})} />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Full Content</label>
                      <textarea required placeholder="Article text..." rows={8} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-innovation-orange" value={editingPost ? editingPost.content : newPost.content} onChange={e => editingPost ? setEditingPost({...editingPost, content: e.target.value}) : setNewPost({...newPost, content: e.target.value})} />
                    </div>

                    <div className="space-y-3 pt-2">
                       <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Images</label>
                       <div className="flex flex-wrap gap-2">
                         {(editingPost ? editingPost.images : newPost.images)?.map((img, idx) => (
                           <div key={idx} className="relative w-12 h-12 rounded-lg overflow-hidden group">
                              <img src={img} className="w-full h-full object-cover" alt="" />
                              <button type="button" onClick={() => removeNewsImage(idx)} className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Trash2 size={12} />
                              </button>
                           </div>
                         ))}
                         <button type="button" onClick={() => fileInputRef.current?.click()} className="w-12 h-12 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:border-innovation-orange transition-all">
                           <Plus size={16} />
                         </button>
                         <input type="file" ref={fileInputRef} hidden multiple accept="image/*" onChange={handleNewsFileChange} />
                       </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <button type="submit" className="flex-1 bg-navy text-white py-3 rounded-xl font-bold hover:bg-innovation-orange transition-all">
                        <Save size={18} className="mr-2" /> {editingPost ? 'Update' : 'Publish'}
                      </button>
                      {editingPost && <button type="button" onClick={() => setEditingPost(null)} className="p-3 bg-gray-100 rounded-xl"><X size={20} /></button>}
                    </div>
                  </form>
                </>
              )}

              {activeTab === 'announcements' && (
                <>
                  <h3 className="text-xl font-poppins font-bold text-navy mb-6">{editingAnnouncement ? 'Edit Pop-up' : 'Create Pop-up'}</h3>
                  <form onSubmit={editingAnnouncement ? handleEditAnnouncement : handleAddAnnouncement} className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Headline</label>
                        <input required placeholder="e.g. New Feature Live!" className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-innovation-orange" value={editingAnnouncement ? editingAnnouncement.title : newAnnouncement.title} onChange={e => editingAnnouncement ? setEditingAnnouncement({...editingAnnouncement, title: e.target.value}) : setNewAnnouncement({...newAnnouncement, title: e.target.value})} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Message</label>
                        <textarea required placeholder="Message details..." rows={3} className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-innovation-orange" value={editingAnnouncement ? editingAnnouncement.message : newAnnouncement.message} onChange={e => editingAnnouncement ? setEditingAnnouncement({...editingAnnouncement, message: e.target.value}) : setNewAnnouncement({...newAnnouncement, message: e.target.value})} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Image URL</label>
                        <input placeholder="https://..." className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-innovation-orange" value={editingAnnouncement ? editingAnnouncement.image : newAnnouncement.image} onChange={e => editingAnnouncement ? setEditingAnnouncement({...editingAnnouncement, image: e.target.value}) : setNewAnnouncement({...newAnnouncement, image: e.target.value})} />
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-gray-100">
                      <h4 className="text-[10px] font-black text-navy uppercase tracking-widest flex items-center">
                        <Settings size={14} className="mr-2" /> Display Rules
                      </h4>
                      <div className="grid grid-cols-1 gap-4">
                         <div className="space-y-1">
                           <label className="text-[10px] font-bold text-gray-400 uppercase">Trigger Event</label>
                           <div className="grid grid-cols-3 gap-2">
                             {[
                               { id: 'timer', icon: <Clock size={12}/>, label: 'Delay' },
                               { id: 'scroll', icon: <ArrowDown size={12}/>, label: 'Scroll' },
                               { id: 'exit', icon: <MousePointer2 size={12}/>, label: 'Exit' }
                             ].map(t => (
                               <button 
                                 key={t.id}
                                 type="button"
                                 onClick={() => editingAnnouncement ? setEditingAnnouncement({...editingAnnouncement, triggerType: t.id as any}) : setNewAnnouncement({...newAnnouncement, triggerType: t.id as any})}
                                 className={`flex flex-col items-center justify-center p-2 rounded-xl border text-[10px] font-bold transition-all ${
                                   (editingAnnouncement ? editingAnnouncement.triggerType : newAnnouncement.triggerType) === t.id 
                                   ? 'bg-navy text-white border-navy shadow-md' 
                                   : 'bg-white text-gray-400 border-gray-100 hover:bg-gray-50'
                                 }`}
                               >
                                 {t.icon}
                                 <span className="mt-1">{t.label}</span>
                               </button>
                             ))}
                           </div>
                         </div>

                         {(editingAnnouncement ? editingAnnouncement.triggerType : newAnnouncement.triggerType) !== 'exit' && (
                           <div className="space-y-1">
                             <label className="text-[10px] font-bold text-gray-400 uppercase">
                               {(editingAnnouncement ? editingAnnouncement.triggerType : newAnnouncement.triggerType) === 'timer' ? 'Delay (Seconds)' : 'Scroll Depth (%)'}
                             </label>
                             <input 
                               type="number" 
                               className="w-full bg-gray-50 rounded-xl px-4 py-2 text-sm"
                               value={editingAnnouncement ? editingAnnouncement.triggerValue : newAnnouncement.triggerValue} 
                               onChange={e => editingAnnouncement ? setEditingAnnouncement({...editingAnnouncement, triggerValue: parseInt(e.target.value)}) : setNewAnnouncement({...newAnnouncement, triggerValue: parseInt(e.target.value)})}
                             />
                           </div>
                         )}

                         <div className="space-y-1">
                           <label className="text-[10px] font-bold text-gray-400 uppercase">Frequency Capping</label>
                           <select 
                             className="w-full bg-gray-50 rounded-xl px-4 py-2 text-xs font-bold"
                             value={editingAnnouncement ? editingAnnouncement.frequency : newAnnouncement.frequency}
                             onChange={e => editingAnnouncement ? setEditingAnnouncement({...editingAnnouncement, frequency: e.target.value as any}) : setNewAnnouncement({...newAnnouncement, frequency: e.target.value as any})}
                           >
                             <option value="session">Once per Session</option>
                             <option value="daily">Once every 24 Hours</option>
                             <option value="once">Only Once (Lifetime)</option>
                           </select>
                         </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase px-1">CTA Label</label>
                        <input placeholder="e.g. Learn More" className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-innovation-orange" value={editingAnnouncement ? editingAnnouncement.ctaText : newAnnouncement.ctaText} onChange={e => editingAnnouncement ? setEditingAnnouncement({...editingAnnouncement, ctaText: e.target.value}) : setNewAnnouncement({...newAnnouncement, ctaText: e.target.value})} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase px-1">CTA Link</label>
                        <input placeholder="/solutions" className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-innovation-orange" value={editingAnnouncement ? editingAnnouncement.ctaLink : newAnnouncement.ctaLink} onChange={e => editingAnnouncement ? setEditingAnnouncement({...editingAnnouncement, ctaLink: e.target.value}) : setNewAnnouncement({...newAnnouncement, ctaLink: e.target.value})} />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button type="submit" className="flex-1 bg-navy text-white py-3 rounded-xl font-bold flex items-center justify-center hover:bg-innovation-orange transition-all">
                        <Save size={18} className="mr-2" /> {editingAnnouncement ? 'Save Changes' : 'Create Pop-up'}
                      </button>
                      {editingAnnouncement && <button type="button" onClick={() => setEditingAnnouncement(null)} className="p-3 bg-gray-100 rounded-xl"><X size={20} /></button>}
                    </div>
                  </form>
                </>
              )}

              {activeTab === 'jobs' && (
                <>
                  <h3 className="text-xl font-poppins font-bold text-navy mb-6">{editingJob ? 'Edit Job' : 'Post New Job'}</h3>
                  <form onSubmit={editingJob ? handleEditJob : handleAddJob} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Job Title</label>
                      <input required placeholder="e.g. AI Engineer" className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-innovation-orange" value={editingJob ? editingJob.title : newJob.title} onChange={e => editingJob ? setEditingJob({...editingJob, title: e.target.value}) : setNewJob({...newJob, title: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Department</label>
                        <select className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm" value={editingJob ? editingJob.department : newJob.department} onChange={e => editingJob ? setEditingJob({...editingJob, department: e.target.value}) : setNewJob({...newJob, department: e.target.value})}>
                          <option>Engineering</option>
                          <option>Research</option>
                          <option>Growth</option>
                          <option>Ops</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Type</label>
                        <select className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm" value={editingJob ? editingJob.type : newJob.type} onChange={e => editingJob ? setEditingJob({...editingJob, type: e.target.value}) : setNewJob({...newJob, type: e.target.value})}>
                          <option>Full-time</option>
                          <option>Contract</option>
                          <option>Hybrid</option>
                          <option>Remote</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Deadline</label>
                      <input required type="date" className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm" value={editingJob ? editingJob.deadline : newJob.deadline} onChange={e => editingJob ? setEditingJob({...editingJob, deadline: e.target.value}) : setNewJob({...newJob, deadline: e.target.value})} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Description</label>
                      <textarea required placeholder="Detailed description..." rows={6} className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm" value={editingJob ? editingJob.description : newJob.description} onChange={e => editingJob ? setEditingJob({...editingJob, description: e.target.value}) : setNewJob({...newJob, description: e.target.value})} />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Tags (Enter)</label>
                      <input placeholder="Add tag..." className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm" value={jobTagInput} onChange={e => setJobTagInput(e.target.value)} onKeyPress={handleJobTagKeyPress} />
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(editingJob ? editingJob.tags : newJob.tags).map(t => (
                          <span key={t} className="bg-gray-100 text-navy px-2 py-1 rounded-lg text-[10px] font-bold flex items-center">
                            {t} <button type="button" onClick={() => removeJobTag(t)} className="ml-1 text-red-400 hover:text-red-600"><X size={10}/></button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <button type="submit" className="flex-1 bg-navy text-white py-3 rounded-xl font-bold flex items-center justify-center">
                        <Save size={18} className="mr-2" /> {editingJob ? 'Update' : 'Post Job'}
                      </button>
                      {editingJob && <button type="button" onClick={() => setEditingJob(null)} className="p-3 bg-gray-100 rounded-xl"><X size={20} /></button>}
                    </div>
                  </form>
                </>
              )}

              {activeTab === 'training' && (
                <form 
                  onSubmit={e => { 
                    e.preventDefault(); 
                    if(trainingImageUrl.trim()) {
                      saveTraining([trainingImageUrl, ...trainingPosters]); 
                      setTrainingImageUrl(''); 
                    }
                  }} 
                  className="space-y-6"
                >
                  <h3 className="text-xl font-poppins font-bold text-navy">Add Training Poster</h3>
                  <div 
                    onClick={() => trainingFileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                  >
                    <Upload className="text-gray-300 mb-2" size={32} />
                    <span className="text-xs font-bold text-gray-400">Upload Image File</span>
                    <input type="file" ref={trainingFileInputRef} hidden multiple accept="image/*" onChange={handleTrainingFileUpload} />
                  </div>
                  <div className="relative py-2 text-center text-[10px] font-bold text-gray-300 uppercase tracking-widest">Or URL</div>
                  <input placeholder="https://..." className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-innovation-orange" value={trainingImageUrl} onChange={e => setTrainingImageUrl(e.target.value)} />
                  <button type="submit" className="w-full bg-navy text-white py-4 rounded-xl font-bold">Add to Loop</button>
                </form>
              )}

              {activeTab === 'gallery' && (
                <form onSubmit={e => { e.preventDefault(); saveGallery([newImageUrl, ...gallery]); setNewImageUrl(''); }} className="space-y-4">
                  <h3 className="text-xl font-poppins font-bold text-navy">Add to Gallery</h3>
                  <input required placeholder="Image URL" className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm" value={newImageUrl} onChange={e => setNewImageUrl(e.target.value)} />
                  <button type="submit" className="w-full bg-innovation-blue text-white py-4 rounded-xl font-bold">Add Image</button>
                </form>
              )}

              {activeTab === 'resources' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-poppins font-bold text-navy">Manage Resources</h3>
                  <div 
                    onClick={() => deckInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer ${investorDeck ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}
                  >
                    <input type="file" ref={deckInputRef} hidden accept="application/pdf" onChange={handleDeckUpload} />
                    {investorDeck ? (
                      <>
                        <CheckCircle2 className="text-green-500 mb-2" size={32} />
                        <span className="text-xs font-bold text-navy">{investorDeck.name}</span>
                      </>
                    ) : (
                      <>
                        <Upload className="text-gray-300 mb-2" size={32} />
                        <span className="text-xs font-bold text-gray-400">Upload Investor Deck (PDF)</span>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 min-h-[600px]">
              {activeTab === 'news' && (
                <div className="space-y-4">
                  <h3 className="font-poppins font-bold text-navy">Manage News Posts ({news.length})</h3>
                  {news.map(p => (
                    <div key={p.id} className="p-4 bg-gray-50 rounded-2xl flex justify-between items-center group border border-transparent hover:border-gray-200">
                      <div className="truncate flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-lg overflow-hidden shrink-0 border">
                           <img src={p.images?.[0] || INITIAL_GALLERY_IMAGES[0]} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div className="truncate">
                          <div className="text-[10px] text-gray-400 font-bold uppercase">{p.date} • {p.tag}</div>
                          <div className="font-bold text-navy truncate">{p.title}</div>
                        </div>
                      </div>
                      <div className="flex space-x-2 shrink-0">
                        <button onClick={() => {setEditingPost(p); window.scrollTo(0,0);}} className="p-2 bg-white text-gray-400 hover:text-innovation-blue rounded-lg shadow-sm"><Edit3 size={16}/></button>
                        <button onClick={() => { if(window.confirm('Delete post?')) saveNews(news.filter(x => x.id !== p.id)) }} className="p-2 bg-white text-gray-400 hover:text-red-500 rounded-lg shadow-sm"><Trash2 size={16}/></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'announcements' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-poppins font-bold text-navy">Site Announcements ({announcements.length})</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase italic">Only 1 pop-up can be active</p>
                  </div>
                  {announcements.length === 0 && <p className="text-center py-20 text-gray-400 italic">No pop-ups created yet.</p>}
                  {announcements.map(a => (
                    <div key={a.id} className={`p-6 rounded-[32px] border-2 transition-all ${a.isActive ? 'bg-innovation-blue/5 border-innovation-blue/20' : 'bg-gray-50 border-transparent hover:border-gray-200'}`}>
                      <div className="flex justify-between items-start">
                        <div className="flex gap-4">
                          <div className="w-16 h-16 bg-white rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center shrink-0">
                            {a.image ? <img src={a.image} className="w-full h-full object-cover" alt="" /> : <Megaphone className="text-gray-200" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                               <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${a.isActive ? 'bg-innovation-blue text-white' : 'bg-navy text-white'}`}>{a.type}</span>
                               {a.isActive && <span className="bg-green-500 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full animate-pulse">Live</span>}
                            </div>
                            <h4 className="font-bold text-navy text-lg leading-tight">{a.title}</h4>
                            <div className="flex items-center gap-3 mt-2 text-[9px] text-gray-400 font-bold uppercase">
                              <span className="flex items-center"><Clock size={10} className="mr-1"/> {a.triggerType} ({a.triggerValue}{a.triggerType === 'scroll' ? '%' : 's'})</span>
                              <span className="flex items-center"><UserIcon size={10} className="mr-1"/> {a.frequency}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                           <button onClick={() => toggleAnnouncement(a.id)} className={`p-2 rounded-xl transition-all ${a.isActive ? 'bg-innovation-blue text-white shadow-lg' : 'bg-white text-gray-300 hover:text-navy shadow-sm'}`}>
                             {a.isActive ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                           </button>
                           <button onClick={() => {setEditingAnnouncement(a); window.scrollTo(0,0);}} className="p-2 bg-white text-gray-400 hover:text-innovation-orange rounded-xl shadow-sm"><Edit3 size={18}/></button>
                           <button onClick={() => handleDeleteAnnouncement(a.id)} className="p-2 bg-white text-gray-400 hover:text-red-500 rounded-xl shadow-sm"><Trash2 size={18}/></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'jobs' && (
                <div className="space-y-4">
                  <h3 className="font-poppins font-bold text-navy">Manage Job Postings ({jobs.length})</h3>
                  {jobs.length === 0 && <p className="text-center py-20 text-gray-400 italic">No jobs available.</p>}
                  {jobs.map(j => (
                    <div key={j.id} className="p-5 bg-gray-50 rounded-3xl flex justify-between items-center group hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-gray-100">
                      <div className="truncate pr-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold text-innovation-orange uppercase">{j.department}</span>
                          <span className="text-[10px] text-gray-400">• {j.type}</span>
                        </div>
                        <div className="font-bold text-navy truncate text-lg leading-tight">{j.title}</div>
                        <div className="text-[10px] text-gray-400 font-bold mt-1">Deadline: {j.deadline}</div>
                      </div>
                      <div className="flex space-x-2 shrink-0">
                        <button onClick={() => {setEditingJob(j); window.scrollTo(0,0);}} className="p-3 bg-white text-gray-400 hover:text-innovation-blue rounded-xl shadow-sm"><Edit3 size={18}/></button>
                        <button onClick={() => handleDeleteJob(j.id)} className="p-3 bg-white text-gray-400 hover:text-red-500 rounded-xl shadow-sm"><Trash2 size={18}/></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'training' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {trainingPosters.map((url, idx) => (
                    <div key={idx} className="relative aspect-[3/4] rounded-2xl overflow-hidden group shadow-sm bg-gray-50 border">
                      <img src={url} className="w-full h-full object-cover" alt="" />
                      <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button onClick={() => saveTraining(trainingPosters.filter((_, i) => i !== idx))} className="p-2 bg-red-500 text-white rounded-lg hover:scale-110 transition-transform">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'gallery' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {gallery.map((url, idx) => (
                    <div key={idx} className="relative aspect-video rounded-2xl overflow-hidden group border">
                      <img src={url} className="w-full h-full object-cover" alt="" />
                      <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button onClick={() => saveGallery(gallery.filter((_, i) => i !== idx))} className="p-2 bg-red-500 text-white rounded-lg"><Trash2 size={20} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <FileText size={48} className="mb-4 opacity-20" />
                  <p className="text-sm italic">Additional resource management coming soon.</p>
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