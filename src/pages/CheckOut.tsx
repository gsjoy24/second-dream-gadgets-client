import { Button, Col, Divider, Form, Modal, Row, Spin } from 'antd';
import CartItem from '../components/CartItem';
import GMDatePicker from '../components/GMDatePicker';
import GMInput from '../components/GMInput';
import { useGetMyCartQuery } from '../redux/features/cart/cartApi';

const CheckOut = () => {
	const [form] = Form.useForm();
	const { data: cartData, isLoading, isFetching } = useGetMyCartQuery(undefined);
	const handleSell = () => {};

	return (
		<div className='h-[100vh]'>
			{isLoading || isFetching ? (
				<Spin fullscreen />
			) : (
				<div className='flex h-full gap-10 justify-center items-center'>
					<Col span={10} className='min-h-[500px] p-5'>
						<Form form={form} layout='vertical' onFinish={handleSell}>
							<Row gutter={10}>
								<Col span={24}>
									<h1 className='text-3xl font-bold mb-5'>CheckOut</h1>
									<GMInput name='customer_name' label='Customer Name' />
									<GMInput name='contact_number' label='Contact Number' />
									<GMDatePicker name='selling_date' label='Selling Date' />
									<Button htmlType='submit' type='primary' block loading={isLoading}>
										Sell
									</Button>
								</Col>
							</Row>
						</Form>
					</Col>
					<Col span={13} className='h-full flex items-center bg-gray-900 p-5 text-white border-l-2 border-blue-500'>
						<div className='max-h-[600px] w-full overflow-y-auto p-2'>
							<h1 className='text-xl font-semibold mb-5'>Cart</h1>
							{cartData.data?.cart?.map(({ product, quantity }: any) => (
								<CartItem product={product} quantity={quantity} key={product._id} />
							))}

							<hr className='bg-slate-50' />
							<div className='flex justify-between items-center'>
								<h1 className='font-semibold'>Subtotal</h1>
								<p>${cartData.data?.total_amount} /=</p>
							</div>
							<div className='flex justify-between items-center my-3'>
								<h1 className='font-semibold'>Discount</h1>
								<p className='text-red-500'>Not applicable</p>
							</div>
							<hr className='bg-slate-50' />
							<div className='flex justify-between items-center'>
								<h1 className='text-lg font-semibold'>Total</h1>
								<p>${cartData.data?.total_amount} /=</p>
							</div>
						</div>
					</Col>
				</div>
			)}
		</div>
	);
};

export default CheckOut;
