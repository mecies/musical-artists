import React, { FC } from 'react';
import { List as MuiList, ListProps, makeStyles } from '@material-ui/core';

type Props = ListProps;

const useStyles = makeStyles(() => ({
  list: {
    maxHeight: '40vh',
    width: '100%',
    overflowY: 'scroll',
  },
}));

export const List: FC<Props> = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <MuiList className={classes.list} {...props}>
      {children}
    </MuiList>
  );
};
