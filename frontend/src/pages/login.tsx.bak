import { useState, useEffect, type FormEvent } from 'react';
import { useRouter } from 'next/router';
import api from '../utils/api';
import axios from 'axios';
import { saveAuthToken, saveRememberedEmail } from '../utils/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('inoxferro-remember-email');
    const wasRemembered = localStorage.getItem('inoxferro-remember-me') === 'true';
    if (savedEmail && wasRemembered) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token } = response.data;

      if (!token) {
        setError('Não foi possível iniciar sessão. Tente novamente.');
        return;
      }

      saveAuthToken(token, rememberMe);
      saveRememberedEmail(email, rememberMe);
      setError('');
      router.push('/orcamentos');
    } catch (error: unknown) {
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? String(error.response.data.message)
          : error instanceof Error
          ? error.message
          : 'Email ou palavra-passe incorreta.';
      setError(message || 'Email ou palavra-passe incorreta.');
    }
  };

  return (
    <div className="min-h-screen bg-background text-text flex items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-[1100px] grid-cols-1 gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-none panel square flex flex-col justify-between p-10 bg-[#0d0e12]">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-red-400">INOX FERRO</p>
            <h1 className="mt-6 text-4xl font-semibold text-white">Contabilidade moderna para orçamentos rápidos.</h1>
            <p className="mt-4 max-w-[420px] text-sm leading-7 text-muted">
              Entre no seu painel com as credenciais fornecidas e comece a gerir orçamentos, clientes e calendário de aprovações.
            </p>
          </div>
          <div className="mt-10 grid gap-4 text-sm text-muted">
              <div className="rounded-none border border-border bg-[#0b0c0f] p-4">
                <p className="font-semibold text-white">Conta de administrador</p>
                <p className="mt-2">Use as credenciais do seu utilizador registado para aceder ao painel.</p>
              </div>
          </div>
        </div>

        <div className="rounded-none panel square p-10 bg-white text-slate-900">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-red-500">Iniciar sessão</p>
            <h2 className="mt-3 text-3xl font-semibold">Bem-vindo de volta</h2>
            <p className="mt-3 text-sm text-slate-600">Use o email e palavra-passe fornecidos para continuar.</p>
          </div>

          <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-700">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="seu@email.com"
                className="input mt-2 w-full border border-border bg-[#f8fafc] text-slate-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Palavra-passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Introduza a sua palavra-passe"
                className="input mt-2 w-full border border-border bg-[#f8fafc] text-slate-900"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-border accent-red-500"
              />
              <label htmlFor="rememberMe" className="text-sm text-slate-700 cursor-pointer">
                Guardar automaticamente o login
              </label>
            </div>

            {error && <div className="rounded-none border border-red-400 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}

            <button type="submit" className="btn-primary w-full text-center py-3">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
