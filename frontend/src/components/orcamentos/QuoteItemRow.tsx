import { QuoteItem } from '../../types/price';

type QuoteItemRowProps = {
  item: QuoteItem;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
};

export default function QuoteItemRow({ item, onQuantityChange, onRemove }: QuoteItemRowProps) {
  return (
    <tr className="border-b border-border hover:bg-white/5">
      <td className="px-3 py-3 text-white">{item.code}</td>
      <td className="px-3 py-3 text-gray-300">{item.description}</td>
      <td className="px-3 py-3 text-right text-white">{item.unitPrice.toFixed(2)} €</td>
      <td className="px-3 py-3 text-center text-gray-300">
        <input
          type="number"
          min={1}
          value={item.quantity}
          onChange={(event) => onQuantityChange(item.id, Number(event.target.value))}
          className="w-20 rounded-none border border-border bg-black px-2 py-1 text-white outline-none"
        />
      </td>
      <td className="px-3 py-3 text-right text-white">{item.subtotal.toFixed(2)} €</td>
      <td className="px-3 py-3 text-right">
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="rounded-none border border-border bg-black px-3 py-2 text-xs uppercase tracking-[0.18em] text-white transition hover:border-red-500 hover:text-red-500"
        >
          Remover
        </button>
      </td>
    </tr>
  );
}
