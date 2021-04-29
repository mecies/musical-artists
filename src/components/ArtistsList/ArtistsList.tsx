import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import { Person } from '@material-ui/icons';
import { Artist } from 'typings';

type Props = {
  artists: Artist[];
};

const useStyles = makeStyles((theme) => ({
  list: {
    width: 300,
  },
  listItem: {
    color: theme.palette.text.secondary,
    borderBottom: `1px solid ${theme.palette.background.paper}`,
    '&:last-of-type': {
      borderBottom: 'none',
    },
    width: '100%',
  },
  listItemContentWrapper: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  listItemIcon: {
    fill: theme.palette.background.paper,
  },
  listItemText: {
    color: theme.palette.text.secondary,
  },
  errorMessage: {
    color: theme.palette.text.secondary,
  },
}));

export const ArtistsList: FC<Props> = ({ artists }) => {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      {artists?.map(({ mbid, name }) => {
        return (
          <ListItem className={classes.listItem} key={mbid}>
            <Link component={RouterLink} to={`/artist/${mbid}`} className={classes.listItemContentWrapper}>
              <ListItemIcon>
                <Person className={classes.listItemIcon} />
              </ListItemIcon>
              <ListItemText className={classes.listItemText} primary={name} />
            </Link>
          </ListItem>
        );
      })}
    </List>
  );
};
