import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-900'>
			<div className='max-w-md text-center text-white'>
				<h1 className='text-4xl font-bold mb-4'>404 - Not Found</h1>
				<p className='text-lg mb-8'>The page you are looking for does not exist.</p>
				<Link
					to='/products'
					className='bg-blue-700 hover:bg-blue-900 duration-300 text-white font-bold py-2 px-4 rounded animate-pulse'
				>
					Go to product page
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
