import { Button, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { FaListAlt, FaUserCog, FaUserShield } from 'react-icons/fa';
import { HiLogout } from 'react-icons/hi';
import { IoBarChartSharp } from 'react-icons/io5';
import { MdLibraryAdd } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { logOut, selectCurrentUser } from '../../redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const Sidebar = () => {
	const user = useAppSelector(selectCurrentUser);
	const dispatch = useAppDispatch();

	let sidebarItems = [
		{
			key: '1',
			icon: <FaListAlt />,
			label: <NavLink to='/products'>Products</NavLink>
		},
		{
			key: '2',
			icon: <MdLibraryAdd />,
			label: <NavLink to='/add-product'>Add Products</NavLink>
		},
		{
			key: '3',
			icon: <IoBarChartSharp />,
			label: <NavLink to='/sales'>Sales</NavLink>
		},
		{
			key: '4',
			icon: <FaUserShield />,
			label: <NavLink to='/add-admin'>Add New Admin</NavLink>
		}
	];

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
