import { useEffect } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { Loader } from 'components/Loader';
import { ReleaseCard } from 'components/ReleaseCard';
import { useRelease } from 'hooks/queries/useRelease';
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

const Release = () => {
  const classes = useStyles();
  const { setReleasePage } = useBreadcrumbs();
  const { query } = useRouter();
  const mbid = query.mbid as string;
  const releaseMbid = query.releaseMbid as string;
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

export default Release;
