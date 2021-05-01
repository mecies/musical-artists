import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles, Typography } from '@material-ui/core';
import { Loader } from 'components/Loader';
import { ReleaseCard } from 'components/ReleaseCard';
import { useRelease } from 'hooks/queries/useRelease';
import { useBreadcrumbs } from 'hooks/useBreadcrumbs';

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

export const Release = () => {
  const classes = useStyles();
  const { setReleasePage } = useBreadcrumbs();
  const { mbid, releaseMbid } = useParams<{ mbid: string; releaseMbid: string }>();
  const { data: release, loading, error } = useRelease(releaseMbid);

  useEffect(() => {
    setReleasePage(mbid, releaseMbid);
  }, [mbid, releaseMbid, setReleasePage]);

  return (
    <>
      {loading && <Loader className={classes.loader} />}
      {error && <Typography className={classes.errorMessage}>{error.message}</Typography>}
      {release && <ReleaseCard release={release} className={classes.artistWrapper} />}
    </>
  );
};
