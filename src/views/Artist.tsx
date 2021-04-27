import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@material-ui/core';

export const Artist = () => {
  const { mbid } = useParams<{ mbid: string }>();
  return <Typography color="primary">{mbid}</Typography>;
};
