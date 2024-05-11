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
		}),

		manipulateCartQuantity: builder.mutation({
			query: ({ action, id }) => ({
				url: `/cart/${action}/${id}`,
				method: 'PUT'
			}),
			invalidatesTags: ['cart']
		}),

		// remove product
		removeFromCart: builder.mutation({
			query: (id) => ({
				url: `/cart/remove/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['cart']
		})
	})
});

export const { useAddToCartMutation, useGetMyCartQuery, useManipulateCartQuantityMutation, useRemoveFromCartMutation } =
	cartApi;
