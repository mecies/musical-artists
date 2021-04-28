import React, { FC } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { ArtistsList } from 'components/ArtistsList/';
import { Loader } from 'components/Loader';
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
  loader: {
    marginTop: 40,
  },
}));

export const Home: FC = () => {
  const classes = useStyles();
  const { searchQuery, debouncedSearchQuery, handleSetSearchQuery } = useSearchQuery();
  const { data: artists, loading, error } = useArtists(debouncedSearchQuery);
  // todo persist query po zmianie routa
  // todo wyswietl komunikat zeby zrobic search gdy nie touched
  return (
    <>
      <SearchInput onChange={(e) => handleSetSearchQuery(e)} value={searchQuery} />
      {loading && <Loader className={classes.loader} />}
      {error && <Typography className={classes.errorMessage}>{error.message}</Typography>}
      {artists && <ArtistsList artists={artists} />}
    </>
  );
};
