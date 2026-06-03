import { useMemo, useState } from 'react';
import Sidebar from '../components/layouts/Sidebar';
import Header from '../components/layouts/Header';
import PriceCategoryTable from '../components/prices/PriceCategoryTable';
import { priceCatalog } from '../data/priceCatalog';
import { PriceCategory, PriceItem } from '../types/price';

type NewMaterial = {
  code: string;
  description: string;
  price: string;
  unit: string;
  lastUpdated: string;
};

const initialNewMaterial: NewMaterial = {
  code: '',
  description: '',
  price: '',
  unit: '',
  lastUpdated: new Date().toLocaleDateString('pt-PT'),
};

export default function TabelaPrecos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [catalog, setCatalog] = useState<PriceCategory[]>(priceCatalog);
  const [activeAction, setActiveAction] = useState<'none' | 'edit' | 'delete' | 'add'>('none');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [newMaterial, setNewMaterial] = useState<NewMaterial>(initialNewMaterial);

  const filteredCatalog = useMemo(
    () =>
      catalog.map((category) => ({
        ...category,
        items: category.items.filter((item) =>
          [item.code, item.description, item.category]
            .join(' ')
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
        ),
      })),
    [catalog, searchTerm],
  );

  const resetActions = () => {
    setActiveAction('none');
    setActiveCategory(null);
    setEditingItemId(null);
    setNewMaterial(initialNewMaterial);
  };

  const handleEditCategory = (categoryName: string) => {
    setActiveAction('edit');
    setActiveCategory(categoryName);
    setEditingItemId(null);
  };

  const handleDeleteCategory = (categoryName: string) => {
    setActiveAction('delete');
    setActiveCategory(categoryName);
    setEditingItemId(null);
  };

  const handleAddMaterial = (categoryName: string) => {
    setActiveAction('add');
    setActiveCategory(categoryName);
    setEditingItemId(null);
    setNewMaterial({ ...initialNewMaterial });
  };

  const handleEditItemClick = (categoryName: string, itemId: string) => {
    if (activeAction === 'edit' && activeCategory === categoryName) {
      setEditingItemId(itemId);
    }
  };

  const handleItemChange = (categoryName: string, itemId: string, field: keyof PriceItem, value: string) => {
    setCatalog((current) =>
      current.map((category) =>
        category.category === categoryName
          ? {
              ...category,
              items: category.items.map((item) =>
                item.id === itemId
                  ? {
                      ...item,
                      [field]: field === 'price' ? Number(value) : value,
                    }
                  : item,
              ),
            }
          : category,
      ),
    );
  };

  const handleSaveItem = () => {
    setEditingItemId(null);
  };

  const handleRemoveItem = (categoryName: string, itemId: string) => {
    setCatalog((current) =>
      current.map((category) =>
        category.category === categoryName
          ? {
              ...category,
              items: category.items.filter((item) => item.id !== itemId),
            }
          : category,
      ),
    );
  };

  const handleNewMaterialChange = (field: keyof NewMaterial, value: string) => {
    setNewMaterial((current) => ({ ...current, [field]: value }));
  };

  const handleAddNewItem = () => {
    if (!activeCategory) return;
    if (!newMaterial.code || !newMaterial.description || !newMaterial.price || !newMaterial.unit) {
      window.alert('Preencha todos os campos obrigatórios antes de adicionar o material.');
      return;
    }

    const newItem: PriceItem = {
      id: `${activeCategory.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      code: newMaterial.code,
      description: newMaterial.description,
      price: Number(newMaterial.price),
      unit: newMaterial.unit,
      category: activeCategory,
      lastUpdated: newMaterial.lastUpdated || new Date().toLocaleDateString('pt-PT'),
    };

    setCatalog((current) =>
      current.map((category) =>
        category.category === activeCategory
          ? { ...category, items: [...category.items, newItem] }
          : category,
      ),
    );

    resetActions();
  };

  return (
    <div className="min-h-screen bg-background text-text">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 pt-24">
          <Header />
          <section className="mt-6 space-y-6">
            <div className="rounded-none border border-border bg-surface p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-white">Tabela de Preços</h2>
                  <p className="mt-2 text-sm text-gray-400">
                    Lista organizada por categorias com preços atualizados e informações técnicas.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetActions}
                  className="rounded-none border border-border bg-black px-4 py-3 text-sm uppercase tracking-[0.18em] text-white transition hover:border-red-500 hover:text-red-500"
                >
                  Limpar ações
                </button>
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Pesquisar produto, código ou categoria"
                  className="w-full rounded-none border border-border bg-black px-4 py-3 text-white outline-none"
                />
              </div>
            </div>

            <div className="space-y-6">
              {filteredCatalog.map((category) =>
                category.items.length > 0 ? (
                  <PriceCategoryTable
                    key={category.category}
                    category={category}
                    activeAction={activeCategory === category.category ? activeAction : 'none'}
                    onEditCategory={handleEditCategory}
                    onDeleteCategory={handleDeleteCategory}
                    onAddMaterial={handleAddMaterial}
                    onItemClick={handleEditItemClick}
                    editingItemId={editingItemId}
                    onItemChange={handleItemChange}
                    onSaveItem={handleSaveItem}
                    onCancelEdit={() => setEditingItemId(null)}
                    onRemoveItem={handleRemoveItem}
                    onAddNewItem={handleAddNewItem}
                    newMaterial={newMaterial}
                    onNewMaterialChange={handleNewMaterialChange}
                  />
                ) : null,
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
