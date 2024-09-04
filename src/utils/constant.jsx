export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_WEB_APP_MOVIES_OPTIONS,
  },
};

// TMBD image url
export const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export const SUPPORT_LANGUAGES = [
  { identifier: "english", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "telugu", name: "Telugu" },
];
