import { Form, Input } from 'antd';

type TGMInputProps = {
	name: string;
	placeholder?: string;
	label: string;
	type?: string;
	required?: boolean;
};
const GMInput = ({ name, placeholder, label, type, required }: TGMInputProps) => {
	return (
		<Form.Item label={label} name={name} rules={[{ required: required ?? true, message: `Please enter ${label}!` }]}>
			<Input size='large' placeholder={placeholder ?? label} type={type ?? 'text'} />
		</Form.Item>
	);
};

export default GMInput;
