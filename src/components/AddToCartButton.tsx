import { Button } from 'antd';
import { FaCartPlus } from 'react-icons/fa';
import { toast } from 'sonner';
import { selectCurrentUser } from '../redux/features/auth/authSlice';
import { useAddToCartMutation } from '../redux/features/cart/cartApi';
import { useAppSelector } from '../redux/hooks';

const AddToCartButton = ({ id }: any) => {
	const user = useAppSelector(selectCurrentUser);
	const [addToCart, { isLoading }] = useAddToCartMutation();

	const addToCartHandler = async () => {
		try {
			const res = await addToCart(id).unwrap();
			if (res.success) {
				toast.success(res.message);
			}
		} catch (error: any) {
			toast.error(error.data.message);
		}
	};

	return (
		<Button
			type='dashed'
			onClick={() => addToCartHandler()}
			disabled={user?.role === 'admin'}
			loading={isLoading}
			title='Add to cart'
			className='flex justify-center items-center'
		>
			<FaCartPlus size={18} />
		</Button>
	);
};

export default AddToCartButton;
