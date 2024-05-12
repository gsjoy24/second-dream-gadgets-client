import { Button, Form, Input, Spin } from 'antd';
import { useState } from 'react';
import { FaEnvelope, FaLock, FaUserCog } from 'react-icons/fa';
import { toast } from 'sonner';

import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../redux/features/auth/authApi';

const Registration = () => {
	const [form] = Form.useForm();
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
	const navigate = useNavigate();

	const [registerUser, { isLoading }] = useRegisterUserMutation();
	const onFinish = async (data: any) => {
		try {
			await registerUser(data).unwrap();
			form.resetFields();
			toast.success(`${data.role} added successfully! Please login to continue!`);
			navigate('/login');
		} catch (error: any) {
			toast.error((error as any)?.data?.errorMessage || 'Something went wrong!');
		}
	};
	return (
		<div className='flex flex-col justify-center items-center min-h-[100vh] p-12 bg-gray-900  text-white'>
			<Form
				className='max-w-96 w-full text-white'
				form={form}
				name='horizontal_login'
				layout='vertical'
				onFinish={onFinish}
			>
				<h1 className='text-2xl font-bold text-center mb-8 text-white'>Register as a user</h1>
				{/* name field */}
				<Form.Item name='name' rules={[{ required: true, message: 'Please input the name!' }]}>
					<Input className='p-3' prefix={<FaUserCog className='site-form-item-icon text-xl' />} placeholder='Name' />
				</Form.Item>
				{/* email field */}
				<Form.Item name='email' rules={[{ required: true, message: 'Please input the email!' }]}>
					<Input className='p-3' prefix={<FaEnvelope className='site-form-item-icon' />} placeholder='Email' />
				</Form.Item>
				{/* password field */}
				<Form.Item name='password' rules={[{ required: true, message: 'Please input the password!' }]}>
					<Input.Password
						className='p-3'
						prefix={<FaLock className='site-form-item-icon' />}
						type='password'
						placeholder='Password'
						visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
					/>
				</Form.Item>
				<p className='mb-2'>
					Password must contain 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character
				</p>
				<Form.Item shouldUpdate>
					{() => (
						<Button className='p-2 h-max shadow-lg text-white' type='dashed' htmlType='submit' block>
							{isLoading ? <Spin /> : 'Register'}
						</Button>
					)}
				</Form.Item>
			</Form>
			<div>
				<p className='text-white text-center mt-2'>
					Already have an account?{' '}
					<span
						className='text-blue-500 cursor-pointer'
						onClick={() => {
							navigate('/login');
						}}
					>
						Login here
					</span>
				</p>
			</div>
		</div>
	);
};

export default Registration;
