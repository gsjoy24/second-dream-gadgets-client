import { AiFillSound } from 'react-icons/ai';
const GMTitle = ({ title }: { title: string }) => {
	return (
		<h1 className='text-3xl font-semibold text-gray-800 flex items-end gap-4'>
			<AiFillSound size={25} />
			{title}
		</h1>
	);
};

export default GMTitle;
