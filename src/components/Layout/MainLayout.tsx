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
				<Content style={{ margin: '24px 16px 0' }}>
					<div
						style={{
							padding: 24,
							minHeight: 360
						}}
					>
						<Outlet />
					</div>
				</Content>
			</Layout>
		</Layout>
	);
};

export default MainLayout;
