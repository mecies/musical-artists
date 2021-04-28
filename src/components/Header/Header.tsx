import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Link, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { useMediaQuery } from 'hooks/useMediaQuery';

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
  const { isMobile } = useMediaQuery();
  // TODO make hamburger as favourites artists side panel?
  // TODO create breadcrumbs
  return (
    <AppBar className={classes.wrapper} position="static">
      <Toolbar>
        <Typography className={classes.title}>
          <Link component={RouterLink} to="/" variant="h5" className={classes.link}>
            Fav artists
          </Link>
        </Typography>
        {isMobile && (
          <Link component={RouterLink} to="/" variant="body1" className={classes.link}>
            Favourites
            {/* TODO add favourites here */}
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export { Header };
