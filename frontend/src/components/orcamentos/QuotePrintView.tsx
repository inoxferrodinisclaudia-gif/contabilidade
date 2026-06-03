import Image from 'next/image';
import type { CSSProperties } from 'react';
import { Quote } from '../../types/price';

type QuotePrintViewProps = {
  quote: Quote;
  subtotal: number;
  discountAmount: number;
  vatAmount: number;
  total: number;
  showTotalOnly: boolean;
};

export default function QuotePrintView({ quote, subtotal, discountAmount, vatAmount, total, showTotalOnly }: QuotePrintViewProps) {
  const quoteNumber = quote.quoteNumber || '15';
  const issueDate = new Date(quote.createdAt).toLocaleDateString('pt-PT');
  const validUntil = new Date(new Date(quote.createdAt).setDate(new Date(quote.createdAt).getDate() + 30)).toLocaleDateString('pt-PT');

  return (
    <section
      className="mx-auto max-w-[920px] bg-white px-6 py-6 text-black print:block print:max-w-full print:px-4 print:py-4"
      style={{ breakInside: 'avoid', pageBreakInside: 'avoid', WebkitPageBreakInside: 'avoid' } as CSSProperties}
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.9fr] print:gap-4">
        <div>
          <div className="text-4xl font-black uppercase tracking-[0.4em] text-red-600">INOX FERRO</div>
          <div className="mt-4 space-y-1 text-sm text-slate-700">
            <p>Travessa da Fábrica nº 159</p>
            <p>4615-239 Borba de Godim</p>
            <p>inoxferrodinisclaudia@gmail.com</p>
            <p>Tel: 911 136 485</p>
          </div>
        </div>

        <div className="rounded-none bg-slate-100 p-5 text-sm text-slate-700">
          <div className="mb-3 font-semibold uppercase tracking-[0.2em] text-slate-900">Orçamento nº {quoteNumber}</div>
          <div className="space-y-3">
            <div className="flex justify-between"><span className="font-medium">Emitido em:</span> <span>{issueDate}</span></div>
            <div className="flex justify-between"><span className="font-medium">Válido até:</span> <span>{validUntil}</span></div>
            <div className="flex justify-between"><span className="font-medium">Status:</span> <span>{quote.status}</span></div>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-none bg-slate-100 p-5 text-sm text-slate-700">
        <h3 className="font-semibold uppercase tracking-[0.2em] text-slate-900">Dados do Cliente</h3>
        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <span className="font-semibold">Cliente:</span> {quote.client || 'Nome do cliente'}
          </div>
          <div>
            <span className="font-semibold">Email:</span> cliente@exemplo.com
          </div>
          <div>
            <span className="font-semibold">Telefone:</span> (99) 99999-9999
          </div>
          <div>
            <span className="font-semibold">Endereço:</span> Rua do Cliente, nº 1000 - Ap 30
          </div>
        </div>
      </div>

      {!showTotalOnly ? (
        <>
          <div className="mt-10 overflow-x-auto print:overflow-visible">
            <table className="min-w-full border-separate border-spacing-y-1 text-left text-sm print:text-[13px] print:leading-5">
              <thead>
                <tr className="text-left text-sm text-slate-700">
                  <th className="px-3 py-3 text-left">Item</th>
                  <th className="px-3 py-3">Produto/Serviço</th>
                  <th className="px-3 py-3 text-right">Quant.</th>
                  <th className="px-3 py-3 text-right">Valor</th>
                  <th className="px-3 py-3 text-right">Sub-total</th>
                </tr>
              </thead>
              <tbody>
                {quote.items.map((item, index) => (
                  <tr key={item.id} className="rounded-none bg-slate-100 text-slate-700">
                    <td className="px-3 py-4 font-medium">{String(index + 1).padStart(2, '0')}</td>
                    <td className="px-3 py-4">{item.description}</td>
                    <td className="px-3 py-4 text-right">{item.quantity}</td>
                    <td className="px-3 py-4 text-right">{item.unitPrice.toFixed(2)} €</td>
                    <td className="px-3 py-4 text-right">{item.subtotal.toFixed(2)} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
            <div className="rounded-none bg-slate-100 p-5 text-sm text-slate-700">
              <h4 className="font-semibold uppercase tracking-[0.2em] text-slate-900">Observações</h4>
              <p className="mt-3 leading-6">{quote.observations || 'Nenhuma observação adicional.'}</p>
            </div>
            <div className="rounded-none bg-slate-100 p-5 text-sm text-slate-700">
              <div className="space-y-2">
                <div className="flex justify-between"><span>Sub-total geral:</span> <span>{subtotal.toFixed(2)} €</span></div>
                <div className="flex justify-between"><span>Desconto:</span> <span>-{discountAmount.toFixed(2)} €</span></div>
                <div className="flex justify-between"><span>IVA ({quote.vatRate}%)</span> <span>{vatAmount.toFixed(2)} €</span></div>
              </div>
              <div className="mt-4 border-t border-slate-300 pt-4 text-lg font-semibold text-slate-900 flex justify-between"><span>Total geral:</span> <span>{total.toFixed(2)} €</span></div>
            </div>
          </div>
        </>
      ) : (
        <div className="mt-10 rounded-none bg-slate-100 p-8 text-sm text-slate-700">
          <h4 className="font-semibold uppercase tracking-[0.2em] text-slate-900">Total do Orçamento</h4>
          <div className="mt-8 text-center text-5xl font-black text-slate-900">{total.toFixed(2)} €</div>
          <p className="mt-3 text-center text-sm text-slate-500">Apresentação simplificada sem detalhes de itens, desconto e IVA.</p>
        </div>
      )}
    </section>
  );
}
