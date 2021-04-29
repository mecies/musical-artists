import React, { FC } from 'react';
import { Box, BoxProps, makeStyles, Typography } from '@material-ui/core';
import { ArtistsList } from 'components/ArtistsList';
import { Artist } from 'typings';

type Props = BoxProps & {
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
}));

const FavouriteArtists: FC<Props> = ({ artists, ...props }) => {
  const classes = useStyles();

  return (
    <Box {...props}>
      <Typography className={classes.title} variant="h2">
        Favourites
      </Typography>
      {artists && artists.length > 0 ? (
        <ArtistsList artists={artists} />
      ) : (
        <Typography className={classes.text}>Visit artist profile to add him to favourites list</Typography>
      )}
    </Box>
  );
};

export { FavouriteArtists };
