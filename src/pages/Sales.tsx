import { Button, Col, Row, Spin, Table, TableColumnsType } from 'antd';
import { useState } from 'react';
import { toast } from 'sonner';
import GMTitle from '../components/GMTitle';
import ProductImage from '../components/ProductImage';
import SalesFilter from '../components/SalesFilter';
import SearchForm from '../components/SearchForm';
import { useDeleteMultipleSalesMutation, useGetSalesQuery } from '../redux/features/sales/sales.api';
import { TProduct, TSoldProduct } from '../types/TProduct';
import { TSale } from '../types/TSale';
import { TTableData } from '../types/TTableData';
import formatDate from '../utils/formatDate';
type TDataType = Pick<TSale, '_id' | 'customer' | 'product' | 'quantity' | 'createdAt'>;

const Sales = () => {
	const [params, setParams] = useState([]);
	const { data: sales, isLoading, isFetching } = useGetSalesQuery(params);
	let dataSource;

	if (sales) {
		dataSource = sales?.data.map((sale: Record<string, unknown>) => ({
			key: sale._id,
			customer: sale.customer_name,
			contact: sale.contact_number,
			seller: sale?.sold_by,
			products: sale.products,
			total_amount: sale.total_amount,
			date: sale.selling_date
		}));
	}

	const [deleteMultipleSales, { isLoading: isDeleting }] = useDeleteMultipleSalesMutation();

	const columns: TableColumnsType<TTableData> = [
		{
			title: 'Customer Name',
			dataIndex: 'customer'
		},
		{
			title: 'Contact Number',
			dataIndex: 'contact'
		},
		{
			title: 'Seller',
			dataIndex: 'seller',
			render: (seller) => (
				<div className='flex flex-col'>
					<span>{seller?.name}</span>
					<span>{seller?.email}</span>
				</div>
			)
		},
		{
			title: 'Products',
			dataIndex: 'products',
			render: (products: any) => (
				<div className='flex gap-3'>
					{products.map((product: TSoldProduct) => (
						<div className='flex gap-2 border-r min-w-[90px]' key={`${product?.price}`}>
							<div className='flex flex-col'>
								<span>{product.product_name}</span>
								<span>Price: ${product?.price}</span>
								<span>Quantity: {product.quantity}</span>
							</div>
						</div>
					))}
				</div>
			)
		},
		{
			title: 'Total amount',
			dataIndex: 'total_amount',
			render: (amount) => <span>${amount}</span>
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
