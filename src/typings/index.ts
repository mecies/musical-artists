export type Artist = {
  mbid: string;
  name: string;
  country?: string;
  releases?: {
    nodes: Release[];
  };
};

export type Release = {
  title: string;
  date: string;
  country: string;
};
