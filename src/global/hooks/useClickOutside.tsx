import { useEffect, useRef } from 'react';

const useClickOutside = (handler: () => void) => {
  const domNode = useRef<HTMLDivElement | HTMLButtonElement | any>(null);

  useEffect(() => {
    const handleClose = (event: any) => {
      if (!domNode.current?.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClose);

    return () => {
      document.removeEventListener('mousedown', handleClose);
    };
  });

  return domNode;
};

export default useClickOutside;
