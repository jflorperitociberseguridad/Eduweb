
import React, { useState } from 'react';
import { 
  BookOpen, CheckCircle, Circle, FileText, Video, MessageSquare, Bell, Search, Menu, X, User, LogOut, LayoutDashboard, Calendar, Settings, Award, ChevronRight, ChevronDown, Sparkles, Send, Loader2, Mail, Phone, MapPin, Camera, Edit3, Shield, Save, Lock, ArrowRight, Clock, AlertCircle, Trash2, Archive, Reply, MoreVertical, Paperclip, Inbox, File, Plus, MessageCircle, Megaphone, FileBadge, Download, Video as VideoIcon, CheckSquare, Check, Play, Pause, RotateCw, Code, CalendarDays, Globe, Layers, Share2, CalendarPlus, PlayCircle, Zap, Terminal, TrendingUp, Activity, Target, PieChart, BarChart3, Rocket, Cpu, RefreshCw, AlertTriangle, Star
} from 'lucide-react';

import { SimpleLineChart, SimpleBarChart, SkillRadar } from './components/Charts';
import { AIChatAssistant } from './components/AIChatAssistant';
import { VideoCallInterface } from './components/VideoCallInterface';
import { WelcomeScreen } from './components/WelcomeScreen';

import { 
  MOCK_USER, INITIAL_COURSES, MOCK_ANNOUNCEMENTS, MOCK_GRADES, MOCK_UPCOMING_COURSES, 
  INITIAL_MESSAGES, MOCK_CALENDAR_EVENTS, INITIAL_NOTIFICATIONS, MOCK_REPORTS_DATA, 
  INITIAL_PROJECTS, MOCK_PROJECT_STATS, MOCK_COMPETENCIES, MOCK_SESSIONS 
} from './data';
import { Course, Module, Project, Message, NotificationItem, CalendarEvent } from './types';

// --- HELPER COMPONENT: TOOL ICON ---
const ToolIcon = ({ tool, size = 18, className }: { tool: string, size?: number, className?: string }) => {
    const finalClass = className || "text-gray-500";
    if (tool === 'python') return <Terminal size={size} className={className || "text-yellow-500"} />;
    if (tool === 'make') return <RotateCw size={size} className={className || "text-purple-600"} />;
    if (tool === 'zapier') return <Zap size={size} className={className || "text-orange-500"} />;
    return <Code size={size} className={finalClass} />;
};

// --- WIDGET: USO DE HERRAMIENTAS ---
const ToolUsageWidget = () => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
    <h3 className="font-bold text-gray-800 mb-5 flex items-center gap-2">
        <PieChart size={18} className="text-indigo-500"/> Distribución de Carga
    </h3>
    <div className="space-y-5">
      {[
        { name: 'Python Scripts', val: 65, color: 'bg-yellow-500', bg: 'bg-yellow-100', icon: <Terminal size={14} /> },
        { name: 'Make Scenarios', val: 25, color: 'bg-purple-600', bg: 'bg-purple-100', icon: <RotateCw size={14} /> },
        { name: 'Zapier Zaps', val: 10, color: 'bg-orange-500', bg: 'bg-orange-100', icon: <Zap size={14} /> }
      ].map((tool, i) => (
        <div key={i}>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="flex items-center gap-2 font-semibold text-gray-700">
                {tool.icon} 
                {tool.name}
            </span>
            <span className="font-bold text-gray-900">{tool.val}%</span>
          </div>
          <div className={`w-full ${tool.bg} rounded-full h-2.5`}>
            <div className={`${tool.color} h-2.5 rounded-full transition-all duration-1000`} style={{ width: `${tool.val}%` }}></div>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-500">
        <span>Total procesos: <strong>12</strong></span>
        <span>Uptime: <strong>99.9%</strong></span>
    </div>
  </div>
);

function NavItem({ icon, text, active, onClick }: { icon: React.ReactNode, text: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
      ${active 
        ? 'bg-blue-600 text-white shadow-lg' 
        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
      }`}
    >
      {icon}
      <span className="font-medium">{text}</span>
    </button>
  );
}

function StatCard({ title, value, icon, color, onClick, subtitle }: { title: string, value: string | number, icon: React.ReactNode, color: string, onClick?: () => void, subtitle?: string }) {
  return (
    <div 
      onClick={onClick}
      className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4 transition-all ${onClick ? 'cursor-pointer hover:shadow-md hover:scale-[1.02]' : ''}`}
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}

const ProgressBar = ({ progress, color = "bg-blue-600" }: { progress: number, color?: string }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5">
    <div 
      className={`${color} h-2.5 rounded-full transition-all duration-500`} 
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

const CourseCard: React.FC<{ course: Course, onClick: () => void }> = ({ course, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
    >
      <div className="h-40 overflow-hidden relative">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-700">
          {course.category}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">{course.title}</h3>
        <p className="text-sm text-gray-500 mb-4">{course.instructor}</p>
        
        <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
          <span>Completado</span>
          <span className="font-bold">{course.progress}%</span>
        </div>
        <ProgressBar progress={course.progress} />
      </div>
    </div>
  );
};

const Toggle = ({ enabled, onToggle }: { enabled: boolean, onToggle: (val: boolean) => void }) => (
  <button 
    onClick={() => onToggle(!enabled)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
      enabled ? 'bg-indigo-600' : 'bg-gray-200'
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

const IconByType = ({ type }: { type: string }) => {
  switch(type) {
    case 'video': return <Video size={18} className="text-red-500" />;
    case 'pdf': return <FileText size={18} className="text-blue-500" />;
    case 'quiz': return <CheckCircle size={18} className="text-green-500" />;
    case 'assignment': return <BookOpen size={18} className="text-orange-500" />;
    default: return <Circle size={18} className="text-gray-400" />;
  }
};

export default function LMSApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(MOCK_USER.name);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courseTab, setCourseTab] = useState('content'); // 'content' | 'reports'
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [messageFilter, setMessageFilter] = useState('inbox');
  const [replyText, setReplyText] = useState('');
  const [searchMessage, setSearchMessage] = useState('');
  const [courseSection, setCourseSection] = useState('general'); 
  const [notificationsList, setNotificationsList] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [notifications, setNotifications] = useState({ email: true, push: true, newsletter: false });
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null); 
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  
  // NEW PROJECT MODAL STATE
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [newProjectData, setNewProjectData] = useState({ name: '', tool: 'python', description: '' });

  // CALENDAR STATES
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(MOCK_CALENDAR_EVENTS);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | string | null>(null);
  const [newEventData, setNewEventData] = useState<Pick<CalendarEvent, 'title' | 'type' | 'notes' | 'time'>>({ title: '', type: 'personal', notes: '', time: '09:00' });
  const [editingEventId, setEditingEventId] = useState<number | null>(null);

  // ESTADOS DE INFORMES
  const [reportTimeRange, setReportTimeRange] = useState<'weekly' | 'monthly' | 'all'>('weekly');
  const [reportMetric, setReportMetric] = useState<'time' | 'score'>('time');

  // ESTADO MENTORIAS
  const [showMentorshipSchedule, setShowMentorshipSchedule] = useState<number | null>(null);

  const unreadNotificationsCount = notificationsList.filter(n => !n.read).length;

  const handleNotificationClick = (notif: NotificationItem) => {
    setNotificationsList(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
    setNotificationOpen(false); 
    switch(notif.type) {
        case 'message': goToMessages(); break;
        case 'assignment':
            handleCourseClick(courses[0]); 
            setCourseSection('syllabus');
            setTimeout(() => {
                const updatedModules = courses[0].modules.map(m => m.id === 102 ? { ...m, isOpen: true } : m);
                setSelectedCourse({...courses[0], modules: updatedModules});
            }, 100);
            break;
        case 'welcome': setActiveTab('welcome'); setSidebarOpen(false); setSelectedCourse(null); break;
        case 'course_update': handleCourseClick(courses[0]); setCourseSection('syllabus'); break;
        default: break;
    }
  };

  const handleGradeClick = (grade: any) => {
      const course = courses[0]; 
      
      let targetModuleId = null;
      if (grade.module.includes("1")) targetModuleId = 101;
      else if (grade.module.includes("2")) targetModuleId = 102;
      else if (grade.module.includes("3")) targetModuleId = 103;

      const updatedModules = course.modules.map(m => 
        targetModuleId && m.id === targetModuleId ? { ...m, isOpen: true } : m
      );

      setSelectedCourse({ ...course, modules: updatedModules });
      setCourseSection('syllabus'); 
      setCourseTab('content');      
      setActiveTab('course');       
  };

  const goToModuleFromProject = (courseId: number, moduleId: number) => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
        handleCourseClick(course);
        setCourseSection('syllabus');
        const updatedModules = course.modules.map(m => m.id === moduleId ? { ...m, isOpen: true } : m);
        setSelectedCourse({...course, modules: updatedModules});
        setSelectedProject(null); 
    }
  };

  const handleSaveProject = () => {
    if (!newProjectData.name) return;
    const newProject: Project = {
        id: Date.now(),
        name: newProjectData.name,
        tool: newProjectData.tool,
        status: 'active',
        executions: 0,
        successRate: 100,
        lastRun: 'Ahora',
        moduleId: 101, 
        courseId: 1
    };
    setProjects([newProject, ...projects]);
    setShowProjectModal(false);
    setNewProjectData({ name: '', tool: 'python', description: '' });
  };

  const handleEnrollCourse = (course: any) => {
      const newActiveCourse: Course = {
          id: Date.now(),
          title: course.title,
          instructor: course.instructor,
          category: course.category,
          progress: 0,
          image: course.image,
          modules: [ 
              {
                  id: 999,
                  title: "Módulo 1: Introducción",
                  isOpen: false,
                  items: [{ id: '9-1', type: 'video', title: 'Bienvenida', duration: '5 min', completed: false }]
              }
          ]
      };
      setCourses([...courses, newActiveCourse]);

      const newNotification: NotificationItem = {
          id: Date.now() + 1,
          type: 'course_update', 
          title: '¡Inscripción Confirmada!',
          message: `Te has inscrito correctamente en "${course.title}".`,
          time: 'Ahora mismo',
          read: false
      };
      setNotificationsList([newNotification, ...notificationsList]);
      setNotificationOpen(true); 

      const dayStr = course.date.split(' ')[0];
      const day = parseInt(dayStr) || 28;
      
      const newCalendarEvent: CalendarEvent = {
          day: day,
          title: `Inicio: ${course.title}`,
          type: 'live',
          time: '09:00',
          notes: `Primer día de clase con ${course.instructor}.`
      };
      setCalendarEvents([...calendarEvents, newCalendarEvent]);
  };

  const handleConfirmMentorship = () => {
      const newEvent: CalendarEvent = {
          day: 28, 
          title: 'Mentoría 1:1 - Ing. Roberto Auto',
          type: 'live', 
          time: '16:00',
          notes: 'Sesión reservada desde el panel de mentorías. Tema: Dudas Módulo 3.'
      };
      setCalendarEvents(prev => [...prev, newEvent]);
      
      const newNotif: NotificationItem = {
          id: Date.now(),
          type: 'message',
          title: 'Reserva Confirmada',
          message: 'La mentoría se ha añadido correctamente a tu calendario.',
          time: 'Ahora',
          read: false
      };
      setNotificationsList(prev => [newNotif, ...prev]);
      setNotificationOpen(true);

      setActiveTab('calendar');
      setSidebarOpen(false);
      setSelectedCourse(null); 
  };

  const goToMessages = () => { 
    setActiveTab('messages'); 
    setSidebarOpen(false); 
    setSelectedCourse(null); 
    setSelectedMessage(null); 
  };

  const goToGrades = () => { 
    setActiveTab('grades'); 
    setSidebarOpen(false); 
    setSelectedCourse(null); 
  };

  const goToCalendar = () => { 
    setActiveTab('calendar'); 
    setSidebarOpen(false); 
    setSelectedCourse(null); 
  };

  const goToProjects = () => { 
    setActiveTab('projects'); 
    setSidebarOpen(false); 
    setSelectedCourse(null); 
    setSelectedProject(null); 
  };

  const goToSettings = () => { 
    setActiveTab('settings'); 
    setProfileOpen(false); 
    setSidebarOpen(false); 
    setSelectedCourse(null); 
  };

  const markAllNotificationsAsRead = () => setNotificationsList(prev => prev.map(n => ({ ...n, read: true })));
  const deleteNotification = (e: React.MouseEvent, id: number) => { e.stopPropagation(); setNotificationsList(prev => prev.filter(n => n.id !== id)); };
  const handleLoginSuccess = (name: string) => { setUserName(name); setIsLoggedIn(true); setActiveTab('welcome'); };
   
  const handleCourseClick = (course: Course) => { 
      setSelectedCourse(course); 
      setCourseSection('general'); 
      setCourseTab('content'); 
      setActiveTab('course'); 
      setSidebarOpen(false); 
  };
   
  const goHome = () => { setSelectedCourse(null); setActiveTab('dashboard'); setSidebarOpen(false); };
  const goToProfile = () => { setActiveTab('profile'); setProfileOpen(false); setSidebarOpen(false); setSelectedCourse(null); };

  const handleSelectMessage = (msg: Message) => { setSelectedMessage(msg); const updatedMessages = messages.map(m => m.id === msg.id ? { ...m, unread: false } : m); setMessages(updatedMessages); };
  const handleDeleteMessage = (msgId: number) => { const updatedMessages = messages.map(m => m.id === msgId ? { ...m, folder: 'trash' } : m); setMessages(updatedMessages); if (selectedMessage?.id === msgId) setSelectedMessage(null); };
   
  const handleSendReply = () => {
    if (!replyText.trim() || !selectedMessage) return;
    const newMessage: Message = { id: Date.now(), folder: 'sent', sender: 'Yo', email: 'alex.estudiante@educloud.edu', role: 'Estudiante', subject: `Re: ${selectedMessage.subject}`, preview: replyText.substring(0, 50) + '...', body: replyText, date: 'Ahora', unread: false, avatar: MOCK_USER.avatar };
    setMessages([newMessage, ...messages]); setReplyText('');
  };

  const handleNewMessage = () => {
    const subject = prompt("Asunto del mensaje:");
    if(subject) {
        const newMessage: Message = { id: Date.now(), folder: 'sent', sender: 'Yo', email: 'alex.estudiante@educloud.edu', role: 'Estudiante', subject: subject, preview: 'Nuevo mensaje...', body: 'Contenido del nuevo mensaje...', date: 'Ahora', unread: false, avatar: MOCK_USER.avatar };
        setMessages([newMessage, ...messages]); setMessageFilter('sent'); setSelectedMessage(newMessage);
    }
  };

  const filteredMessages = messages.filter(msg => {
    const matchesFolder = msg.folder === messageFilter;
    const matchesSearch = msg.subject.toLowerCase().includes(searchMessage.toLowerCase()) || msg.sender.toLowerCase().includes(searchMessage.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const toggleItemCompletion = (courseId: number, moduleId: number, itemId: string) => {
    const updatedCourses = courses.map(course => {
      if (course.id !== courseId) return course;
      const updatedModules = course.modules.map(module => {
        if (module.id !== moduleId) return module;
        const updatedItems = module.items.map(item => item.id === itemId ? { ...item, completed: !item.completed } : item);
        return { ...module, items: updatedItems };
      });
      let totalItems = 0; let completedItems = 0;
      updatedModules.forEach(m => { m.items.forEach(i => { totalItems++; if (i.completed) completedItems++; }); });
      const newProgress = totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100);
      if (selectedCourse && selectedCourse.id === courseId) { setSelectedCourse({ ...course, modules: updatedModules, progress: newProgress }); }
      return { ...course, modules: updatedModules, progress: newProgress };
    });
    setCourses(updatedCourses);
  };

  const toggleModule = (moduleId: number) => {
    if (!selectedCourse) return;
    const updatedModules = selectedCourse.modules.map(m => m.id === moduleId ? { ...m, isOpen: !m.isOpen } : m);
    setSelectedCourse({ ...selectedCourse, modules: updatedModules });
  };

  const handleGoogleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
        const newGoogleEvents: CalendarEvent[] = [
            { day: 5, title: 'Reunión Google Meet', type: 'google', time: '10:00', notes: 'Sync desde Google' },
            { day: 18, title: 'Entrega Final Proyecto', type: 'google', time: '23:59', notes: 'Recordatorio automático' }
        ];
        setCalendarEvents(prev => {
            const combined = [...prev];
            newGoogleEvents.forEach(gEvent => {
                if (!combined.some(e => e.day === gEvent.day && e.title === gEvent.title)) {
                    combined.push(gEvent);
                }
            });
            return combined;
        });
        setIsSyncing(false);
    }, 2000);
  };

  const openEventModal = (day: number) => {
      setSelectedDate(day);
      setEditingEventId(null); 
      setNewEventData({ title: '', type: 'personal', notes: '', time: '09:00' });
      setShowEventModal(true);
  };

  const openEditEventModal = (event: CalendarEvent) => {
      setSelectedDate(event.day);
      setEditingEventId(event.id || null);
      setNewEventData({
          title: event.title,
          type: event.type,
          notes: event.notes,
          time: event.time
      });
      setShowEventModal(true);
  };

  const handleSaveEvent = () => {
      if (!newEventData.title) return;
      const dayVal = typeof selectedDate === 'string' ? parseInt(selectedDate) : selectedDate || 1;

      if (editingEventId) {
          setCalendarEvents(prev => prev.map(ev => 
              ev.id === editingEventId 
              ? { ...ev, ...newEventData, day: dayVal } 
              : ev
          ));
      } else {
          const newEvent: CalendarEvent = {
              id: Date.now(),
              day: dayVal,
              ...newEventData
          } as CalendarEvent;
          setCalendarEvents([...calendarEvents, newEvent]);
      }
      setShowEventModal(false);
      setEditingEventId(null);
  };

  const handleDeleteEvent = () => {
      if (editingEventId) {
          setCalendarEvents(prev => prev.filter(ev => ev.id !== editingEventId));
          setShowEventModal(false);
          setEditingEventId(null);
      }
  };

  const handleAddToCalendar = (session: any) => {
      const newEvent: CalendarEvent = {
          day: parseInt(session.day) || 28, 
          title: session.title,
          type: 'live',
          time: session.time,
          notes: `Sesión virtual en ${session.platform}. Duración: ${session.duration}`
      };
      setCalendarEvents([...calendarEvents, newEvent]);
  };

  const getEventStyle = (type: string) => {
      switch(type) {
          case 'quiz': return 'bg-green-50 border-green-200 border-l-green-500 text-green-700';
          case 'assignment': return 'bg-orange-50 border-orange-200 border-l-orange-500 text-orange-700';
          case 'live': return 'bg-blue-50 border-blue-200 border-l-blue-500 text-blue-700';
          case 'google': return 'bg-red-50 border-red-200 border-l-red-500 text-red-700';
          case 'personal': return 'bg-purple-50 border-purple-200 border-l-purple-500 text-purple-700';
          default: return 'bg-gray-50 border-gray-200 border-l-gray-500 text-gray-700';
      }
  };

  const getChartData = () => {
      const data = MOCK_REPORTS_DATA[reportTimeRange];
      return data.labels.map((label: string, i: number) => ({
          label,
          value: data.activity[i]
      }));
  };

  const getPerformanceData = () => {
      const data = MOCK_REPORTS_DATA[reportTimeRange];
      const modules = ["Módulo 1", "Módulo 2", "Módulo 3"];
      return modules.map((m, i) => ({
          label: m,
          value: data.modulePerformance[i] || 0
      }));
  }

  if (!isLoggedIn) return <WelcomeScreen onLoginSuccess={handleLoginSuccess} />;

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-slate-800 overflow-hidden">
      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}
      
      {/* --- VIDEO CALL INTERFACE --- */}
      {isVideoCallActive && <VideoCallInterface sessionTitle="Aula Virtual - Sesión Abierta" onClose={() => setIsVideoCallActive(false)} />}
      
      {/* --- AI CHAT ASSISTANT --- */}
      <AIChatAssistant 
        contextCourse={selectedCourse} 
        isOpen={aiChatOpen} 
        onClose={() => setAiChatOpen(false)} 
      />

      {/* --- MODAL NUEVO PROYECTO --- */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2"><Cpu size={18} className="text-indigo-600"/> Nuevo Proyecto</h3>
                    <button onClick={() => setShowProjectModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Proyecto</label>
                        <input 
                            type="text" 
                            autoFocus 
                            value={newProjectData.name} 
                            onChange={(e) => setNewProjectData({...newProjectData, name: e.target.value})} 
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" 
                            placeholder="Ej: Chatbot de Atención al Cliente" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Herramienta Principal</label>
                        <select 
                            value={newProjectData.tool} 
                            onChange={(e) => setNewProjectData({...newProjectData, tool: e.target.value})} 
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
                        >
                            <option value="python">Python</option>
                            <option value="make">Make (Integromat)</option>
                            <option value="zapier">Zapier</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                        <textarea 
                            value={newProjectData.description} 
                            onChange={(e) => setNewProjectData({...newProjectData, description: e.target.value})} 
                            rows={3} 
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" 
                            placeholder="Breve descripción del flujo..."
                        ></textarea>
                    </div>
                    <button 
                        onClick={handleSaveProject} 
                        disabled={!newProjectData.name}
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Crear Proyecto
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* --- MODAL DE EVENTO --- */}
      {showEventModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                  <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                      <h3 className="font-bold text-gray-800 flex items-center gap-2">
                          <CalendarDays size={18} className="text-indigo-600"/> 
                          {editingEventId ? 'Editar Evento' : 'Nuevo Evento'}
                      </h3>
                      <button onClick={() => setShowEventModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
                  </div>
                  <div className="p-6 space-y-4">
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Día del Mes</label>
                          <input 
                            type="number" 
                            min="1" 
                            max="31"
                            value={selectedDate || 1}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                          />
                          <p className="text-xs text-gray-400 mt-1">Puedes mover el evento cambiando el día.</p>
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Asunto</label>
                          <input type="text" autoFocus value={newEventData.title} onChange={(e) => setNewEventData({...newEventData, title: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="Ej: Estudiar Python" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                              <select value={newEventData.type} onChange={(e) => setNewEventData({...newEventData, type: e.target.value as any})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white">
                                  <option value="personal">Personal</option>
                                  <option value="quiz">Examen/Quiz</option>
                                  <option value="assignment">Tarea</option>
                                  <option value="live">Clase en Vivo</option>
                              </select>
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                              <input type="time" value={newEventData.time} onChange={(e) => setNewEventData({...newEventData, time: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                          </div>
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                          <textarea value={newEventData.notes} onChange={(e) => setNewEventData({...newEventData, notes: e.target.value})} rows={3} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="Detalles adicionales..."></textarea>
                      </div>
                      <div className="flex gap-3 pt-2">
                        {editingEventId && (
                            <button 
                                onClick={handleDeleteEvent}
                                className="flex-1 bg-red-50 text-red-600 border border-red-200 py-2 rounded-lg font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                            >
                                <Trash2 size={16} /> Eliminar
                            </button>
                        )}
                        <button 
                            onClick={handleSaveEvent} 
                            className="flex-[2] bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
                        >
                            {editingEventId ? 'Guardar Cambios' : 'Guardar Evento'}
                        </button>
                      </div>
                  </div>
              </div>
          </div>
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 flex items-center justify-between">
            <div className="flex items-center space-x-2 font-bold text-xl tracking-tight">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">E</span>
                </div>
                <span>EduCloud</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white"><X size={24} /></button>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          <NavItem icon={<LayoutDashboard size={20} />} text="Área Personal" active={activeTab === 'dashboard' || activeTab === 'welcome'} onClick={goHome} />
          
          <div className="pt-4 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Mis Cursos</div>
          {courses.map(c => (
            <button 
                key={c.id} 
                onClick={() => handleCourseClick(c)} 
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-sm ${selectedCourse?.id === c.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
            >
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span className="truncate">{c.title}</span>
            </button>
          ))}

          <div className="pt-4 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Herramientas</div>
          <NavItem icon={<Cpu size={20} />} text="Mis Proyectos" active={activeTab === 'projects'} onClick={goToProjects} />
          <NavItem icon={<Calendar size={20} />} text="Calendario" active={activeTab === 'calendar'} onClick={goToCalendar} />
          <NavItem icon={<Award size={20} />} text="Calificaciones" active={activeTab === 'grades'} onClick={goToGrades} />
          <NavItem icon={<MessageSquare size={20} />} text="Mensajes Privados" active={activeTab === 'messages'} onClick={goToMessages} />
        </nav>
        <div className="p-4 border-t border-slate-800"><button onClick={goToSettings} className={`flex items-center space-x-3 w-full px-4 py-2 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}><Settings size={20} /><span>Configuración</span></button></div>
      </aside>

      <div className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
        {/* ... header ... */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 z-10">
          <div className="flex items-center"><button onClick={() => setSidebarOpen(true)} className="lg:hidden mr-4 text-gray-500"><Menu size={24} /></button><div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-1.5 w-64"><Search size={18} className="text-gray-400 mr-2" /><input type="text" placeholder="Buscar contenido..." className="bg-transparent border-none focus:outline-none text-sm w-full text-gray-700" /></div></div>
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* --- NUEVO ICONO DE VIDEOLLAMADA --- */}
            <button 
              onClick={() => setIsVideoCallActive(true)} 
              className="p-2 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 rounded-full relative transition-colors group"
              title="Iniciar Aula Virtual"
            >
              <VideoIcon size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-green-500 rounded-full border border-white animate-pulse"></span>
            </button>

            <div className="relative">
              <button onClick={() => setNotificationOpen(!notificationOpen)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative transition-colors"><Bell size={20} />{unreadNotificationsCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>}</button>
              {notificationOpen && <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-5 duration-200 z-50"><div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50"><span className="font-semibold text-gray-800">Notificaciones</span>{unreadNotificationsCount > 0 && <button onClick={markAllNotificationsAsRead} className="text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline">Marcar todo leído</button>}</div><div className="max-h-96 overflow-y-auto">{notificationsList.length === 0 ? <div className="p-8 text-center text-gray-400 text-sm flex flex-col items-center"><Bell size={32} className="mb-2 opacity-50" /><p>No tienes notificaciones</p></div> : notificationsList.map(notif => <div key={notif.id} onClick={() => handleNotificationClick(notif)} className={`px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-start gap-3 border-b border-gray-50 last:border-0 relative group transition-colors ${notif.read ? 'opacity-70' : 'bg-blue-50/30'}`}><div className="mt-1">{!notif.read ? <div className="w-2 h-2 bg-blue-500 rounded-full"></div> : <div className="w-2 h-2"></div>}</div><div className="flex-1"><p className={`text-sm ${notif.read ? 'text-gray-600 font-medium' : 'text-gray-900 font-bold'}`}>{notif.title}</p><p className="text-xs text-gray-500 mt-0.5">{notif.message}</p><p className="text-[10px] text-gray-400 mt-1">{notif.time}</p></div><button onClick={(e) => deleteNotification(e, notif.id)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1" title="Eliminar notificación"><Trash2 size={14} /></button></div>)}</div></div>}
            </div>
            <div className="relative ml-2 pl-2 md:ml-4 md:pl-4 border-l border-gray-200">
              <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center space-x-3 focus:outline-none hover:opacity-80 transition-opacity"><div className="hidden md:block text-right"><p className="text-sm font-semibold text-gray-800">{userName}</p><p className="text-xs text-gray-500">{MOCK_USER.role}</p></div><img src={MOCK_USER.avatar} alt="Profile" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" /><ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} /></button>
              {profileOpen && <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-5 duration-200 z-50"><div className="px-4 py-3 border-b border-gray-100 md:hidden"><p className="text-sm font-semibold text-gray-800">{userName}</p><p className="text-xs text-gray-500">{MOCK_USER.role}</p></div><button onClick={goToProfile} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"><User size={16} /> Mi Perfil</button><button onClick={goToGrades} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"><Award size={16} /> Mis Calificaciones</button><button onClick={goToSettings} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"><Settings size={16} /> Configuración</button><div className="border-t border-gray-100 my-1"></div><button onClick={() => setIsLoggedIn(false)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"><LogOut size={16} /> Cerrar Sesión</button></div>}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-slate-50 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto pb-20">
            {activeTab === 'dashboard' && (
                <>
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Hola, {userName.split(' ')[0]} 👋</h1>
                        <p className="text-gray-500 mt-1">Listo para automatizar tus procesos hoy?</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <StatCard title="Cursos en Progreso" value={courses.length} icon={<BookOpen className="text-blue-600" />} color="bg-blue-50" onClick={() => { handleCourseClick(courses[0]); setCourseSection('syllabus'); }} />
                        <StatCard title="Proyectos Auto" value={projects.length} icon={<FileText className="text-orange-600" />} color="bg-orange-50" onClick={goToProjects} />
                        <StatCard title="Horas Ahorradas" value="12h" icon={<Award className="text-green-600" />} color="bg-green-50" onClick={() => {}} />
                    </div>

                    <div className="space-y-10">
                        {/* SECCIÓN 1: CURSOS ACTIVOS */}
                        <section>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><BookOpen size={20} className="text-indigo-600"/> Tu Aprendizaje Activo</h2>
                                <button onClick={() => setAiChatOpen(true)} className="text-sm text-indigo-600 font-medium hover:text-indigo-800 flex items-center gap-1"><Sparkles size={16} /> Pedir consejo a IA</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {courses.map(course => <CourseCard key={course.id} course={course} onClick={() => handleCourseClick(course)} />)}
                            </div>
                        </section>

                        {/* SECCIÓN 2: CURSOS RECOMENDADOS (NUEVA) */}
                        <section>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><Rocket size={20} className="text-orange-500"/> Explorar Nuevos Cursos</h2>
                                <span className="text-xs text-gray-500">Impulsa tu carrera</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {MOCK_UPCOMING_COURSES.map(course => {
                                    const isAlreadyEnrolled = courses.some(c => c.title === course.title);
                                    return (
                                        <div key={course.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group">
                                            <div className="h-32 overflow-hidden relative">
                                                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0" />
                                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-gray-700 shadow-sm">
                                                    {course.category}
                                                </div>
                                            </div>
                                            <div className="p-5 flex-1 flex flex-col">
                                                <div className="text-xs text-indigo-600 font-bold mb-1 flex items-center gap-1 uppercase tracking-wider">
                                                    <Calendar size={12} /> Inicio: {course.date}
                                                </div>
                                                <h3 className="font-bold text-gray-900 mb-2 leading-tight line-clamp-2">{course.title}</h3>
                                                <p className="text-xs text-gray-500 mb-4 flex items-center gap-1">
                                                    <User size={12} /> {course.instructor}
                                                </p>
                                                <div className="mt-auto pt-4 border-t border-gray-100">
                                                    {isAlreadyEnrolled ? (
                                                        <button disabled className="w-full py-2 rounded-lg bg-green-50 text-green-600 text-sm font-bold flex items-center justify-center gap-2 cursor-default">
                                                            <CheckCircle size={16} /> Ya inscrito
                                                        </button>
                                                    ) : (
                                                        <button 
                                                            onClick={() => handleEnrollCourse(course)}
                                                            className="w-full py-2 rounded-lg bg-slate-900 text-white text-sm font-bold hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 shadow-sm"
                                                        >
                                                            <Plus size={16} /> Inscribirse
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    </div>
                </>
            )}
            
            {activeTab === 'welcome' && <div className="animate-in fade-in zoom-in duration-300 min-h-[80vh] flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-indigo-50 via-white to-blue-50 rounded-2xl border border-indigo-100 shadow-sm relative overflow-hidden"><div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div><div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-200 rounded-full blur-3xl opacity-20 -ml-16 -mb-16"></div><div className="bg-white p-4 rounded-2xl shadow-lg mb-6 relative z-10 animate-bounce-slow"><Rocket size={48} className="text-indigo-600" /></div><h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">¡Bienvenido a EduCloud, {userName.split(' ')[0]}!</h1><p className="text-lg text-gray-600 max-w-2xl mb-10 leading-relaxed">Estamos emocionados de tenerte aquí. Has dado el primer paso hacia la maestría en automatización.</p><div className="grid md:grid-cols-3 gap-6 max-w-4xl w-full relative z-10"><button onClick={() => handleCourseClick(courses[0])} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all text-left group"><div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform"><BookOpen size={24} /></div><h3 className="font-bold text-gray-800 mb-2">Ir a tu Curso</h3><p className="text-sm text-gray-500">Continúa donde lo dejaste en el Máster de Automatización.</p></button><button onClick={goToProfile} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all text-left group"><div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4 group-hover:scale-110 transition-transform"><Target size={24} /></div><h3 className="font-bold text-gray-800 mb-2">Personalizar Perfil</h3><p className="text-sm text-gray-500">Sube tu foto y completa tus habilidades.</p></button><button onClick={() => setAiChatOpen(true)} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all text-left group"><div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform"><Zap size={24} /></div><h3 className="font-bold text-gray-800 mb-2">Probar IA Tutor</h3><p className="text-sm text-gray-500">Resuelve tus dudas técnicas al instante.</p></button></div><button onClick={goHome} className="mt-12 text-indigo-600 font-medium hover:text-indigo-800 hover:underline flex items-center gap-2">Ir al Tablero Principal <ArrowRight size={16} /></button></div>}
            
            {activeTab === 'profile' && (
                <div className="animate-in fade-in slide-in-from-bottom-5 duration-300">
                    <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-xl relative"><button className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors flex items-center gap-2 text-sm backdrop-blur-sm"><Camera size={16} /><span>Cambiar Portada</span></button></div>
                    <div className="px-8 pb-8 bg-white rounded-b-xl shadow-sm border border-gray-200 border-t-0 mb-6 relative">
                        <div className="flex flex-col md:flex-row items-start md:items-end -mt-12 gap-6">
                            <div className="relative group"><img src={MOCK_USER.avatar} alt="Profile" className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-200 object-cover" /><div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"><Camera className="text-white" size={24} /></div></div>
                            <div className="flex-1 pb-2"><div className="flex justify-between items-start"><div><h1 className="text-2xl font-bold text-gray-900">{userName}</h1><p className="text-gray-500 font-medium">{MOCK_USER.role}</p></div><button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"><Edit3 size={16} />Editar Perfil</button></div></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"><h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Sobre mí</h3><p className="text-gray-600 leading-relaxed mb-6">{MOCK_USER.bio}</p><h4 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">Información de Contacto</h4><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"><div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"><Mail size={18} /></div><div><p className="text-xs text-gray-500">Email</p><p className="text-sm font-medium text-gray-900">{MOCK_USER.email}</p></div></div><div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"><div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600"><Phone size={18} /></div><div><p className="text-xs text-gray-500">Teléfono</p><p className="text-sm font-medium text-gray-900">{MOCK_USER.phone}</p></div></div><div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"><div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600"><MapPin size={18} /></div><div><p className="text-xs text-gray-500">Ubicación</p><p className="text-sm font-medium text-gray-900">{MOCK_USER.location}</p></div></div></div></div>
                             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"><h3 className="text-lg font-bold text-gray-900 mb-4">Mis Habilidades</h3><div className="flex flex-wrap gap-2">{MOCK_USER.skills.map((skill, index) => (<span key={index} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors cursor-default">{skill}</span>))}<button className="px-4 py-2 border-2 border-dashed border-gray-300 text-gray-400 rounded-full text-sm font-medium hover:border-indigo-300 hover:text-indigo-500 transition-colors">+ Añadir</button></div></div>
                        </div>
                        <div className="space-y-6"><div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"><h3 className="font-bold text-gray-900 mb-4">Estadísticas Rápidas</h3><div className="space-y-4"><div className="flex justify-between items-center pb-3 border-b border-gray-50"><span className="text-gray-600 text-sm">Cursos Completados</span><span className="font-bold text-gray-900">4</span></div><div className="flex justify-between items-center pb-3 border-b border-gray-50"><span className="text-gray-600 text-sm">Horas de Estudio</span><span className="font-bold text-gray-900">126h</span></div><div className="flex justify-between items-center pb-3 border-b border-gray-50"><span className="text-gray-600 text-sm">Certificados</span><span className="font-bold text-gray-900">2</span></div></div></div></div>
                    </div>
                </div>
            )}

            {/* ... rest of the tabs ... */}
            {activeTab === 'projects' && (
                <div className="animate-in fade-in slide-in-from-right-5 duration-300">
                    {!selectedProject ? (
                        /* --- VISTA LISTA DE PROYECTOS --- */
                        <>
                            <div className="mb-6 flex justify-between items-center">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Mis Proyectos de Automatización</h1>
                                    <p className="text-gray-500">Gestiona tus bots, scripts y escenarios.</p>
                                </div>
                                <button onClick={() => setShowProjectModal(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2 shadow-sm"><Plus size={18} /> Nuevo Proyecto</button>
                            </div>

                            {/* KPI CARDS REDISEÑADOS */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                {/* Card 1: Proyectos Activos */}
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                            <Cpu size={20} />
                                        </div>
                                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                            <TrendingUp size={12} /> +1 esta semana
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium mb-1">Proyectos Activos</p>
                                        <div className="flex items-baseline gap-2">
                                            <p className="text-3xl font-bold text-gray-900">2</p>
                                            <span className="text-sm text-gray-400 font-normal">/ 4 total</span>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 right-0 opacity-10 transform translate-y-2 translate-x-2 group-hover:scale-110 transition-transform">
                                        <Cpu size={80} />
                                    </div>
                                </div>

                                {/* Card 2: Ejecuciones */}
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                            <Activity size={20} />
                                        </div>
                                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                            <TrendingUp size={12} /> +12%
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium mb-1">Ejecuciones (Mes)</p>
                                        <p className="text-3xl font-bold text-gray-900">1,652</p>
                                    </div>
                                    {/* Mini Sparkline Decorativo */}
                                    <svg className="absolute bottom-4 right-4 w-24 h-12 text-indigo-100" viewBox="0 0 100 50">
                                        <path d="M0 40 Q 25 45 50 25 T 100 10" fill="none" stroke="currentColor" strokeWidth="4" />
                                    </svg>
                                </div>

                                {/* Card 3: Tasa de Éxito */}
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                                            <Target size={20} />
                                        </div>
                                        <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                            Estable
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium mb-1">Tasa de Éxito Global</p>
                                        <p className="text-3xl font-bold text-gray-900">96.5%</p>
                                    </div>
                                    <div className="absolute right-4 bottom-4 w-12 h-12 rounded-full border-4 border-purple-100 border-t-purple-600 flex items-center justify-center opacity-50">
                                        <span className="text-[10px] font-bold text-purple-600">96%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* LISTA DE PROYECTOS */}
                                <div className="lg:col-span-2 space-y-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-bold text-gray-800">Detalle de Proyectos</h3>
                                        <div className="flex gap-2 text-sm bg-gray-100 p-1 rounded-lg">
                                            <button className="px-3 py-1 rounded-md bg-white text-gray-700 font-medium shadow-sm">Todos</button>
                                            <button className="px-3 py-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-colors">Activos</button>
                                            <button className="px-3 py-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-colors">Pausados</button>
                                        </div>
                                    </div>
                                    {projects.map(project => (
                                        <div 
                                            key={project.id} 
                                            onClick={() => setSelectedProject(project)}
                                            className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-center gap-5 group cursor-pointer hover:border-indigo-300"
                                        >
                                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${project.tool === 'python' ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white' : project.tool === 'make' ? 'bg-gradient-to-br from-purple-500 to-purple-700 text-white' : 'bg-gradient-to-br from-orange-400 to-orange-600 text-white'}`}>
                                                <ToolIcon tool={project.tool} size={24} className="text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0 w-full">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-bold text-gray-900 truncate text-base group-hover:text-indigo-600 transition-colors">{project.name}</h4>
                                                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${project.status === 'active' ? 'bg-green-100 text-green-700' : project.status === 'paused' ? 'bg-gray-100 text-gray-600' : 'bg-red-100 text-red-700'}`}>{project.status}</span>
                                                    </div>
                                                    <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={12} /> {project.lastRun}</span>
                                                </div>
                                                
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-center">
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] text-gray-400 uppercase font-semibold">Ejecuciones</span>
                                                        <span className="text-sm font-bold text-gray-700 flex items-center gap-1"><Activity size={12} className="text-indigo-500"/> {project.executions}</span>
                                                    </div>
                                                    <div className="flex flex-col col-span-2 md:col-span-1">
                                                        <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                                                            <span className="uppercase font-semibold">Tasa de Éxito</span>
                                                            <span className={`font-bold ${project.successRate > 90 ? 'text-green-600' : 'text-orange-500'}`}>{project.successRate}%</span>
                                                        </div>
                                                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                                                            <div className={`h-1.5 rounded-full ${project.successRate > 90 ? 'bg-green-500' : 'bg-orange-500'}`} style={{ width: `${project.successRate}%` }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 w-full md:w-auto border-t md:border-t-0 border-gray-100 pt-3 md:pt-0 justify-end opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ChevronRight size={20} className="text-gray-400" />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* BARRA LATERAL ESTADISTICAS */}
                                <div className="space-y-6">
                                    <ToolUsageWidget />

                                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><BarChart3 size={18} className="text-indigo-500"/> Volumen Semanal</h3>
                                        <div className="h-40 flex items-center justify-center">
                                            <SimpleBarChart data={MOCK_PROJECT_STATS} color="#6366f1" />
                                        </div>
                                        <p className="text-xs text-center text-gray-400 mt-2">Últimos 6 meses</p>
                                    </div>

                                    <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600 rounded-full blur-3xl -mr-16 -mt-16 opacity-50"></div>
                                        <h3 className="font-bold text-lg mb-2 relative z-10">¿Problemas con tu código?</h3>
                                        <p className="text-indigo-200 text-xs mb-4 relative z-10 leading-relaxed">Nuestro asistente IA puede analizar tus scripts de Python o escenarios de Make en segundos.</p>
                                        <button onClick={() => setAiChatOpen(true)} className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-2.5 rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2 relative z-10 text-sm"><Sparkles size={16} className="text-yellow-300" /> Consultar a IA</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        /* --- VISTA DETALLE DEL PROYECTO --- */
                        <div className="animate-in fade-in slide-in-from-right-10 duration-300">
                            <button 
                                onClick={() => setSelectedProject(null)} 
                                className="mb-4 text-sm text-gray-500 hover:text-indigo-600 flex items-center gap-1 font-medium transition-colors"
                            >
                                <ArrowRight size={16} className="rotate-180" /> Volver a Proyectos
                            </button>

                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
                                <div className="p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${selectedProject.tool === 'python' ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white' : selectedProject.tool === 'make' ? 'bg-gradient-to-br from-purple-500 to-purple-700 text-white' : 'bg-gradient-to-br from-orange-400 to-orange-600 text-white'}`}>
                                            <ToolIcon tool={selectedProject.tool} size={32} className="text-white" />
                                        </div>
                                        <div>
                                            <h1 className="text-2xl font-bold text-gray-900">{selectedProject.name}</h1>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className={`px-2 py-0.5 rounded text-xs uppercase font-bold tracking-wider ${selectedProject.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{selectedProject.status}</span>
                                                <span className="text-sm text-gray-500">• Última ejecución: {selectedProject.lastRun}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                                            <Edit3 size={16} /> Editar
                                        </button>
                                        {selectedProject.status === 'active' ? (
                                            <button className="px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
                                                <Pause size={16} /> Pausar
                                            </button>
                                        ) : (
                                            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
                                                <Play size={16} /> Iniciar
                                            </button>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 bg-gray-50/50">
                                    <div className="p-6 text-center">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Ejecuciones Totales</p>
                                        <p className="text-3xl font-bold text-gray-900">{selectedProject.executions}</p>
                                    </div>
                                    <div className="p-6 text-center">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Tasa de Éxito</p>
                                        <p className={`text-3xl font-bold ${selectedProject.successRate > 90 ? 'text-green-600' : 'text-orange-500'}`}>{selectedProject.successRate}%</p>
                                    </div>
                                    <div className="p-6 text-center">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Errores (24h)</p>
                                        <p className="text-3xl font-bold text-gray-900">0</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* SECCIÓN IZQUIERDA: LOGS SIMULADOS */}
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="bg-slate-900 text-slate-200 p-6 rounded-xl font-mono text-sm shadow-md h-64 overflow-y-auto">
                                        <div className="flex items-center gap-2 text-slate-500 mb-4 pb-2 border-b border-slate-800">
                                            <Terminal size={14} /> Console Logs
                                        </div>
                                        <div className="space-y-1.5 opacity-80">
                                            <p><span className="text-blue-400">[INFO]</span> Initializing workflow: {selectedProject.name}...</p>
                                            <p><span className="text-blue-400">[INFO]</span> Connected to {selectedProject.tool} API successfully.</p>
                                            <p><span className="text-yellow-400">[WARN]</span> Response latency slightly high: 120ms.</p>
                                            <p><span className="text-blue-400">[INFO]</span> Processing data batch #4502...</p>
                                            <p><span className="text-green-400">[SUCCESS]</span> Execution completed. 0 errors found.</p>
                                            <p className="animate-pulse">_</p>
                                        </div>
                                    </div>
                                </div>

                                {/* SECCIÓN DERECHA: VINCULACIÓN ACADÉMICA (TEMARIO) */}
                                <div className="space-y-6">
                                    <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-xl">
                                        <h3 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                                            <BookOpen size={18} /> Vinculación Académica
                                        </h3>
                                        <p className="text-sm text-indigo-700 mb-4 leading-relaxed">
                                            Este proyecto aplica los conocimientos adquiridos en el módulo correspondiente. Si tienes dudas, revisa la lección.
                                        </p>
                                        
                                        <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm mb-4">
                                            <p className="text-xs text-gray-400 font-bold uppercase mb-1">Módulo Relacionado</p>
                                            <p className="font-medium text-gray-800">
                                                {courses[0].modules.find(m => m.id === selectedProject.moduleId)?.title || "Fundamentos Generales"}
                                            </p>
                                        </div>

                                        <button 
                                            onClick={() => goToModuleFromProject(selectedProject.courseId, selectedProject.moduleId)}
                                            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
                                        >
                                            <BookOpen size={16} /> Repasar Lección
                                        </button>
                                    </div>
                                    
                                    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                                        <h3 className="font-bold text-gray-800 mb-2">¿Necesitas Ayuda?</h3>
                                        <p className="text-sm text-gray-500 mb-4">Pregunta a tu tutor IA sobre este error o configuración.</p>
                                        <button onClick={() => setAiChatOpen(true)} className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                                            Abrir Chat IA
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'calendar' && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Calendario Académico</h1>
                        <p className="text-gray-500">Noviembre 2025</p>
                    </div>
                    <button 
                        onClick={handleGoogleSync} 
                        disabled={isSyncing}
                        className={`bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2 shadow-md transition-all ${isSyncing ? 'opacity-75 cursor-wait' : ''}`}
                    >
                        {isSyncing ? <Loader2 size={16} className="animate-spin" /> : <Globe size={16} />}
                        {isSyncing ? 'Sincronizando...' : 'Sincronizar Google'}
                    </button>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
                        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                            <div key={day} className="py-3 text-center text-sm font-semibold text-gray-600">{day}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 auto-rows-fr">
                        {Array.from({ length: 30 }).map((_, i) => { 
                            const day = i + 1; 
                            const dayEvents = calendarEvents.filter(e => e.day === day); 
                            return (
                                <div 
                                    key={day} 
                                    onClick={() => openEventModal(day)}
                                    className="min-h-[120px] border-b border-r border-gray-100 p-2 relative hover:bg-gray-50 transition-colors cursor-pointer group"
                                >
                                    <span className={`text-sm font-medium ${dayEvents.length > 0 ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`}>{day}</span>
                                    <div className="space-y-1 mt-1">
                                        {dayEvents.map((event, idx) => (
                                            <div 
                                                key={idx} 
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Evitar abrir el modal de "Nuevo Evento"
                                                    openEditEventModal(event);
                                                }}
                                                className={`text-[10px] p-1 rounded border-l-2 truncate font-medium ${getEventStyle(event.type)} hover:opacity-80 transition-opacity cursor-pointer shadow-sm`} 
                                                title={event.notes}
                                            >
                                                <span className="opacity-75 mr-1">{event.time}</span>
                                                {event.title}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Plus size={14} className="text-gray-400 hover:text-indigo-600" />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
              </div>
            )}

            {activeTab === 'grades' && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-6"><h1 className="text-2xl font-bold text-gray-900">Mis Calificaciones</h1><p className="text-gray-500">Progreso académico en "Máster en Automatización"</p></div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                        <th className="p-4">Actividad</th>
                        <th className="p-4">Módulo</th>
                        <th className="p-4">Estado</th>
                        <th className="p-4">Fecha</th>
                        <th className="p-4 text-right">Calificación</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {MOCK_GRADES.map(grade => (
                        <tr key={grade.id} className="hover:bg-gray-50 transition-colors group">
                          <td className="p-4">
                            <button 
                              onClick={() => handleGradeClick(grade)}
                              className="font-bold text-gray-900 hover:text-indigo-600 hover:underline text-left"
                              title="Ir al contenido"
                            >
                              {grade.activity}
                            </button>
                          </td>
                          <td className="p-4 text-gray-500 text-sm">
                             <button 
                              onClick={() => handleGradeClick(grade)}
                              className="hover:text-indigo-600 hover:underline text-left flex items-center gap-1"
                              title="Ver módulo en el temario"
                            >
                              <BookOpen size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                              {grade.module}
                            </button>
                          </td>
                          <td className="p-4"><span className={`px-2 py-1 text-xs rounded-full font-medium border ${grade.status === 'Completado' ? 'bg-green-100 text-green-700 border-green-200' : grade.status === 'Pendiente' ? 'bg-orange-100 text-orange-700 border-orange-200' : 'bg-gray-100 text-gray-700 border-gray-200'}`}>{grade.status}</span></td>
                          <td className="p-4 text-gray-500 text-sm">{grade.date}</td>
                          <td className="p-4 text-right font-bold text-gray-900">{grade.score !== null ? `${grade.score} / ${grade.maxScore}` : '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* --- NUEVA SECCIÓN: PRÓXIMOS CURSOS --- */}
                <div className="mb-6 flex justify-between items-end">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Próximos Cursos Recomendados</h2>
                        <p className="text-sm text-gray-500">Amplía tus conocimientos con estas nuevas formaciones.</p>
                    </div>
                    <button className="text-indigo-600 text-sm font-medium hover:underline flex items-center gap-1">Ver catálogo completo <ArrowRight size={16} /></button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {MOCK_UPCOMING_COURSES.map(course => (
                        <div key={course.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group">
                            <div className="h-32 overflow-hidden relative">
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-gray-700 shadow-sm">
                                    {course.category}
                                </div>
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="text-xs text-indigo-600 font-bold mb-1 flex items-center gap-1 uppercase tracking-wider">
                                    <Calendar size={12} /> Inicio: {course.date}
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2 leading-tight">{course.title}</h3>
                                <p className="text-xs text-gray-500 mb-4 flex items-center gap-1">
                                    <User size={12} /> {course.instructor}
                                </p>
                                <div className="mt-auto pt-4 border-t border-gray-100">
                                    <button 
                                        onClick={() => handleEnrollCourse(course)}
                                        className="w-full py-2 rounded-lg border border-indigo-600 text-indigo-600 text-sm font-bold hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2"
                                    >
                                        <Plus size={16} /> Inscribirse
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
               <div className="animate-in fade-in duration-300 h-[calc(100vh-140px)] flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4 bg-gray-50"><div className="flex items-center gap-2"><h1 className="text-lg font-bold text-gray-800">Mensajería</h1><span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{messages.filter(m => m.unread && m.folder === 'inbox').length} nuevos</span></div><button onClick={handleNewMessage} className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2 transition-colors"><Plus size={16} /> Nuevo</button></div>
                  <div className="flex-1 flex overflow-hidden">
                   <div className="w-16 md:w-48 bg-gray-50 border-r border-gray-200 flex flex-col py-4"><button onClick={() => { setMessageFilter('inbox'); setSelectedMessage(null); }} className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-sm font-medium transition-colors ${messageFilter === 'inbox' ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'}`}><Inbox size={18} /><span className="hidden md:inline">Entrada</span></button><button onClick={() => { setMessageFilter('sent'); setSelectedMessage(null); }} className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-sm font-medium transition-colors ${messageFilter === 'sent' ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'}`}><Send size={18} /><span className="hidden md:inline">Enviados</span></button><button onClick={() => { setMessageFilter('trash'); setSelectedMessage(null); }} className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-sm font-medium transition-colors ${messageFilter === 'trash' ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'}`}><Trash2 size={18} /><span className="hidden md:inline">Papelera</span></button></div>
                   <div className="w-full md:w-80 border-r border-gray-200 flex flex-col bg-white"><div className="p-3 border-b border-gray-200"><div className="relative"><Search className="absolute left-3 top-2.5 text-gray-400" size={16} /><input type="text" placeholder="Buscar..." value={searchMessage} onChange={(e) => setSearchMessage(e.target.value)} className="w-full pl-9 pr-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 border border-gray-200" /></div></div><div className="flex-1 overflow-y-auto">{filteredMessages.length === 0 ? (<div className="p-8 text-center text-gray-400 text-sm">No hay mensajes</div>) : (filteredMessages.map(msg => (<div key={msg.id} onClick={() => handleSelectMessage(msg)} className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-all relative ${selectedMessage?.id === msg.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : 'border-l-4 border-l-transparent'} ${msg.unread ? 'bg-white' : 'bg-gray-50/30'}`}><div className="flex justify-between items-start mb-1"><h4 className={`text-sm truncate pr-2 ${msg.unread ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>{msg.sender}</h4><span className={`text-xs whitespace-nowrap ${msg.unread ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>{msg.date}</span></div><p className={`text-sm mb-1 truncate ${msg.unread ? 'font-semibold text-gray-800' : 'text-gray-600'}`}>{msg.subject}</p><p className="text-xs text-gray-500 line-clamp-2">{msg.preview}</p></div>)))}</div></div>
                   <div className="hidden md:flex flex-1 flex-col bg-white">{selectedMessage ? (<><div className="p-6 border-b border-gray-100"><div className="flex justify-between items-start mb-4"><h2 className="text-xl font-bold text-gray-900">{selectedMessage.subject}</h2><div className="flex items-center gap-2"><button onClick={() => handleDeleteMessage(selectedMessage.id)} className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-lg transition-colors" title="Eliminar"><Trash2 size={18} /></button><button className="p-2 hover:bg-gray-100 text-gray-400 hover:text-gray-600 rounded-lg transition-colors" title="Archivar"><Archive size={18} /></button><button className="p-2 hover:bg-gray-100 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"><MoreVertical size={18} /></button></div></div><div className="flex items-center gap-3"><img src={selectedMessage.avatar} alt="" className="w-10 h-10 rounded-full border border-gray-200" /><div className="flex-1"><div className="flex items-baseline gap-2"><span className="font-bold text-gray-900">{selectedMessage.sender}</span><span className="text-xs text-gray-500">&lt;{selectedMessage.email}&gt;</span></div><div className="text-xs text-gray-400">Para: Mí • {selectedMessage.date}</div></div></div></div><div className="flex-1 p-6 overflow-y-auto text-gray-700 text-sm leading-relaxed whitespace-pre-line">{selectedMessage.body}</div><div className="p-4 border-t border-gray-200 bg-gray-50"><div className="flex gap-2 mb-2"><button className="text-xs font-medium text-gray-600 hover:text-blue-600 flex items-center gap-1"><Reply size={14} /> Responder</button><button className="text-xs font-medium text-gray-600 hover:text-blue-600 flex items-center gap-1"><ArrowRight size={14} /> Reenviar</button></div><div className="bg-white border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-shadow"><textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Escribe una respuesta..." className="w-full p-3 text-sm focus:outline-none resize-none" rows={3}></textarea><div className="flex justify-between items-center px-2 py-1 bg-gray-50 border-t border-gray-100"><div className="flex gap-2"><button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded"><Paperclip size={16} /></button><button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded"><File size={16} /></button></div><button onClick={handleSendReply} className="bg-blue-600 text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-blue-700 transition-colors">Enviar</button></div></div></div></>) : (<div className="flex-1 flex flex-col items-center justify-center text-gray-300 bg-gray-50/30"><MessageSquare size={64} className="mb-4 text-gray-200" /><p className="text-lg font-medium text-gray-400">Selecciona un mensaje para leerlo</p></div>)}</div>
                  </div>
               </div>
            )}

            {activeTab === 'settings' && (
              <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-300">
                <div className="mb-6"><h1 className="text-2xl font-bold text-gray-900">Configuración</h1><p className="text-gray-500">Gestiona tus preferencias y seguridad de la cuenta.</p></div>
                <div className="grid gap-6">
               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"><h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><User size={20} className="text-blue-600" />Perfil y Cuenta</h2><div className="grid gap-6 md:grid-cols-2"><div className="col-span-2 md:col-span-1"><label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label><input type="text" defaultValue={userName} onChange={(e) => setUserName(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div><div className="col-span-2 md:col-span-1"><label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label><input type="email" defaultValue={MOCK_USER.email} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div><div className="col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Biografía</label><textarea defaultValue={MOCK_USER.bio} rows={3} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div></div><div className="mt-4 flex justify-end"><button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"><Save size={16} />Guardar Cambios</button></div></div>
               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"><h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><Bell size={20} className="text-orange-500" />Notificaciones</h2><div className="space-y-4"><div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"><div><p className="font-medium text-gray-900">Notificaciones por Email</p><p className="text-xs text-gray-500">Recibe resúmenes semanales y alertas de tareas.</p></div><Toggle enabled={notifications.email} onToggle={(val) => setNotifications({...notifications, email: val})} /></div><div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"><div><p className="font-medium text-gray-900">Notificaciones Push</p><p className="text-xs text-gray-500">Alertas inmediatas en tu navegador.</p></div><Toggle enabled={notifications.push} onToggle={(val) => setNotifications({...notifications, push: val})} /></div><div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"><div><p className="font-medium text-gray-900">Newsletter</p><p className="text-xs text-gray-500">Novedades sobre nuevos cursos y características.</p></div><Toggle enabled={notifications.newsletter} onToggle={(val) => setNotifications({...notifications, newsletter: val})} /></div></div></div>
               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"><h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><Shield size={20} className="text-green-600" />Seguridad</h2><div className="space-y-4"><div><label className="block text-sm font-medium text-gray-700 mb-1">Contraseña Actual</label><input type="password" placeholder="••••••••" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div><div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña</label><input type="password" placeholder="••••••••" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label><input type="password" placeholder="••••••••" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div></div><button className="text-blue-600 text-sm font-medium hover:underline">¿Olvidaste tu contraseña?</button></div></div>
                </div>
              </div>
            )}

            {/* --- SECCIÓN DEL CURSO RESTAURADA --- */}
            {activeTab === 'course' && selectedCourse && (
              <div className="animate-in fade-in duration-300 flex flex-col h-[calc(100vh-140px)]">
                <div className="bg-white border-b border-gray-200 px-6 py-4 flex gap-4 items-center shadow-sm">
                 <button 
                   onClick={() => setCourseTab('content')}
                   className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${courseTab === 'content' ? 'bg-slate-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                 >
                   Curso
                 </button>
                 <button onClick={goToGrades} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">Calificaciones</button>
                 <button 
                   onClick={() => setCourseTab('reports')}
                   className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${courseTab === 'reports' ? 'bg-slate-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                 >
                   <BarChart3 size={16} />
                   Informes
                 </button>
                </div>
               
                {courseTab === 'content' ? (
                  <div className="flex flex-1 overflow-hidden bg-white shadow-sm border border-gray-200 rounded-b-xl mx-0">
                      <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto p-4 flex flex-col gap-1">
                          <button onClick={() => setCourseSection('general')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${courseSection === 'general' ? 'bg-slate-50 text-slate-900' : 'text-gray-600 hover:bg-gray-50'}`}><span className={`w-2 h-2 rounded-full ${courseSection === 'general' ? 'bg-green-500' : 'bg-transparent'}`}></span>General</button>
                          <div className="my-2 border-t border-gray-100"></div>
                          {['Competencias digitales', 'Incidencias técnicas', 'MENTORIAS', 'AULA VIRTUAL'].map((item, i) => {
                              const sectionKey = item.toLowerCase().split(' ')[0]; 
                              const keyMap: Record<string, string> = { 'competencias': 'competencias', 'incidencias': 'incidencias', 'mentorias': 'mentorias', 'aula': 'aula' };
                              return (
                                  <button key={i} onClick={() => setCourseSection(keyMap[sectionKey] || 'general')} className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm transition-colors text-left group ${courseSection === (keyMap[sectionKey] || '') ? 'bg-slate-50 text-slate-900 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                                      <span>{item}</span><ChevronRight size={14} className={courseSection === (keyMap[sectionKey] || '') ? 'text-slate-900' : 'text-gray-300 group-hover:text-gray-500'} />
                                  </button>
                              )
                          })}
                          <button onClick={() => setCourseSection('syllabus')} className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-bold transition-colors mt-2 ${courseSection === 'syllabus' ? 'bg-blue-50 text-blue-800' : 'text-gray-700 hover:bg-gray-50'}`}><span>TEMARIO</span><ChevronRight size={14} /></button>
                          <button onClick={() => setCourseSection('diploma')} className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm transition-colors text-left mt-1 ${courseSection === 'diploma' ? 'bg-slate-50 text-slate-900 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}><span>DIPLOMA</span><ChevronRight size={14} className="text-gray-300" /></button>
                      </div>

                      <div className="flex-1 bg-white p-8 overflow-y-auto relative">
                          {courseSection === 'general' && (
                              <div className="max-w-4xl mx-auto animate-in fade-in duration-300">
                                  <h2 className="text-2xl font-normal text-slate-800 mb-8 border-b border-gray-100 pb-4">General</h2>
                                  <div className="space-y-4">
                                      <div onClick={() => setCourseSection('announcements')} className="border border-gray-200 rounded-lg p-4 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer bg-white group">
                                          <div className="w-12 h-12 bg-red-400 rounded-lg flex items-center justify-center text-white shrink-0 group-hover:bg-red-500 transition-colors"><Megaphone size={24} /></div>
                                          <div className="flex-1"><h3 className="font-medium text-gray-700">Tablón de anuncios</h3><p className="text-sm text-gray-400 mt-1">Noticias y novedades</p></div>
                                          <ChevronRight size={20} className="text-gray-300" />
                                      </div>
                                      <div onClick={() => setAiChatOpen(true)} className="border border-gray-200 rounded-lg p-4 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer bg-white group">
                                          <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white shrink-0 group-hover:bg-green-600 transition-colors"><MessageCircle size={24} /></div>
                                          <div className="flex-1"><h3 className="font-medium text-gray-700">Chat de aprendizaje</h3><p className="text-sm text-gray-400 mt-1">Pregunta al tutor IA</p></div>
                                          <ChevronRight size={20} className="text-gray-300" />
                                      </div>
                                      <div onClick={() => setCourseSection('criteria')} className="border border-gray-200 rounded-lg p-4 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer bg-white group">
                                          <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center text-white shrink-0 group-hover:bg-blue-500 transition-colors"><FileBadge size={24} /></div>
                                          <div className="flex-1"><h3 className="font-medium text-gray-700">Criterios de certificación</h3><p className="text-sm text-gray-400 mt-1">Requisitos para aprobar</p></div>
                                          <ChevronRight size={20} className="text-gray-300" />
                                      </div>
                                  </div>
                              </div>
                          )}
                           
                          {/* SECCIÓN COMPETENCIAS */}
                          {courseSection === 'competencias' && (
                              <div className="max-w-5xl mx-auto animate-in fade-in duration-300">
                                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                                      <div>
                                          <h2 className="text-2xl font-bold text-gray-900 mb-2">Centro de Competencias</h2>
                                          <p className="text-gray-500">Domina las herramientas clave del curso a través de labores prácticas.</p>
                                      </div>
                                      <div className="hidden md:block">
                                          <SkillRadar data={MOCK_COMPETENCIES} />
                                      </div>
                                  </div>
                                   
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      {MOCK_COMPETENCIES.map((comp) => (
                                          <div key={comp.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
                                              <div className={`${comp.color} p-4 flex items-center justify-between text-white relative overflow-hidden`}>
                                                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                                                  <div className="flex items-center gap-3 relative z-10">
                                                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                                          {comp.icon}
                                                      </div>
                                                      <div>
                                                          <h3 className="font-bold text-lg leading-tight">{comp.title}</h3>
                                                          <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded text-white/90 uppercase font-bold tracking-wider">{comp.level}</span>
                                                      </div>
                                                  </div>
                                                  <div className="flex flex-col items-end relative z-10">
                                                      <span className="text-2xl font-bold">{comp.progress}%</span>
                                                  </div>
                                              </div>
                                              <div className="p-5 flex-1 flex flex-col">
                                                  <div className="w-full bg-gray-100 rounded-full h-1.5 mb-6 overflow-hidden">
                                                      <div className={`${comp.color} h-1.5 rounded-full transition-all duration-700 relative`} style={{ width: `${comp.progress}%` }}>
                                                          <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 animate-pulse"></div>
                                                      </div>
                                                  </div>
                                                   
                                                  <div className="flex justify-between items-center mb-3">
                                                      <h4 className="font-bold text-gray-800 text-sm flex items-center gap-2"><CheckSquare size={16} className="text-indigo-500"/> Labores Operativas</h4>
                                                      <span className="text-xs text-gray-400">{comp.tasks.filter(t => t.completed).length}/{comp.tasks.length} completadas</span>
                                                  </div>
                                                   
                                                  <div className="space-y-2 mb-6 flex-1">
                                                      {comp.tasks.map((task) => (
                                                          <div key={task.id} className="flex items-center justify-between p-2.5 bg-gray-50 hover:bg-indigo-50/50 rounded-lg transition-colors group border border-transparent hover:border-indigo-100">
                                                              <div className="flex items-center gap-3">
                                                                  <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${task.completed ? 'bg-green-500 text-white shadow-sm' : 'bg-white border border-gray-300 text-transparent'}`}>
                                                                      <Check size={14} strokeWidth={3} />
                                                                  </div>
                                                                  <span className={`text-sm ${task.completed ? 'text-gray-500 line-through' : 'text-gray-700 font-medium'}`}>{task.name}</span>
                                                              </div>
                                                              {!task.completed && (
                                                                  <button className="text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-md font-medium opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-600 hover:text-white hover:border-indigo-600 shadow-sm flex items-center gap-1">
                                                                      <Play size={10} /> Practicar
                                                                  </button>
                                                              )}
                                                          </div>
                                                      ))}
                                                  </div>
                                                   
                                                  <div className="pt-4 border-t border-gray-100 mt-auto">
                                                      {comp.projects > 0 ? (
                                                          <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg border border-blue-100">
                                                              <div className="flex items-center gap-2 text-blue-800 text-sm font-medium">
                                                                  <Layers size={16} />
                                                                  <span>{comp.projects} Proyecto(s) vinculado(s)</span>
                                                              </div>
                                                              <button onClick={goToProjects} className="text-xs bg-white text-blue-600 px-3 py-1.5 rounded border border-blue-200 hover:bg-blue-600 hover:text-white transition-colors font-bold shadow-sm">
                                                                  Ver
                                                              </button>
                                                          </div>
                                                      ) : (
                                                          <button onClick={() => alert(`Creando nuevo proyecto con ${comp.title}...`)} className="w-full py-2.5 rounded-lg border-2 border-dashed border-gray-300 text-gray-500 text-sm font-medium hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
                                                              <Plus size={16} /> Crear Proyecto con esta Skill
                                                          </button>
                                                      )}
                                                  </div>
                                              </div>
                                          </div>
                                      ))}
                                  </div>
                              </div>
                          )}

                          {courseSection === 'incidencias' && <div className="max-w-4xl mx-auto"><h2 className="text-2xl font-normal text-slate-800 mb-6 border-b border-gray-100 pb-4">Incidencias Técnicas</h2><div className="bg-white border border-gray-200 rounded-xl p-6"><h3 className="font-bold text-lg mb-4 text-gray-800">Reportar un problema</h3><div className="space-y-4"><input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Asunto" /><textarea rows={4} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Descripción" /><button className="bg-slate-800 text-white px-4 py-2 rounded-lg">Enviar</button></div></div></div>}
                           
                          {/* SECCIÓN MENTORÍAS */}
                          {courseSection === 'mentorias' && (
                              <div className="max-w-5xl mx-auto animate-in fade-in duration-300">
                                  <div className="mb-8">
                                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Mentorías Personalizadas</h2>
                                      <p className="text-gray-500">Reserva sesiones 1:1 con expertos para resolver dudas específicas.</p>
                                  </div>

                                  <div className="grid md:grid-cols-2 gap-6">
                                      {/* Mentor Card 1 */}
                                      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                                          <div className="flex items-start gap-4 mb-4">
                                              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Mentor" className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100" />
                                              <div>
                                                  <h3 className="font-bold text-lg text-gray-900">Ing. Roberto Auto</h3>
                                                  <p className="text-indigo-600 text-sm font-medium">Senior DevOps & Automation</p>
                                                  <div className="flex items-center gap-1 text-yellow-400 text-xs mt-1">
                                                      <Star size={12} fill="currentColor" /><span>4.9</span> <span className="text-gray-400">(120 reseñas)</span>
                                                  </div>
                                              </div>
                                          </div>
                                           
                                          {/* Availability Section (Toggleable) */}
                                          {showMentorshipSchedule === 1 ? (
                                              <div className="mt-4 border-t border-gray-100 pt-4 animate-in slide-in-from-top-2">
                                                  <div className="flex justify-between items-center mb-3">
                                                      <h4 className="font-semibold text-sm text-gray-800">Próximos Huecos</h4>
                                                      <button onClick={() => setShowMentorshipSchedule(null)} className="text-xs text-red-500 hover:underline">Cerrar</button>
                                                  </div>
                                                  <div className="grid grid-cols-2 gap-2 mb-4">
                                                      <button className="p-2 border border-green-200 bg-green-50 text-green-700 rounded text-xs font-bold hover:bg-green-100 transition-colors">Hoy, 16:00</button>
                                                      <button className="p-2 border border-green-200 bg-green-50 text-green-700 rounded text-xs font-bold hover:bg-green-100 transition-colors">Mañana, 10:00</button>
                                                      <button className="p-2 border border-gray-200 bg-gray-50 text-gray-400 rounded text-xs cursor-not-allowed">Mañana, 12:00 (Ocupado)</button>
                                                      <button className="p-2 border border-green-200 bg-green-50 text-green-700 rounded text-xs font-bold hover:bg-green-100 transition-colors">Jueves, 18:00</button>
                                                  </div>
                                                  <div className="space-y-2">
                                                      <button 
                                                        onClick={handleConfirmMentorship}
                                                        className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-100"
                                                      >
                                                        Confirmar Reserva
                                                      </button>
                                                      <button 
                                                        onClick={goToMessages}
                                                        className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                                      >
                                                        <MessageSquare size={16} /> Enviar Mensaje
                                                      </button>
                                                  </div>
                                              </div>
                                          ) : (
                                              <div className="space-y-3 mt-4">
                                                  <p className="text-sm text-gray-600 line-clamp-2">Especialista en integración de sistemas y bots de Telegram. Reserva para dudas de Módulo 2 y 3.</p>
                                                  <div className="flex gap-3">
                                                      <button onClick={() => setShowMentorshipSchedule(1)} className="flex-1 border border-indigo-600 text-indigo-600 py-2 rounded-lg text-sm font-bold hover:bg-indigo-50 transition-colors">Ver Disponibilidad</button>
                                                      <button className="p-2 border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50" title="Ver Perfil Completo"><User size={20} /></button>
                                                  </div>
                                              </div>
                                          )}
                                      </div>

                                      {/* Mentor Card 2 (No Availability) */}
                                      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all opacity-80">
                                          <div className="flex items-start gap-4 mb-4">
                                              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 font-bold text-xl">AD</div>
                                              <div>
                                                  <h3 className="font-bold text-lg text-gray-900">Ana Dev</h3>
                                                  <p className="text-gray-500 text-sm font-medium">Python Expert</p>
                                                   <div className="flex items-center gap-1 text-yellow-400 text-xs mt-1">
                                                      <Star size={12} fill="currentColor" /><span>5.0</span> <span className="text-gray-400">(45 reseñas)</span>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="mt-4">
                                              <div className="bg-orange-50 text-orange-700 p-3 rounded-lg text-xs mb-4 flex items-start gap-2">
                                                  <AlertCircle size={14} className="mt-0.5 shrink-0" />
                                                  <span>Actualmente sin huecos disponibles para esta semana.</span>
                                              </div>
                                              <div className="flex gap-3">
                                                  <button className="flex-1 bg-gray-100 text-gray-400 py-2 rounded-lg text-sm font-bold cursor-not-allowed">Sin Disponibilidad</button>
                                                  <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Notificarme</button>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          )}
                           
                          {/* SECCIÓN AULA VIRTUAL */}
                          {courseSection === 'aula' && (
                              <div className="max-w-5xl mx-auto animate-in fade-in duration-300">
                                  <div className="mb-8">
                                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Aula Virtual en Vivo</h2>
                                      <p className="text-gray-500">Accede a tus clases síncronas, webinarios y tutorías personalizadas.</p>
                                  </div>

                                  {/* HERO SECTION - NEXT SESSION */}
                                  <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white shadow-lg mb-10 relative overflow-hidden">
                                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                                      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                                          <div>
                                              <div className="flex items-center gap-2 mb-3">
                                                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse flex items-center gap-1">
                                                      <span className="w-2 h-2 bg-white rounded-full"></span> EN VIVO
                                                  </span>
                                                  <span className="text-indigo-100 text-sm font-medium">Hoy, 18:00 - 20:00</span>
                                              </div>
                                              <h3 className="text-3xl font-bold mb-2">Masterclass: Automatización Avanzada con Python</h3>
                                              <p className="text-indigo-100 mb-6 max-w-xl">Aprende a conectar APIs complejas y manejar errores en tiempo real con el Ing. Roberto Auto.</p>
                                              <div className="flex flex-wrap gap-3">
                                                  <button 
                                                    onClick={() => setIsVideoCallActive(true)}
                                                    className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors flex items-center gap-2 shadow-sm"
                                                  >
                                                      <VideoIcon size={20} /> Unirse a la Clase
                                                  </button>
                                                  <button className="bg-indigo-700/50 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700/70 transition-colors flex items-center gap-2 backdrop-blur-sm border border-indigo-500/30">
                                                      <Share2 size={20} /> Compartir Enlace
                                                  </button>
                                              </div>
                                          </div>
                                          <div className="hidden md:block bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20 min-w-[200px] text-center">
                                              <p className="text-xs uppercase tracking-wider opacity-70 mb-1">Tu Instructor</p>
                                              <div className="w-16 h-16 bg-indigo-300 rounded-full mx-auto mb-2 border-2 border-white overflow-hidden">
                                                   <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Instructor" className="w-full h-full object-cover" />
                                              </div>
                                              <p className="font-bold">Roberto Auto</p>
                                              <p className="text-xs opacity-80">Senior DevOps</p>
                                          </div>
                                      </div>
                                  </div>

                                  {/* SESSIONS LIST */}
                                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                      <div className="lg:col-span-2">
                                          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Calendar size={20} className="text-gray-400"/> Próximas Sesiones</h3>
                                          <div className="space-y-4">
                                              {MOCK_SESSIONS.filter(s => s.status !== 'past').map(session => (
                                                  <div key={session.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow flex items-start gap-4 group">
                                                      <div className="flex-shrink-0 w-16 text-center bg-gray-50 rounded-lg p-2 border border-gray-100">
                                                          <span className="block text-xs text-gray-500 uppercase font-bold">{session.month}</span>
                                                          <span className="block text-2xl font-bold text-gray-900">{session.day}</span>
                                                      </div>
                                                      <div className="flex-1">
                                                          <div className="flex justify-between items-start">
                                                              <div>
                                                                  <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{session.title}</h4>
                                                                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                                                                      <Clock size={14} /> {session.time} ({session.duration}) • {session.platform}
                                                                  </p>
                                                              </div>
                                                              <button 
                                                                  onClick={() => handleAddToCalendar(session)}
                                                                  className="text-gray-400 hover:text-indigo-600 p-2 rounded-lg hover:bg-indigo-50 transition-colors"
                                                                  title="Añadir al calendario"
                                                              >
                                                                  <CalendarPlus size={20} />
                                                              </button>
                                                          </div>
                                                          <div className="mt-4 flex items-center gap-3">
                                                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">Q&A</span>
                                                              <div className="flex -space-x-2">
                                                                  {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"></div>)}
                                                              </div>
                                                              <span className="text-xs text-gray-400">+12 asistentes</span>
                                                          </div>
                                                      </div>
                                                  </div>
                                              ))}
                                          </div>
                                      </div>

                                      {/* RECORDINGS SIDEBAR */}
                                      <div>
                                          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><PlayCircle size={20} className="text-gray-400"/> Grabaciones Recientes</h3>
                                          <div className="bg-white border border-gray-200 rounded-xl p-2 space-y-1">
                                              {MOCK_SESSIONS.filter(s => s.status === 'past').map(session => (
                                                  <button key={session.id} className="w-full text-left p-3 hover:bg-gray-50 rounded-lg group transition-colors">
                                                      <div className="flex justify-between items-center mb-1">
                                                          <span className="text-xs font-medium text-gray-500">{session.date}</span>
                                                          <Play size={12} className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                      </div>
                                                      <p className="text-sm font-medium text-gray-800 group-hover:text-indigo-700 line-clamp-2">{session.title}</p>
                                                      <span className="text-xs text-gray-400 mt-1 block">Duración: {session.duration}</span>
                                                  </button>
                                              ))}
                                              <button className="w-full text-center text-xs font-medium text-indigo-600 p-3 border-t border-gray-100 mt-2 hover:underline">Ver biblioteca completa</button>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          )}

                          {courseSection === 'syllabus' && (
                              <div className="animate-in slide-in-from-right-5 duration-300">
                                  {/* ... existing syllabus code ... */}
                                  <div className="mb-6 flex items-end justify-between"><div><h1 className="text-2xl font-bold text-gray-900">{selectedCourse.title}</h1><p className="text-gray-500">Instructor: {selectedCourse.instructor}</p></div></div>
                                  <div className="space-y-4">{selectedCourse.modules.map(module => (<div key={module.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"><button onClick={() => toggleModule(module.id)} className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors border-b border-gray-100"><div className="flex items-center space-x-3"><span className={`transform transition-transform duration-200 ${module.isOpen ? 'rotate-90' : ''}`}><ChevronRight size={20} className="text-gray-400" /></span><span className="font-semibold text-gray-800">{module.title}</span></div></button>{module.isOpen && (<div className="divide-y divide-gray-100">{module.items.map(item => (<div key={item.id} className="p-4 pl-12 flex items-start group hover:bg-blue-50/50 transition-colors"><div className="mt-1 mr-4"><button onClick={() => toggleItemCompletion(selectedCourse.id, module.id, item.id)} className={`w-6 h-6 rounded border-2 flex items-center justify-center ${item.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-blue-500'}`}>{item.completed && <CheckCircle size={16} />}</button></div><div className="flex-1"><div className="flex items-center space-x-2"><IconByType type={item.type} /><span className={`font-medium ${item.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>{item.title}</span></div></div></div>))}</div>)}</div>))}</div>
                              </div>
                          )}
                          {courseSection === 'announcements' && (
                              <div className="max-w-4xl mx-auto animate-in fade-in duration-300">
                                  <button onClick={() => setCourseSection('general')} className="text-sm text-blue-600 hover:underline mb-4 flex items-center gap-1"><ArrowRight size={14} className="rotate-180" /> Volver</button>
                                  <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                                      <h2 className="text-2xl font-normal text-slate-800">Tablón de Anuncios</h2>
                                      <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full font-medium">{MOCK_ANNOUNCEMENTS.length} publicaciones</span>
                                  </div>
                                  
                                  <div className="space-y-4">
                                      {MOCK_ANNOUNCEMENTS.map((announcement) => (
                                          <div key={announcement.id} className={`bg-white border-l-4 rounded-r-xl p-6 shadow-sm hover:shadow-md transition-all ${announcement.priority === 'high' ? 'border-l-red-500' : announcement.priority === 'medium' ? 'border-l-orange-500' : 'border-l-blue-500'}`}>
                                              <div className="flex flex-col md:flex-row justify-between items-start mb-3 gap-2">
                                                  <div className="flex items-center gap-3">
                                                      <div className={`p-2 rounded-lg shrink-0 ${announcement.type === 'alert' ? 'bg-orange-100 text-orange-600' : announcement.type === 'update' ? 'bg-blue-100 text-blue-600' : announcement.type === 'event' ? 'bg-purple-100 text-purple-600' : 'bg-red-100 text-red-600'}`}>
                                                          {announcement.type === 'alert' && <AlertTriangle size={20} />}
                                                          {announcement.type === 'update' && <RefreshCw size={20} />}
                                                          {announcement.type === 'event' && <Calendar size={20} />}
                                                          {announcement.type === 'reminder' && <Clock size={20} />}
                                                      </div>
                                                      <h3 className="font-bold text-lg text-gray-800">{announcement.title}</h3>
                                                  </div>
                                                  <span className="text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full flex items-center gap-1">
                                                      <Clock size={12} /> {announcement.date}
                                                  </span>
                                              </div>
                                              <p className="text-gray-600 leading-relaxed ml-0 md:ml-12">{announcement.content}</p>
                                              
                                              {announcement.type === 'event' && (
                                                  <div className="ml-0 md:ml-12 mt-4">
                                                      <button className="text-sm font-medium text-purple-600 hover:text-purple-800 flex items-center gap-1 transition-colors">
                                                          <PlayCircle size={16} /> Ver grabación
                                                      </button>
                                                  </div>
                                              )}
                                          </div>
                                      ))}
                                  </div>
                              </div>
                          )}
                          {courseSection === 'criteria' && <div className="max-w-4xl mx-auto"><button onClick={() => setCourseSection('general')} className="text-sm text-blue-600 hover:underline mb-4 flex items-center gap-1"><ArrowRight size={14} className="rotate-180" /> Volver</button><h2 className="text-2xl font-normal text-slate-800 mb-6 border-b border-gray-100 pb-4">Criterios</h2><div className="bg-white border border-gray-200 rounded-xl p-6"><ul className="list-disc pl-5 space-y-2"><li>Completar 100% videos</li><li>Aprobar Quiz</li><li>Entregar Proyecto</li></ul></div></div>}
                          {courseSection === 'diploma' && <div className="max-w-4xl mx-auto text-center py-10"><Award size={64} className="text-slate-300 mx-auto mb-4" /><h2 className="text-2xl font-bold text-slate-800">Certificado</h2><p className="text-gray-500 mb-8">Completa el curso para desbloquear.</p><button disabled className="bg-gray-200 text-gray-400 px-6 py-3 rounded-lg font-bold flex items-center gap-2 mx-auto cursor-not-allowed"><Lock size={18} /> Descargar (Bloqueado)</button></div>}
                      </div>
                  </div>
                ) : (
                  // VISTA DE INFORMES Y ANÁLISIS
                  <div className="flex-1 bg-slate-50 overflow-y-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="max-w-6xl mx-auto p-8">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900">Análisis de Rendimiento</h2>
                            <p className="text-gray-500">Métricas clave y progreso del curso "{selectedCourse.title}"</p>
                          </div>
                          <div className="flex gap-2 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
                              <button onClick={() => setReportTimeRange('weekly')} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${reportTimeRange === 'weekly' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'}`}>7 Días</button>
                              <button onClick={() => setReportTimeRange('monthly')} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${reportTimeRange === 'monthly' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'}`}>30 Días</button>
                              <button onClick={() => setReportTimeRange('all')} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${reportTimeRange === 'all' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'}`}>Todo</button>
                          </div>
                      </div>

                      {/* STATS CARDS */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard 
                          title="Tiempo Total" 
                          value={reportTimeRange === 'weekly' ? '12.5 h' : reportTimeRange === 'monthly' ? '45.2 h' : '126 h'} 
                          subtitle="+12% vs periodo anterior"
                          icon={<Clock size={24} className="text-blue-600" />} 
                          color="bg-blue-50" 
                        />
                        <StatCard 
                          title="Progreso Curso" 
                          value={`${selectedCourse.progress}%`} 
                          subtitle="En camino para terminar"
                          icon={<TrendingUp size={24} className="text-green-600" />} 
                          color="bg-green-50" 
                        />
                        <StatCard 
                          title="Nota Promedio" 
                          value="8.5" 
                          subtitle="Top 15% de la clase"
                          icon={<Award size={24} className="text-purple-600" />} 
                          color="bg-purple-50" 
                        />
                         <StatCard 
                          title="Actividades" 
                          value="24" 
                          subtitle="Completadas este mes"
                          icon={<CheckCircle size={24} className="text-orange-600" />} 
                          color="bg-orange-50" 
                        />
                      </div>

                      {/* GRÁFICOS */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                          <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2"><Activity size={18} className="text-indigo-500" /> Actividad de Estudio</h3>
                            <div className="flex gap-2">
                                <button onClick={() => setReportMetric('time')} className={`p-1.5 rounded hover:bg-gray-100 ${reportMetric === 'time' ? 'bg-gray-100 text-gray-900' : 'text-gray-400'}`} title="Horas"><Clock size={16} /></button>
                                <button onClick={() => setReportMetric('score')} className={`p-1.5 rounded hover:bg-gray-100 ${reportMetric === 'score' ? 'bg-gray-100 text-gray-900' : 'text-gray-400'}`} title="Puntuación"><Award size={16} /></button>
                            </div>
                          </div>
                          <div className="h-64 flex items-center justify-center">
                            <SimpleLineChart data={getChartData()} color={reportMetric === 'time' ? '#4f46e5' : '#10b981'} />
                          </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                          <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2"><PieChart size={18} className="text-blue-500" /> Rendimiento por Módulo</h3>
                          <div className="h-64 flex items-center justify-center">
                            <SimpleBarChart data={getPerformanceData()} color="#3b82f6" />
                          </div>
                        </div>
                      </div>

                      {/* DETALLE TABLA */}
                      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                          <h3 className="font-bold text-gray-800">Desglose por Tipo de Contenido</h3>
                          <button className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"><Download size={14} /> Exportar CSV</button>
                        </div>
                        <table className="w-full text-sm text-left">
                          <thead className="bg-gray-50 text-gray-500 font-medium">
                            <tr>
                              <th className="px-6 py-3">Tipo</th>
                              <th className="px-6 py-3">Completados</th>
                              <th className="px-6 py-3">Tiempo Total</th>
                              <th className="px-6 py-3">Puntuación Media</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            <tr>
                              <td className="px-6 py-3 flex items-center gap-2 font-medium text-gray-900"><VideoIcon size={16} className="text-red-500" /> Vídeos</td>
                              <td className="px-6 py-3">12 / 15</td>
                              <td className="px-6 py-3">5h 30m</td>
                              <td className="px-6 py-3">-</td>
                            </tr>
                             <tr>
                              <td className="px-6 py-3 flex items-center gap-2 font-medium text-gray-900"><FileText size={16} className="text-blue-500" /> Lecturas</td>
                              <td className="px-6 py-3">5 / 8</td>
                              <td className="px-6 py-3">2h 15m</td>
                              <td className="px-6 py-3">-</td>
                            </tr>
                             <tr>
                              <td className="px-6 py-3 flex items-center gap-2 font-medium text-gray-900"><CheckCircle size={16} className="text-green-500" /> Cuestionarios</td>
                              <td className="px-6 py-3">3 / 3</td>
                              <td className="px-6 py-3">45m</td>
                              <td className="px-6 py-3 font-bold text-green-600">8.5/10</td>
                            </tr>
                             <tr>
                              <td className="px-6 py-3 flex items-center gap-2 font-medium text-gray-900"><BookOpen size={16} className="text-orange-500" /> Tareas</td>
                              <td className="px-6 py-3">1 / 2</td>
                              <td className="px-6 py-3">4h 20m</td>
                              <td className="px-6 py-3 font-bold text-green-600">9.0/10</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* ... */}
          </div>
        </main>
        {/* ... */}
      </div>
    </div>
  );
}
