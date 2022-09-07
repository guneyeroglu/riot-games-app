import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

interface IProps {
  children: React.ReactNode;
}

const ScrollToTop = (props: IProps) => {
  const { children } = props;

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
};

export default ScrollToTop;
