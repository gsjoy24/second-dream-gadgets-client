import { Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import { selectCurrentUser } from './redux/features/auth/authSlice';
import { useAppSelector } from './redux/hooks';

function App() {
	const user = useAppSelector(selectCurrentUser);
	if (!user) {
		return <Navigate to='/login' />;
	}
	return <MainLayout />;
}

export default App;
