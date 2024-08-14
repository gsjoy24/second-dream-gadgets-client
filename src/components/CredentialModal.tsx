import { Button, Modal } from 'antd';
import { useState } from 'react';

const CredentialModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};
	return (
		<>
			<Button type='dashed' onClick={toggleModal} className='absolute top-8 right-8 text-white'>
				See Testing Credentials
			</Button>
			<Modal
				title={<h2 className='text-2xl mb-6'>Testing Credentials</h2>}
				open={isModalOpen}
				footer={<></>}
				onCancel={toggleModal}
				className='text-lg'
			>
				<pre className='text-lg'>
					--For Super Admin
					<br />
					email: superAdmin@gmail.com <br />
					password: superAdmin0
					<br />
					<br />
					--For Manager
					<br />
					email: manager@gmail.com
					<br />
					password: ManagerPr0
					<br />
					<br />
					--For User
					<br />
					email: user@gmail.com
					<br />
					password: UserPr00
				</pre>
			</Modal>
		</>
	);
};

export default CredentialModal;
