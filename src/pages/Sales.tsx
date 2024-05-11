import { Button, Col, Row, Spin, Table, TableColumnsType } from 'antd';
import { useState } from 'react';
import { toast } from 'sonner';
import GMTitle from '../components/GMTitle';
import ProductImage from '../components/ProductImage';
import SalesFilter from '../components/SalesFilter';
import SearchForm from '../components/SearchForm';
import { useDeleteMultipleSalesMutation, useGetSalesQuery } from '../redux/features/sales/sales.api';
import { TProduct } from '../types/TProduct';
import { TSale } from '../types/TSale';
import { TTableData } from '../types/TTableData';
import formatDate from '../utils/formatDate';
type TDataType = Pick<TSale, '_id' | 'customer' | 'product' | 'quantity' | 'createdAt'>;

const Sales = () => {
	const [params, setParams] = useState([]);
	const { data: sales, isLoading, isFetching } = useGetSalesQuery(params);
	let dataSource;
	if (sales) {
		dataSource = sales.data.map((sale: Record<string, unknown>) => ({
			key: sale._id,
			customer: sale.customer,
			product_name: (sale?.product as TProduct)?.product_name,
			product_image: (sale?.product as TProduct)?.product_image,
			quantity: sale.quantity,
			total_price: sale.total_price,
			date: sale.date
		}));
	}
	const [deleteMultipleSales, { isLoading: isDeleting }] = useDeleteMultipleSalesMutation();

	const columns: TableColumnsType<TTableData> = [
		{
			title: 'Image',
			dataIndex: 'product_image',
			width: 110,
			render: (path) => <ProductImage image_path={path} key={path} />,
			fixed: 'left'
		},
		{
			title: 'Customer Name',
			dataIndex: 'customer'
		},
		{
			title: 'Product Name',
			dataIndex: 'product_name'
		},
		{
			title: 'Quantity',
			dataIndex: 'quantity'
		},
		{
			title: 'Total Price',
			dataIndex: 'total_price',
			render: (price) => <span>${price}</span>
		},
		{
			title: 'Date',
			dataIndex: 'date',
			render: (date) => formatDate(date)
		}
	];

	// select products to delete
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
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
		const deletingProducts = await deleteMultipleSales(selectedRowKeys).unwrap();
		if (deletingProducts?.data?.deletedCount === selectedRowKeys.length) {
			toast.success('Selected products deleted successfully!');
		}
	};
	return (
		<div className='relative m-8'>
			<GMTitle title='Sales' />
			<Row className='flex gap-3 items-center my-4'>
				<Col span={3}>
					<SalesFilter setParams={setParams} />
				</Col>
				<Col span={12}>
					<SearchForm setParams={setParams} />
				</Col>
				<Col span={5}>
					<span className='mr-2'>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
					<Button type='dashed' onClick={deleteProducts} disabled={!hasSelected} loading={isDeleting}>
						Delete
					</Button>
				</Col>
			</Row>

			{isLoading ? (
				<Spin fullscreen size='large' tip='Please wait!' />
			) : (
				<Table
					rowSelection={rowSelection}
					columns={columns as TableColumnsType<TDataType>}
					dataSource={dataSource}
					scroll={{ x: 800 }}
					loading={isFetching}
				/>
			)}
		</div>
	);
};

export default Sales;
