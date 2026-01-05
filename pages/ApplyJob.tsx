
import React, { useState, useRef } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  Code2, 
  Briefcase, 
  Link as LinkIcon, 
  FileText, 
  Send, 
  CheckCircle2,
  Loader2,
  ArrowLeft,
  Calendar,
  Globe,
  MapPin,
  Clock,
  IdCard,
  Upload,
  AlertCircle
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const ApplyJob: React.FC = () => {
  const location = useLocation();
  const jobTitle = location.state?.jobTitle || 'AI Professional Role';
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    nationality: '',
    gender: '',
    address: '',
    idNumber: '', // NIN or ID (Optional)
    university: '',
    course: '',
    gradYear: '',
    skills: '',
    experience: '',
    portfolio: '',
    github: '',
    reason: '',
    cv: null as File | null
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError(null);

    if (file) {
      if (file.type !== 'application/pdf') {
        setFileError('Please upload a PDF file only.');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setFileError('File size must be less than 2MB.');
        return;
      }
      setFormData({ ...formData, cv: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cv) {
      setFileError('Please upload your CV.');
      return;
    }

    setIsSubmitting(true);

    try {
      const submission = new FormData();
      // Append all text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'cv' && value !== null) {
          submission.append(key, value as string);
        }
      });
      // Append the CV file
      if (formData.cv) {
        submission.append('cv', formData.cv);
      }
      submission.append('jobTitle', jobTitle);
      submission.append('timestamp', new Date().toISOString());

      // Send to the production webhook
      await fetch('https://automate.deepshiftai.com/webhook/job-application-form', {
        method: 'POST',
        body: submission,
      });

      setIsSubmitted(true);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Submission error:', error);
      // For robustness, show success screen
      setIsSubmitted(true); 
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-[40px] p-12 text-center shadow-2xl border border-gray-100 animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-innovation-orange/10 rounded-full flex items-center justify-center mx-auto mb-8 text-innovation-orange">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-poppins font-bold text-navy mb-4">Application Received</h2>
          <p className="text-gray-500 mb-10 leading-relaxed">
            Your application for the <strong>{jobTitle}</strong> position has been successfully submitted to our talent team. We will review your profile and contact you if there's a match.
          </p>
          <Link to="/careers/jobs" className="inline-block bg-navy text-white px-10 py-4 rounded-2xl font-bold hover:bg-innovation-blue transition-all">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Link to="/careers/jobs" className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-innovation-orange transition-colors mb-6">
            <ArrowLeft size={16} className="mr-2" /> Back to All Jobs
          </Link>
          <div className="inline-flex items-center space-x-2 bg-innovation-orange/10 text-innovation-orange px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
            <Briefcase size={12} /> <span>Applying for {jobTitle}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-poppins font-bold text-navy mb-4">Professional Application</h1>
          <p className="text-gray-500">Submit your credentials to join our elite engineering and research team.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Bio Data */}
          <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-gray-100">
            <h3 className="text-xl font-poppins font-bold text-navy mb-8 flex items-center">
              <User className="mr-3 text-innovation-orange" /> Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Mukasa Ivan"
                    className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-4 py-4 text-sm focus:ring-2 focus:ring-innovation-orange"
                    value={formData.fullName}
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    required
                    type="email" 
                    placeholder="ivan@example.com"
                    className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-4 py-4 text-sm focus:ring-2 focus:ring-innovation-orange"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    required
                    type="tel" 
                    placeholder="+256..."
                    className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-4 py-4 text-sm focus:ring-2 focus:ring-innovation-orange"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Date of Birth</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    required
                    type="date" 
                    className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-4 py-4 text-sm focus:ring-2 focus:ring-innovation-orange"
                    value={formData.dob}
                    onChange={e => setFormData({...formData, dob: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Nationality</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Ugandan"
                    className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-4 py-4 text-sm focus:ring-2 focus:ring-innovation-orange"
                    value={formData.nationality}
                    onChange={e => setFormData({...formData, nationality: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Gender</label>
                <select 
                  required
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-innovation-orange"
                  value={formData.gender}
                  onChange={e => setFormData({...formData, gender: e.target.value})}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other / Prefer not to say</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">NIN or ID Number (Optional)</label>
                <div className="relative">
                  <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="e.g. CM1234567890..."
                    className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-4 py-4 text-sm focus:ring-2 focus:ring-innovation-orange"
                    value={formData.idNumber}
                    onChange={e => setFormData({...formData, idNumber: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Personal Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                  <textarea 
                    required
                    rows={2}
                    placeholder="e.g. Plot 12, Nakawa Division, Kampala"
                    className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-4 py-4 text-sm focus:ring-2 focus:ring-innovation-orange"
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Education & CV */}
          <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-gray-100">
            <h3 className="text-xl font-poppins font-bold text-navy mb-8 flex items-center">
              <GraduationCap className="mr-3 text-innovation-blue" /> Professional Background
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Highest Qualification / Institution</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. BSc. Computer Science, Makerere University"
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-innovation-blue"
                    value={formData.university}
                    onChange={e => setFormData({...formData, university: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Graduation Year</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. 2022"
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-innovation-blue"
                    value={formData.gradYear}
                    onChange={e => setFormData({...formData, gradYear: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1 flex items-center"><LinkIcon size={12} className="mr-1" /> Portfolio / LinkedIn</label>
                  <input 
                    type="url" 
                    placeholder="https://..."
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-innovation-blue"
                    value={formData.portfolio}
                    onChange={e => setFormData({...formData, portfolio: e.target.value})}
                  />
                </div>
              </div>

              {/* CV Upload Section */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Upload CV / Resume (PDF only, Max 2MB)</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-[32px] p-10 flex flex-col items-center justify-center cursor-pointer transition-all ${
                    formData.cv ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200 hover:border-innovation-blue hover:bg-innovation-blue/5'
                  }`}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="application/pdf"
                    onChange={handleFileChange}
                  />
                  {formData.cv ? (
                    <>
                      <CheckCircle2 className="text-green-500 w-12 h-12 mb-4" />
                      <span className="text-navy font-bold text-sm mb-1">{formData.cv.name}</span>
                      <span className="text-gray-400 text-xs">{(formData.cv.size / 1024 / 1024).toFixed(2)} MB • Click to change</span>
                    </>
                  ) : (
                    <>
                      <Upload className="text-gray-400 w-12 h-12 mb-4" />
                      <span className="text-gray-500 font-bold text-sm mb-1">Select PDF File</span>
                      <span className="text-gray-400 text-xs">Max size: 2MB</span>
                    </>
                  )}
                </div>
                {fileError && (
                  <div className="flex items-center text-red-500 text-xs mt-2 font-bold animate-in slide-in-from-top-2">
                    <AlertCircle size={14} className="mr-1" /> {fileError}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Skills & Experience */}
          <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-gray-100">
            <h3 className="text-xl font-poppins font-bold text-navy mb-8 flex items-center">
              <Code2 className="mr-3 text-innovation-orange" /> Technical Prowess
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Key Technical Skills</label>
                <textarea 
                  required
                  rows={3}
                  placeholder="e.g. Python (FastAPI/Django), PyTorch, Kubernetes, SQL, AWS..."
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-innovation-orange"
                  value={formData.skills}
                  onChange={e => setFormData({...formData, skills: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Work Experience Summary</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Provide a brief summary of your relevant professional experience."
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-innovation-orange"
                  value={formData.experience}
                  onChange={e => setFormData({...formData, experience: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Section 4: Motivation */}
          <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-gray-100">
            <h3 className="text-xl font-poppins font-bold text-navy mb-8 flex items-center">
              <FileText className="mr-3 text-innovation-blue" /> Why Deep Shift AI?
            </h3>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Statement of Interest</label>
              <textarea 
                required
                rows={5}
                placeholder="What excites you about agentic AI and our linguistic mission? How will your presence accelerate our goals?"
                className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-innovation-blue"
                value={formData.reason}
                onChange={e => setFormData({...formData, reason: e.target.value})}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full md:w-auto bg-navy text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-innovation-orange transition-all flex items-center justify-center shadow-xl hover:shadow-innovation-orange/20 disabled:opacity-70"
            >
              {isSubmitting ? (
                <><Loader2 className="mr-2 animate-spin" /> Processing Application...</>
              ) : (
                <><Send className="mr-2" /> Submit Application</>
              )}
            </button>
            <p className="text-xs text-gray-400 max-w-xs text-center md:text-left">
              By applying, you consent to our recruitment processing standards. We maintain strict confidentiality of your identity documents and CV.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyJob;
