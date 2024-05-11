import { Button, Space, Spin, Table, TableColumnsType, TableProps } from 'antd';
import { useState } from 'react';
import { toast } from 'sonner';
import ProductColumn from '../components/ProductColumn';
import SearchForm from '../components/SearchForm';
import { useDeleteMultipleProductsMutation, useGetProductsQuery } from '../redux/features/product/productApi';
import { TProduct } from '../types/TProduct';
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
		<div className='relative m-8'>
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
					columns={ProductColumn as TableColumnsType<TDataType>}
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
