import MainLayout from './components/Layout/MainLayout';
import ProtectedRoute from './components/Layout/ProtectedRoute';

function App() {
	return (
		<ProtectedRoute>
			<MainLayout />
		</ProtectedRoute>
	);
}

export default App;
