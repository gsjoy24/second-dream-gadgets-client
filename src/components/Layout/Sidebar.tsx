import { Button, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { FaUserCog } from 'react-icons/fa';
import { HiLogout } from 'react-icons/hi';
import { logOut, selectCurrentUser } from '../../redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import userRoutes from '../../utils/userRoutes';

const Sidebar = () => {
	const user = useAppSelector(selectCurrentUser);

	const dispatch = useAppDispatch();
	const sidebarItems = userRoutes(user?.role as string);

	return (
		<Sider breakpoint='lg' collapsedWidth='0' className='min-h-[100vh]'>
			<div style={{ height: '2rem', textAlign: 'center', color: 'white', marginTop: '20px' }}>
				<h1 className='font-semibold text-lg'>Dream Gadgets</h1>
			</div>
			<Menu theme='dark' mode='inline' defaultSelectedKeys={['1']} items={sidebarItems} />
			<div className='absolute bottom-5 p-2 w-full text-white '>
				<div className='flex flex-row items-center gap-2 p-2 mb-2'>
					<FaUserCog size={20} />
					{user?.name}
				</div>
				<Button
					className='w-full text-white flex justify-center  items-center gap-2'
					onClick={() => dispatch(logOut())}
					type='dashed'
				>
					Logout <HiLogout />
				</Button>
			</div>
		</Sider>
	);
};

export default Sidebar;
