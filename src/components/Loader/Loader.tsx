import { Box, BoxProps, CircularProgress, makeStyles } from '@material-ui/core';

type LoaderProps = BoxProps;

const useStyles = makeStyles((theme) => ({
  loader: {
    width: '60px !important',
    height: '60px !important',
    color: theme.palette.background.paper,
  },
}));

const Loader = (props: LoaderProps) => {
  const classes = useStyles();

  return (
    <Box {...props}>
      <CircularProgress className={classes.loader} />
    </Box>
  );
};

export { Loader };
