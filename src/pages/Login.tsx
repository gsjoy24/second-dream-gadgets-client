import { Button, Form, Input, Spin } from 'antd';
import { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { selectCurrentToken, setUser } from '../redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { TUser } from '../types/TAuthState';
import { verifyToken } from '../utils/verifyToken';

const Login = () => {
	// check if user is already logged in. If yes, redirect to products page
	const token: string | null = useAppSelector(selectCurrentToken);
	if (token) {
		return <Navigate to='/products' replace />;
	}

	const [form] = Form.useForm();
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [login, { isLoading }] = useLoginMutation();

	const onFinish = async (data: any) => {
		try {
			const res = await login(data).unwrap();
			const userInfo = verifyToken(res?.data?.token) as TUser;

			// save user info and token in redux store
			dispatch(setUser({ user: userInfo, token: res.data.token }));
			toast.success('Logged in successfully!');
			// redirect to products page after successful login
			navigate(`/products`);
		} catch (error: any) {
			console.log({ error });

			// show error message
			toast.error((error as any)?.data?.message || 'Something went wrong!');
		}
	};
	//TODO: remove password and email default values before production
	// !This is the default values for the form fields if needed
	const defaultValues = {
		email: 'superAdmin@gmail.com',
		password: 'superAdmin0'
	};

	// const defaultValues = {
	// 	email: 'gour.joy24@gmail.com',
	// 	password: 'GourPr00'
	// };

	return (
		<div className='bg-gray-900 flex flex-col justify-center items-center h-[100vh]'>
			<Form
				className='max-w-80 w-full'
				form={form}
				name='horizontal_login'
				layout='vertical'
				onFinish={onFinish}
				initialValues={defaultValues}
			>
				<h1 className='text-white text-4xl font-bold text-center mb-12'>Dream Gadgets</h1>
				<Form.Item name='email' rules={[{ required: true, message: 'Please input your email!' }]}>
					<Input className='p-3' prefix={<FaEnvelope className='site-form-item-icon' />} placeholder='Email' />
				</Form.Item>
				<Form.Item name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
					<Input.Password
						className='p-3 mt-3'
						prefix={<FaLock className='site-form-item-icon' />}
						type='password'
						placeholder='Password'
						visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
					/>
				</Form.Item>
				<Form.Item shouldUpdate>
					{() => (
						<Button className='text-white p-2 h-max' type='dashed' htmlType='submit' block>
							{isLoading ? <Spin /> : 'Login'}
						</Button>
					)}
				</Form.Item>
			</Form>
		</div>
	);
};

export default Login;
