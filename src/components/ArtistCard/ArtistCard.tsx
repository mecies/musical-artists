import React, { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardProps,
  IconButton,
  makeStyles,
  Snackbar,
  Typography,
} from '@material-ui/core';
import { Close, Favorite, FavoriteBorder, LibraryMusic } from '@material-ui/icons';
import { List, ListItem } from 'components/List';
import { useFavouriteArtists } from 'hooks/useFavouriteArtists';
import { Artist } from 'models';

type ArtistCardProps = CardProps & {
  artist: Artist;
};

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: theme.palette.primary.main,
    color: theme.palette.text.secondary,
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(3),
  },
  artistName: {
    textAlign: 'center',
  },
  releasesTitle: {
    margin: theme.spacing(2, 0),
    textAlign: 'center',
  },
  artistButton: {
    background: theme.palette.background.paper,
  },
  icon: {
    marginLeft: theme.spacing(1),
  },
  listItemIcon: {
    fill: theme.palette.background.paper,
  },
}));

const ArtistCard = ({ artist, ...props }: ArtistCardProps) => {
  const classes = useStyles();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const { isFavouriteArtistCheck, addFavouriteArtist, removeFavouriteArtist } = useFavouriteArtists();
  const isFavouriteArtist = isFavouriteArtistCheck(artist);
  const releases = artist.releases?.nodes;
  const artistHasReleases = !!(releases?.length && releases.length > 0);
  const toggleSnackbarOpen = () => setIsSnackbarOpen(!isSnackbarOpen);
  const handleToggleFavouriteArtist = () => {
    toggleSnackbarOpen();

    if (!isFavouriteArtist) {
      addFavouriteArtist(artist);
    } else {
      removeFavouriteArtist(artist);
    }
  };

  return (
    <Card {...props}>
      <CardContent className={classes.content}>
        <Typography className={classes.artistName} variant="h4">
          {artist.name}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button onClick={handleToggleFavouriteArtist} className={classes.artistButton}>
          {!isFavouriteArtist ? (
            <>
              Add to favorites
              <FavoriteBorder className={classes.icon} />
            </>
          ) : (
            <>
              Remove from favorites
              <Favorite className={classes.icon} />
            </>
          )}
        </Button>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={isSnackbarOpen}
          autoHideDuration={6000}
          onClose={toggleSnackbarOpen}
          message={`${artist.name} ${
            isFavouriteArtist ? 'has been added to your favorites' : 'has been removed from you favourites'
          }`}
          action={
            <>
              <IconButton size="small" aria-label="close" color="inherit" onClick={toggleSnackbarOpen}>
                <Close fontSize="small" />
              </IconButton>
            </>
          }
        />
      </CardActions>
      <CardContent className={classes.content}>
        <Typography className={classes.releasesTitle} variant="h6">
          {artistHasReleases ? 'Popular releases: ' : 'Artist does not have any releases'}
        </Typography>
        {artistHasReleases && (
          <List>
            {releases?.map(({ mbid, title }) => (
              <ListItem key={mbid} to={`/artist/${artist.mbid}/${mbid}`} text={title}>
                <LibraryMusic className={classes.listItemIcon} />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export { ArtistCard };
