import { Layout } from 'antd';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
const { Content } = Layout;

const MainLayout = () => {
	const navigate = useNavigate();
	useEffect(() => {
		navigate('/products');
	}, [navigate]);

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<div className='sticky top-0 left-0 max-h-[100vh]'>
				<Sidebar />
			</div>
			<Layout>
				<Content>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
};

export default MainLayout;
