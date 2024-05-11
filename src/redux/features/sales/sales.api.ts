import { baseApi } from '../../api/baseApi';

const salesApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// get products
		getSales: builder.query({
			query: (args) => {
				const params = new URLSearchParams();
				if (args) {
					args.forEach((item: { name: string; value: string }) => {
						params.append(item.name, item.value);
					});
				}

				return {
					url: '/sales',
					method: 'GET',
					params
				};
			},
			providesTags: ['sales']
		}),

		// add sale
		addSale: builder.mutation({
			query: (data) => ({
				url: '/sales',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['sales', 'products']
		}),

		// delete multiple sales
		deleteMultipleSales: builder.mutation({
			query: (ids: React.Key[]) => ({
				url: '/sales/delete-multiple-sales',
				method: 'POST',
				body: { ids }
			}),
			invalidatesTags: ['sales']
		})
	})
});

export const { useGetSalesQuery, useAddSaleMutation, useDeleteMultipleSalesMutation } = salesApi;
