import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Divider, Grid, makeStyles } from '@material-ui/core';
import { FavouriteArtists } from 'components/FavouriteArtists/FavouriteArtists';
import { Header } from 'components/Header';
import { useFavouriteArtists } from 'hooks/useFavouriteArtists';
import { useMediaQuery } from 'hooks/useMediaQuery';
import { Artist } from 'views/Artist';
import { Home } from 'views/Home';
import { Release } from 'views/Release';

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
  },
}));

const App: FC = () => {
  const classes = useStyles();
  const { isDesktop } = useMediaQuery();
  const { favouriteArtists } = useFavouriteArtists();

  return (
    <Grid container className={classes.root}>
      <Router>
        <Grid item xs={12} className={classes.headerWrapper}>
          <Header />
        </Grid>
        <Grid item xs={12} md={5} className={classes.container}>
          <Switch>
            <Route path="/artist/:mbid/:releaseMbid">
              <Release />
            </Route>
            <Route path="/artist/:mbid">
              <Artist />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </Grid>
        {isDesktop && (
          <Grid item md={2} className={classes.dividerWrapper}>
            <Divider className={classes.divider} orientation="vertical" variant="middle" light />
          </Grid>
        )}
        <Grid item xs={12} md={5} className={classes.container}>
          {isDesktop && <FavouriteArtists artists={favouriteArtists} className={classes.favourites} />}
        </Grid>
      </Router>
    </Grid>
  );
};

export { App };
