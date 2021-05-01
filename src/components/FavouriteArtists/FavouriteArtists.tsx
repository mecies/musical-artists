import React from 'react';
import { Box, BoxProps, makeStyles, Typography } from '@material-ui/core';
import { Person } from '@material-ui/icons';
import { List, ListItem } from 'components/List';
import { useFavouriteArtists } from 'hooks/useFavouriteArtists';

type FavouriteArtistsProps = BoxProps;

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(4),
    color: theme.palette.text.secondary,
  },
  text: {
    color: theme.palette.text.secondary,
  },
  listItemIcon: {
    fill: theme.palette.background.paper,
  },
}));

const FavouriteArtists = (props: FavouriteArtistsProps) => {
  const classes = useStyles();
  const { favouriteArtists } = useFavouriteArtists();
  const hasFavouriteArtists = favouriteArtists.length > 0;

  return (
    <Box {...props}>
      <Typography className={classes.title} variant="h3">
        Favourites
      </Typography>
      {hasFavouriteArtists ? (
        <List>
          {favouriteArtists.map(({ mbid, name }) => (
            <ListItem key={mbid} to={`/artist/${mbid}`} text={name}>
              <Person className={classes.listItemIcon} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography className={classes.text}>Visit artist profile to add him to favourites list</Typography>
      )}
    </Box>
  );
};

export { FavouriteArtists };
