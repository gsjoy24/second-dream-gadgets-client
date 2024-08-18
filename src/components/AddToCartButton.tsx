import { Button } from 'antd';
import { FaCartPlus } from 'react-icons/fa';
import { toast } from 'sonner';
import { selectCurrentUser } from '../redux/features/auth/authSlice';
import { useAddToCartMutation, useGetMyCartQuery } from '../redux/features/cart/cartApi';
import { useAppSelector } from '../redux/hooks';

const AddToCartButton = ({ id }: any) => {
	const user = useAppSelector(selectCurrentUser);
	const [addToCart, { isLoading }] = useAddToCartMutation();
	const { data: cartData } = useGetMyCartQuery(undefined);
	const productIds = cartData?.data?.cart.map((item: any) => item.product._id);

	const isProductInCart = productIds?.includes(id);

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
			disabled={user?.role === 'admin' ?? isProductInCart}
			loading={isLoading}
			title={isProductInCart ? 'Product already in cart!' : 'Add to cart'}
			className='flex justify-center items-center'
		>
			<FaCartPlus size={18} />
		</Button>
	);
};

export default AddToCartButton;
