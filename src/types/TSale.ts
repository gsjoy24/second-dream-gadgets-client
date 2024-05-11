import { TProduct } from './TProduct';

export type TSale = {
	_id?: string;
	customer: string;
	product: TProduct;
	quantity: number;
	createdAt?: Date;
};
