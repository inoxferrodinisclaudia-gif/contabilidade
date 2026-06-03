import Sidebar from '../components/layouts/Sidebar';
import Header from '../components/layouts/Header';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Dados vazios - serão preenchidos com dados reais do backend
const monthlyData: any[] = [];
const annualData: any[] = [];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-text">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 pt-24">
          <Header />
          
          {/* Estatísticas principais */}
          <section className="mt-6 mb-8">
            <div className="grid gap-4 md:grid-cols-3">
              {/* Faturamento Mensal */}
              <div className="rounded-lg border border-border bg-surface/50 backdrop-blur-sm p-6 hover:border-red-400 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-400 uppercase tracking-wider">Faturamento (Mês)</p>
                    <p className="mt-3 text-3xl font-bold text-white">€0</p>
                    <p className="mt-2 text-xs text-gray-500">Sem dados</p>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gray-500/20 text-gray-400">
                    <TrendingDown className="h-4 w-4" />
                    <span className="text-sm font-semibold">-</span>
                  </div>
                </div>
              </div>

              {/* Orçamentos do mês */}
              <div className="rounded-lg border border-border bg-surface/50 backdrop-blur-sm p-6 hover:border-red-400 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-400 uppercase tracking-wider">Orçamentos (Mês)</p>
                    <p className="mt-3 text-3xl font-bold text-white">0</p>
                    <p className="mt-2 text-xs text-gray-500">Sem dados</p>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gray-500/20 text-gray-400">
                    <TrendingDown className="h-4 w-4" />
                    <span className="text-sm font-semibold">-</span>
                  </div>
                </div>
              </div>

              {/* Crescimento Anual */}
              <div className="rounded-lg border border-border bg-surface/50 backdrop-blur-sm p-6 hover:border-red-400 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-400 uppercase tracking-wider">Crescimento Anual</p>
                    <p className="mt-3 text-3xl font-bold text-white">-</p>
                    <p className="mt-2 text-xs text-gray-500">Sem dados</p>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gray-500/20 text-gray-400">
                    <TrendingDown className="h-4 w-4" />
                    <span className="text-sm font-semibold">-</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Gráficos */}
          <section className="grid gap-6 lg:grid-cols-2 mb-8">
            {/* Gráfico Mensal */}
            <div className="rounded-lg border border-border bg-surface/30 backdrop-blur-sm p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-red-400" />
                  Evolução Mensal
                </h3>
                <p className="text-sm text-gray-400 mt-1">Faturamento e Orçamentos por mês</p>
              </div>
              {monthlyData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222222" />
                    <XAxis dataKey="month" stroke="#cbd5e1" />
                    <YAxis stroke="#cbd5e1" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#101010', 
                        border: '1px solid #222222',
                        borderRadius: '8px'
                      }}
                      labelStyle={{ color: '#f8fafc' }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Line 
                      type="monotone" 
                      dataKey="faturado" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      dot={{ fill: '#ef4444', r: 5 }}
                      activeDot={{ r: 7 }}
                      name="Faturado (€)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="orcamentos" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', r: 5 }}
                      activeDot={{ r: 7 }}
                      name="Orçamentos"
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-gray-400">
                  <p>Sem dados disponíveis</p>
                </div>
              )}
            </div>

            {/* Gráfico Anual */}
            <div className="rounded-lg border border-border bg-surface/30 backdrop-blur-sm p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  Desempenho Anual
                </h3>
                <p className="text-sm text-gray-400 mt-1">Crescimento histórico de faturamento</p>
              </div>
              {annualData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={annualData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222222" />
                    <XAxis dataKey="year" stroke="#cbd5e1" />
                    <YAxis stroke="#cbd5e1" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#101010', 
                        border: '1px solid #222222',
                        borderRadius: '8px'
                      }}
                      labelStyle={{ color: '#f8fafc' }}
                      formatter={(value) => `€${value}`}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Bar 
                      dataKey="total" 
                      fill="#10b981" 
                      name="Faturamento Total (€)"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-gray-400">
                  <p>Sem dados disponíveis</p>
                </div>
              )}
            </div>
          </section>

          {/* Painel resumido */}
          <section className="mt-6">
            <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
              <div className="rounded-none border border-border bg-surface p-6">
                <h2 className="text-xl font-semibold text-white">Painel Inox Ferro</h2>
                <p className="mt-4 text-sm leading-6 text-gray-300">
                  Plataforma de orçamentos profissionais com gestão de clientes, estatísticas e exportação.
                </p>
              </div>
              <div className="rounded-none border border-border bg-surface p-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-none border border-border bg-black p-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-red-500">Orçamentos</span>
                    <p className="mt-3 text-4xl font-bold">0</p>
                  </div>
                  <div className="rounded-none border border-border bg-black p-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-red-500">Faturado</span>
                    <p className="mt-3 text-4xl font-bold">0€</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
