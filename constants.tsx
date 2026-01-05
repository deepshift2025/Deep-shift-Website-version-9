import React from 'react';
import { 
  Bot, 
  Cpu, 
  Settings, 
  BarChart, 
  BookOpen, 
  Stethoscope, 
  Briefcase, 
  Globe, 
  Sprout, 
  Building2, 
  Users,
  Store
} from 'lucide-react';

export const COLORS = {
  navy: '#1a2332',
  orange: '#FF0174', 
  blue: '#02B4E8', 
};

export const SERVICES = [
  {
    id: 'automation',
    title: 'AI Automation',
    description: 'Eliminate repetitive tasks and optimize legacy systems with bespoke automation that delivers measurable value.',
    icon: <Settings className="w-8 h-8" />
  },
  {
    id: 'ai-agents',
    title: 'Agentic AI (AI Agents)',
    description: 'Building intelligent agents capable of planning, reasoning, and executing complex business goals with precision.',
    icon: <Bot className="w-8 h-8" />
  },
  {
    id: 'custom-llms',
    title: 'Custom LLM Development',
    description: 'Proprietary Large Language Models fine-tuned on your business data for absolute privacy and domain expertise.',
    icon: <Cpu className="w-8 h-8" />
  },
  {
    id: 'consulting',
    title: 'AI Consulting',
    description: 'Strategic AI roadmapping and readiness assessments to prepare your organization for the next decade of growth.',
    icon: <BarChart className="w-8 h-8" />
  },
  {
    id: 'training',
    title: 'AI Training',
    description: 'Empowering teams to leverage AI tools effectively through role-specific, interactive corporate workshops.',
    icon: <BookOpen className="w-8 h-8" />
  }
];

export const INDUSTRIES = [
  { id: 'banking', name: 'Banking & Finance', icon: <Briefcase className="w-6 h-6" /> },
  { id: 'healthcare', name: 'Healthcare', icon: <Stethoscope className="w-6 h-6" /> },
  { id: 'telecom', name: 'Telecommunications', icon: <Globe className="w-6 h-6" /> },
  { id: 'agriculture', name: 'Agriculture', icon: <Sprout className="w-6 h-6" /> },
  { id: 'education', name: 'Education', icon: <BookOpen className="w-6 h-6" /> },
  { id: 'government', name: 'Public Sector', icon: <Building2 className="w-6 h-6" /> },
  { id: 'logistics', name: 'Logistics', icon: <Users className="w-6 h-6" /> },
  { id: 'retail', name: 'Retail', icon: <Store className="w-6 h-6" /> },
];

export const INITIAL_NEWS_POSTS = [
  {
    id: '1',
    title: "East African AI Summit 2025",
    date: "2025-11-14",
    loc: "Kampala, Uganda",
    desc: "Deep Shift AI hosted the premier summit for regional tech leaders to discuss agentic AI frameworks.",
    content: "The East African AI Summit 2025 brought together over 500 delegates from across the region to discuss the role of Agentic AI in transforming the continent's digital economy. Deep Shift AI leads presented frameworks for low-resource NLP and autonomous supply chain management.\n\nKey takeaways included the need for harmonized AI policy across the EAC and the urgent requirement for high-fidelity local language datasets to prevent a linguistic divide in AI services.",
    tag: "Event",
    images: [
      "https://images.unsplash.com/photo-1540575861501-7ad060e39fe1?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1000"
    ]
  },
  {
    id: '2',
    title: "Series A Funding Success",
    date: "2025-10-02",
    loc: "Nairobi, Kenya",
    desc: "Secured strategic investment to scale our local language NLP engine across the continent.",
    content: "We are thrilled to announce the successful closing of our Series A funding round. This capital injection will allow us to double our research team at the Nakawa Hub and accelerate the deployment of our context-aware translation engine to three new markets by Q3 2026.",
    tag: "Corporate",
    images: [
      "https://images.unsplash.com/photo-1553484771-047a44eee27b?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=1000"
    ]
  },
  {
    id: '3',
    title: "Linguistic Hub Initiative",
    date: "2025-09-15",
    loc: "Nakawa Hub",
    desc: "Expanding our data center to support 120+ low-resource languages by year-end.",
    content: "The Linguistic Hub Initiative is our most ambitious data mining project to date. We are building massive parallel corpora for languages that have traditionally been ignored by big tech, ensuring that AI speaks every dialect of East Africa fluently.",
    tag: "News",
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=1000"
    ]
  }
];

export const INITIAL_GALLERY_IMAGES = [
  "https://i.postimg.cc/7P33DZfq/aaas.jpg",
  "https://i.postimg.cc/SxsCWLV4/as.jpg",
  "https://i.postimg.cc/g2J8vy4n/dfsfdfdfsd.jpg",
  "https://i.postimg.cc/5275GKjQ/edssfdsfdfdfd.jpg",
  "https://i.postimg.cc/Hs3bcv0W/ssd.jpg",
  "https://i.postimg.cc/MpTVy0tW/ssdsd.jpg",
  "https://i.postimg.cc/dV1r8RnD/Whats-App-Image-2025-12-30-at-11-47-47-PM.jpg",
  "https://i.postimg.cc/HkxXQ03J/Whats-App-Image-2025-12-30-at-11-47-47-PM-(1).jpg",
  "https://i.postimg.cc/JznZb3Kn/Whats-App-Image-2025-12-30-at-11-47-48-PM.jpg",
  "https://i.postimg.cc/JznZb3Kz/Whats-App-Image-2025-12-30-at-11-47-48-PMs.jpg",
  "https://i.postimg.cc/Vk6nj94L/Whats-App-Image-2025-12-30-at-11-48-21-PMs.jpg",
  "https://i.postimg.cc/JznZb3KM/Whats-App-Image-2025-12-30-at-11-48-22-PM.jpg",
  "https://i.postimg.cc/mgDCQ3Vs/Whats-App-Image-2025-12-30-at-11-48-22-PMa.jpg",
  "https://i.postimg.cc/mgDCQ3VW/Whats-App-Image-2025-12-30-at-11-48-23-PMd.jpg",
  "https://i.postimg.cc/HkxXQ03G/Whats-App-Image-2025-12-30-at-11-48-23-PMdd.jpg",
  "https://i.postimg.cc/jdvyw36x/Whats-App-Image-2025-12-30-at-11-48-24-PM.jpg",
  "https://i.postimg.cc/MKt1M30x/Whats-App-Image-2025-12-30-at-11-48-24-PMd.jpg",
  "https://i.postimg.cc/wTFDy45z/Whats-App-Image-2025-12-30-at-11-48-25-PMdsa.jpg",
  "https://i.postimg.cc/MKt1M308/Whats-App-Image-2025-12-30-at-11-48-25-PMhj.jpg",
  "https://i.postimg.cc/wTFDy45K/Whats-App-Image-2025-12-30-at-11-48-26-PM6.jpg",
  "https://i.postimg.cc/zXpTb2C4/Whats-App-Image-2025-12-30-at-11-48-26-PMes.jpg",
  "https://i.postimg.cc/J4KjDY3V/Whats-App-Image-2025-12-30-at-11-48-26-PMse.jpg",
  "https://i.postimg.cc/qMQ2hDsP/Whats-App-Image-2025-12-30-at-11-48-27-PMffgg.jpg",
  "https://i.postimg.cc/Yq8QGD6P/Whats-App-Image-2025-12-30-at-11-48-27-PMjjhg.jpg",
  "https://i.postimg.cc/VL4XrZqH/Whats-App-Image-2025-12-30-at-11-48-28-PMwas.jpg",
  "https://i.postimg.cc/9F1yRgd8/Whats-App-Image-2025-12-30-at-11-48-28-PMwer.jpg",
  "https://i.postimg.cc/VL4XrZq7/Whats-App-Image-2025-12-30-at-11-48-28-PMww.jpg",
  "https://i.postimg.cc/sDK5QHYT/Whats-App-Image-2025-12-30-at-11-48-29-PMsd.jpg",
  "https://i.postimg.cc/vHX5g2r3/Whats-App-Image-2025_12_30_at_11_48_29_PMssd.jpg",
  "https://i.postimg.cc/65zC2brc/Whats-App-Image_2025_12_30_at_11_48_30_PMghj.jpg",
  "https://i.postimg.cc/02Z7MXYd/Whats-App-Image_2025_12_30_at_11_48_31_PMdd.jpg",
  "https://i.postimg.cc/wTFDy4XV/Whats_App_Image_2025_12_30_at_11_48_31_PMssd.jpg",
  "https://i.postimg.cc/rFqSp2rZ/Whats_App_Image_2025_12_30_at_11_48_32_PMas.jpg",
  "https://i.postimg.cc/dtJ80cy6/Whats_App_Image_2025_12_30_at_11_48_32_PMee.jpg",
  "https://i.postimg.cc/xT9KdVzg/Whats_App_Image_2025_12_30_at_11_48_32_PMwww.jpg",
  "https://i.postimg.cc/WbsM4ckn/Whats_App_Image_2025_12_30_at_11_48_33_PMll.jpg",
  "https://i.postimg.cc/X7nwv6Cs/Whats_App_Image_2025_12_30_at_11_48_33_PMssssaa.jpg",
  "https://i.postimg.cc/65BdQxvC/Whats_App_Image_2025_12_30_at_11_48_36_P.jpg",
  "https://i.postimg.cc/65BdQxvR/Whats_App_Image_2025_12_30_at_11_48_37_PMkk.jpg",
  "https://i.postimg.cc/Dy7qz3XL/Whats_App_Image_2025_12_30_at_11_48_37_PMyyt.jpg",
  "https://i.postimg.cc/jdRzjY72/Whats_App_Image_2025_12_30_at_11_48_38_PM.jpg",
  "https://i.postimg.cc/Dy7qz3XZ/Whats_App_Image_2025_12_30_at_11_48_38_PMgg.jpg",
  "https://i.postimg.cc/5NfwtWCY/Whats_App_Image_2025_12_30_at_11_48_38_PMll.jpg",
  "https://i.postimg.cc/ZKJrqzdC/Whats_App_Image_2025_12_30_at_11_48_39_PM.jpg",
  "https://i.postimg.cc/66rrwpyG/Whats_App_Image_2025_12_30_at_11_48_40_PMdc.jpg",
  "https://i.postimg.cc/pVffxLp9/Whats_App_Image_2025_12_30_at_11_48_40_PMsd.jpg",
  "https://i.postimg.cc/2jQQmSV1/Whats_App_Image_2025_12_30_at_11_48_40_PMwwe.jpg",
  "https://i.postimg.cc/mZYYRgtZ/Whats_App_Image_2025_12_30_at_11_48_41_PMss.jpg",
  "https://i.postimg.cc/66rrwpy3/Whats_App_Image_2025_12_30_at_11_48_41_PMwww.jpg",
  "https://i.postimg.cc/KcPPF8Rx/Whats_App_Image_2025_12_30_at_11_48_43_PMssaaw.jpg",
  "https://i.postimg.cc/T2VVG3px/Whats_App_Image_2025_12_30_at_11_48_44_PMqww.jpg",
  "https://i.postimg.cc/c1RRZLrG/Whats_App_Image_2025_12_30_at_11_48_44_PMwwa.jpg",
  "https://i.postimg.cc/v8rrMZDp/Whats_App_Image_2025_12_30_at_11_48_45_PMaaa.jpg",
  "https://i.postimg.cc/HWwwHkVG/Whats_App_Image_2025_12_30_at_11_48_45_PMbbb.jpg",
  "https://i.postimg.cc/G3FFrmHw/Whats_App_Image_2025_12_30_at_11_48_46_PMaaa.jpg",
  "https://i.postimg.cc/QCJ1q0Rm/Whats_App_Image_2025_12_30_at_11_48_46_PMaaq.jpg",
  "https://i.postimg.cc/kGvKyfky/Whats_App_Image_2025_12_30_at_11_48_47_PMaawe.jpg",
  "https://i.postimg.cc/5ySLmnZq/Whats_App_Image_2025_12_31_at_12_02_27_AMss.jpg",
  "https://i.postimg.cc/MHmVYdh7/Whats_App_Image_2025_12_31_at_12_02_28_AMasaw.jpg",
  "https://i.postimg.cc/Y0zYxbJY/Whats_App_Image_2025_12_31_at_12_02_28_AMweer.jpg",
  "https://i.postimg.cc/ZnxpLV1y/Whats_App_Image_2025_12_31_at_12_03_05_AMert.jpg",
  "https://i.postimg.cc/3NFmZnP2/Whats_App_Image_2025_12_31_at_12_03_05_AMwa.jpg",
  "https://i.postimg.cc/wMQLk0SR/Whats_App_Image_2025_12_31_at_12_03_06_AMsa.jpg",
  "https://i.postimg.cc/BbBHCMdZ/Whats_App_Image_2025_12_31_at_12_03_06_AMsasa.jpg",
  "https://i.postimg.cc/yxycTvw8/Whats_App_Image_2025_12_31_at_12_03_06_AMssa.jpg",
  "https://i.postimg.cc/KjDB5JdZ/Whats_App_Image_2025_12_31_at_12_03_07_AMasasd.jpg",
  "https://i.postimg.cc/d3jr94zs/Whats_App_Image_2025_12_31_at_12_03_07_AMwae.jpg",
  "https://i.postimg.cc/Hn9XtBfg/Whats_App_Image_2025_12_31_at_12_03_08_AMasasd.jpg",
  "https://i.postimg.cc/1XQD6LY3/Whats_App_Image_2025_12_31_at_12_03_09_AMdds.jpg",
  "https://i.postimg.cc/x82LHWF8/Whats_App_Image_2025_12_31_at_12_03_09_AMds.jpg",
  "https://i.postimg.cc/tJjFPLmR/Whats_App_Image_2025_12_31_at_12_03_09_AMssa.jpg",
  "https://i.postimg.cc/j2byNGkx/Whats_App_Image_2025_12_31_at_12_03_09_AMwwee.jpg",
  "https://i.postimg.cc/Y0HQgJy7/Whats_App_Image_2025_12_31_at_12_03_10_AMddsds.jpg",
  "https://i.postimg.cc/prHK8g1H/Whats_App_Image_2025_12_31_at_12_03_10_AMdsds.jpg",
  "https://i.postimg.cc/ZnS631Dt/Whats_App_Image_2025_12_31_at_12_03_10_AMsad.jpg",
  "https://i.postimg.cc/MHS1Rh3g/Whats_App_Image_2025_12_31_at_12_03_11_AMasadsdffd.jpg",
  "https://i.postimg.cc/90hyTvgk/Whats_App_Image_2025_12_31_at_12_03_11_AMdsdsa.jpg",
  "https://i.postimg.cc/brh1bKVF/Whats_App_Image_2025_12_31_at_12_03_11_AMdsdsf.jpg",
  "https://i.postimg.cc/6qXCRD1s/Whats_App_Image_2025_12_31_at_12_03_11_AMsads.jpg",
  "https://i.postimg.cc/RFfcWMdD/Whats_App_Image_2025_12_31_at_12_03_12_AMasadfde.jpg",
  "https://i.postimg.cc/9MTGDWbK/Whats_App_Image_2025_12_31_at_12_03_12_AMdsdds.jpg",
  "https://i.postimg.cc/90hyTvgL/Whats_App_Image_2025_12_31_at_12_03_12_AMsddsf.jpg",
  "https://i.postimg.cc/9MTGDWbk/Whats_App_Image_2025_12_31_at_12_03_13_AMaewewf.jpg",
  "https://i.postimg.cc/KzLn1Zfs/Whats_App_Image_2025_12_31_at_12_03_13_AMasadde.jpg",
  "https://i.postimg.cc/9MTGDWb8/Whats_App_Image_2025_12_31_at_12_03_13_AMdsfd.jpg",
  "https://i.postimg.cc/RFfcWMdG/Whats_App_Image_2025_12_31_at_12_03_14_AM.jpg",
  "https://i.postimg.cc/63Rd89cY/Whats_App_Image_2025_12_31_at_12_03_14_AMfdfdg.jpg",
  "https://i.postimg.cc/TwmrKR0J/Whats_App_Image_2025_12_31_at_12_03_14_AMsasads.jpg",
  "https://i.postimg.cc/JnJbs1xZ/Whats_App_Image_2025_12_31_at_12_03_16_AM.jpg",
  "https://i.postimg.cc/V6MjJYgg/Whats_App_Image_2025_12_31_at_12_03_16_AMsds.jpg",
  "https://i.postimg.cc/RFfcWMd7/Whats_App_Image_2025_12_31_at_12_03_17_AM.jpg",
  "https://i.postimg.cc/VN2qsSqr/Whats_App_Image_2025_12_31_at_12_03_17_AMdsfdf.jpg",
];

export const INITIAL_TRAINING_POSTERS = [
  "https://i.postimg.cc/VN2qsSqr/Whats_App_Image_2025_12_31_at_12_03_17_AMdsfdf.jpg",
  "https://i.postimg.cc/kGvKyfky/Whats_App_Image_2025_12_30_at_11_48_47_PMaawe.jpg",
  "https://i.postimg.cc/YSvNwNm5/Whats_App_Image_2025_12_31_at_12_03_22_AMasdd.jpg",
  "https://i.postimg.cc/JznZb3KM/Whats_App_Image_2025_12_30_at_11_48_22_PM.jpg",
  "https://i.postimg.cc/tgsdHdxQ/Whats_App_Image_2025_12_31_at_12_03_20_AMsdadsd.jpg",
  "https://i.postimg.cc/5tX5M5Cx/Whats_App_Image_2025_12_31_at_12_03_19_AMssdads.jpg",
  "https://i.postimg.cc/HkxXQ03G/Whats_App_Image_2025_12_30_at_11_48_23_PMdd.jpg",
  "https://i.postimg.cc/N0K8w8rS/Whats_App_Image_2025_12_31_at_12_03_22_AMsdsdsds.jpg",
  "https://i.postimg.cc/mrP3G3FK/Whats_App_Image_2025_12_31_at_12_03_22_AMsdsds.jpg",
  "https://i.postimg.cc/hty8wZh3/Whats_App_Image_2025_12_31_at_12_03_23_AMsdsas.jpg",
  "https://i.postimg.cc/9QFtLHXC/Whats_App_Image_2025_12_31_at_12_10_14_AMssdsd.jpg",
  "https://i.postimg.cc/K8q7Vp4g/Whats_App_Image_2025_12_31_at_12_03_25_AMsdsdsdsa.jpg",
  "https://i.postimg.cc/TPBV2yVd/Whats_App_Image_2025_12_31_at_12_03_19_AMsadsd.jpg",
  "https://i.postimg.cc/sDK5QHYT/Whats_App_Image_2025_12_30_at_11_48_29_PMsd.jpg",
  "https://i.postimg.cc/65BdQxvC/Whats_App_Image_2025_12_30_at_11_48_36_P.jpg",
  "https://i.postimg.cc/65BdQxvR/Whats_App_Image_2025_12_30_at_11_48_37_PMkk.jpg",
  "https://i.postimg.cc/Dy7qz3XZ/Whats_App_Image_2025_12_30_at_11_48_38_PMgg.jpg",
  "https://i.postimg.cc/ZnxpLV1y/Whats_App_Image_2025_12_31_at_12_03_05_AMert.jpg",
  "https://i.postimg.cc/wMQLk0SR/Whats_App_Image_2025_12_31_at_12_03_06_AMsa.jpg",
  "https://i.postimg.cc/Y0HQgJy7/Whats_App_Image_2025_12_31_at_12_03_10_AMddsds.jpg",
  "https://i.postimg.cc/90hyTvgk/Whats_App_Image_2025_12_31_at_12_03_11_AMdsdsa.jpg",
  "https://i.postimg.cc/9MTGDWbK/Whats_App_Image_2025_12_31_at_12_03_12_AMdsdds.jpg",
  "https://i.postimg.cc/RFfcWMdG/Whats_App_Image_2025_12_31_at_12_03_14_AM.jpg",
  "https://i.postimg.cc/TwmrKR0J/Whats_App_Image_2025_12_31_at_12_03_14_AMsasads.jpg",
  "https://i.postimg.cc/YST6246v/Whats_App_Image_2025_12_31_at_12_03_18_AMasddsd.jpg",
  "https://i.postimg.cc/jjBHqWHW/Whats_App_Image_2025_12_31_at_12_03_18_AMdsfsfds.jpg",
  "https://i.postimg.cc/xdBvjkv1/Whats_App_Image_2025_12_31_at_12_03_18_AMasddsdasds.jpg"
];

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Our Solutions', path: '/solutions' },
  { label: 'Projects', path: '/projects' },
  { label: 'News & Events', path: '/news-events' },
  { 
    label: 'Careers', 
    path: '/careers/jobs',
    subLinks: [
      { label: 'Open Jobs', path: '/careers/jobs' },
      { label: 'Internships', path: '/careers/internships' },
      { label: 'Training Academy', path: '/careers/training' }
    ]
  },
  { label: 'Contact', path: '/contact' }
];