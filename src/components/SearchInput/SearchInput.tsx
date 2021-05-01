import React from 'react';
import { FormLabel, InputBase, InputBaseProps, makeStyles, Paper } from '@material-ui/core';
import { Search } from '@material-ui/icons';

type SearchInputProps = InputBaseProps & {
  className?: string;
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 300,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: theme.spacing(1),
  },
}));

const SearchInput = ({ className, ...props }: SearchInputProps) => {
  const classes = useStyles();

  return (
    <FormLabel htmlFor="search" className={className}>
      <Paper className={classes.paper}>
        <InputBase
          id="search"
          className={classes.input}
          placeholder="Search artists by name"
          inputProps={{ 'aria-label': 'Search for artists' }}
          {...props}
        />
        <Search />
      </Paper>
    </FormLabel>
  );
};

export { SearchInput };
