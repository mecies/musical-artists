import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Link,
  ListItem as MuiListItem,
  ListItemIcon,
  ListItemProps,
  ListItemText,
  makeStyles,
} from '@material-ui/core';

type Props = Omit<ListItemProps, 'button'> & {
  to?: string;
  text: string;
};

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    color: theme.palette.text.secondary,
    borderBottom: `1px solid ${theme.palette.background.paper}`,
    '&:last-of-type': {
      borderBottom: 'none',
    },
  },
  content: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  text: {
    color: theme.palette.text.secondary,
  },
}));

export const ListItem: FC<Props> = ({ to, text, children, ...props }) => {
  const classes = useStyles();

  return (
    <MuiListItem className={classes.wrapper} {...props}>
      {to ? (
        <Link component={RouterLink} to={to} className={classes.content}>
          <ListItemIcon>{children}</ListItemIcon>
          <ListItemText className={classes.text} primary={text} />
        </Link>
      ) : (
        <Box className={classes.content}>
          <ListItemIcon>{children}</ListItemIcon>
          <ListItemText className={classes.text} primary={text} />
        </Box>
      )}
    </MuiListItem>
  );
};
