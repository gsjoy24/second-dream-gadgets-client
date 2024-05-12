export type TProduct = {
	_id?: string;
	product_name: string;
	product_image: string;
	product_price: number;
	category: string;
	brand: string;
	model_number: string;
	quantity: number;
	operating_system: string;
	connectivity: string;
	power_source: string;
	camera_resolution: string;
	storage_capacity: string;
	screen_resolution: string;
	ram_capacity: string;
	warranty: number;
	weight: number;
	createdAt?: Date;
	isDeleted?: boolean;
};

export type TSale = {
	_id: string;
	customer_name: string;
	contact_number: string;
	sold_by: TSoldBy;
	products: TSoldProduct[];
	total_amount: number;
	selling_date: string;
	createdAt: string;
	updatedAt: string;
};

export type TSoldBy = {
	_id: string;
	name: string;
	email: string;
};

export type TSoldProduct = {
	product_name: string;
	price: number;
	quantity: number;
};
