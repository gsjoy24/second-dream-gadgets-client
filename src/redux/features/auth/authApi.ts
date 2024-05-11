import { baseApi } from '../../api/baseApi';

const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		addAdmin: builder.mutation({
			query: (userInfo) => ({
				url: '/auth/register',
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

export const { useAddAdminMutation, useLoginMutation } = authApi;
