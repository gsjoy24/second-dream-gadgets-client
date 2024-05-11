import { NavLink } from 'react-router-dom';
import { useGetMyCartQuery } from '../redux/features/cart/cartApi';

const CartLink = () => {
	const { data: cartData, isLoading, isFetching } = useGetMyCartQuery(undefined);
	const cartCount = cartData?.data.cart.length;
	return (
		<NavLink to='/checkout'>
			<span className='flex gap-4 items-center'>
				Cart{' '}
				<span className='h-5 w-5 rounded-full flex justify-center items-center bg-white relative text-gray-950 -top-2 -left-3 text-[12px]'>
					{cartCount < 10 ? `0${cartCount}` : cartCount}
				</span>
			</span>
		</NavLink>
	);
};

export default CartLink;
