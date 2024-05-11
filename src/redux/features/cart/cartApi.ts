import { baseApi } from '../../api/baseApi';

const cartApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// get products
		getMyCart: builder.query({
			query: () => ({ url: '/cart/my-cart', method: 'GET' }),
			providesTags: ['cart']
		}),

		// add product
		addToCart: builder.mutation({
			query: (id) => ({
				url: `/cart/add/${id}`,
				method: 'POST'
			}),
			invalidatesTags: ['cart']
		})
	})
});

export const { useAddToCartMutation, useGetMyCartQuery } = cartApi;
