import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

import { LangSwitcher } from '@/shared/ui';
import { AuthContainer } from '@/widgets/layouts/AuthContainer';
import styles from '@/widgets/layouts/main/ui/Header/Header.module.css';

type HeaderType = {
  logout: () => void;
};

export const Header: FC<HeaderType> = () => {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      scrollTop > 0 ? setScrolled(true) : setScrolled(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const className = !scrolled ? styles.sticky : styles.sticky + ' ' + styles.scroll;

  return (
    <Box component="header" className={className}>
      <div className={styles.wrapper}>
        {pathname === '/' && <LangSwitcher />}
        <AuthContainer />
      </div>
    </Box>
  );
};
