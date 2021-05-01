export type Artist = {
  mbid: string;
  name: string;
  releases?: {
    nodes: Release[];
  };
};

export type Release = {
  mbid: string;
  title: string;
  recordings?: {
    nodes: Recording[];
  };
};

type Recording = {
  mbid: string;
  title: string;
};
