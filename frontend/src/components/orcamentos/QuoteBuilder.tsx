import { useEffect, useMemo, useState } from 'react';
import { priceCatalog } from '../../data/priceCatalog';
import { PriceCategory, PriceItem, Quote, QuoteItem } from '../../types/price';
import QuoteItemRow from './QuoteItemRow';
import QuotePrintView from './QuotePrintView';

const INITIAL_QUOTE: Quote = {
  id: 'quote-1',
  quoteNumber: '15',
  client: '',
  status: 'Rascunho',
  items: [],
  discount: 0,
  vatRate: 23,
  observations: '',
  createdAt: new Date().toISOString(),
};

const flattenItems = priceCatalog.reduce<Record<string, PriceItem>>((acc, category) => {
  category.items.forEach((item) => {
    acc[item.id] = item;
  });
  return acc;
}, {});

export default function QuoteBuilder() {
  const [quote, setQuote] = useState<Quote>(INITIAL_QUOTE);
  const [selectedCategory, setSelectedCategory] = useState<PriceCategory>(priceCatalog[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [showTotalOnly, setShowTotalOnly] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem('inoxferro-quote');
    if (saved) {
      setQuote(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('inoxferro-quote', JSON.stringify(quote));

    // When a quote becomes Aprovado, register it in the approved list
    try {
      const approvedKey = 'inoxferro-approved-quotes';
      if (quote.status === 'Aprovado') {
        const existing = JSON.parse(window.localStorage.getItem(approvedKey) || '[]');
        const found = existing.find((q: any) => q.id === quote.id || q.quoteNumber === quote.quoteNumber);
        if (!found) {
          existing.push({ id: quote.id, quoteNumber: quote.quoteNumber, dateApproved: new Date().toISOString(), client: quote.client || '' });
          window.localStorage.setItem(approvedKey, JSON.stringify(existing));
        }
      }
    } catch (e) {
      // ignore storage errors
    }
  }, [quote]);

  const filteredItems = useMemo(() => {
    return selectedCategory.items.filter((item) =>
      [item.code, item.description].some((value) => value.toLowerCase().includes(searchTerm.toLowerCase())),
    );
  }, [selectedCategory, searchTerm]);

  const subtotal = quote.items.reduce((sum, item) => sum + item.subtotal, 0);
  const discountAmount = (subtotal * quote.discount) / 100;
  const vatAmount = ((subtotal - discountAmount) * quote.vatRate) / 100;
  const total = subtotal - discountAmount + vatAmount;

  const handleAddItem = (itemId: string, quantity: number) => {
    const item = flattenItems[itemId];
    if (!item) return;

    setQuote((current) => {
      const existing = current.items.find((quoteItem) => quoteItem.id === item.id);
      if (existing) {
        const updatedItems = current.items.map((quoteItem) =>
          quoteItem.id === existing.id
            ? { ...quoteItem, quantity: quoteItem.quantity + quantity, subtotal: (quoteItem.quantity + quantity) * quoteItem.unitPrice }
            : quoteItem,
        );
        return { ...current, items: updatedItems };
      }

      const newItem: QuoteItem = {
        id: item.id,
        code: item.code,
        description: item.description,
        unit: item.unit,
        quantity,
        unitPrice: item.price,
        subtotal: item.price * quantity,
      };

      return { ...current, items: [...current.items, newItem] };
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setQuote((current) => ({
      ...current,
      items: current.items.map((item) =>
        item.id === id ? { ...item, quantity, subtotal: item.unitPrice * quantity } : item,
      ),
    }));
  };

  const handleRemove = (id: string) => {
    setQuote((current) => ({ ...current, items: current.items.filter((item) => item.id !== id) }));
  };

  const handleReset = () => {
    setQuote({ ...INITIAL_QUOTE, createdAt: new Date().toISOString() });
    setSearchTerm('');
  };

  const saveQuoteToList = () => {
    try {
      const key = 'inoxferro-quotes';
      const raw = window.localStorage.getItem(key) || '[]';
      const arr: Quote[] = JSON.parse(raw);
      let working = { ...quote };
      // ensure id and quoteNumber
      if (!working.id) working.id = `quote-${Date.now()}`;
      if (!working.quoteNumber) working.quoteNumber = String(arr.length + 1);
      if (!working.createdAt) working.createdAt = new Date().toISOString();

      const idx = arr.findIndex((q) => q.id === working.id || q.quoteNumber === working.quoteNumber);
      if (idx >= 0) {
        arr[idx] = working;
      } else {
        arr.push(working);
      }
      window.localStorage.setItem(key, JSON.stringify(arr));

      // also register as approved if status is Aprovado
      if (working.status === 'Aprovado') {
        const approvedKey = 'inoxferro-approved-quotes';
        const existing = JSON.parse(window.localStorage.getItem(approvedKey) || '[]');
        const found = existing.find((q: any) => q.id === working.id || q.quoteNumber === working.quoteNumber);
        if (!found) {
          existing.push({ id: working.id, quoteNumber: working.quoteNumber, dateApproved: new Date().toISOString(), client: working.client || '' });
          window.localStorage.setItem(approvedKey, JSON.stringify(existing));
        }
      }

      window.localStorage.setItem('inoxferro-quote', JSON.stringify(working));
      setQuote(working);
      alert('Orçamento guardado com sucesso.');
    } catch (e) {
      // ignore
      alert('Erro ao guardar o orçamento localmente.');
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6 print:hidden">
        <div className="rounded-none border border-border bg-surface p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Construir Orçamento</h2>
              <p className="mt-2 text-sm text-gray-400">Selecione produtos, ajuste quantidades, e gere um orçamento profissional.</p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-none border border-border bg-black px-4 py-3 text-sm uppercase tracking-[0.18em] text-white transition hover:border-red-500 hover:text-red-500"
            >
              Novo Orçamento
            </button>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-gray-400">Cliente</span>
              <input
                type="text"
                value={quote.client}
                onChange={(event) => setQuote({ ...quote, client: event.target.value })}
                placeholder="Nome do cliente ou empresa"
                className="mt-2 input"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-gray-400">Estado</span>
              <select
                value={quote.status}
                onChange={(event) => setQuote({ ...quote, status: event.target.value as Quote['status'] })}
                className="mt-2 input"
              >
                <option>Rascunho</option>
                <option>Enviado</option>
                <option>Aprovado</option>
                <option>Rejeitado</option>
              </select>
            </label>
          </div>
        </div>

        <div className="rounded-none border border-border bg-surface p-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Itens disponíveis</h3>
              <p className="text-sm text-gray-400">Pesquise e adicione produtos com um clique.</p>
            </div>
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Pesquisar código ou descrição"
              className="input lg:w-72"
            />
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-2">
            <div className="card">
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">Categorias</h4>
              <div className="mt-4 space-y-2">
                {priceCatalog.map((category) => (
                  <button
                    key={category.category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full rounded-none border px-4 py-3 text-left text-sm transition ${
                      category.category === selectedCategory.category
                        ? 'border-red-500 bg-red-500/10 text-white'
                        : 'border-border bg-black text-gray-300 hover:border-red-500 hover:text-red-500'
                    }`}
                  >
                    {category.category}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm table-clean">
                <thead>
                  <tr className="border-b border-border text-gray-400">
                    <th className="px-3 py-3">Código</th>
                    <th className="px-3 py-3">Descrição</th>
                    <th className="px-3 py-3">Preço</th>
                    <th className="px-3 py-3">Unidade</th>
                    <th className="px-3 py-3">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b border-border hover:bg-white/5">
                      <td className="px-3 py-3 text-white">{item.code}</td>
                      <td className="px-3 py-3 text-gray-300">{item.description}</td>
                      <td className="px-3 py-3 text-white">{item.price.toFixed(2)} €</td>
                      <td className="px-3 py-3 text-gray-300">{item.unit}</td>
                      <td className="px-3 py-3">
                        <button
                          type="button"
                          onClick={() => handleAddItem(item.id, 1)}
                          className="btn"
                        >
                          Adicionar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <aside className="space-y-6 print:hidden">
        <div className="rounded-none border border-border bg-surface p-6">
          <h3 className="text-lg font-semibold text-white">Resumo do Orçamento</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-gray-400">
                  <th className="px-3 py-3">Código</th>
                  <th className="px-3 py-3">Quantidade</th>
                  <th className="px-3 py-3">Subtotal</th>
                  <th className="px-3 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {quote.items.map((item) => (
                  <QuoteItemRow key={item.id} item={item} onQuantityChange={handleQuantityChange} onRemove={handleRemove} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-gray-400">Desconto (%)</span>
              <input
                type="number"
                min={0}
                max={100}
                value={quote.discount}
                onChange={(event) => setQuote({ ...quote, discount: Number(event.target.value) })}
                className="mt-2 input"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-gray-400">IVA (%)</span>
              <input
                type="number"
                min={0}
                max={100}
                value={quote.vatRate}
                onChange={(event) => setQuote({ ...quote, vatRate: Number(event.target.value) })}
                className="mt-2 input"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-gray-400">Observações</span>
              <textarea
                value={quote.observations || ''}
                onChange={(event) => setQuote({ ...quote, observations: event.target.value })}
                rows={4}
                className="mt-2 w-full rounded-none border border-border bg-black px-3 py-3 text-white outline-none"
              />
            </label>
          </div>

          <div className="mt-6 rounded-none border border-border bg-black p-4">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Visualização do orçamento</p>
                <p className="text-sm text-gray-500">Escolha se quer mostrar todos os detalhes ou apenas o valor final.</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowTotalOnly(false)}
                  className={`rounded-none border px-4 py-2 text-sm transition ${
                    !showTotalOnly ? 'border-red-500 bg-red-500/10 text-white' : 'border-border bg-black text-gray-300 hover:border-red-500 hover:text-red-500'
                  }`}
                >
                  Tudo
                </button>
                <button
                  type="button"
                  onClick={() => setShowTotalOnly(true)}
                  className={`rounded-none border px-4 py-2 text-sm transition ${
                    showTotalOnly ? 'border-red-500 bg-red-500/10 text-white' : 'border-border bg-black text-gray-300 hover:border-red-500 hover:text-red-500'
                  }`}
                >
                  Só valor final
                </button>
              </div>
            </div>

            <div className="space-y-4 rounded-none border border-border bg-black p-4">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>

            <div className="flex justify-between text-sm text-gray-400">
              <span>Desconto</span>
              <span>-{discountAmount.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>IVA</span>
              <span>{vatAmount.toFixed(2)} €</span>
            </div>
            <div className="mt-4 flex justify-between text-lg font-semibold text-white">
              <span>Total</span>
              <span>{total.toFixed(2)} €</span>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <button
              type="button"
              onClick={saveQuoteToList}
              className="btn"
            >
              Salvar Orçamento
            </button>
            <button
              type="button"
              onClick={() => setShowPreview((current) => !current)}
              className="btn"
            >
              {showPreview ? 'Ocultar pré-visualização' : 'Pré-visualizar Orçamento'}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="btn-primary"
            >
              Imprimir Orçamento
            </button>
          </div>
        </div>
      </div>
      </aside>
      <div className={`${showPreview ? '' : 'hidden'} rounded-none bg-background px-0 print:block`}>
        <QuotePrintView
          quote={quote}
          subtotal={subtotal}
          discountAmount={discountAmount}
          vatAmount={vatAmount}
          total={total}
          showTotalOnly={showTotalOnly}
        />
      </div>
    </div>
  );
}
