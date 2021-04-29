import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles, Typography } from '@material-ui/core';
import { Loader } from 'components/Loader';
import { ReleaseCard } from 'components/ReleaseCard';
import { useBreadcrumbs } from 'hooks/useBreadcrumbs';
import { useRelease } from 'hooks/useRelease';

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
  const { releaseMbid } = useParams<{ releaseMbid: string }>();
  const { data: release, loading, error } = useRelease(releaseMbid);

  useEffect(() => {
    setReleasePage(releaseMbid);
  }, [releaseMbid, setReleasePage]);

  return (
    <>
      {loading && <Loader className={classes.loader} />}
      {error && <Typography className={classes.errorMessage}>{error.message}</Typography>}
      {release && <ReleaseCard release={release} className={classes.artistWrapper} />}
    </>
  );
};
