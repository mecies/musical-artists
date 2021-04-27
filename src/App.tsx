import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { Header } from 'components/Header';
import { Artist } from 'views/Artist';
import { Home } from 'views/Home';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(100vh - 60px)',
    width: '100vw',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    marginTop: theme.spacing(4),
    flexGrow: 1,
  },
  headerWrapper: {
    height: '60px',
  },
}));

const App: FC = () => {
  const classes = useStyles();
  // TODO create layout component
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
        <Grid item xs={12} md={6}>
          <Typography variant="h1" color="primary">
            sidebar here desktop only
          </Typography>
        </Grid>
      </Router>
    </Grid>
  );
};

export { App };
