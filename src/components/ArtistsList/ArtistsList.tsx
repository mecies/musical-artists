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
    [theme.breakpoints.up('sm')]: {
      width: 400,
    },
  },
  listItem: {
    color: theme.palette.text.secondary,
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  listItemIcon: {
    fill: theme.palette.background.paper,
  },
  errorMessage: {
    color: theme.palette.text.secondary,
  },
}));

export const ArtistsList: FC<Props> = ({ artists }) => {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      {artists?.map(({ mbid, name, country }) => {
        return (
          <Link component={RouterLink} to={`/artist/${mbid}`} key={mbid}>
            <ListItem className={classes.listItem}>
              <ListItemIcon>
                <Person className={classes.listItemIcon} />
              </ListItemIcon>
              <ListItemText primary={name} secondary={country} />
            </ListItem>
          </Link>
        );
      })}
    </List>
  );
};
