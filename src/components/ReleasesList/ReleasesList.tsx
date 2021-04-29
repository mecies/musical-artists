import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import { Audiotrack } from '@material-ui/icons';
import { Release } from 'typings';

type Props = {
  artistMbid: string;
  releases: Release[];
};

const useStyles = makeStyles((theme) => ({
  list: {
    maxHeight: '40vh',
    width: '100%',
    overflowY: 'scroll',
  },
  listItem: {
    width: '100%',
    color: theme.palette.text.secondary,
    borderBottom: `1px solid ${theme.palette.background.paper}`,
    '&:last-of-type': {
      borderBottom: 'none',
    },
  },
  listItemContentWrapper: {
    display: 'flex',
    padding: theme.spacing(0, 2),
    width: '100%',
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

export const ReleasesList: FC<Props> = ({ artistMbid, releases }) => {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      {releases?.map(({ mbid, title }) => {
        return (
          <ListItem className={classes.listItem} key={mbid}>
            <Link
              component={RouterLink}
              to={`/artist/${artistMbid}/${mbid}`}
              className={classes.listItemContentWrapper}
            >
              <ListItemIcon>
                <Audiotrack className={classes.listItemIcon} />
              </ListItemIcon>
              <ListItemText className={classes.listItemText} primary={title} />
            </Link>
          </ListItem>
        );
      })}
    </List>
  );
};
