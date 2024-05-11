import { Button, Space, Spin, Table, TableColumnsType, TableProps } from 'antd';
import { useState } from 'react';
import { FaClone, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import ProductImage from '../components/ProductImage';
import SearchForm from '../components/SearchForm';

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

import { useDeleteMultipleProductsMutation, useGetProductsQuery } from '../redux/features/product/productApi';

import AddToCartButton from '../components/AddToCartButton';
import { TProduct } from '../types/TProduct';
import { TTableData } from '../types/TTableData';
import { TQueryParams } from '../types/global.type';

type TDataType = Pick<
	TProduct,
	| '_id'
	| 'brand'
	| 'camera_resolution'
	| 'category'
	| 'connectivity'
	| 'model_number'
	| 'operating_system'
	| 'power_source'
	| 'product_image'
	| 'product_name'
	| 'product_price'
	| 'quantity'
	| 'ram_capacity'
	| 'screen_resolution'
	| 'storage_capacity'
	| 'warranty'
>;

const Products = () => {
	// columns for the table
	const columns: TableColumnsType<TTableData> = [
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

	// fetch products with query params
	const [params, setParams] = useState([]);
	const { data: products, isLoading, isFetching } = useGetProductsQuery(params);
	let dataSource;
	if (products) {
		dataSource = products.data.map((product: Record<string, unknown>) => ({
			key: product._id,
			product_name: product.product_name,
			category: product.category,
			brand: product.brand,
			operating_system: product.operating_system,
			ram_capacity: product.ram_capacity,
			storage_capacity: product.storage_capacity,
			connectivity: product.connectivity,
			power_source: product.power_source,
			screen_resolution: product.screen_resolution,
			camera_resolution: product.camera_resolution,
			product_price: product.product_price,
			quantity: product.quantity,
			product_image: product.product_image,
			model_number: product.model_number,
			warranty: product.warranty
		}));
	}

	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [deleteMultipleProducts, { isLoading: isDeleting }] = useDeleteMultipleProductsMutation();

	// select products to delete
	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		setSelectedRowKeys(newSelectedRowKeys);
	};
	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange
	};
	const hasSelected = selectedRowKeys.length > 0;

	// delete multiple products
	const deleteProducts = async () => {
		setSelectedRowKeys([]);
		const deletingProducts = await deleteMultipleProducts(selectedRowKeys).unwrap();
		if (deletingProducts.data.modifiedCount === selectedRowKeys.length) {
			toast.success('Selected products deleted successfully!');
		}
	};

	// handle filter,
	const onChange: TableProps<TDataType>['onChange'] = (pagination, filters, sorter, extra) => {
		if (extra.action === 'filter') {
			const queryArray: TQueryParams[] = [];
			for (const key in filters) {
				// Check if the key has a valid array value and is not 'name'
				if (Array.isArray(filters?.[key])) {
					// Iterate over the array values and push objects to resultArray
					filters?.[key]?.forEach((value) => {
						queryArray.push({
							name: key,
							value: String(value)
						});
					});
				}
			}

			setParams(queryArray as any);
		}
	};

	return (
		<div className='relative'>
			<SearchForm setParams={setParams} />
			<div className='my-3 absolute right-0 -top-2'>
				<Button type='dashed' onClick={deleteProducts} disabled={!hasSelected} loading={isDeleting}>
					Delete
				</Button>
				<span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
			</div>

			{isLoading ? (
				<Spin fullscreen size='large' tip='Please wait!' />
			) : (
				<Table
					rowSelection={rowSelection}
					columns={columns as TableColumnsType<TDataType>}
					dataSource={dataSource}
					onChange={onChange}
					scroll={{ x: 2000 }}
					loading={isFetching}
				/>
			)}
		</div>
	);
};

export default Products;
