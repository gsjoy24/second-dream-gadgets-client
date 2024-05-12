import { baseApi } from '../../api/baseApi';

const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		addAdminOrManager: builder.mutation({
			query: (userInfo) => ({
				url: '/users/create-admin-or-manager',
				method: 'POST',
				body: userInfo
			})
		}),
		login: builder.mutation({
			query: (userInfo) => ({
				url: '/auth/login',
				method: 'POST',
				body: userInfo
			})
		})
	})
});

export const { useAddAdminOrManagerMutation, useLoginMutation } = authApi;
