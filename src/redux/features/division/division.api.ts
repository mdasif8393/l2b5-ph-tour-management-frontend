import { baseApi } from "@/redux/baseApi";

export const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // createDivision: builder.mutation({
    //   query: (divisionInfo) => ({
    //     url: "/division/create",
    //     method: "POST",
    //     data: divisionInfo,
    //   }),
    //   invalidatesTags: ["TOUR"],
    // }),
    getDivision: builder.query({
      query: () => ({
        url: "/division",
        method: "GET",
      }),
      providesTags: ["DIVISION"],
    }),
    deleteDivision: builder.mutation({
      query: (divisionId) => ({
        url: `/division/${divisionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DIVISION"],
    }),
  }),
});

export const { useGetDivisionQuery, useDeleteDivisionMutation } = divisionApi;
