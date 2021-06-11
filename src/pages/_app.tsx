import { useEffect } from 'react';
import { Divider, Grid, makeStyles } from '@material-ui/core';
import { FavouriteArtists } from 'components/FavouriteArtists/FavouriteArtists';
import { Header } from 'components/Header';
import { useMediaQuery } from 'hooks/useMediaQuery';
import type { AppProps } from 'next/app';
import { RootProvider } from 'providers';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
  },
  headerWrapper: {
    height: 60,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: theme.spacing(4),
    flexGrow: 1,
  },
  dividerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 40,
  },
  divider: {
    background: theme.palette.background.paper,
    height: 'calc(100vh - 140px)',
  },
  favourites: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 300,
  },
}));

function MyApp({ Component, pageProps }: AppProps) {
  const classes = useStyles();
  const { isDesktop } = useMediaQuery();

  useEffect(() => {
    // Remove the server-side injected CSS.
    if (document) {
      const jssStyles = document.querySelector('#jss-server-side');
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <RootProvider>
      <Grid container className={classes.root}>
        <Grid item xs={12} className={classes.headerWrapper}>
          <Header />
        </Grid>
        <Grid item xs={12} md={5} className={classes.container}>
          <Component {...pageProps} />
        </Grid>
        {isDesktop && (
          <>
            <Grid item md={2} className={classes.dividerWrapper}>
              <Divider className={classes.divider} orientation="vertical" variant="middle" light />
            </Grid>
            <Grid item md={5} className={classes.container}>
              <FavouriteArtists className={classes.favourites} />
            </Grid>
          </>
        )}
      </Grid>
    </RootProvider>
  );
}

export default MyApp;
