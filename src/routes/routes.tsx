import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import AddAdminOrManager from '../pages/AddAdminOrManager';
import AddProduct from '../pages/AddProduct';
import CheckOut from '../pages/CheckOut';
import Login from '../pages/Login';
import MakeVariant from '../pages/MakeVariant';
import NotFound from '../pages/NotFound';
import Products from '../pages/Products';
import Registration from '../pages/Registration';
import Sales from '../pages/Sales';
import UpdateProduct from '../pages/UpdateProduct';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <NotFound />,
		children: [
			{
				path: '/products',
				element: <Products />
			},
			{
				path: '/add-product',
				element: <AddProduct />
			},
			{
				path: '/make-variant/:id',
				element: <MakeVariant />
			},
			{
				path: '/update/:id',
				element: <UpdateProduct />
			},
			{
				path: '/sales',
				element: <Sales />
			},
			{
				path: '/checkout',
				element: <CheckOut />
			},
			{
				path: '/add-admin',
				element: <AddAdminOrManager />
			}
		]
	},
	{
		path: '/registration',
		element: <Registration />
	},
	{
		path: '/login',
		element: <Login />
	}
]);

export default router;
