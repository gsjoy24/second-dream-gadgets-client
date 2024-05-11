import { Button } from 'antd';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { toast } from 'sonner';
import { useManipulateCartQuantityMutation } from '../redux/features/cart/cartApi';
import ProductImage from './ProductImage';

const CartItem = ({ product, quantity }: any) => {
	const { _id, product_name, product_price, product_image, quantity: product_quantity } = product;

	const [manipulateQuantity] = useManipulateCartQuantityMutation();

	const handleManipulateQuantity = async (action: 'increment' | 'decrement', id: string) => {
		try {
			const res = (await manipulateQuantity({ action, id })) as any;
			toast.success(res?.data.message);
		} catch (error) {
			toast.error('Failed to manipulate quantity!');
		}
	};

	return (
		<div className='flex justify-between items-center mb-4'>
			<ProductImage image_path={product_image} />
			<h1 className='text-lg font-semibold'>{product_name}</h1>
			<p>
				<Button
					onClick={() => handleManipulateQuantity('decrement', _id)}
					size='small'
					className='text-white'
					disabled={quantity === 1}
				>
					<FaMinus className='text-[10px]' />
				</Button>
				<span className='mx-2'>{quantity}</span>
				<Button
					onClick={() => handleManipulateQuantity('increment', _id)}
					size='small'
					className='text-white'
					disabled={quantity === product_quantity}
				>
					<FaPlus className='text-[10px]' />
				</Button>
			</p>
			<p>${product_price} /=</p>
		</div>
	);
};

export default CartItem;
