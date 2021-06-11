import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Breadcrumbs, Drawer, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import { FavouriteArtists } from 'components/FavouriteArtists';
import { useFavouriteArtists } from 'hooks/useFavouriteArtists';
import { useMediaQuery } from 'hooks/useMediaQuery';
import Link from 'next/link';
import { RootState } from 'store';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: '100%',
    color: theme.palette.text.secondary,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  breadcrumbs: {
    flexGrow: 1,
  },
  link: {
    color: theme.palette.text.secondary,
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, 2),
    },
  },
  iconButton: {
    color: theme.palette.text.secondary,
  },
  drawerPaper: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
  },
  drawerContent: {
    minWidth: 200,
    maxWidth: 300,
  },
  infoText: {
    color: theme.palette.text.secondary,
    margin: theme.spacing(4),
    maxWidth: 200,
  },
  listItemIcon: {
    fill: theme.palette.background.paper,
  },
}));

const Header = () => {
  const classes = useStyles();
  const { isMobile } = useMediaQuery();
  const { favouriteArtists } = useFavouriteArtists();
  const hasFavouriteArtists = favouriteArtists.length > 0;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const artistMbid = useSelector<RootState, string>((state) => state.ui.artistMbid);
  const releaseMbid = useSelector<RootState, string>((state) => state.ui.releaseMbid);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <AppBar className={classes.wrapper} position="static">
      <Toolbar>
        <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumb">
          <Link href="/">
            <Typography variant="h6" className={classes.link}>
              Search
            </Typography>
          </Link>
          {artistMbid && (
            <Link href={`/artist/${artistMbid}`}>
              <Typography variant="h6" className={classes.link}>
                Artist
              </Typography>
            </Link>
          )}
          {releaseMbid && (
            <Typography variant="h6" className={classes.link} aria-current="page">
              Release
            </Typography>
          )}
        </Breadcrumbs>
        {isMobile && (
          <>
            <IconButton onClick={toggleDrawer} className={classes.iconButton}>
              {hasFavouriteArtists ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
            <Drawer classes={{ paper: classes.drawerPaper }} anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
              <FavouriteArtists className={classes.drawerContent} />
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export { Header };
