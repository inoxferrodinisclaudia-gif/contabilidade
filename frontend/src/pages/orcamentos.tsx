import Sidebar from '../components/layouts/Sidebar';
import Header from '../components/layouts/Header';
import QuoteBuilder from '../components/orcamentos/QuoteBuilder';

export default function Orçamentos() {
  return (
    <div className="min-h-screen bg-background text-text">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 pt-24">
          <Header />
          <section className="mt-6 space-y-6">
            <div className="rounded-none border border-border bg-surface p-6 print:hidden">
              <h2 className="text-2xl font-semibold text-white">Orçamentos</h2>
              <p className="mt-2 text-sm text-gray-400">
                Crie orçamentos profissionais com cálculo automático de totais e IVA.
              </p>
            </div>
            <QuoteBuilder />
          </section>
        </main>
      </div>
    </div>
  );
}
