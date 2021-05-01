import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import { SearchInput } from './SearchInput';

describe('SearchInput component', () => {
  it('should render search input component', () => {
    render(<SearchInput />);
  });
});
