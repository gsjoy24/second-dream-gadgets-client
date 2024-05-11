import { Button, Space, TableColumnsType } from 'antd';
import { FaClone, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ProductImage from '../components/ProductImage';
import {
  allBrands,
  cameraResolutions,
  categories,
  connectives,
  operatingSystems,
  powerSources,
  ramCapacities,
  screenResolutions,
  storageCapacities
} from '../constants';
import { TTableData } from '../types/TTableData';
import AddToCartButton from './AddToCartButton';

const ProductColumn: TableColumnsType<TTableData> = [
	{
		title: 'Image',
		dataIndex: 'product_image',
		width: 110,
		render: (path) => <ProductImage image_path={path} key={path} />,
		fixed: 'left'
	},
	{
		title: 'Name',
		dataIndex: 'product_name',
		className: 'w-40'
	},
	{
		title: 'Category',
		dataIndex: 'category',
		filters: categories.map((category) => ({ text: category, value: category }))
	},
	{
		title: 'Brand',
		dataIndex: 'brand',
		filters: allBrands.map((brand) => ({ text: brand, value: brand }))
	},
	{
		title: 'Model',
		dataIndex: 'model_number'
	},
	{
		title: 'Operating System',
		dataIndex: 'operating_system',
		filters: operatingSystems.map((os) => ({ text: os, value: os }))
	},
	{
		title: 'RAM Capacity',
		dataIndex: 'ram_capacity',
		filters: ramCapacities.map((ram) => ({ text: ram, value: ram }))
	},
	{
		title: 'Storage Capacity',
		dataIndex: 'storage_capacity',
		filters: storageCapacities.map((storage) => ({ text: storage, value: storage }))
	},
	{
		title: 'Connectivity',
		dataIndex: 'connectivity',
		filters: connectives.map((connectivity) => ({ text: connectivity, value: connectivity }))
	},
	{
		title: 'Power Source',
		dataIndex: 'power_source',
		filters: powerSources.map((power) => ({ text: power, value: power }))
	},
	{
		title: 'Screen Resolution',
		dataIndex: 'screen_resolution',
		filters: screenResolutions.map((resolution) => ({ text: resolution, value: resolution }))
	},
	{
		title: 'Camera Resolution',
		dataIndex: 'camera_resolution',
		filters: cameraResolutions.map((resolution) => ({ text: resolution, value: resolution }))
	},
	{
		title: 'Price',
		dataIndex: 'product_price'
	},
	{
		title: 'Quantity',
		dataIndex: 'quantity'
	},
	{
		title: 'Warranty (Months)',
		dataIndex: 'warranty'
	},
	{
		title: 'Actions',
		render: (text, record) => (
			<Space className='flex flex-col'>
				<Space size='small'>
					{/* link to make a new variant of an existing product */}
					<Link to={`/make-variant/${record.key}`}>
						<Button type='dashed' title='Make a variant'>
							<FaClone size={18} />
						</Button>
					</Link>
					{/* link to update product */}
					<Link to={`/update/${record.key}`}>
						<Button type='dashed' title='Update product'>
							<FaEdit size={18} />
						</Button>
					</Link>
				</Space>
				<AddToCartButton id={record.key} />
			</Space>
		),
		width: 120,
		fixed: 'right'
	}
];

export default ProductColumn;
