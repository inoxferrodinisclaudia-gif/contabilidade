import { useState } from 'react';
import { Settings, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <>
      {/* Botão de Engrenagem */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg hover:bg-surface transition-colors text-gray-400 hover:text-white"
        title="Definições"
      >
        <Settings className="h-5 w-5" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-lg border border-border bg-surface p-6 shadow-2xl">
            {/* Header do Modal */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-red-400" />
                <h2 className="text-xl font-semibold text-white">Definições</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-surface/50 transition-colors text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Seção de Tema */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Tema</label>
                <div className="grid grid-cols-2 gap-3">
                  {/* Tema Escuro */}
                  <button
                    onClick={() => {
                      setTheme('dark');
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-2 rounded-lg border-2 p-4 transition-all ${
                      theme === 'dark'
                        ? 'border-red-500 bg-red-500/10'
                        : 'border-border bg-surface/50 hover:border-border/80'
                    }`}
                  >
                    <Moon className={`h-5 w-5 ${theme === 'dark' ? 'text-red-400' : 'text-gray-400'}`} />
                    <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-red-400' : 'text-gray-400'}`}>
                      Escuro
                    </span>
                  </button>

                  {/* Tema Claro */}
                  <button
                    onClick={() => {
                      setTheme('light');
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-2 rounded-lg border-2 p-4 transition-all ${
                      theme === 'light'
                        ? 'border-red-500 bg-red-500/10'
                        : 'border-border bg-surface/50 hover:border-border/80'
                    }`}
                  >
                    <Sun className={`h-5 w-5 ${theme === 'light' ? 'text-red-400' : 'text-gray-400'}`} />
                    <span className={`text-sm font-semibold ${theme === 'light' ? 'text-red-400' : 'text-gray-400'}`}>
                      Claro
                    </span>
                  </button>
                </div>
              </div>

              {/* Informação */}
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-gray-400">
                  ✓ A sua preferência foi guardada e será restaurada no próximo acesso.
                </p>
              </div>

              {/* Botão Fechar */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-full mt-4 px-4 py-2 rounded-lg border border-border bg-surface/50 hover:bg-surface text-white font-medium transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
