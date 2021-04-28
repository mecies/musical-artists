import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles, Typography } from '@material-ui/core';
import { ArtistCard } from 'components/ArtistCard';
import { Loader } from 'components/Loader';
import { useArtist } from 'hooks/useArtist';

const useStyles = makeStyles((theme) => ({
  artistWrapper: {
    width: '80%',
  },
  errorMessage: {
    color: theme.palette.text.secondary,
  },
  loader: {
    marginTop: 40,
  },
}));

export const Artist = () => {
  const classes = useStyles();
  const { mbid } = useParams<{ mbid: string }>();
  const { data: artist, loading, error } = useArtist(mbid);
  return (
    <>
      {loading && <Loader className={classes.loader} />}
      {error && <Typography className={classes.errorMessage}>{error.message}</Typography>}
      {artist && <ArtistCard artist={artist} className={classes.artistWrapper} />}
    </>
  );
};
