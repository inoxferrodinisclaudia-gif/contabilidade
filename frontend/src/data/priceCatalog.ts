import { PriceCategory } from '../types/price';

export const priceCatalog: PriceCategory[] = [
  {
    category: 'Tubos Quadrados',
    description: 'Perfis quadrados em aço para estrutura e construção.',
    items: [
      { id: 'sq-30', code: '30x30', description: 'Tubo quadrado 30x30', price: 13.5, unit: 'm', category: 'Tubos Quadrados', lastUpdated: '24-10-2025' },
      { id: 'sq-40', code: '40x40', description: 'Tubo quadrado 40x40', price: 23.0, unit: 'm', category: 'Tubos Quadrados', lastUpdated: '17-04-2025' },
      { id: 'sq-50', code: '50x50', description: 'Tubo quadrado 50x50', price: 29.0, unit: 'm', category: 'Tubos Quadrados', lastUpdated: '15-02-2025' },
      { id: 'sq-60', code: '60x60', description: 'Tubo quadrado 60x60', price: 37.0, unit: 'm', category: 'Tubos Quadrados', lastUpdated: '20-05-2025' },
      { id: 'sq-80', code: '80x80', description: 'Tubo quadrado 80x80', price: 74.0, unit: 'm', category: 'Tubos Quadrados', lastUpdated: '14-08-2025' },
    ],
  },
  {
    category: 'Tubos Redondos',
    description: 'Tubos redondos para estruturas e canalizações.',
    items: [
      { id: 'rd-16', code: '16', description: 'Tubo redondo 16 mm', price: 16.45, unit: 'm', category: 'Tubos Redondos', lastUpdated: '23-01-2024' },
      { id: 'rd-25', code: '25', description: 'Tubo redondo 25 mm', price: 21.0, unit: 'm', category: 'Tubos Redondos', lastUpdated: '22-02-2024' },
      { id: 'rd-32', code: '32', description: 'Tubo redondo 32 mm', price: 24.0, unit: 'm', category: 'Tubos Redondos', lastUpdated: '12-03-2024' },
      { id: 'rd-40', code: '40', description: 'Tubo redondo 40 mm', price: 34.5, unit: 'm', category: 'Tubos Redondos', lastUpdated: '18-04-2024' },
    ],
  },
  {
    category: 'Cantoneira',
    description: 'Perfis em ângulo para suporte e reforço estrutural.',
    items: [
      { id: 'ct-25', code: '25x25x3', description: 'Cantoneira 25x25x3', price: 20.0, unit: 'm', category: 'Cantoneira', lastUpdated: '10-06-2025' },
      { id: 'ct-30', code: '30x30x3', description: 'Cantoneira 30x30x3', price: 23.0, unit: 'm', category: 'Cantoneira', lastUpdated: '18-05-2025' },
      { id: 'ct-40', code: '40x40x4', description: 'Cantoneira 40x40x4', price: 31.0, unit: 'm', category: 'Cantoneira', lastUpdated: '23-06-2025' },
    ],
  },
  {
    category: 'Barras',
    description: 'Barras em aço de diferentes perfis para construção pesada.',
    items: [
      { id: 'br-12', code: '12x12', description: 'Barra quadrada 12x12', price: 10.0, unit: 'm', category: 'Barras', lastUpdated: '21-07-2025' },
      { id: 'br-20', code: '20x20', description: 'Barra quadrada 20x20', price: 12.0, unit: 'm', category: 'Barras', lastUpdated: '25-08-2025' },
      { id: 'br-30', code: '30x30', description: 'Barra quadrada 30x30', price: 18.0, unit: 'm', category: 'Barras', lastUpdated: '14-09-2025' },
    ],
  },
  {
    category: 'Chapas',
    description: 'Chapas metálicas de vários espessores para corte e fabrico.',
    items: [
      { id: 'ch-15', code: '2000x1000x1.5', description: 'Chapa 2000x1000x1.5', price: 35.0, unit: 'folha', category: 'Chapas', lastUpdated: '21-05-2025' },
      { id: 'ch-20', code: '2000x1000x2.0', description: 'Chapa 2000x1000x2.0', price: 48.0, unit: 'folha', category: 'Chapas', lastUpdated: '19-05-2025' },
      { id: 'ch-30', code: '2000x1000x3.0', description: 'Chapa 2000x1000x3.0', price: 67.0, unit: 'folha', category: 'Chapas', lastUpdated: '18-05-2025' },
    ],
  },
  {
    category: 'PVC',
    description: 'Tubos e acessórios em PVC para canalizações e drenagem.',
    items: [
      { id: 'pv-110', code: 'PVC110', description: 'Tubo PVC 110', price: 14.8, unit: 'm', category: 'PVC', lastUpdated: '16-07-2025' },
      { id: 'pv-curva', code: 'Curva90', description: 'Curva 90° PVC', price: 2.8, unit: 'un', category: 'PVC', lastUpdated: '04-06-2025' },
    ],
  },
  {
    category: 'MDF',
    description: 'Painéis MDF para mobiliário e acabamentos industriais.',
    items: [
      { id: 'mdf-15', code: '15mm', description: 'MDF 15mm 305x122', price: 50.0, unit: 'placa', category: 'MDF', lastUpdated: '19-05-2025' },
      { id: 'mdf-18', code: '18mm', description: 'MDF 18mm 305x122', price: 60.0, unit: 'placa', category: 'MDF', lastUpdated: '19-05-2025' },
    ],
  },
  {
    category: 'Motor',
    description: 'Motores e equipamentos elétricos para portões e automatismos.',
    items: [
      { id: 'mt-1500', code: 'MOTOR-1500', description: 'Motor portão 1500', price: 250.0, unit: 'un', category: 'Motor', lastUpdated: '04-06-2025' },
      { id: 'mt-500', code: 'MOTOR-500', description: 'Motor roquete boxer 500', price: 460.0, unit: 'un', category: 'Motor', lastUpdated: '04-06-2025' },
    ],
  },
  {
    category: 'Mão de Obra',
    description: 'Taxas de mão de obra profissional e deslocação.',
    items: [
      { id: 'mo-24', code: 'MO-24,60', description: 'Mão de obra profissional 24,60€', price: 24.6, unit: 'h', category: 'Mão de Obra', lastUpdated: '03-06-2026' },
      { id: 'mo-49', code: 'MO-49,20', description: 'Mão de obra profissional 49,20€', price: 49.2, unit: 'h', category: 'Mão de Obra', lastUpdated: '03-06-2026' },
      { id: 'mo-ds', code: 'DESLOCACAO-30', description: 'Deslocação', price: 30.0, unit: 'un', category: 'Mão de Obra', lastUpdated: '03-06-2026' },
    ],
  },
];
