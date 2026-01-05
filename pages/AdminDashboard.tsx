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
  GraduationCap
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

  const [activeTab, setActiveTab] = useState<'news' | 'gallery' | 'resources' | 'jobs' | 'training'>('news');
  const [news, setNews] = useState<NewsPost[]>([]);
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [gallery, setGallery] = useState<string[]>([]);
  const [trainingPosters, setTrainingPosters] = useState<string[]>([]);
  const [investorDeck, setInvestorDeck] = useState<ResourceFile | null>(null);
  
  const [editingPost, setEditingPost] = useState<NewsPost | null>(null);
  const [editingJob, setEditingJob] = useState<JobPosting | null>(null);

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

  const [jobTagInput, setJobTagInput] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [trainingImageUrl, setTrainingImageUrl] = useState('');
  const [fileError, setFileError] = useState<string | null>(null);
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
    try {
      localStorage.setItem('ds_news', JSON.stringify(updatedNews));
    } catch (e) {
      alert("Storage limit reached.");
    }
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
    if (window.confirm('Delete this job posting?')) {
      const updated = jobs.filter(j => j.id !== id);
      saveJobs(updated);
    }
  };

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
        // Explicitly cast file to Blob to satisfy TypeScript's readAsDataURL expectations
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
        // Explicitly cast file to Blob to satisfy TypeScript's readAsDataURL expectations
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
          <button onClick={() => setActiveTab('news')} className={`px-6 py-3 rounded-xl text-sm font-bold flex items-center transition-all ${activeTab === 'news' ? 'bg-white text-navy shadow-sm' : 'text-gray-500 hover:text-navy'}`}>
            <Newspaper size={18} className="mr-2" /> News
          </button>
          <button onClick={() => setActiveTab('jobs')} className={`px-6 py-3 rounded-xl text-sm font-bold flex items-center transition-all ${activeTab === 'jobs' ? 'bg-white text-navy shadow-sm' : 'text-gray-500 hover:text-navy'}`}>
            <Briefcase size={18} className="mr-2" /> Jobs
          </button>
          <button onClick={() => setActiveTab('training')} className={`px-6 py-3 rounded-xl text-sm font-bold flex items-center transition-all ${activeTab === 'training' ? 'bg-white text-navy shadow-sm' : 'text-gray-500 hover:text-navy'}`}>
            <GraduationCap size={18} className="mr-2" /> Training
          </button>
          <button onClick={() => setActiveTab('gallery')} className={`px-6 py-3 rounded-xl text-sm font-bold flex items-center transition-all ${activeTab === 'gallery' ? 'bg-white text-navy shadow-sm' : 'text-gray-500 hover:text-navy'}`}>
            <ImageIcon size={18} className="mr-2" /> Gallery
          </button>
          <button onClick={() => setActiveTab('resources')} className={`px-6 py-3 rounded-xl text-sm font-bold flex items-center transition-all ${activeTab === 'resources' ? 'bg-white text-navy shadow-sm' : 'text-gray-500 hover:text-navy'}`}>
            <FileText size={18} className="mr-2" /> Resources
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
                      <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Short Description (Summary Card)</label>
                      <textarea required placeholder="Short summary for the listing page..." rows={2} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-innovation-orange" value={editingPost ? editingPost.desc : newPost.desc} onChange={e => editingPost ? setEditingPost({...editingPost, desc: e.target.value}) : setNewPost({...newPost, desc: e.target.value})} />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Full Post Content</label>
                      <textarea required placeholder="The complete article text..." rows={8} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-innovation-orange" value={editingPost ? editingPost.content : newPost.content} onChange={e => editingPost ? setEditingPost({...editingPost, content: e.target.value}) : setNewPost({...newPost, content: e.target.value})} />
                    </div>

                    <div className="space-y-3 pt-2">
                       <label className="text-[10px] font-bold text-gray-400 uppercase px-1 flex justify-between items-center">
                         Images
                         <span className="text-[9px] lowercase italic text-gray-300">{(editingPost ? editingPost.images : newPost.images)?.length || 0} attached</span>
                       </label>
                       
                       <div className="flex flex-wrap gap-2 mb-3">
                         {(editingPost ? editingPost.images : newPost.images)?.map((img, idx) => (
                           <div key={idx} className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-100 group">
                              <img src={img} className="w-full h-full object-cover" alt="" />
                              <button type="button" onClick={() => removeNewsImage(idx)} className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Trash2 size={12} />
                              </button>
                           </div>
                         ))}
                         <button type="button" onClick={() => fileInputRef.current?.click()} className="w-12 h-12 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:border-innovation-orange hover:text-innovation-orange transition-all">
                           <Plus size={16} />
                         </button>
                         <input type="file" ref={fileInputRef} hidden multiple accept="image/*" onChange={handleNewsFileChange} />
                       </div>

                       <div className="flex gap-2">
                         <input placeholder="Or paste image URL..." className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-2 text-xs focus:ring-2 focus:ring-innovation-orange" value={newImageUrl} onChange={e => setNewImageUrl(e.target.value)} />
                         <button type="button" onClick={addImageUrlToNews} className="px-3 bg-gray-100 rounded-xl hover:bg-gray-200"><Plus size={14} /></button>
                       </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <button type="submit" className="flex-1 bg-navy text-white py-3 rounded-xl font-bold flex items-center justify-center hover:bg-innovation-orange transition-all">
                        <Save size={18} className="mr-2" /> {editingPost ? 'Update' : 'Publish'}
                      </button>
                      {editingPost && <button type="button" onClick={() => setEditingPost(null)} className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"><X size={20} /></button>}
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
                      <input required placeholder="e.g. AI Research Lead" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-innovation-orange" value={editingJob ? editingJob.title : newJob.title} onChange={e => editingJob ? setEditingJob({...editingJob, title: e.target.value}) : setNewJob({...newJob, title: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Department</label>
                        <select className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm" value={editingJob ? editingJob.department : newJob.department} onChange={e => editingJob ? setEditingJob({...editingJob, department: e.target.value}) : setNewJob({...newJob, department: e.target.value})}>
                          <option>Engineering</option>
                          <option>Research</option>
                          <option>Growth</option>
                          <option>Ops</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Type</label>
                        <select className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm" value={editingJob ? editingJob.type : newJob.type} onChange={e => editingJob ? setEditingJob({...editingJob, type: e.target.value}) : setNewJob({...newJob, type: e.target.value})}>
                          <option>Full-time</option>
                          <option>Contract</option>
                          <option>Hybrid</option>
                          <option>Remote</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Location</label>
                      <input required placeholder="Location" className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm" value={editingJob ? editingJob.location : newJob.location} onChange={e => editingJob ? setEditingJob({...editingJob, location: e.target.value}) : setNewJob({...newJob, location: e.target.value})} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Application Deadline</label>
                      <input required type="date" className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm" value={editingJob ? editingJob.deadline : newJob.deadline} onChange={e => editingJob ? setEditingJob({...editingJob, deadline: e.target.value}) : setNewJob({...newJob, deadline: e.target.value})} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Detailed Description</label>
                      <textarea required placeholder="Job Description (Detailed)" rows={6} className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm" value={editingJob ? editingJob.description : newJob.description} onChange={e => editingJob ? setEditingJob({...editingJob, description: e.target.value}) : setNewJob({...newJob, description: e.target.value})} />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Tags (Press Enter)</label>
                      <input placeholder="Add tag..." className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm" value={jobTagInput} onChange={e => setJobTagInput(e.target.value)} onKeyPress={handleJobTagKeyPress} />
                      <div className="flex flex-wrap gap-2">
                        {(editingJob ? editingJob.tags : newJob.tags).map(t => (
                          <span key={t} className="bg-gray-100 text-navy px-2 py-1 rounded-lg text-xs flex items-center">
                            {t} <button type="button" onClick={() => removeJobTag(t)} className="ml-1 text-red-400 hover:text-red-600"><X size={10}/></button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
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
                  <h3 className="text-xl font-poppins font-bold text-navy flex items-center">
                    <GraduationCap className="mr-2 text-innovation-orange" /> Add Training Poster
                  </h3>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Upload Local Image</label>
                    <div 
                      onClick={() => trainingFileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all"
                    >
                      <Upload className="text-gray-300 mb-2" size={24} />
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Direct Upload</span>
                      <input 
                        type="file" 
                        ref={trainingFileInputRef} 
                        hidden 
                        multiple 
                        accept="image/*" 
                        onChange={handleTrainingFileUpload} 
                      />
                    </div>
                  </div>

                  <div className="relative py-2 text-center">
                     <span className="bg-white px-2 text-[10px] text-gray-300 font-bold uppercase z-10 relative">Or</span>
                     <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-100"></div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">External Image URL</label>
                    <input 
                      placeholder="https://..." 
                      className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-innovation-orange" 
                      value={trainingImageUrl} 
                      onChange={e => setTrainingImageUrl(e.target.value)} 
                    />
                  </div>

                  <button type="submit" className="w-full bg-navy text-white py-4 rounded-xl font-bold flex items-center justify-center hover:bg-innovation-orange transition-all">
                    <Plus size={18} className="mr-2" /> Add Poster to Loop
                  </button>
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
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Investor Deck (PDF)</label>
                    <div 
                      onClick={() => deckInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${
                        investorDeck ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200 hover:border-innovation-orange'
                      }`}
                    >
                      <input type="file" ref={deckInputRef} hidden accept="application/pdf" onChange={handleDeckUpload} />
                      {investorDeck ? (
                        <>
                          <CheckCircle2 className="text-green-500 mb-2" size={32} />
                          <span className="text-xs font-bold text-navy">{investorDeck.name}</span>
                          <span className="text-[10px] text-gray-400 mt-1">Click to replace</span>
                        </>
                      ) : (
                        <>
                          <Upload className="text-gray-300 mb-2" size={32} />
                          <span className="text-xs font-bold text-gray-400">Upload PDF Deck</span>
                        </>
                      )}
                    </div>
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
                    <div key={p.id} className="p-4 bg-gray-50 rounded-2xl flex justify-between items-center hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200">
                      <div className="truncate pr-4 flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white rounded-lg overflow-hidden border border-gray-100 shrink-0">
                          {p.images && p.images.length > 0 ? (
                            <img src={p.images[0]} className="w-full h-full object-cover" alt="" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-200"><ImageIcon size={18}/></div>
                          )}
                        </div>
                        <div className="truncate">
                          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">{p.date} • {p.tag}</div>
                          <div className="font-bold text-navy truncate">{p.title}</div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button onClick={() => {setEditingPost(p); window.scrollTo(0,0);}} className="p-2 bg-white text-gray-400 hover:text-innovation-blue rounded-lg shadow-sm"><Edit3 size={16}/></button>
                        <button onClick={() => { if(window.confirm('Delete this post?')) saveNews(news.filter(x => x.id !== p.id)) }} className="p-2 bg-white text-gray-400 hover:text-red-500 rounded-lg shadow-sm"><Trash2 size={16}/></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'jobs' && (
                <div className="space-y-4">
                  <h3 className="font-poppins font-bold text-navy">Manage Job Postings ({jobs.length})</h3>
                  {jobs.length === 0 && <p className="text-center py-20 text-gray-400 italic">No job postings available.</p>}
                  {jobs.map(j => (
                    <div key={j.id} className="p-5 bg-gray-50 rounded-3xl flex justify-between items-center group hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-gray-100">
                      <div className="truncate max-w-md">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-[10px] font-bold text-innovation-orange uppercase">{j.department}</span>
                          <span className="text-[10px] font-bold text-gray-400">• {j.type}</span>
                        </div>
                        <div className="font-bold text-navy truncate text-lg">{j.title}</div>
                        <div className="flex items-center text-[10px] text-gray-400 font-bold space-x-3">
                          <span>{j.location}</span>
                          <span className="text-red-400 flex items-center"><Calendar size={10} className="mr-1"/> Deadline: {j.deadline}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button onClick={() => {setEditingJob(j); window.scrollTo(0,0);}} className="p-3 bg-white text-gray-400 hover:text-innovation-blue rounded-xl shadow-sm"><Edit3 size={18}/></button>
                        <button onClick={() => handleDeleteJob(j.id)} className="p-3 bg-white text-gray-400 hover:text-red-500 rounded-xl shadow-sm"><Trash2 size={18}/></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'training' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-poppins font-bold text-navy">Training Posters ({trainingPosters.length})</h3>
                    <button onClick={() => { if(window.confirm('Reset to default posters?')) saveTraining(INITIAL_TRAINING_POSTERS) }} className="text-[10px] font-bold text-gray-400 hover:text-innovation-orange uppercase tracking-widest">Reset Defaults</button>
                  </div>
                  
                  {trainingPosters.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-[32px] border border-dashed border-gray-200">
                       <GraduationCap className="mx-auto mb-4 text-gray-200" size={48} />
                       <p className="text-gray-400 italic">No posters added to the ticker.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {trainingPosters.map((url, idx) => (
                        <div key={idx} className="relative aspect-[3/4] rounded-2xl overflow-hidden group border border-gray-100 shadow-sm bg-gray-50">
                          <img src={url} className="w-full h-full object-cover" alt="" />
                          <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button onClick={() => saveTraining(trainingPosters.filter((_, i) => i !== idx))} className="p-2 bg-red-500 text-white rounded-lg hover:scale-110 transition-transform">
                              <Trash2 size={20} />
                            </button>
                          </div>
                          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-bold text-navy shadow">
                            Slide #{trainingPosters.length - idx}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'gallery' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {gallery.map((url, idx) => (
                    <div key={idx} className="relative aspect-video rounded-2xl overflow-hidden group border border-gray-100">
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
                  <p className="text-sm italic">Additional resource management features coming soon.</p>
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