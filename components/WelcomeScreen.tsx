import React, { useState } from 'react';
import { Sparkles, Shield, User, Lock, Wand2, Eye, EyeOff, ArrowRight } from 'lucide-react';

export const WelcomeScreen = ({ onLoginSuccess }: { onLoginSuccess: (name: string) => void }) => {
  const [formData, setFormData] = useState({
    username: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const generateAutoPassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, newPassword: password, confirmPassword: password }));
    setShowPassword(true);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { username, oldPassword, newPassword, confirmPassword } = formData;
    if (!username || !oldPassword || !newPassword || !confirmPassword) {
      setError('Por favor completa todos los campos.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas nuevas no coinciden.');
      return;
    }
    if (newPassword.length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres.');
      return;
    }
    onLoginSuccess(username);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-300">
        <div className="bg-indigo-600 p-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
           <Sparkles className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Bienvenido al Curso</h1>
          <p className="text-indigo-100 text-sm">Actualiza tus credenciales para acceder a la plataforma.</p>
        </div>
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 flex items-center gap-2">
                <Shield size={16} />{error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de Usuario</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="Ej: alex.dev" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña Antigua</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input type="password" name="oldPassword" value={formData.oldPassword} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="••••••••" />
              </div>
            </div>
            <div className="pt-2">
                <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-700">Nueva Clave</label>
                    <button type="button" onClick={generateAutoPassword} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 bg-indigo-50 px-2 py-1 rounded transition-colors"><Wand2 size={12} /> Generar Automática</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} name="newPassword" value={formData.newPassword} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm" placeholder="Nueva" />
                    </div>
                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm" placeholder="Confirmar" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600">{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                    </div>
                </div>
                <p className="text-xs text-gray-400 mt-1 pl-1">{showPassword ? "¡Copia tu clave antes de continuar!" : "Puedes escribirla manualmente o generarla."}</p>
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 mt-6 shadow-lg shadow-indigo-200"><span>Actualizar y Acceder</span><ArrowRight size={18} /></button>
          </form>
        </div>
      </div>
    </div>
  );
};