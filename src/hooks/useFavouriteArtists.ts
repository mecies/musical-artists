import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { artistModule } from 'store/reducers/artist';
import { Artist } from 'typings';

export const useFavouriteArtists = () => {
  const dispatch = useDispatch();
  const favouriteArtists = useSelector<RootState, Artist[] | undefined>((state) => state.artist.favouriteArtists);
  const addFavouriteArtist = (artist: Artist) => dispatch(artistModule.actions.addArtist(artist));
  const removeFavouriteArtist = (artist: Artist) => dispatch(artistModule.actions.removeArtist(artist.mbid));
  const isFavouriteArtistCheck = (artist: Artist) =>
    favouriteArtists?.some((favoriteArtist) => favoriteArtist.mbid === artist.mbid);

  return {
    favouriteArtists,
    addFavouriteArtist,
    removeFavouriteArtist,
    isFavouriteArtistCheck,
  };
};
