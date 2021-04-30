import React, { FC, useEffect } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { Person } from '@material-ui/icons';
import { List, ListItem } from 'components/List';
import { Loader } from 'components/Loader';
import { SearchInput } from 'components/SearchInput/';
import { useArtists } from 'hooks/useArtists';
import { useBreadcrumbs } from 'hooks/useBreadcrumbs';
import { useSearchQuery } from 'hooks/useSearchQuery';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    marginBottom: theme.spacing(4),
    color: theme.palette.text.secondary,
  },
  notFoundText: {
    color: theme.palette.text.secondary,
    margin: theme.spacing(4),
    maxWidth: 300,
  },
  listItemIcon: {
    fill: theme.palette.background.paper,
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
  const showEmptyResultMessage = !hasFoundArtists && !loading && debouncedSearchQuery;

  useEffect(() => {
    setHomePage();
  }, [setHomePage]);

  return (
    <>
      <Box className={classes.wrapper}>
        <Typography className={classes.title} variant="h3">
          Artist search
        </Typography>
        <SearchInput onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} />
        {loading && <Loader className={classes.loader} />}
        {error && <Typography className={classes.notFoundText}>{error.message}</Typography>}
        {hasFoundArtists && (
          <List>
            {artists?.map(({ mbid, name }) => (
              <ListItem key={mbid} to={`/artist/${mbid}`} text={name}>
                <Person className={classes.listItemIcon} />
              </ListItem>
            ))}
          </List>
        )}
        {showEmptyResultMessage && (
          <Typography variant="h5" className={classes.notFoundText}>
            No arists matching search query found
          </Typography>
        )}
      </Box>
    </>
  );
};
