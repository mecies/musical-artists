import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import { Loader } from './Loader';

describe('SearchInput component', () => {
  it('should render loader component', () => {
    render(<Loader />);
  });
});
