import { baseApi } from '../../api/baseApi';

const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		registerUser: builder.mutation({
			query: (userInfo) => ({
				url: '/users/create-user',
				method: 'POST',
				body: userInfo
			})
		}),

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

export const { useAddAdminOrManagerMutation, useRegisterUserMutation, useLoginMutation } = authApi;
