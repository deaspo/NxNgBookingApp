import { retry } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "ngrx-rtk-query";
// Start json-server
// json-server --watch data/db.json --port 4000

const baseQuery = fetchBaseQuery(
    {
        baseUrl: 'http://localhost:4000'
    });
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });
export const apiSlice = createApi(
    {
        reducerPath: 'api',
        baseQuery: baseQueryWithRetry,
        tagTypes: ['Bookings', 'Locations'],
        endpoints: builder => ({})
    });