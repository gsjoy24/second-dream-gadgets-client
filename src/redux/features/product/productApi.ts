import { baseApi } from '../../api/baseApi';

const productsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// get products
		getProducts: builder.query({
			query: (args) => {
				const params = new URLSearchParams();
				if (args) {
					args.forEach((item: { name: string; value: string }) => {
						params.append(item.name, item.value);
					});
				}

				return {
					url: '/products',
					method: 'GET',
					params
				};
			},
			providesTags: ['products']
		}),

		// add product
		addProduct: builder.mutation({
			query: (data) => ({
				url: '/products',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['products']
		}),

		// get product by id
		getProductById: builder.query({
			query: (id: string) => ({
				url: `/products/${id}`,
				method: 'GET'
			})
		}),

		// update product
		updateProduct: builder.mutation({
			query: (data) => ({
				url: `/products/${data?.id}`,
				method: 'PUT',
				body: data
			}),
			invalidatesTags: ['products']
		}),

		// delete multiple products
		deleteMultipleProducts: builder.mutation({
			query: (product_ids: React.Key[]) => ({
				url: '/products/delete-multiple-products',
				method: 'POST',
				body: product_ids
			}),
			invalidatesTags: ['products']
		})
	})
});

export const {
	useAddProductMutation,
	useDeleteMultipleProductsMutation,
	useGetProductByIdQuery,
	useGetProductsQuery,
	useUpdateProductMutation
} = productsApi;
