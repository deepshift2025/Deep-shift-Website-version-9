
import React, { useState, useMemo } from 'react';
import { Mail, Phone, MapPin, Send, Briefcase, Calendar, ChevronLeft, ChevronRight, CheckCircle2, Clock, User, PhoneCall, FileText, Loader2 } from 'lucide-react';

// --- Internal Component: Booking Calendar ---
const BookingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookingStep, setBookingStep] = useState<'date' | 'time' | 'details' | 'confirmed'>('date');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    reason: ''
  });

  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }, [currentMonth]);

  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", 
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM"
  ];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const handleDateSelect = (date: Date) => {
    if (isWeekend(date)) return;
    setSelectedDate(date);
    setBookingStep('time');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setBookingStep('details');
  };

  const handleFinalConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...bookingForm,
      date: selectedDate?.toLocaleDateString(),
      time: selectedTime,
      timestamp: new Date().toISOString()
    };

    try {
      await fetch('https://automate.deepshiftai.com/webhook/book_appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('Booking request sent successfully to webhook:', payload);
      setBookingStep('confirmed');
    } catch (error) {
      console.error('Failed to send booking request to webhook:', error);
      setBookingStep('confirmed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getGoogleCalendarUrl = () => {
    if (!selectedDate || !selectedTime) return "#";
    const base = "https://www.google.com/calendar/render?action=TEMPLATE";
    const title = `&text=Deep Shift AI Strategy Session - ${bookingForm.name}`;
    const details = `&details=Reason: ${bookingForm.reason}%0AAttendee: ${bookingForm.name}%0APhone: ${bookingForm.phone}%0AEmail: ${bookingForm.email}`;
    const location = "&location=Google Meet (Link will be provided)";
    
    const dateStr = selectedDate.toISOString().split('T')[0].replace(/-/g, '');
    const timePart = selectedTime.includes('AM') ? selectedTime.split(':')[0] : (parseInt(selectedTime.split(':')[0]) + 12).toString();
    const start = `${dateStr}T${timePart.padStart(2, '0')}0000Z`;
    const end = `${dateStr}T${timePart.padStart(2, '0')}1500Z`;
    return `${base}${title}${details}${location}&dates=${start}/${end}`;
  };

  if (bookingStep === 'confirmed') {
    return (
      <div className="text-center py-12 animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="text-green-600 w-10 h-10" />
        </div>
        <h3 className="text-2xl font-poppins font-bold text-navy mb-2">Booking Requested!</h3>
        <p className="text-gray-500 mb-8 max-w-xs mx-auto text-sm">
          A confirmation request has been sent to info@deepshiftai.com. We've reserved {selectedTime} on {selectedDate?.toLocaleDateString()} for you.
        </p>
        <div className="space-y-4">
          <a 
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-navy text-white py-4 rounded-2xl font-bold hover:bg-innovation-blue transition-all"
          >
            Add to Google Calendar
          </a>
          <button 
            onClick={() => {
              setBookingStep('date');
              setBookingForm({ name: '', email: '', phone: '', reason: '' });
            }}
            className="text-gray-400 text-sm font-semibold hover:text-navy"
          >
            Schedule another time
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-poppins font-bold text-lg text-navy">
          {bookingStep === 'date' && 'Select a Date'}
          {bookingStep === 'time' && `Times for ${selectedDate?.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}`}
          {bookingStep === 'details' && 'Booking Details'}
        </h3>
        {bookingStep !== 'date' && !isSubmitting && (
          <button 
            onClick={() => setBookingStep(bookingStep === 'details' ? 'time' : 'date')} 
            className="text-innovation-blue text-sm font-bold flex items-center"
          >
            <ChevronLeft size={16} /> Back
          </button>
        )}
      </div>

      {bookingStep === 'date' && (
        <>
          <div className="flex items-center justify-between mb-4 px-2">
            <span className="font-bold text-sm text-gray-700">{monthName} {year}</span>
            <div className="flex space-x-2">
              <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded-lg"><ChevronLeft size={20}/></button>
              <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded-lg"><ChevronRight size={20}/></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
              <div key={d} className="text-center text-[10px] font-bold text-gray-400 py-2">{d}</div>
            ))}
            {Array(daysInMonth[0].getDay()).fill(null).map((_, i) => (
              <div key={`empty-${i}`} className="p-2"></div>
            ))}
            {daysInMonth.map((date, i) => {
              const disabled = isWeekend(date) || date < new Date(new Date().setHours(0,0,0,0));
              const selected = selectedDate?.toDateString() === date.toDateString();
              return (
                <button
                  key={i}
                  disabled={disabled}
                  onClick={() => handleDateSelect(date)}
                  className={`
                    p-2 text-xs rounded-xl transition-all aspect-square flex flex-col items-center justify-center relative
                    ${disabled ? 'text-gray-200 cursor-not-allowed' : 'text-navy hover:bg-innovation-blue/10'}
                    ${selected ? 'bg-innovation-blue text-white shadow-lg' : ''}
                    ${isToday(date) ? 'border-2 border-innovation-orange' : ''}
                  `}
                >
                  {date.getDate()}
                  {isToday(date) && <span className="absolute bottom-1 w-1 h-1 bg-innovation-orange rounded-full"></span>}
                </button>
              );
            })}
          </div>
          <div className="flex items-center space-x-4 text-[10px] text-gray-400">
            <div className="flex items-center"><span className="w-2 h-2 bg-innovation-orange rounded-full mr-1"></span> Today</div>
            <div className="flex items-center"><span className="w-2 h-2 bg-gray-100 rounded-sm mr-1"></span> Available</div>
            <div className="flex items-center"><span className="w-2 h-2 bg-gray-200 rounded-sm mr-1"></span> Busy</div>
          </div>
        </>
      )}

      {bookingStep === 'time' && (
        <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
          {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => handleTimeSelect(time)}
              className={`
                w-full p-4 text-sm font-bold rounded-2xl border transition-all flex items-center justify-between group
                ${selectedTime === time 
                  ? 'bg-innovation-blue border-innovation-blue text-white shadow-lg' 
                  : 'bg-white border-gray-100 text-navy hover:border-innovation-blue'}
              `}
            >
              <div className="flex items-center">
                <Clock size={16} className={`mr-2 ${selectedTime === time ? 'text-white' : 'text-innovation-blue'}`} />
                {time}
              </div>
              <ChevronRight size={16} className={`${selectedTime === time ? 'text-white opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`} />
            </button>
          ))}
        </div>
      )}

      {bookingStep === 'details' && (
        <form onSubmit={handleFinalConfirm} className="space-y-4 animate-in slide-in-from-right-4 duration-300">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              required
              type="text"
              placeholder="Full Name"
              className="w-full bg-gray-50 border-none rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-innovation-blue"
              value={bookingForm.name}
              onChange={e => setBookingForm({...bookingForm, name: e.target.value})}
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              required
              type="email"
              placeholder="Email Address"
              className="w-full bg-gray-50 border-none rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-innovation-blue"
              value={bookingForm.email}
              onChange={e => setBookingForm({...bookingForm, email: e.target.value})}
            />
          </div>
          <div className="relative">
            <PhoneCall className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              required
              type="tel"
              placeholder="Telephone Number"
              className="w-full bg-gray-50 border-none rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-innovation-blue"
              value={bookingForm.phone}
              onChange={e => setBookingForm({...bookingForm, phone: e.target.value})}
            />
          </div>
          <div className="relative">
            <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <textarea 
              required
              placeholder="Reason for Appointment"
              rows={3}
              className="w-full bg-gray-50 border-none rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-innovation-blue"
              value={bookingForm.reason}
              onChange={e => setBookingForm({...bookingForm, reason: e.target.value})}
            ></textarea>
          </div>
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-navy text-white py-4 rounded-2xl font-bold hover:bg-innovation-blue transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Processing...</> : 'Confirm Appointment'}
          </button>
          <p className="text-[10px] text-gray-400 text-center">
            By confirming, your details will be shared with info@deepshiftai.com
          </p>
        </form>
      )}
    </div>
  );
};

// --- Main Page Component ---
const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    interest: 'Consultation',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formState,
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch('https://automate.deepshiftai.com/webhook-test/inquiry-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Thank you for your interest! Your inquiry has been sent successfully. Our team will contact you within 24 hours.");
        setFormState({
          name: '',
          email: '',
          phone: '',
          company: '',
          interest: 'Consultation',
          message: ''
        });
      } else {
        throw new Error('Failed to send inquiry');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert("We encountered an error sending your inquiry. Please try again or email us directly at info@deepshiftai.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-navy mb-4">Let's Build the Future Together</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">Get in touch with our experts to discuss custom AI solutions, training, or strategic partnerships.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info Column */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="font-poppins font-bold text-xl text-navy mb-6">Contact Details</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-innovation-orange/10 p-3 rounded-xl text-innovation-orange">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 uppercase font-bold tracking-widest">Email Us</div>
                    <a href="mailto:info@deepshiftai.com" className="text-navy font-semibold hover:text-innovation-orange transition-colors">info@deepshiftai.com</a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-innovation-blue/10 p-3 rounded-xl text-innovation-blue">
                    <Phone size={24} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 uppercase font-bold tracking-widest">Call Us</div>
                    <div className="text-navy font-semibold">+256 761 440460<br />+256 709 250797</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-navy/10 p-3 rounded-xl text-navy">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 uppercase font-bold tracking-widest">Visit Us</div>
                    <div className="text-navy font-semibold">National ICT Innovation Hub,<br />Nakawa, Kampala, Uganda</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Calendar Integrated Widget */}
            <div className="bg-white p-8 rounded-[40px] shadow-xl border-4 border-navy/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-innovation-blue/5 rounded-bl-full pointer-events-none"></div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-navy rounded-2xl text-white">
                  <Calendar size={24} />
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-xl text-navy">Schedule Meeting</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Direct via Google Calendar</p>
                </div>
              </div>
              <BookingCalendar />
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-2 bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-poppins font-bold text-2xl text-navy mb-8">Send an Inquiry</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name <span className="text-innovation-orange">*</span></label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-gray-50 border-none focus:ring-2 focus:ring-innovation-orange rounded-xl px-5 py-3"
                    placeholder="John Doe"
                    value={formState.name}
                    onChange={e => setFormState({...formState, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Work Email <span className="text-innovation-orange">*</span></label>
                  <input 
                    required
                    type="email" 
                    className="w-full bg-gray-50 border-none focus:ring-2 focus:ring-innovation-orange rounded-xl px-5 py-3"
                    placeholder="john@company.com"
                    value={formState.email}
                    onChange={e => setFormState({...formState, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Telephone Number <span className="text-innovation-orange">*</span></label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                      required
                      type="tel" 
                      className="w-full bg-gray-50 border-none focus:ring-2 focus:ring-innovation-orange rounded-xl pl-12 pr-5 py-3"
                      placeholder="+256 700 000000"
                      value={formState.phone}
                      onChange={e => setFormState({...formState, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Interest Area <span className="text-innovation-orange">*</span></label>
                  <select 
                    required
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-innovation-orange"
                    value={formState.interest}
                    onChange={e => setFormState({...formState, interest: e.target.value})}
                  >
                    <option value="">Select an Area</option>
                    <option value="Consultation">Consultation</option>
                    <option value="AI Automation">AI Automation</option>
                    <option value="Custom LLM Development">Custom LLM Development</option>
                    <option value="Agentic AI Solutions">Agentic AI Solutions</option>
                    <option value="Corporate Training">Corporate Training</option>
                    <option value="Investor Inquiry">Investor Inquiry</option>
                    <option value="Partnerships">Partnerships</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Company Name (Optional)</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="text" 
                    className="w-full bg-gray-50 border-none focus:ring-2 focus:ring-innovation-orange rounded-xl pl-12 pr-5 py-3"
                    placeholder="Organization Ltd"
                    value={formState.company}
                    onChange={e => setFormState({...formState, company: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message <span className="text-innovation-orange">*</span></label>
                <textarea 
                  required
                  rows={5}
                  className="w-full bg-gray-50 border-none focus:ring-2 focus:ring-innovation-orange rounded-xl px-5 py-3"
                  placeholder="Tell us about your project or goals..."
                  value={formState.message}
                  onChange={e => setFormState({...formState, message: e.target.value})}
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-innovation-orange text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-innovation-orange/20 transition-all flex items-center justify-center disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 w-5 h-5" /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-20 rounded-[40px] overflow-hidden h-96 shadow-2xl relative grayscale hover:grayscale-0 transition-all duration-1000">
           <div className="absolute inset-0 bg-navy/20 z-10 pointer-events-none"></div>
           <img 
            src="https://i.postimg.cc/cJDgSwLB/national-ict-hub.jpg" 
            alt="National ICT Innovation Hub" 
            className="w-full h-full object-cover"
           />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center">
              <div className="bg-innovation-orange p-4 rounded-full shadow-2xl animate-bounce">
                <MapPin className="text-white w-8 h-8" />
              </div>
              <div className="mt-4 bg-white px-6 py-2 rounded-full shadow-xl font-bold text-navy whitespace-nowrap">
                National ICT Innovation Hub
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
