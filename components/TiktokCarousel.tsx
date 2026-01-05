
import React from 'react';
import { Play } from 'lucide-react';

interface TiktokVideo {
  id: string;
  thumbnail: string;
  title: string;
  url: string;
}

const TIKTOK_VIDEOS: TiktokVideo[] = [
  {
    id: "7580662204949646604",
    thumbnail: "https://i.postimg.cc/J0phWWx4/wall_of_fame_thumbnail.png",
    title: "Wall of Fame",
    url: "https://www.tiktok.com/@deepshiftai/video/7580662204949646604"
  },
  {
    id: "7568986205774220555",
    thumbnail: "https://i.postimg.cc/0NSrKFkZ/uncertain_series_thumbnail.png",
    title: "Uncertain Series",
    url: "https://www.tiktok.com/@deepshiftai/video/7568986205774220555"
  },
  {
    id: "7567484781605309752",
    thumbnail: "https://i.postimg.cc/wxQykChV/gaime_thumbnail.png",
    title: "Gaime",
    url: "https://www.tiktok.com/@deepshiftai/video/7567484781605309752"
  },
  {
    id: "7562425106308418828",
    thumbnail: "https://i.postimg.cc/BnkX64Gd/google_dev_club_thumbnail.png",
    title: "Google Dev Club",
    url: "https://www.tiktok.com/@deepshiftai/video/7562425106308418828"
  },
  {
    id: "7561195363584068875",
    thumbnail: "https://i.postimg.cc/cHQK2j2p/ncc_thumbnail.png",
    title: "MTC",
    url: "https://www.tiktok.com/@deepshiftai/video/7561195363584068875"
  },
  {
    id: "7542030960796159238",
    thumbnail: "https://i.postimg.cc/mg5FH77K/rotaract_thumbnail.png",
    title: "Rotaract",
    url: "https://www.tiktok.com/@deepshiftai/video/7542030960796159238"
  },
  {
    id: "7532136773267295493",
    thumbnail: "https://i.postimg.cc/NGDFX1cz/technica_training_thumbnail.png",
    title: "Technical Training",
    url: "https://www.tiktok.com/@deepshiftai/video/7532136773267295493"
  },
  {
    id: "7527898078200778040",
    thumbnail: "https://i.postimg.cc/Dy7skv2C/era_thumbnail.png",
    title: "ERA",
    url: "https://www.tiktok.com/@deepshiftai/video/7527898078200778040"
  },
  {
    id: "7513090392426843398",
    thumbnail: "https://i.postimg.cc/QC37Mscb/ai_for_40_thumbnail.png",
    title: "AI for 40",
    url: "https://www.tiktok.com/@deepshiftai/video/7513090392426843398"
  },
  {
    id: "7497488930141457670",
    thumbnail: "https://i.postimg.cc/PxZZhNvX/asapu-thumbnail.png",
    title: "ASAPU",
    url: "https://www.tiktok.com/@deepshiftai/video/7497488930141457670"
  },
  {
    id: "7501424069540154630",
    thumbnail: "https://i.postimg.cc/tg8PLFTk/fair-ai-thumbnail.png",
    title: "Fair AI",
    url: "https://www.tiktok.com/@deepshiftai/video/7501424069540154630"
  },
  {
    id: "7487369144388603191",
    thumbnail: "https://i.postimg.cc/MGgRh1TC/nssf_thumbnail.png",
    title: "NSSF",
    url: "https://www.tiktok.com/@deepshiftai/video/7487369144388603191"
  }
];

const TiktokCarousel: React.FC = () => {
  const channelUrl = "https://www.tiktok.com/@deepshiftai";
  // Double the list for infinite scroll
  const displayVideos = [...TIKTOK_VIDEOS, ...TIKTOK_VIDEOS];

  return (
    <div className="py-24 bg-navy relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-innovation-blue via-innovation-orange to-innovation-blue"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex flex-col md:flex-row justify-between items-end">
        <div>
          <h2 className="text-white font-poppins font-bold text-3xl md:text-4xl">Follow the Shift</h2>
          <p className="text-gray-400 mt-2">Catch our latest insights and demos on TikTok.</p>
        </div>
        <a 
          href={channelUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-6 md:mt-0 px-8 py-3 bg-white text-navy font-bold rounded-full hover:bg-innovation-blue hover:text-white transition-all flex items-center group"
        >
          @deepshiftai 
          <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Infinite Ticker */}
        <div className="flex w-max animate-tiktok-scroll hover:[animation-play-state:paused] transition-all">
          {displayVideos.map((video, idx) => (
            <a 
              key={`${video.id}-${idx}`}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-[200px] md:w-[280px] aspect-[9/16] mx-3 rounded-3xl overflow-hidden group shadow-2xl border border-white/10 block grayscale hover:grayscale-0 transition-all duration-700"
            >
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75 group-hover:brightness-100"
              />
              
              {/* Video Frame Overlay (Scanlines & Vignette) */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-10 bg-[length:100%_4px,3px_100%] pointer-events-none opacity-40 group-hover:opacity-20 transition-opacity"></div>
              <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] z-10 pointer-events-none group-hover:shadow-[inset_0_0_50px_rgba(0,0,0,0.3)] transition-all"></div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                  <Play className="text-white w-8 h-8 fill-white ml-1" />
                </div>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/90 to-transparent z-30">
                <p className="text-white font-bold text-sm leading-tight line-clamp-2">
                  {video.title}
                </p>
                <div className="flex items-center mt-3 space-x-2">
                   <div className="w-6 h-6 rounded-full bg-innovation-orange flex items-center justify-center p-1 shadow-lg">
                      <img src="https://i.postimg.cc/Mpsm3pDq/21.png" className="w-full h-full object-contain" alt="Deep Shift Icon" />
                   </div>
                   <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest shadow-sm">Deep Shift AI</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Masking gradients */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-navy to-transparent z-40 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-navy to-transparent z-40 pointer-events-none"></div>
      </div>

      <style>{`
        @keyframes tiktok-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-tiktok-scroll {
          animation: tiktok-scroll 60s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TiktokCarousel;
