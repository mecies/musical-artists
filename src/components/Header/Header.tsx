import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Breadcrumbs, Drawer, IconButton, Link, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { Favorite, FavoriteBorder, Person } from '@material-ui/icons';
import { List, ListItem } from 'components/List';
import { useFavouriteArtists } from 'hooks/useFavouriteArtists';
import { useMediaQuery } from 'hooks/useMediaQuery';
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
  drawer: {
    minWidth: 200,
    backgroundColor: theme.palette.background.default,
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

const Header: FC = () => {
  const classes = useStyles();
  const { isMobile } = useMediaQuery();
  const { favouriteArtists } = useFavouriteArtists();
  const hasFavouriteArtists = favouriteArtists && favouriteArtists.length > 0;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const artistMbid = useSelector<RootState, string>((state) => state.ui.artistMbid);
  const releaseMbid = useSelector<RootState, string>((state) => state.ui.releaseMbid);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <AppBar className={classes.wrapper} position="static">
      <Toolbar>
        <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumb">
          <Link component={RouterLink} to="/" variant="h6" className={classes.link}>
            Search
          </Link>
          {artistMbid && (
            <Link component={RouterLink} to={`/artist/${artistMbid}`} variant="h6" className={classes.link}>
              Artist
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
            <Drawer classes={{ paper: classes.drawer }} anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
              {hasFavouriteArtists ? (
                <List>
                  {favouriteArtists?.map(({ mbid, name }) => (
                    <ListItem key={mbid} to={`/artist/${mbid}`} text={name}>
                      <Person className={classes.listItemIcon} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="h5" className={classes.infoText}>
                  Visit artist profile to add him to favourites list
                </Typography>
              )}
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export { Header };
