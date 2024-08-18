import { Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../redux/features/product/productApi';
import AddProduct from './AddProduct';

const MakeVariant = () => {
	const { id } = useParams();
	const { data } = useGetProductByIdQuery(id as string);
	if (data) {
		// destructuring the unwanted fields from the data
		const { _id, updated_at, created_at, __v, isDeleted, ...product } = data?.data ?? {};
		return <AddProduct defaultValues={product} title={`Make a new variant of ${product?.product_name}`} />;
	}
	return <Spin fullscreen size='large' tip='Please wait!' />;
};

export default MakeVariant;
