import { useState, useEffect } from 'react';

export function usePersistentIndex(defaultValue: number = 0) {
  const [index, setIndex] = useState<number>(defaultValue);

  // Safely restore index from sessionStorage after client-side hydration
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('active_feature_index');
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed)) {
          setIndex(parsed);
        }
      }
    } catch (error) {
      console.warn('sessionStorage is not accessible:', error);
    }
  }, []);

  const setPersistentIndex = (newIndex: number) => {
    setIndex(newIndex);
    try {
      sessionStorage.setItem('active_feature_index', newIndex.toString());
    } catch (error) {
      console.warn('Failed to update sessionStorage active index:', error);
    }
  };

  return [index, setPersistentIndex] as const;
}
