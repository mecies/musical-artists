import React from 'react';
import { List as MuiList, ListProps, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  list: {
    maxHeight: '40vh',
    width: '100%',
    overflowY: 'scroll',
  },
}));

const List = ({ children, ...props }: ListProps) => {
  const classes = useStyles();

  return (
    <MuiList className={classes.list} {...props}>
      {children}
    </MuiList>
  );
};

export { List };
