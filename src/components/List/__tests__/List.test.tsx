import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import { List } from '../List';
import { ListItem } from '../ListItem';

describe('SearchInput component', () => {
  it('should render list component with list items', () => {
    render(
      <List>
        <ListItem text="hey" />
        <ListItem text="adam" />
      </List>,
    );
  });
});
