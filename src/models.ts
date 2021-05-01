export type Artist = {
  mbid: string;
  name: string;
  country?: string;
  releases?: {
    nodes: Release[];
  };
};

export type Release = {
  mbid: string;
  title: string;
  date: string;
  country: string;
  recordings?: {
    nodes: Recording[];
  };
};

type Recording = {
  mbid: string;
  title: string;
};
