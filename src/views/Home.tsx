import React, { FC } from 'react';
import { CircularProgress, makeStyles, Typography } from '@material-ui/core';
import { ArtistsList } from 'components/ArtistsList/ArtistsList';
import { SearchInput } from 'components/SearchInput/';
import { useArtists } from 'hooks/useArtists';
import { useSearchQuery } from 'hooks/useSearchQuery';

const useStyles = makeStyles((theme) => ({
  listItem: {
    color: theme.palette.text.secondary,
  },
  listItemIcon: {
    fill: theme.palette.background.paper,
  },
  errorMessage: {
    color: theme.palette.text.secondary,
  },
}));

export const Home: FC = () => {
  const classes = useStyles();
  const { searchQuery, debouncedSearchQuery, handleSetSearchQuery } = useSearchQuery();
  const { data: artists, loading, error } = useArtists(debouncedSearchQuery);
  // todo fetchowac po mbid artystow
  // todo persist query po zmianie routa
  return (
    <>
      <SearchInput onChange={(e) => handleSetSearchQuery(e)} value={searchQuery} />
      {loading && <CircularProgress />}
      {error && <Typography className={classes.errorMessage}>{error.message}</Typography>}
      {artists && <ArtistsList artists={artists} />}
    </>
  );
};
