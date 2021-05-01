import React from 'react';
import { Box, BoxProps, makeStyles, Typography } from '@material-ui/core';
import { Person } from '@material-ui/icons';
import { List, ListItem } from 'components/List';
import { Artist } from 'models';

type FavouriteArtistsProps = BoxProps & {
  artists?: Artist[];
};

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

const FavouriteArtists = ({ artists, ...props }: FavouriteArtistsProps) => {
  const classes = useStyles();
  const hasFavouriteArtists = artists && artists.length > 0;

  return (
    <Box {...props}>
      <Typography className={classes.title} variant="h3">
        Favourites
      </Typography>
      {hasFavouriteArtists ? (
        <List>
          {artists?.map(({ mbid, name }) => (
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
