import React, { useState, useEffect, useRef } from 'react';
import { X, Mic, MicOff, VideoIcon, VideoOff, MessageSquare, MonitorUp, PhoneOff, User } from 'lucide-react';

export const VideoCallInterface = ({ sessionTitle, onClose }: { sessionTitle: string, onClose: () => void }) => {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const floatingVideoRef = useRef<HTMLVideoElement>(null); 

  useEffect(() => {
    const startMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
            video: true, 
            audio: true 
        });
        setStream(mediaStream);
        if (localVideoRef.current) localVideoRef.current.srcObject = mediaStream;
        if (floatingVideoRef.current) floatingVideoRef.current.srcObject = mediaStream;
        setError(null);
      } catch (err) {
        console.error("Error al acceder a dispositivos:", err);
        setError("Sin acceso a cámara");
        setCamOn(false);
        setMicOn(false);
      }
    };

    startMedia();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []); 

  useEffect(() => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      const audioTrack = stream.getAudioTracks()[0];

      if (videoTrack) videoTrack.enabled = camOn;
      if (audioTrack) audioTrack.enabled = micOn;
    }
  }, [camOn, micOn, stream]);

  useEffect(() => {
      if (stream) {
          if (localVideoRef.current) localVideoRef.current.srcObject = stream;
          if (floatingVideoRef.current) floatingVideoRef.current.srcObject = stream;
      }
  }, [stream, camOn]); 

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col text-white animate-in fade-in duration-300 font-sans">
       <div className="h-16 bg-slate-900/90 flex items-center justify-between px-4 md:px-6 absolute top-0 w-full z-10 border-b border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-3 overflow-hidden">
             <div className="flex items-center gap-2 bg-red-500/20 px-3 py-1 rounded-full border border-red-500/30 shrink-0">
                 <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                 <span className="text-[10px] md:text-xs font-bold text-red-400 tracking-wide">EN VIVO</span>
             </div>
             <div className="h-6 w-px bg-white/20 mx-1 hidden md:block"></div>
             <span className="font-medium text-sm md:text-lg text-slate-100 truncate">{sessionTitle || "Clase Magistral: Automatización"}</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="hidden md:flex -space-x-2 mr-4">
                 {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-900 flex items-center justify-center text-xs font-bold">{i}</div>)}
             </div>
             <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"><X size={24} /></button>
          </div>
       </div>

       <div className="flex-1 flex p-4 pt-20 gap-4 overflow-hidden bg-slate-950 relative">
          <div className="flex-1 bg-slate-900 rounded-2xl relative overflow-hidden flex items-center justify-center group border border-white/5 shadow-2xl">
             <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80" alt="Instructor" className="w-full h-full object-cover opacity-90" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
             <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 border border-white/10 shadow-lg z-10">
                <div className="p-1 bg-green-500/20 rounded-full"><Mic size={14} className="text-green-400" /></div>
                <span>Ing. Roberto Auto (Instructor)</span>
             </div>
          </div>
          
          <div className="hidden xl:flex flex-col gap-4 w-80 h-full">
             <div className={`flex-1 bg-slate-900 rounded-2xl relative overflow-hidden border border-white/10 shadow-lg ${micOn ? 'ring-2 ring-green-500/30' : ''}`}>
                 <video 
                    ref={localVideoRef} 
                    autoPlay 
                    muted 
                    playsInline 
                    className={`w-full h-full object-cover transform scale-x-[-1] ${!camOn ? 'hidden' : ''}`} 
                 />
                 {(!camOn || error) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                        <div className="flex flex-col items-center gap-2 text-slate-500">
                            <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center"><User size={32} /></div>
                            <span className="text-xs">{error || "Cámara apagada"}</span>
                        </div>
                    </div>
                 )}
                 <div className="absolute bottom-3 left-3 bg-black/60 px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-2">
                    <span>Tú</span>
                    {micOn ? <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div> : <MicOff size={12} className="text-red-400"/>}
                 </div>
             </div>
             
             <div className="flex-1 bg-slate-800 rounded-2xl relative overflow-hidden border border-white/5 opacity-60 hover:opacity-100 transition-opacity">
                 <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=400&h=400&q=80" className="w-full h-full object-cover" />
                 <div className="absolute bottom-2 left-2 text-xs bg-black/50 px-2 py-1 rounded">Maria Diseño</div>
             </div>
             <div className="h-24 bg-slate-800/30 rounded-2xl flex items-center justify-center border border-white/5 text-slate-500 text-xs">
                +24 participantes
             </div>
          </div>

          <div className="xl:hidden absolute bottom-4 right-4 w-32 h-48 md:w-48 md:h-32 bg-slate-900 rounded-xl shadow-2xl border border-white/20 overflow-hidden z-30">
             <video 
                ref={floatingVideoRef} 
                autoPlay 
                muted 
                playsInline 
                className={`w-full h-full object-cover transform scale-x-[-1] ${!camOn ? 'hidden' : ''}`} 
             />
             {(!camOn || error) && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800 text-slate-500">
                    <User size={24} />
                </div>
             )}
             <div className="absolute bottom-2 left-2 text-[10px] bg-black/60 px-2 py-0.5 rounded text-white flex items-center gap-1">
                Tú {micOn ? <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> : <MicOff size={8} className="text-red-400"/>}
             </div>
          </div>
       </div>

       <div className="h-20 md:h-24 bg-slate-900 border-t border-white/5 flex items-center justify-center gap-4 px-4 relative z-40 shadow-xl">
           <div className="flex items-center gap-2 md:gap-4">
               <button onClick={() => setMicOn(!micOn)} className={`flex flex-col items-center justify-center gap-1 w-14 h-14 md:w-16 md:h-16 rounded-2xl transition-all duration-200 ${micOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20'}`}>
                  {micOn ? <Mic size={20} /> : <MicOff size={20} />}
                  <span className="text-[9px] md:text-[10px] font-medium">{micOn ? 'Mute' : 'Unmute'}</span>
               </button>
               <button onClick={() => setCamOn(!camOn)} className={`flex flex-col items-center justify-center gap-1 w-14 h-14 md:w-16 md:h-16 rounded-2xl transition-all duration-200 ${camOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20'}`}>
                  {camOn ? <VideoIcon size={20} /> : <VideoOff size={20} />}
                  <span className="text-[9px] md:text-[10px] font-medium">{camOn ? 'Stop' : 'Start'}</span>
               </button>
           </div>
           
           <div className="w-px h-8 bg-white/10 hidden md:block"></div>

           <div className="flex items-center gap-2 md:gap-4">
               <button className="hidden md:flex flex-col items-center justify-center gap-1 w-16 h-16 rounded-2xl bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white transition-all group">
                  <MessageSquare size={20} />
                  <span className="text-[10px] font-medium">Chat</span>
               </button>
               <button className="hidden md:flex flex-col items-center justify-center gap-1 w-16 h-16 rounded-2xl bg-slate-800 hover:bg-green-600 text-slate-200 hover:text-white transition-all group">
                  <MonitorUp size={20} />
                  <span className="text-[10px] font-medium">Share</span>
               </button>
           </div>

           <button onClick={onClose} className="bg-red-600 hover:bg-red-700 text-white px-6 md:px-8 h-12 md:h-14 rounded-xl font-bold flex items-center gap-2 md:gap-3 transition-all hover:scale-105 hover:shadow-lg hover:shadow-red-900/30 ml-auto md:ml-4">
              <PhoneOff size={20} />
              <span className="hidden md:inline">Salir</span>
           </button>
       </div>
    </div>
  )
}