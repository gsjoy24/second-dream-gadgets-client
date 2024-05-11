export type TUser = {
	_id: string;
	name: string;
	email: string;
	role: string;
	iat: number;
	exp: number;
};
export type TAuthState = {
	user: null | TUser;
	token: null | string;
};
