const baseUrl =
  process.env.NODE_ENV === "production"
    ? import.meta.env.APP_URL
    : import.meta.env.DEFAULT_APP_URL;
export default baseUrl;
