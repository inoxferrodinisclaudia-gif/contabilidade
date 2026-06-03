import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { House, FileText, Users, Settings, ShieldCheck, ListChecks, LogOut } from 'lucide-react';
import { logoutUser } from '../../utils/auth';

const navItems = [
  { title: 'Dashboard', href: '/', icon: House },
  { title: 'Orçamentos', href: '/orcamentos', icon: FileText },
  { title: 'Tabela de Preços', href: '/tabela-precos', icon: ListChecks },
  { title: 'Clientes', href: '/clientes', icon: Users },
  { title: 'Admin', href: '/admin', icon: Settings },
  { title: 'Segurança', href: '/seguranca', icon: ShieldCheck },
  { title: 'Calendário', href: '/calendario', icon: FileText },
  { title: 'Gestão Orçamentos', href: '/gestao-orcamentos', icon: ListChecks },
];

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    logoutUser();
    router.push('/login');
  };

  return (
    <aside className="hidden w-[280px] shrink-0 border-r border-border bg-surface px-4 py-8 xl:block print:hidden sticky top-0 self-start h-screen overflow-y-auto">
      <div className="mb-10 flex justify-center">
        <div className="logo">INOX FERRO</div>
      </div>

      <nav className="mt-6 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.title} href={item.href} className="nav-item">
              <Icon className="h-4 w-4 text-red-400" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-8 left-4 right-4 flex flex-col gap-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Sair</span>
        </button>
        <div className="text-xs text-muted text-center">Versão interna • 1.0</div>
      </div>
    </aside>
  );
}
