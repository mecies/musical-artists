import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import { Loader } from '../Loader';

describe('Loader component', () => {
  it('should render loader component', () => {
    render(<Loader />);
  });
});
