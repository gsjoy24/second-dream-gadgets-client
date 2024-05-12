import { Button, Form, Input, Spin } from 'antd';
import { useState } from 'react';
import { FaEnvelope, FaLock, FaUserCog } from 'react-icons/fa';
import { toast } from 'sonner';
import GMSelect from '../components/GMSelect';
import { useAddAdminOrManagerMutation } from '../redux/features/auth/authApi';

const AddAdmin = () => {
	const [form] = Form.useForm();
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
	const options = [
		{ value: 'admin', label: 'Admin' },
		{ value: 'manager', label: 'Manager' }
	];

	const [addAdminOrManager, { isLoading }] = useAddAdminOrManagerMutation();
	const onFinish = async (data: any) => {
		try {
			await addAdminOrManager(data).unwrap();
			toast.success(`${data.role} added successfully!`);
		} catch (error: any) {
			// show error message
			console.log('error', error);
			toast.error((error as any)?.data?.errorMessage || 'Something went wrong!');
		}
	};
	return (
		<div className='flex flex-col justify-center items-center min-h-[70vh] p-12'>
			<Form className='max-w-96 w-full' form={form} name='horizontal_login' layout='vertical' onFinish={onFinish}>
				<h1 className='text-2xl font-bold text-center mb-8'>Add new Admin or Manager</h1>
				{/* name field */}
				<Form.Item name='name' rules={[{ required: true, message: 'Please input the name!' }]}>
					<Input className='p-3' prefix={<FaUserCog className='site-form-item-icon text-xl' />} placeholder='Name' />
				</Form.Item>
				{/* email field */}
				<Form.Item name='email' rules={[{ required: true, message: 'Please input the email!' }]}>
					<Input className='p-3' prefix={<FaEnvelope className='site-form-item-icon' />} placeholder='Email' />
				</Form.Item>
				<GMSelect name='role' options={options} placeholder='Role' />
				{/* password field */}
				<Form.Item
					name='password'
					rules={[{ required: true, message: 'Please input the password!' }]}
					extra='Password must contain 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character'
				>
					<Input.Password
						className='p-3'
						prefix={<FaLock className='site-form-item-icon' />}
						type='password'
						placeholder='Password'
						visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
					/>
				</Form.Item>{' '}
				<Form.Item shouldUpdate>
					{() => (
						<Button className='p-2 h-max shadow-lg' type='dashed' htmlType='submit' block>
							{isLoading ? <Spin /> : 'Add Admin/Manager'}
						</Button>
					)}
				</Form.Item>
			</Form>
		</div>
	);
};

export default AddAdmin;
