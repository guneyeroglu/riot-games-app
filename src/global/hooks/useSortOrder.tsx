import { useState } from 'react';

type orderType = 'a-z' | 'z-a' | 'newest';

const useSortOrder = (orderType: orderType, orderState: string) => {
  const [sortType, setSortType] = useState<orderType>(orderType);

  const handleSortOrder = (a: any, b: any) => {
    switch (sortType) {
      case 'a-z':
        return a[orderState].localeCompare(b[orderState]);
      case 'z-a':
        return b[orderState].localeCompare(a[orderState]);
      case 'newest':
        return b['release-date'].localeCompare(a['release-date']);
      default:
        return a - b;
    }
  };

  return {
    handleSortOrder: (a: any, b: any) => handleSortOrder(a, b),
    setSortType: (value: orderType) => setSortType(value),
    sortType: sortType,
  };
};

export default useSortOrder;
