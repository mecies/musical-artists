import { useMediaQuery as useMediaQueryMui, useTheme } from '@material-ui/core';

const useMediaQuery = () => {
  const theme = useTheme();
  const isDesktop = useMediaQueryMui(theme.breakpoints.up('md'));
  const isMobile = !isDesktop;

  return { isMobile, isDesktop };
};

export { useMediaQuery };
