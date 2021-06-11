import { useEffect } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { ArtistCard } from 'components/ArtistCard';
import { Loader } from 'components/Loader';
import { useArtist } from 'hooks/queries/useArtist';
import { useBreadcrumbs } from 'hooks/useBreadcrumbs';
import { useRouter } from 'next/router';

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

const Artist = () => {
  const classes = useStyles();
  const { query } = useRouter();
  const mbid = query.mbid as string;
  const { setArtistPage } = useBreadcrumbs();
  const { data: artist, loading, error } = useArtist(mbid);

  useEffect(() => {
    setArtistPage(mbid);
  }, [mbid, setArtistPage]);

  return (
    <>
      {loading && <Loader className={classes.loader} />}
      {error && <Typography className={classes.errorMessage}>{error.message}</Typography>}
      {artist && <ArtistCard artist={artist} className={classes.artistWrapper} />}
    </>
  );
};

export default Artist;
