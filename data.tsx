import React from 'react';
import { 
    RotateCw, 
    Terminal, 
    Zap, 
    BrainCircuit 
} from 'lucide-react';
import { 
    Announcement, 
    Course, 
    Message, 
    CalendarEvent, 
    NotificationItem, 
    Project, 
    Competency, 
    Session 
} from './types';

// --- DATOS DE ANUNCIOS ---
export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    title: 'Actualización Módulo Python',
    date: 'Hace 2 horas',
    content: 'Hemos añadido 3 nuevos ejercicios prácticos sobre Pandas y manejo de archivos CSV en la sección de recursos. ¡Echa un vistazo!',
    type: 'update',
    priority: 'medium'
  },
  {
    id: 2,
    title: 'Mantenimiento Programado',
    date: 'Ayer',
    content: 'La plataforma estará en mantenimiento este sábado de 02:00 a 04:00 UTC para mejorar la velocidad del servidor. Disculpen las molestias.',
    type: 'alert',
    priority: 'high'
  },
  {
    id: 3,
    title: 'Webinar: IA Generativa en el trabajo',
    date: 'Hace 3 días',
    content: 'Ya está disponible la grabación del webinar con la Dra. Sarah AI. Puedes encontrarlo en la biblioteca de medios.',
    type: 'event',
    priority: 'low'
  },
  {
    id: 4,
    title: 'Recordatorio: Cierre de Evaluaciones',
    date: 'Hace 5 días',
    content: 'Recuerda completar el Quiz del Módulo 1 antes del domingo para que cuente en la evaluación continua.',
    type: 'reminder',
    priority: 'medium'
  }
];

export const MOCK_USER = {
  name: "Alex Estudiante",
  role: "Estudiante",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  email: "alex.estudiante@educloud.edu",
  phone: "+34 612 345 678",
  location: "Madrid, España",
  bio: "Entusiasta de la eficiencia y la automatización. Busco optimizar flujos de trabajo usando herramientas No-Code e Inteligencia Artificial.",
  skills: ["Zapier", "Make", "Python Basics", "Workflow Design"]
};

export const MOCK_GRADES = [
  { id: 1, activity: 'Quiz: Lógica de Triggers', module: 'Módulo 1', score: 85, maxScore: 100, status: 'Completado', date: '20 Oct 2025' },
  { id: 2, activity: 'Proyecto: Bot de Telegram', module: 'Módulo 2', score: null, maxScore: 100, status: 'Pendiente', date: '30 Nov 2025' },
  { id: 3, activity: 'Examen Final Teórico', module: 'Módulo 3', score: null, maxScore: 100, status: 'Bloqueado', date: '15 Dic 2025' },
];

export const MOCK_UPCOMING_COURSES = [
  { 
    id: 1, 
    title: 'Inteligencia Artificial Generativa para Devs', 
    date: '15 Ene 2026', 
    instructor: 'Dra. Sarah AI', 
    category: 'Innovación',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  { 
    id: 2, 
    title: 'DevOps: Despliegue Continuo con Docker', 
    date: '01 Feb 2026', 
    instructor: 'Ing. Roberto Auto', 
    category: 'Infraestructura',
    image: 'https://images.unsplash.com/photo-1607799275518-d58665d096c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  { 
    id: 3, 
    title: 'Analítica de Datos con Python Pandas', 
    date: '20 Feb 2026', 
    instructor: 'Ana Dev', 
    category: 'Data Science',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
];

export const INITIAL_MESSAGES: Message[] = [
  { 
    id: 1, 
    folder: 'inbox',
    sender: 'Ing. Roberto Auto', 
    email: 'roberto.auto@educloud.edu',
    role: 'Instructor', 
    subject: 'Feedback sobre tu proyecto final', 
    preview: 'Hola Alex, he revisado el esquema de tu bot y tengo algunas sugerencias...', 
    body: 'Hola Alex,\n\nHe revisado el esquema de tu bot y tengo algunas sugerencias sobre el manejo de errores. En el nodo de Make, asegúrate de capturar los errores 400 y 500 para que el flujo no se detenga silenciosamente.\n\nTambién, el script de Python necesita un bloque try-except en la línea 45.\n\n¡Buen trabajo hasta ahora!\n\nSaludos,\nRoberto.',
    date: '10:30 AM', 
    unread: true, 
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' 
  },
  { 
    id: 2, 
    folder: 'inbox',
    sender: 'Soporte Técnico', 
    email: 'soporte@educloud.edu',
    role: 'Admin', 
    subject: 'Mantenimiento programado de la plataforma', 
    preview: 'Este fin de semana realizaremos actualizaciones en los servidores...', 
    body: 'Estimado estudiante,\n\nEste fin de semana (Sábado de 02:00 a 06:00 UTC) realizaremos actualizaciones en los servidores de EduCloud. Es posible que experimentes interrupciones breves en el servicio.\n\nRecomendamos guardar cualquier trabajo pendiente antes de este horario.\n\nGracias por tu comprensión,\nEquipo de Soporte.',
    date: 'Ayer', 
    unread: false, 
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' 
  },
  { 
    id: 3, 
    folder: 'inbox',
    sender: 'Maria Diseño', 
    email: 'maria.ux@educloud.edu',
    role: 'Compañera', 
    subject: 'Duda sobre la tarea de Figma', 
    preview: 'Hola Alex, ¿tienes un momento para ver mi prototipo?', 
    body: 'Hola Alex,\n\nEstaba viendo tu perfil y noté que sabes algo de diseño de flujos. ¿Podrías echarle un vistazo a mi prototipo en Figma si tienes tiempo? Estoy atascada con la interacción del menú lateral.\n\n¡Gracias!',
    date: 'Lun', 
    unread: false, 
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' 
  },
  { 
    id: 4, 
    folder: 'sent',
    sender: 'Yo', 
    email: 'alex.estudiante@educloud.edu',
    role: 'Estudiante', 
    subject: 'Entrega preliminar del Bot', 
    preview: 'Adjunto el enlace al repositorio de GitHub con el avance...', 
    body: 'Hola Profesor,\n\nAdjunto el enlace al repositorio de GitHub con el avance del módulo 2. He completado la integración básica con la API de Telegram.\n\nQuedo atento a sus comentarios.\n\nAlex.',
    date: 'Semana pasada', 
    unread: false, 
    avatar: MOCK_USER.avatar
  }
];

export const MOCK_CALENDAR_EVENTS: CalendarEvent[] = [
  { id: 1, day: 20, title: 'Quiz Módulo 1', type: 'quiz', time: '14:00', notes: 'Repasar apuntes antes.' },
  { id: 2, day: 25, title: 'Webinar en vivo', type: 'live', time: '18:00', notes: 'Link en el aula virtual.' },
  { id: 3, day: 30, title: 'Entrega Proyecto Bot', type: 'assignment', time: '23:59', notes: 'Subir a GitHub.' }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  { id: 1, type: 'course_update', title: 'Actualización del curso', message: 'Nuevo módulo de Python agregado.', time: 'Hace 5 min', read: false },
  { id: 2, type: 'assignment', title: 'Tarea pendiente', message: 'La tarea "Bot de Telegram" vence mañana.', time: 'Hace 2 horas', read: false, moduleId: 102 },
  { id: 3, type: 'message', title: 'Nuevo mensaje', message: 'Roberto Auto ha respondido a tu pregunta.', time: 'Ayer', read: true },
  { id: 4, type: 'welcome', title: 'Bienvenido', message: 'Gracias por unirte a EduCloud.', time: 'Hace 3 días', read: true }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 1,
    title: "Máster en Automatización de Procesos con IA",
    instructor: "Ing. Roberto Auto",
    category: "Productividad",
    progress: 15,
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    modules: [
      {
        id: 101,
        title: "Módulo 1: Fundamentos de No-Code (Make & Zapier)",
        isOpen: true,
        items: [
          { id: '1-1', type: 'video', title: 'Introducción a la Automatización', duration: '10 min', completed: true },
          { id: '1-2', type: 'pdf', title: 'Guía de Webhooks y APIs', size: '1.5 MB', completed: true },
          { id: '1-3', type: 'quiz', title: 'Quiz: Lógica de Triggers y Actions', questions: 5, completed: false },
        ]
      },
      {
        id: 102,
        title: "Módulo 2: Scripts de Automatización con Python",
        isOpen: false,
        items: [
          { id: '2-1', type: 'video', title: 'Configurando tu entorno Python', duration: '20 min', completed: false },
          { id: '2-2', type: 'assignment', title: 'Proyecto: Bot de Telegram', dueDate: '30 Nov', completed: false },
        ]
      },
      {
        id: 103,
        title: "Módulo 3: Agentes de IA Autónomos",
        isOpen: false,
        items: [
          { id: '3-1', type: 'video', title: 'Integrando GPT-4 en flujos de trabajo', duration: '25 min', completed: false },
        ]
      }
    ]
  }
];

export const MOCK_REPORTS_DATA = {
    weekly: {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        activity: [2, 4, 1.5, 5, 3, 6, 2], // horas
        modulePerformance: [85, 60, 0]
    },
    monthly: {
        labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
        activity: [10, 15, 8, 20], // horas
        modulePerformance: [85, 70, 40]
    },
    all: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        activity: [30, 45, 20, 50, 60, 40],
        modulePerformance: [90, 85, 75]
    }
};

export const INITIAL_PROJECTS: Project[] = [
    { id: 1, name: 'Bot Telegram Notificaciones', tool: 'python', status: 'active', executions: 1250, successRate: 98, lastRun: 'Hace 5 min', moduleId: 102, courseId: 1 },
    { id: 2, name: 'Sincronización Leads CRM', tool: 'make', status: 'paused', executions: 50, successRate: 100, lastRun: 'Hace 2 días', moduleId: 101, courseId: 1 },
    { id: 3, name: 'Parser Facturas Email', tool: 'zapier', status: 'error', executions: 12, successRate: 45, lastRun: 'Hace 1 hora', moduleId: 101, courseId: 1 },
    { id: 4, name: 'Scraper Precios Competencia', tool: 'python', status: 'active', executions: 340, successRate: 92, lastRun: 'Ayer', moduleId: 102, courseId: 1 },
];

export const MOCK_PROJECT_STATS = [
    { label: 'Ene', value: 120 }, { label: 'Feb', value: 200 }, { label: 'Mar', value: 150 }, 
    { label: 'Abr', value: 300 }, { label: 'May', value: 450 }, { label: 'Jun', value: 400 }
];

export const MOCK_COMPETENCIES: Competency[] = [
    {
        id: 'make',
        title: 'Automatización con Make',
        icon: <RotateCw size={24} className="text-white" />,
        color: 'bg-purple-600',
        progress: 45,
        level: 'Intermedio',
        projects: 2,
        tasks: [
            { id: 1, name: 'Crear Webhook de Entrada', completed: true },
            { id: 2, name: 'Filtrar Datos JSON', completed: true },
            { id: 3, name: 'Iteradores y Agregadores', completed: false },
            { id: 4, name: 'Conexión OAuth2', completed: false }
        ]
    },
    {
        id: 'python',
        title: 'Scripting en Python',
        icon: <Terminal size={24} className="text-white" />,
        color: 'bg-yellow-500',
        progress: 20,
        level: 'Principiante',
        projects: 1,
        tasks: [
            { id: 1, name: 'Configurar Entorno Virtual', completed: true },
            { id: 2, name: 'Peticiones HTTP (Requests)', completed: false },
            { id: 3, name: 'Manejo de Errores Try/Except', completed: false },
            { id: 4, name: 'Pandas DataFrames', completed: false }
        ]
    },
    {
        id: 'zapier',
        title: 'Flujos en Zapier',
        icon: <Zap size={24} className="text-white" />,
        color: 'bg-orange-500',
        progress: 80,
        level: 'Avanzado',
        projects: 1,
        tasks: [
            { id: 1, name: 'Trigger Gmail', completed: true },
            { id: 2, name: 'Action Google Sheets', completed: true },
            { id: 3, name: 'Filtros Condicionales', completed: true },
            { id: 4, name: 'Multi-Step Zaps', completed: false }
        ]
    },
    {
        id: 'ai',
        title: 'Inteligencia Artificial',
        icon: <BrainCircuit size={24} className="text-white" />,
        color: 'bg-emerald-500',
        progress: 10,
        level: 'Principiante',
        projects: 0,
        tasks: [
            { id: 1, name: 'Prompt Engineering Básico', completed: true },
            { id: 2, name: 'API de OpenAI', completed: false },
            { id: 3, name: 'Fine-Tuning Modelos', completed: false },
            { id: 4, name: 'Agentes Autónomos', completed: false }
        ]
    }
];

export const MOCK_SESSIONS: Session[] = [
    { id: 101, title: 'Masterclass: Automatización Avanzada', instructor: 'Ing. Roberto Auto', date: '27 Nov', month: 'NOV', day: '27', time: '18:00', duration: '2h', status: 'upcoming', platform: 'Zoom' },
    { id: 102, title: 'Q&A: Resolución de Dudas Módulo 2', instructor: 'Ing. Roberto Auto', date: '29 Nov', month: 'NOV', day: '29', time: '16:00', duration: '1h', status: 'upcoming', platform: 'Google Meet' },
    { id: 103, title: 'Taller Práctico: Python Scripts', instructor: 'Ana Dev', date: '15 Nov', month: 'NOV', day: '15', time: '10:00', duration: '1.5h', status: 'past', platform: 'Teams' },
    { id: 104, title: 'Intro a APIs REST', instructor: 'Ing. Roberto Auto', date: '10 Nov', month: 'NOV', day: '10', time: '12:00', duration: '1h', status: 'past', platform: 'Zoom' }
];