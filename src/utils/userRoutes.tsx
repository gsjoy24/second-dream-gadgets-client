import { FaListAlt, FaUserShield } from 'react-icons/fa';
import { FaCartFlatbed } from 'react-icons/fa6';
import { IoBarChartSharp } from 'react-icons/io5';
import { MdLibraryAdd } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

let sidebarItems = [
	{
		access_roles: 'user, admin, manager',
		route: {
			key: '1',
			icon: <FaListAlt />,
			label: <NavLink to='/products'>Products</NavLink>
		}
	},
	{
		access_roles: 'user, admin, manager',
		route: {
			key: '2',
			icon: <MdLibraryAdd />,
			label: <NavLink to='/add-product'>Add Products</NavLink>
		}
	},
	{
		access_roles: 'user, admin, manager',
		route: {
			key: '3',
			icon: <IoBarChartSharp />,
			label: <NavLink to='/sales'>Sales</NavLink>
		}
	},
	{
		access_roles: 'admin',
		route: {
			key: '4',
			icon: <FaUserShield />,
			label: <NavLink to='/add-admin'>Add New Admin</NavLink>
		}
	},
	{
		access_roles: 'user, manager',
		route: {
			key: '4',
			icon: <FaCartFlatbed />,
			label: <NavLink to='/checkout'>Cart</NavLink>
		}
	}
];
// if the user role includes the access_roles in the sidebarItems, it will return the route
const userRoutes = (role: string) => {
	return sidebarItems.filter((item) => item.access_roles.includes(role)).map((item) => item.route);
};

export default userRoutes;
