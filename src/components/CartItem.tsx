import { Button } from 'antd';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { toast } from 'sonner';
import { useManipulateCartQuantityMutation, useRemoveFromCartMutation } from '../redux/features/cart/cartApi';
import ProductImage from './ProductImage';

const CartItem = ({ product, quantity }: any) => {
	const { _id, product_name, product_price, product_image, quantity: product_quantity } = product;

	const [manipulateQuantity] = useManipulateCartQuantityMutation();
	const [removeFromCart] = useRemoveFromCartMutation();

	const handleManipulateQuantity = async (action: 'increment' | 'decrement', id: string) => {
		try {
			const res = (await manipulateQuantity({ action, id })) as any;
			toast.success(res?.data.message);
		} catch (error) {
			toast.error('Failed to manipulate quantity!');
		}
	};

	const handleRemoveFromCart = async () => {
		try {
			const res = (await removeFromCart(_id)) as any;
			toast.success(res?.data.message);
		} catch (error) {
			toast.error('Failed to remove from cart!');
		}
	};

	return (
		<div className='flex justify-between items-center mb-4'>
			<div className='relative'>
				<ProductImage image_path={product_image} />
				<Button className='absolute -top-4 -left-6 text-white' type='link' onClick={() => handleRemoveFromCart()}>
					<MdDeleteForever size={25} />
				</Button>
			</div>
			<h1 className='text-lg font-semibold'>{product_name}</h1>
			<div className='flex justify-center'>
				<Button
					onClick={() => handleManipulateQuantity('decrement', _id)}
					size='small'
					className='text-white'
					disabled={quantity === 1}
				>
					<FaMinus className='text-[10px]' />
				</Button>
				<span className='mx-2 text-lg'>{quantity}</span>
				<Button
					onClick={() => handleManipulateQuantity('increment', _id)}
					size='small'
					className='text-white'
					disabled={quantity === product_quantity}
				>
					<FaPlus className='text-[10px]' />
				</Button>
			</div>
			<p>${product_price} /=</p>
		</div>
	);
};

export default CartItem;
