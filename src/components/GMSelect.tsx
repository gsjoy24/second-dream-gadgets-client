import { Form, Select } from 'antd';

type TGMSelectProps = {
	name: string;
	label: string;
	options: { value: string; label: string }[];
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
};
const GMSelect = ({ name, label, options, placeholder, disabled, required }: TGMSelectProps) => {
	return (
		<Form.Item
			label={`Select ${label}`}
			name={name}
			rules={[{ required: required === false ? false : true, message: `Please select ${label}` }]}
		>
			<Select
				className='w-full'
				size='large'
				placeholder={`Select ${placeholder || label}`}
				options={options}
				disabled={disabled}
			/>
		</Form.Item>
	);
};

export default GMSelect;
