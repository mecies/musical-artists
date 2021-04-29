import React, { FC } from 'react';
import { Button, Card, CardActions, CardContent, CardProps, makeStyles, Typography } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import { ReleasesList } from 'components/ReleasesList';
import { useFavouriteArtists } from 'hooks/useFavouriteArtists';
import { Artist } from 'typings';

type Props = CardProps & {
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
}));

const ArtistCard: FC<Props> = ({ artist, ...props }) => {
  const classes = useStyles();
  const { isFavouriteArtistCheck, addFavouriteArtist, removeFavouriteArtist } = useFavouriteArtists();
  const isFavouriteArtist = isFavouriteArtistCheck(artist);
  const artistHasRelases = artist.releases?.nodes?.length && artist.releases.nodes.length > 0;
  // todo refactor,

  const handleToggleFavouriteArtist = () => {
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
              <Favorite className={classes.icon} />
            </>
          ) : (
            <>
              Remove from favorites
              <FavoriteBorder className={classes.icon} />
            </>
          )}
        </Button>
      </CardActions>
      <CardContent className={classes.content}>
        {artistHasRelases ? (
          <>
            <Typography className={classes.releasesTitle} variant="h6">
              Popular releases:
            </Typography>
            <ReleasesList artistMbid={artist.mbid} releases={artist.releases?.nodes || []} />
          </>
        ) : (
          <>
            <Typography className={classes.releasesTitle} variant="h6">
              Arist does not have any release
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export { ArtistCard };
