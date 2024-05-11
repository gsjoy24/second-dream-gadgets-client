import { Image, Spin } from 'antd';

const ProductImage = ({ image_path }: { image_path: string }) => {
	return <Image width={80} className='rounded-lg' src={image_path} placeholder={<Spin />} />;
};

export default ProductImage;
