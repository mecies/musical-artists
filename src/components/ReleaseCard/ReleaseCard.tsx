import React, { FC } from 'react';
import { Card, CardContent, CardProps, makeStyles, Typography } from '@material-ui/core';
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
  releaseName: {
    textAlign: 'center',
  },
  icon: {
    marginLeft: theme.spacing(1),
  },
}));

const ReleaseCard: FC<Props> = ({ release, ...props }) => {
  const classes = useStyles();

  return (
    <Card {...props}>
      <CardContent className={classes.content}>
        <Typography className={classes.releaseName} variant="h4">
          {release.title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export { ReleaseCard };
