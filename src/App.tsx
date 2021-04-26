import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Grid, makeStyles } from '@material-ui/core';
import { Header } from 'components/Header';
import { Else } from 'views/Else';
import { Home } from 'views/Home';

const useStyles = makeStyles(() => ({
  root: {
    height: 'calc(100vh - 60px)',
    width: '100vw',
  },
  container: {
    flexGrow: 1,
    height: '100%',
  },
  headerWrapper: {
    height: '60px',
  },
}));

const App: FC = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Router>
        <Grid xs={12} className={classes.headerWrapper}>
          <Header />
        </Grid>
        <Grid xs={12} className={classes.container}>
          <Switch>
            <Route path="/about" exact>
              <Else />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </Grid>
      </Router>
    </Grid>
  );
};

export { App };
