import { Spin } from 'antd';
import { useGetMyCartQuery } from '../redux/features/cart/cartApi';

const CheckOut = () => {
	const { data: cartData, isLoading, isFetching } = useGetMyCartQuery(undefined);

	return (
		<div>
			<h1 className='text-xl font-semibold'>CheckOut</h1>
			{isLoading || isFetching ? (
				<Spin fullscreen />
			) : (
				<>
					{cartData.data.cart.map(({ product, quantity }: Record<string, any>) => (
						<div className='bg-white shadow-md rounded-lg py-2 px-4 my-2 flex items-center justify-between'>
							<h2 className='text-lg font-semibold text-gray-800'>{product?.product_name}</h2>
							<p className='text-sm text-gray-600'>Price: ${product.product_price}</p>

							<div className='flex items-center'>
								<p className='text-sm text-gray-600 mr-2'>Quantity: {quantity}</p>
							</div>
						</div>
					))}
				</>
			)}
		</div>
	);
};

export default CheckOut;
