import { Navigate } from 'react-router-dom';
import { selectCurrentUser } from '../redux/features/auth/authSlice';
import { useAppSelector } from '../redux/hooks';

const RouteProtector = ({ role, children }: any) => {
	const user = useAppSelector(selectCurrentUser);

	if (!user) {
		return <Navigate to='/login' />;
	} else if (role && user.role !== role) {
		return <Navigate to='/products' />;
	} else {
		return children;
	}
};

export default RouteProtector;
