import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Link, makeStyles, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: '100%',
    color: theme.palette.text.secondary,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: theme.palette.text.secondary,
    margin: theme.spacing(0, 2),
  },
}));

const Header: FC = () => {
  const classes = useStyles();
  // TODO make hamburger as favourites artists side panel?
  // TODO create breadcrumbs
  return (
    <AppBar className={classes.wrapper} position="static">
      <Toolbar>
        <Typography variant="h5" className={classes.title}>
          Fav artists
        </Typography>
        <Link component={RouterLink} to="/" variant="body1" className={classes.link}>
          Home
        </Link>
        <Link component={RouterLink} to="/else" variant="body1" className={classes.link}>
          Else
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export { Header };
