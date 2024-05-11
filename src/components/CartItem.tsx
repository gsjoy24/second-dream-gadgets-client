import { Button } from 'antd';
import ProductImage from './ProductImage';

const CartItem = ({ product, quantity }: any) => {
	const { product_name, product_price, product_image, quantity: product_quantity } = product;

	return (
		<div className='flex justify-between items-center mb-4'>
			<ProductImage image_path={product_image} />
			<h1 className='text-lg font-semibold'>{product_name}</h1>
			<p>
				<Button size='small' className='text-white'>
					-
				</Button>
				<span className='mx-2'>{quantity}</span>
				<Button size='small' className='text-white'>
					+
				</Button>
			</p>
			<p>${product_price} /=</p>
		</div>
	);
};

export default CartItem;
