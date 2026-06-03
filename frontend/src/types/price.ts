export type PriceItem = {
  id: string;
  code: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  lastUpdated: string;
};

export type PriceCategory = {
  category: string;
  description: string;
  items: PriceItem[];
};

export type QuoteItem = {
  id: string;
  code: string;
  description: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
};

export type Quote = {
  id: string;
  quoteNumber?: string;
  client: string;
  status: 'Rascunho' | 'Enviado' | 'Aprovado' | 'Rejeitado';
  items: QuoteItem[];
  discount: number;
  vatRate: number;
  observations?: string;
  createdAt: string;
};
