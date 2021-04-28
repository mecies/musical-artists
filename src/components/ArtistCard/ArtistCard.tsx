import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardActions, CardContent, CardProps, makeStyles, Typography } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import { RootState } from 'store';
import { artistModule } from 'store/reducers/artist';
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
  artistButton: {
    background: theme.palette.background.paper,
  },
  icon: {
    marginLeft: theme.spacing(1),
  },
}));

const ArtistCard: FC<Props> = ({ artist, ...props }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const favouriteArtists = useSelector<RootState, Artist[] | undefined>((state) => state.artist.favouriteArtists);
  const isArtistFavourite = favouriteArtists?.some((favoriteArtist) => favoriteArtist.mbid === artist.mbid);
  const handleAddToFavourites = () => {
    if (!isArtistFavourite) {
      dispatch(artistModule.actions.addArtist(artist));
    } else {
      dispatch(artistModule.actions.removeArtist(artist.mbid));
    }
  };

  return (
    <Card {...props}>
      <CardContent className={classes.content}>
        <Typography className={classes.artistName} variant="h4">
          {artist.name}
        </Typography>
        {/* {artist.country && <Typography variant="body2">from: {artist.country}</Typography>} */}
      </CardContent>
      <CardActions className={classes.actions}>
        <Button onClick={handleAddToFavourites} className={classes.artistButton}>
          {!isArtistFavourite ? (
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
        <Typography className={classes.artistName} variant="h6">
          Popular songs:
        </Typography>
      </CardContent>
    </Card>
  );
};

export { ArtistCard };
