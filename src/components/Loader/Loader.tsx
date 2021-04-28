import React, { FC } from 'react';
import { Box, BoxProps, CircularProgress, makeStyles } from '@material-ui/core';

type Props = BoxProps;

const useStyles = makeStyles((theme) => ({
  loader: {
    width: '60px !important',
    height: '60px !important',
    color: theme.palette.background.paper,
  },
}));

const Loader: FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Box {...props}>
      <CircularProgress className={classes.loader} />
    </Box>
  );
};

export { Loader };
