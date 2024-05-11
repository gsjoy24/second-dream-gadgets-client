import { Button, Col, Form, Modal, Row } from 'antd';
import { useState } from 'react';
import { toast } from 'sonner';

import { useAddSaleMutation } from '../redux/features/sales/sales.api';
import GMDatePicker from './GMDatePicker';
import GMInput from './GMInput';

const SellModal = ({ sellingItem }: any) => {
	const [isSellModalOpen, setIsSellModalOpen] = useState<boolean>(false);
	const showModal = () => setIsSellModalOpen(true);
	const [form] = Form.useForm();
	const [addSale, { isLoading }] = useAddSaleMutation();
	const handleSell = async (data: any) => {
		data.product = sellingItem?.key;
		data.total_price = sellingItem?.product_price * data.quantity;
		data.quantity = Number(data.quantity);
		data.date = data.date.toISOString();

		try {
			await addSale(data).unwrap();
			toast.success('Product sold successfully');
		} catch (error: any) {
			console.log({ error });
			// show error message
			toast.error((error as any)?.data?.errorMessage || 'Something went wrong!');
		}
		setIsSellModalOpen(false);
	};
	return (
		<>
			<Button type='dashed' onClick={showModal}>
				Sell
			</Button>
			<Modal
				title={`Selling ${sellingItem?.product_name}`}
				open={isSellModalOpen}
				onCancel={() => setIsSellModalOpen(false)}
				footer={null}
			>
				
			</Modal>
		</>
	);
};

export default SellModal;
