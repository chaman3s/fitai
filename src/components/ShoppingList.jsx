'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';

const DEFAULT_ITEMS = [
  { id: '1', name: 'Oats', quantity: '500g', category: 'Grains', checked: false },
  { id: '2', name: 'Eggs', quantity: '12 pcs', category: 'Protein', checked: false },
  { id: '3', name: 'Milk', quantity: '1 L', category: 'Dairy', checked: false },
  { id: '4', name: 'Chicken Breast', quantity: '500g', category: 'Protein', checked: false },
  { id: '5', name: 'Broccoli', quantity: '2 pcs', category: 'Vegetables', checked: false },
];

export default function ShoppingList({ items: initialItems = DEFAULT_ITEMS }) {
  const [items, setItems] = useState(initialItems);
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleItem = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const categories = Array.from(new Set(items.map((item) => item.category)));
  const checkedCount = items.filter((item) => item.checked).length;

  return (
    <div className="bg-card rounded-xl shadow-warm-md overflow-hidden">
      <div
        className="p-4 bg-gradient-to-r from-primary to-secondary cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Icon name="ShoppingCartIcon" variant="solid" size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Shopping List</h2>
              <p className="text-sm text-white/90">
                {checkedCount} of {items.length} items collected
              </p>
            </div>
          </div>

          <Icon
            name={isExpanded ? 'ChevronUpIcon' : 'ChevronDownIcon'}
            variant="solid"
            size={24}
            className="text-white"
          />
        </div>
      </div>

      <div
        className={`transition-smooth overflow-hidden ${
          isExpanded ? 'max-h-[1000px]' : 'max-h-0'
        }`}
      >
        <div className="p-4">
          {categories.map((category) => (
            <div key={category} className="mb-6 last:mb-0">
              <h3 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                <Icon name="TagIcon" variant="solid" size={16} />
                {category}
              </h3>

              <div className="space-y-2">
                {items
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth cursor-pointer"
                    >
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          item.checked
                            ? 'bg-success border-success'
                            : 'border-muted-foreground'
                        }`}
                      >
                        {item.checked && (
                          <Icon
                            name="CheckIcon"
                            variant="solid"
                            size={14}
                            className="text-white"
                          />
                        )}
                      </div>

                      <div className="flex-1">
                        <p
                          className={`text-sm font-medium ${
                            item.checked
                              ? 'line-through text-muted-foreground'
                              : 'text-foreground'
                          }`}
                        >
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
