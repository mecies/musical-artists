import React, { ChangeEvent, FC } from 'react';
import { FormLabel, InputBase, makeStyles, Paper } from '@material-ui/core';
import { Search } from '@material-ui/icons';

type Props = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value: string;
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 300,
    [theme.breakpoints.up('sm')]: {
      width: 400,
    },
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: theme.spacing(1),
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export const SearchInput: FC<Props> = ({ className, onChange, value }) => {
  const classes = useStyles();

  return (
    <FormLabel htmlFor="search" className={className}>
      <Paper className={classes.paper}>
        <InputBase
          id="search"
          className={classes.input}
          placeholder="Search artists by name"
          inputProps={{ 'aria-label': 'Search for artists' }}
          onChange={onChange}
          value={value}
        />
        <Search />
      </Paper>
    </FormLabel>
  );
};
