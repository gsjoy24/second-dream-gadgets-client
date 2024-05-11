import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import RouteProtector from '../components/RouteProtector';
import AddAdmin from '../pages/AddAdmin';
import AddProduct from '../pages/AddProduct';
import Login from '../pages/Login';
import MakeVariant from '../pages/MakeVariant';
import NotFound from '../pages/NotFound';
import Products from '../pages/Products';
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
				path: '/add-admin',
				element: (
					<RouteProtector role='user'>
						<AddAdmin />
					</RouteProtector>
				)
			}
		]
	},
	{
		path: '/login',
		element: <Login />
	}
]);

export default router;
