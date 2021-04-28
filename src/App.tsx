import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Grid, makeStyles } from '@material-ui/core';
import { FavouriteArtists } from 'components/FavouriteArtists/FavouriteArtists';
import { Header } from 'components/Header';
import { useMediaQuery } from 'hooks/useMediaQuery';
import { RootState } from 'store';
import { Artist as ArtistType } from 'typings';
import { Artist } from 'views/Artist';
import { Home } from 'views/Home';

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
  favourites: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const App: FC = () => {
  const classes = useStyles();
  const { isDesktop } = useMediaQuery();
  // use favorite artists
  const favouriteArtists = useSelector<RootState, ArtistType[] | undefined>((state) => state.artist.favouriteArtists);
  // TODO create layout component
  // TODO create favorites list component
  // layout should contain grid and sidebar with favourite artists
  return (
    <Grid container className={classes.root}>
      <Router>
        <Grid item xs={12} className={classes.headerWrapper}>
          <Header />
        </Grid>
        <Grid item xs={12} md={6} className={classes.container}>
          <Switch>
            <Route path="/artist/:mbid" exact>
              <Artist />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </Grid>
        <Grid item xs={12} md={6} className={classes.container}>
          {isDesktop && <FavouriteArtists artists={favouriteArtists} className={classes.favourites} />}
        </Grid>
      </Router>
    </Grid>
  );
};

export { App };
