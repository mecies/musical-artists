import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { uiModule } from 'store/reducers/ui';
import { useDebounce } from 'use-debounce/lib';

export const useSearchQuery = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector<RootState, string>((state) => state.ui.searchQuery);
  const setSearchQuery = (query: string) => dispatch(uiModule.actions.setSearchQuery(query));
  const [debouncedSearchQuery] = useDebounce(searchQuery, 1000);

  return {
    searchQuery,
    debouncedSearchQuery,
    setSearchQuery,
  };
};
