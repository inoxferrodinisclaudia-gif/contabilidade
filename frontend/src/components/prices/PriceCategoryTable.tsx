import { PriceCategory, PriceItem } from '../../types/price';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

type NewMaterial = {
  code: string;
  description: string;
  price: string;
  unit: string;
  lastUpdated: string;
};

type PriceCategoryTableProps = {
  category: PriceCategory;
  activeAction: 'none' | 'edit' | 'delete' | 'add';
  onEditCategory: (categoryName: string) => void;
  onDeleteCategory: (categoryName: string) => void;
  onAddMaterial: (categoryName: string) => void;
  onItemClick: (categoryName: string, itemId: string) => void;
  editingItemId: string | null;
  onItemChange: (categoryName: string, itemId: string, field: keyof PriceItem, value: string) => void;
  onSaveItem: () => void;
  onCancelEdit: () => void;
  onRemoveItem: (categoryName: string, itemId: string) => void;
  onAddNewItem: () => void;
  newMaterial: NewMaterial;
  onNewMaterialChange: (field: keyof NewMaterial, value: string) => void;
};

export default function PriceCategoryTable({
  category,
  activeAction,
  onEditCategory,
  onDeleteCategory,
  onAddMaterial,
  onItemClick,
  editingItemId,
  onItemChange,
  onSaveItem,
  onCancelEdit,
  onRemoveItem,
  onAddNewItem,
  newMaterial,
  onNewMaterialChange,
}: PriceCategoryTableProps) {
  const isEditMode = activeAction === 'edit';
  const isDeleteMode = activeAction === 'delete';
  const isAddMode = activeAction === 'add';

  return (
    <section className="rounded-none border border-border bg-surface p-5">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">{category.category}</h3>
          <p className="text-sm text-gray-400">{category.description}</p>
          {isEditMode && <p className="mt-2 text-xs uppercase tracking-[0.2em] text-red-500">Clique num material para editar</p>}
          {isDeleteMode && <p className="mt-2 text-xs uppercase tracking-[0.2em] text-red-500">Clique em eliminar no material que pretende remover</p>}
          {isAddMode && <p className="mt-2 text-xs uppercase tracking-[0.2em] text-red-500">Preencha os campos para adicionar um novo material.</p>}
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onEditCategory(category.category)}
            className="rounded-none border border-border bg-black px-3 py-2 text-xs uppercase tracking-[0.18em] text-white transition hover:border-red-500 hover:text-red-500"
          >
            <Edit2 className="h-4 w-4" /> Editar materiais
          </button>
          <button
            type="button"
            onClick={() => onDeleteCategory(category.category)}
            className="rounded-none border border-border bg-black px-3 py-2 text-xs uppercase tracking-[0.18em] text-white transition hover:border-red-500 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" /> Eliminar secção
          </button>
          <button
            type="button"
            onClick={() => onAddMaterial(category.category)}
            className="rounded-none border border-red-500 bg-red-500 px-3 py-2 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-red-600"
          >
            <Plus className="h-4 w-4" /> Adicionar novo
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border text-gray-400">
              <th className="px-3 py-2">Código</th>
              <th className="px-3 py-2">Descrição</th>
              <th className="px-3 py-2">Preço</th>
              <th className="px-3 py-2">Unidade</th>
              <th className="px-3 py-2">Última atualização</th>
              <th className="px-3 py-2">Ação</th>
            </tr>
          </thead>
          <tbody>
            {category.items.map((item) => {
              const isEditing = editingItemId === item.id && isEditMode;
              return (
                <tr
                  key={item.id}
                  className={`border-b border-border hover:bg-white/5 ${isEditMode ? 'cursor-pointer' : ''}`}
                  onClick={() => isEditMode && onItemClick(category.category, item.id)}
                >
                  <td className="px-3 py-3 text-white">
                    {isEditing ? (
                      <input
                        value={item.code}
                        onChange={(event) => onItemChange(category.category, item.id, 'code', event.target.value)}
                        className="w-full rounded-none border border-border bg-black px-2 py-2 text-white outline-none"
                      />
                    ) : (
                      item.code
                    )}
                  </td>
                  <td className="px-3 py-3 text-gray-300">
                    {isEditing ? (
                      <input
                        value={item.description}
                        onChange={(event) => onItemChange(category.category, item.id, 'description', event.target.value)}
                        className="w-full rounded-none border border-border bg-black px-2 py-2 text-white outline-none"
                      />
                    ) : (
                      item.description
                    )}
                  </td>
                  <td className="px-3 py-3 text-white">
                    {isEditing ? (
                      <input
                        type="number"
                        step="0.01"
                        value={item.price}
                        onChange={(event) => onItemChange(category.category, item.id, 'price', event.target.value)}
                        className="w-full rounded-none border border-border bg-black px-2 py-2 text-white outline-none"
                      />
                    ) : (
                      `${item.price.toFixed(2)} €`
                    )}
                  </td>
                  <td className="px-3 py-3 text-gray-300">
                    {isEditing ? (
                      <input
                        value={item.unit}
                        onChange={(event) => onItemChange(category.category, item.id, 'unit', event.target.value)}
                        className="w-full rounded-none border border-border bg-black px-2 py-2 text-white outline-none"
                      />
                    ) : (
                      item.unit
                    )}
                  </td>
                  <td className="px-3 py-3 text-gray-400">
                    {isEditing ? (
                      <input
                        value={item.lastUpdated}
                        onChange={(event) => onItemChange(category.category, item.id, 'lastUpdated', event.target.value)}
                        className="w-full rounded-none border border-border bg-black px-2 py-2 text-white outline-none"
                      />
                    ) : (
                      item.lastUpdated
                    )}
                  </td>
                  <td className="px-3 py-3">
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            onSaveItem();
                          }}
                          className="inline-flex items-center gap-2 rounded-none border border-red-500 bg-red-500 px-3 py-2 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-red-600"
                        >
                          <Save className="h-4 w-4" /> Salvar
                        </button>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            onCancelEdit();
                          }}
                          className="inline-flex items-center gap-2 rounded-none border border-border bg-black px-3 py-2 text-xs uppercase tracking-[0.18em] text-white transition hover:border-red-500 hover:text-red-500"
                        >
                          <X className="h-4 w-4" /> Cancelar
                        </button>
                      </div>
                    ) : isDeleteMode ? (
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onRemoveItem(category.category, item.id);
                        }}
                        className="inline-flex items-center gap-2 rounded-none border border-border bg-black px-3 py-2 text-xs uppercase tracking-[0.18em] text-white transition hover:border-red-500 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" /> Eliminar
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400">Nenhuma ação</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isAddMode && (
        <div className="mt-6 rounded-none border border-border bg-black p-4">
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">Adicionar material a {category.category}</h4>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <input
              placeholder="Código"
              value={newMaterial.code}
              onChange={(event) => onNewMaterialChange('code', event.target.value)}
              className="w-full rounded-none border border-border bg-surface px-3 py-3 text-white outline-none"
            />
            <input
              placeholder="Descrição"
              value={newMaterial.description}
              onChange={(event) => onNewMaterialChange('description', event.target.value)}
              className="w-full rounded-none border border-border bg-surface px-3 py-3 text-white outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="Preço"
              value={newMaterial.price}
              onChange={(event) => onNewMaterialChange('price', event.target.value)}
              className="w-full rounded-none border border-border bg-surface px-3 py-3 text-white outline-none"
            />
            <input
              placeholder="Unidade"
              value={newMaterial.unit}
              onChange={(event) => onNewMaterialChange('unit', event.target.value)}
              className="w-full rounded-none border border-border bg-surface px-3 py-3 text-white outline-none"
            />
            <input
              placeholder="Última atualização"
              value={newMaterial.lastUpdated}
              onChange={(event) => onNewMaterialChange('lastUpdated', event.target.value)}
              className="w-full rounded-none border border-border bg-surface px-3 py-3 text-white outline-none"
            />
          </div>
          <button
            type="button"
            onClick={onAddNewItem}
            className="mt-4 rounded-none border border-red-500 bg-red-500 px-4 py-3 text-sm uppercase tracking-[0.18em] text-white transition hover:bg-red-600"
          >
            Adicionar Material
          </button>
        </div>
      )}
    </section>
  );
}
