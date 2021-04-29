import React, { FC, useEffect } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { ArtistsList } from 'components/ArtistsList/';
import { Loader } from 'components/Loader';
import { SearchInput } from 'components/SearchInput/';
import { useArtists } from 'hooks/useArtists';
import { useBreadcrumbs } from 'hooks/useBreadcrumbs';
import { useSearchQuery } from 'hooks/useSearchQuery';

const useStyles = makeStyles((theme) => ({
  homeWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    marginBottom: theme.spacing(4),
    color: theme.palette.text.secondary,
  },
  listItem: {
    color: theme.palette.text.secondary,
  },
  listItemIcon: {
    fill: theme.palette.background.paper,
  },
  errorMessage: {
    color: theme.palette.text.secondary,
  },
  loader: {
    marginTop: 40,
  },
}));

export const Home: FC = () => {
  const classes = useStyles();
  const { setHomePage } = useBreadcrumbs();
  const { searchQuery, debouncedSearchQuery, setSearchQuery } = useSearchQuery();
  const { data: artists, loading, error } = useArtists(debouncedSearchQuery);
  const hasFoundArtists = artists && artists.length > 0;

  useEffect(() => {
    setHomePage();
  }, [setHomePage]);
  // todo display empty serach message
  return (
    <>
      <Box className={classes.homeWrapper}>
        <Typography className={classes.title} variant="h2">
          Artist search
        </Typography>
        <SearchInput onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} />
        {loading && <Loader className={classes.loader} />}
        {error && <Typography className={classes.errorMessage}>{error.message}</Typography>}
        {hasFoundArtists && <ArtistsList artists={artists || []} />}
      </Box>
    </>
  );
};
