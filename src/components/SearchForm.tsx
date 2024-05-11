import { Button, Form } from 'antd';
import Input from 'antd/es/input/Input';
import { IoSearchOutline } from 'react-icons/io5';
const SearchForm = ({ setParams }: any) => {
	const [form] = Form.useForm();
	const onFinish = async ({ search }: any) => {
		const queryData = [
			{
				name: 'search',
				value: search
			}
		];
		setParams((prev: any) => {
			// remove previous search query
			const filtered = prev.filter((item: any) => item.name !== 'search');
			return [...filtered, ...queryData];
		});
	};
	return (
		<Form form={form} className='w-[500px] h-10 my-3' onFinish={onFinish}>
			<Form.Item name='search'>
				<div className='flex border rounded-l-lg shadow-lg'>
					<Input placeholder='Search' className='border-0 rounded-none rounded-l-lg' size='large' />
					<Button htmlType='submit' size='large' type='primary' className='rounded-none rounded-r-lg'>
						<IoSearchOutline size={18} />
					</Button>
				</div>
			</Form.Item>
		</Form>
	);
};

export default SearchForm;
