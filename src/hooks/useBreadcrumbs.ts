import { useDispatch } from 'react-redux';
import { uiModule } from 'store/reducers/ui';

export const useBreadcrumbs = () => {
  const dispatch = useDispatch();

  const setHomePage = () => {
    dispatch(uiModule.actions.setArtistMbid(''));
    dispatch(uiModule.actions.setReleaseMbid(''));
  };

  const setArtistPage = (artistMbid: string) => {
    dispatch(uiModule.actions.setArtistMbid(artistMbid));
    dispatch(uiModule.actions.setReleaseMbid(''));
  };

  const setReleasePage = (artistMbid: string, releaseMbid: string) => {
    dispatch(uiModule.actions.setArtistMbid(artistMbid));
    dispatch(uiModule.actions.setReleaseMbid(releaseMbid));
  };

  return {
    setHomePage,
    setArtistPage,
    setReleasePage,
  };
};
