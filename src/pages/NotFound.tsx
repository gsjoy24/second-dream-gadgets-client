const NotFound = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
			<div className='max-w-md text-center'>
				<h1 className='text-4xl font-bold text-gray-800 mb-4'>404 - Not Found</h1>
				<p className='text-lg text-gray-600 mb-8'>The page you are looking for does not exist.</p>
				<a href='/' className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>
					Go to Home
				</a>
			</div>
		</div>
	);
};

export default NotFound;
