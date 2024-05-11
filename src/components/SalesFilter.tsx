import { Select } from 'antd';
import { FaCalendarDays } from 'react-icons/fa6';
const filterValues = ['All', 'Daily', 'Weekly', 'Monthly', 'Yearly'];
type TFilterItems = {
	value: string;
	label: string;
};
const items: TFilterItems[] = filterValues.map((value) => ({
	value: value.toLowerCase(),
	label: value
}));

const SalesFilterDropDown = ({ setParams }: any) => {
	const handleFilter = (value: string) => {
		const queryData = [
			{
				name: 'salePeriod',
				value: value
			}
		];
		setParams((prev: any) => {
			// remove previous search query
			const filtered = prev.filter((item: any) => item.name !== 'salePeriod');
			return [...filtered, ...queryData];
		});
	};
	return (
		<Select
			style={{ width: 120 }}
			onChange={handleFilter}
			options={items}
			size='large'
			placeholder={<Placeholder />}
			className='shadow-md rounded-lg'
		/>
	);
};

const Placeholder = () => (
	<div className='flex text-gray-400 items-center gap-2'>
		<FaCalendarDays />
		Filter
	</div>
);

export default SalesFilterDropDown;
