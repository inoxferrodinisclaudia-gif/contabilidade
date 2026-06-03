import Sidebar from '../components/layouts/Sidebar';
import Header from '../components/layouts/Header';

export default function Seguranca() {
  return (
    <div className="min-h-screen bg-background text-text">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 pt-24">
          <Header />
          <section className="mt-6 rounded-none border border-border bg-surface p-6">
            <h2 className="text-2xl font-semibold text-white">Segurança</h2>
            <p className="mt-3 text-sm text-gray-400">Aqui serão adicionadas opções de segurança, autenticação e gestão de sessões.</p>
          </section>
        </main>
      </div>
    </div>
  );
}
