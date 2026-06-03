import { useEffect, useState } from 'react';
import Sidebar from '../components/layouts/Sidebar';
import Header from '../components/layouts/Header';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function GestaoOrcamentos() {
  const [quotes, setQuotes] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('inoxferro-quotes') || '[]';
      setQuotes(JSON.parse(raw));
    } catch (e) {
      setQuotes([]);
    }
  }, []);

  const refresh = () => {
    try {
      const raw = window.localStorage.getItem('inoxferro-quotes') || '[]';
      setQuotes(JSON.parse(raw));
    } catch (e) {
      setQuotes([]);
    }
  };

  const handleEdit = (q: any) => {
    window.localStorage.setItem('inoxferro-quote', JSON.stringify(q));
    router.push('/orcamentos');
  };

  const handleDelete = (id: string) => {
    if (!confirm('Eliminar este orçamento?')) return;
    try {
      const raw = JSON.parse(window.localStorage.getItem('inoxferro-quotes') || '[]');
      const filtered = raw.filter((r: any) => r.id !== id);
      window.localStorage.setItem('inoxferro-quotes', JSON.stringify(filtered));
      refresh();
    } catch (e) {}
  };

  const handleInlineSave = (idx: number) => {
    try {
      const raw = JSON.parse(window.localStorage.getItem('inoxferro-quotes') || '[]');
      raw[idx] = quotes[idx];
      window.localStorage.setItem('inoxferro-quotes', JSON.stringify(raw));
      // update approved list if status changed to Aprovado
      if (quotes[idx].status === 'Aprovado') {
        const approvedKey = 'inoxferro-approved-quotes';
        const existing = JSON.parse(window.localStorage.getItem(approvedKey) || '[]');
        const found = existing.find((q: any) => q.id === quotes[idx].id || q.quoteNumber === quotes[idx].quoteNumber);
        if (!found) {
          existing.push({ id: quotes[idx].id, quoteNumber: quotes[idx].quoteNumber, dateApproved: new Date().toISOString(), client: quotes[idx].client || '' });
          window.localStorage.setItem(approvedKey, JSON.stringify(existing));
        }
      }
      refresh();
      alert('Atualizado');
    } catch (e) {
      alert('Erro ao salvar');
    }
  };

  return (
    <div className="min-h-screen bg-background text-text">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 pt-24">
          <Header />

          <section className="mt-6">
            <div className="rounded-none border border-border bg-surface p-6 print:hidden">
              <h2 className="text-2xl font-semibold text-white">Gestão de Orçamentos</h2>
              <p className="mt-2 text-sm text-gray-400">Veja, edite e elimine orçamentos guardados localmente.</p>
            </div>

            <div className="mt-6 rounded-none border border-border bg-surface p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm table-clean">
                  <thead>
                    <tr className="border-b border-border text-gray-400">
                      <th className="px-3 py-3">Nº</th>
                      <th className="px-3 py-3">Cliente</th>
                      <th className="px-3 py-3">Estado</th>
                      <th className="px-3 py-3">Criado</th>
                      <th className="px-3 py-3">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotes.map((q, idx) => (
                      <tr key={q.id} className="border-b border-border hover:bg-white/5">
                        <td className="px-3 py-3 text-white">{q.quoteNumber}</td>
                        <td className="px-3 py-3 text-gray-300">
                          <input className="input" value={q.client || ''} onChange={(e)=>{ const copy=[...quotes]; copy[idx].client=e.target.value; setQuotes(copy); }} />
                        </td>
                        <td className="px-3 py-3 text-gray-300">
                          <select className="input" value={q.status} onChange={(e)=>{ const copy=[...quotes]; copy[idx].status=e.target.value; setQuotes(copy); }}>
                            <option>Rascunho</option>
                            <option>Enviado</option>
                            <option>Aprovado</option>
                            <option>Rejeitado</option>
                          </select>
                        </td>
                        <td className="px-3 py-3 text-gray-300">{new Date(q.createdAt).toLocaleString()}</td>
                        <td className="px-3 py-3">
                          <button onClick={()=>handleEdit(q)} className="mr-2 btn">Editar</button>
                          <button onClick={()=>handleInlineSave(idx)} className="mr-2 btn">Guardar</button>
                          <button onClick={()=>handleDelete(q.id)} className="btn-primary">Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4">
                <Link href="/orcamentos" className="rounded-none border border-border bg-black px-4 py-3 text-sm uppercase tracking-[0.18em] text-white">Criar novo orçamento</Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
