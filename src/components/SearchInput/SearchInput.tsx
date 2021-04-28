import React, { FC } from 'react';
import { FormLabel, InputBase, InputBaseProps, makeStyles, Paper } from '@material-ui/core';
import { Search } from '@material-ui/icons';

type Props = InputBaseProps & {
  className?: string;
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
    [theme.breakpoints.up('md')]: {
      width: 450,
    },
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: theme.spacing(1),
  },
}));

export const SearchInput: FC<Props> = ({ className, ...props }) => {
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
