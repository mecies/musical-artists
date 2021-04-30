import React, { FC } from 'react';
import { Card, CardContent, CardProps, makeStyles, Typography } from '@material-ui/core';
import { Audiotrack } from '@material-ui/icons';
import { List, ListItem } from 'components/List';
import { Release } from 'typings';

type Props = CardProps & {
  release: Release;
};

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: theme.palette.primary.main,
    color: theme.palette.text.secondary,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    width: '100%',
    background: '#f5f6f7',
    color: theme.palette.background.default,
  },
  icon: {
    marginLeft: theme.spacing(1),
  },
  listItemIcon: {
    fill: theme.palette.background.paper,
  },
}));

const ReleaseCard: FC<Props> = ({ release, ...props }) => {
  const classes = useStyles();
  const recordings = release.recordings?.nodes;
  const hasRecordings = recordings && recordings.length > 0;

  return (
    <Card {...props}>
      <CardContent className={classes.content}>
        <Typography className={classes.title} variant="h4">
          {release.title}
        </Typography>
        {hasRecordings && (
          <>
            <Typography className={classes.subtitle} variant="h6">
              Songs in the releaase:
            </Typography>
            <List>
              {recordings?.map(({ mbid, title }) => (
                <ListItem key={mbid} text={title}>
                  <Audiotrack className={classes.listItemIcon} />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export { ReleaseCard };
