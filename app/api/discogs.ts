import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Release = {
  id: number;
  instance_id: number;
  date_added: string; // "2023-12-30T11:05:37-08:00",
  basic_information: {
    id: number;
    master_id: number;
    master_url: string; // "https://api.discogs.com/masters/88983",
    resource_url: string; // "https://api.discogs.com/releases/665695",
    thumb: string; // "https://i.discogs.com/o4oDFYq1MeQWKHsiscPXp0TYhm6GwoWDrtxMRDmbLiM/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTY2NTY5/NS0xNDU0ODc4MzA5/LTI3NzguanBlZw.jpeg",
    cover_image: string; // "https://i.discogs.com/sPB7zMxJxaeFEThZsQAtpbCtJDOZ12ICgXsS4kBMbEU/rs:fit/g:sm/q:90/h:591/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTY2NTY5/NS0xNDU0ODc4MzA5/LTI3NzguanBlZw.jpeg",
    title: string; // "Crimes Of Passion",
    year: number; // 1980,
    artists: {
      name: string; // "Pat Benatar",
      id: number; // 160130,
      resource_url: string; // "https://api.discogs.com/artists/160130"
    }[];
    labels: {
      name: "Chrysalis";
      catno: "CHE 1275";
      entity_type: "1";
      entity_type_name: "Label";
      id: 3198;
      resource_url: "https://api.discogs.com/labels/3198";
    }[];
    genres: string[]; // ["Rock"]
    styles: string[]; // ["Rock & Roll", "Hard Rock", "Pop Rock"]
  };
};

type CollectionResponse = {
    releases: Release[];
}

type WantlistResponse = {
    wants: Release[];
}

// Define a service using a base URL and expected endpoints
export const discogsApi = createApi({
  reducerPath: "discogsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.discogs.com/",
  prepareHeaders: headers => {
    headers.set('Authorization', 'Discogs token=pEsLvfAIoqZJlczYsxMDoTJVfCVfuNuTaEOsNuUB')
    return headers
  },
}),
  endpoints: (builder) => ({
    getCollection: builder.query<CollectionResponse, void>({
      query: (name) => `users/PaulDaugh/collection/folders/0/releases?per_page=100`,
    }),
    getWantlist: builder.query<WantlistResponse, void>({
      query: (name) => `users/PaulDaugh/wants?per_page=100`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCollectionQuery, useGetWantlistQuery } = discogsApi;
