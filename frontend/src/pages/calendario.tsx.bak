import { useEffect, useMemo, useState } from 'react';
import Sidebar from '../components/layouts/Sidebar';
import Header from '../components/layouts/Header';
import { ChevronLeft, ChevronRight, Calendar, TrendingUp, CheckCircle2, AlertCircle } from 'lucide-react';

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function formatDateKey(d: Date) {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

export default function Calendario() {
  const [viewDate, setViewDate] = useState(() => new Date());
  const [approvedDates, setApprovedDates] = useState<Record<string, any>>({});

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('inoxferro-approved-quotes') || '[]';
      const arr = JSON.parse(raw);
      const map: Record<string, any> = {};
      arr.forEach((q: any) => {
        if (q.dateApproved) {
          const key = q.dateApproved.slice(0, 10);
          map[key] = map[key] || [];
          map[key].push(q);
        }
      });
      setApprovedDates(map);
    } catch (e) {
      setApprovedDates({});
    }
  }, []);

  const monthStart = useMemo(() => startOfMonth(viewDate), [viewDate]);
  const monthEnd = useMemo(() => endOfMonth(viewDate), [viewDate]);

  const daysGrid = useMemo(() => {
    const startWeekday = monthStart.getDay(); // 0 = Sunday
    const daysInMonth = monthEnd.getDate();
    const cells: (number | null)[] = [];
    // prepend blanks
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    // append blanks to full weeks
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [monthStart, monthEnd]);

  const goPrev = () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const goNext = () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  const monthKey = `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, '0')}`;
  const monthApproved = Object.entries(approvedDates).filter(([key]) => key.startsWith(monthKey)).length;
  const totalApproved = Object.keys(approvedDates).length;
  const occupancyRate = monthEnd.getDate() > 0 ? Math.round((monthApproved / monthEnd.getDate()) * 100) : 0;

  return (
    <div className="min-h-screen bg-background text-text">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 pt-24">
          <Header />

          {/* Header com título e navegação */}
          <section className="mt-8 mb-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="h-6 w-6 text-red-400" />
                  <h1 className="text-3xl font-bold text-white">Calendário de Aprovações</h1>
                </div>
                <p className="text-gray-400">Acompanhe o ritmo de aprovações de orçamentos em tempo real</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={goPrev}
                  className="flex items-center gap-2 rounded-lg border border-border bg-surface hover:bg-surface/80 px-4 py-2 text-white transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </button>
                <button 
                  onClick={goNext}
                  className="flex items-center gap-2 rounded-lg border border-border bg-surface hover:bg-surface/80 px-4 py-2 text-white transition-colors"
                >
                  Próximo
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>

          {/* Cards de Estatísticas */}
          <section className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-border bg-surface/50 p-6 backdrop-blur-sm hover:border-red-400 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">Mês Atual</p>
                  <p className="mt-2 text-2xl font-bold text-white">{viewDate.toLocaleString('pt-PT', { month: 'long', year: 'numeric' })}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-400/50" />
              </div>
            </div>

            <div className="rounded-lg border border-border bg-surface/50 p-6 backdrop-blur-sm hover:border-red-400 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">Aprovações (Mês)</p>
                  <p className="mt-2 text-2xl font-bold text-red-400">{monthApproved}</p>
                  <p className="mt-1 text-xs text-gray-500">de {monthEnd.getDate()} dias</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-red-400/50" />
              </div>
            </div>

            <div className="rounded-lg border border-border bg-surface/50 p-6 backdrop-blur-sm hover:border-red-400 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">Taxa Ocupação</p>
                  <p className="mt-2 text-2xl font-bold text-green-400">{occupancyRate}%</p>
                  <div className="mt-3 h-1.5 w-full rounded-full bg-border overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-red-500 to-green-500" style={{ width: `${occupancyRate}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-surface/50 p-6 backdrop-blur-sm hover:border-red-400 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">Total Histórico</p>
                  <p className="mt-2 text-2xl font-bold text-purple-400">{totalApproved}</p>
                  <p className="mt-1 text-xs text-gray-500">Todos os períodos</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-400/50" />
              </div>
            </div>
          </section>

          {/* Calendário */}
          <section className="rounded-lg border border-border bg-surface/30 backdrop-blur-sm overflow-hidden">
            <div className="border-b border-border bg-gradient-to-r from-red-500/10 to-transparent p-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Calendar className="h-5 w-5 text-red-400" />
                Agenda do Mês
              </h2>
              <p className="mt-2 text-sm text-gray-400">Os quadros em vermelho indicam dias com aprovações</p>
            </div>

            <div className="p-6">
              {/* Cabeçalho dias da semana */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((d, idx) => (
                  <div key={d} className={`text-center font-bold py-2 rounded-lg ${idx === 0 || idx === 6 ? 'text-gray-500 bg-black/40' : 'text-red-400'}`}>
                    {d}
                  </div>
                ))}
              </div>

              {/* Grid de dias */}
              <div className="grid grid-cols-7 gap-2">
                {daysGrid.map((day, idx) => {
                  if (day === null) return <div key={idx} className="h-32 rounded-lg bg-black/30" />;
                  
                  const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
                  const key = formatDateKey(date);
                  const items = approvedDates[key] || [];
                  const isToday = new Date().toDateString() === date.toDateString();
                  
                  return (
                    <div
                      key={idx}
                      className={`h-32 rounded-lg border-2 p-4 transition-all hover:shadow-lg ${
                        items.length 
                          ? 'border-red-500/60 bg-red-500/10 hover:border-red-400 hover:shadow-red-500/20' 
                          : isToday 
                          ? 'border-blue-500/60 bg-blue-500/5 hover:border-blue-400 hover:shadow-blue-500/20'
                          : 'border-border/50 bg-black/20 hover:border-border hover:shadow-red-500/10'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className={`text-lg font-bold ${
                          items.length ? 'text-red-300' : isToday ? 'text-blue-300' : 'text-white'
                        }`}>
                          {day}
                        </span>
                        {items.length > 0 && (
                          <span className="inline-flex rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold text-white">
                            {items.length}
                          </span>
                        )}
                        {isToday && !items.length && (
                          <span className="text-xs text-blue-400 font-semibold">HOJE</span>
                        )}
                      </div>
                      
                      {items.length > 0 ? (
                        <div className="space-y-1 text-xs leading-tight">
                          {items.slice(0, 2).map((it: any, i: number) => (
                            <div 
                              key={i}
                              className="truncate px-2 py-1 rounded bg-red-500/20 text-red-100 border border-red-500/30 hover:bg-red-500/30 transition-colors"
                              title={`${it.quoteNumber} ${it.client || ''}`}
                            >
                              <span className="font-semibold">{it.quoteNumber}</span>
                              {it.client && <span className="text-red-200/60"> • {it.client.slice(0, 10)}</span>}
                            </div>
                          ))}
                          {items.length > 2 && (
                            <div className="px-2 py-1 rounded bg-red-500/10 text-red-200/70 border border-red-500/20 text-center font-semibold">
                              +{items.length - 2} mais
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-gray-500 text-xs italic">Sem aprovações</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Rodapé com informações */}
          <section className="mt-8 p-6 rounded-lg border border-border bg-surface/30 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Legenda</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <span className="text-sm text-gray-300">Dia com aprovações</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-300">Hoje</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-gray-600"></div>
                <span className="text-sm text-gray-300">Sem atividade</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
