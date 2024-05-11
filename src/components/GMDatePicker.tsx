import { DatePicker, Form } from 'antd';

type TGMInputProps = {
	name: string;
	placeholder?: string;
	label: string;
	required?: boolean;
};
const GMDatePicker = ({ name, placeholder, label, required }: TGMInputProps) => {
	return (
		<Form.Item label={label} name={name} rules={[{ required: required || true, message: `Please enter ${label}!` }]}>
			<DatePicker placeholder={placeholder} size='large' className='w-full' format={'YYYY-MM-DD'} />
		</Form.Item>
	);
};

export default GMDatePicker;
