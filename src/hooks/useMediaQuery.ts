import { useMediaQuery as useMediaQueryMui, useTheme } from '@material-ui/core';

export const useMediaQuery = () => {
  const theme = useTheme();
  const isDesktop = useMediaQueryMui(theme.breakpoints.up('md'));
  const isMobile = !isDesktop;

  return { isMobile, isDesktop };
};
