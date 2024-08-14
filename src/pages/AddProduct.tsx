import { Button, Col, Form, Row } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import GMInput from '../components/GMInput';
import GMSelect from '../components/GMSelect';
import GMTitle from '../components/GMTitle';
import {
	cameraOptions,
	cameraResolutionOptions,
	categoryOptions,
	connectivityOptions,
	laptopAndDesktopOptions,
	osOptions,
	powerSourceOptions,
	ramCapacityOptions,
	screenResolutionOptions,
	smartphoneAndTabletOptions,
	storageCapacityOptions
} from '../constants';
import { useAddProductMutation, useUpdateProductMutation } from '../redux/features/product/productApi';
import { TProduct } from '../types/TProduct';

type TAddProductProps = {
	defaultValues?: TProduct;
	title?: string;
	action?: string;
	id?: string;
};
const AddProduct = ({ defaultValues, title, action, id }: TAddProductProps) => {
	const navigate = useNavigate();
	const [addProduct, { isLoading: adding }] = useAddProductMutation();
	const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();

	const [form] = Form.useForm();
	const selectedCategory = Form.useWatch('category', form);

	let optionsForBrands = [] as { value: string; label: string }[];

	// setting options for brands based on selected category
	switch (selectedCategory) {
		case 'Laptop':
		case 'Desktop':
			optionsForBrands = laptopAndDesktopOptions;
			break;
		case 'Smartphone':
		case 'Tablet':
			optionsForBrands = smartphoneAndTabletOptions;
			break;
		case 'Camera':
			optionsForBrands = cameraOptions;
			break;
		default:
			optionsForBrands = [];
			break;
	}

	const onFinish = async (data: any) => {
		const modifiedData = {
			...data,
			product_price: +data.product_price,
			quantity: +data.quantity,
			warranty: +data.warranty,
			weight: +data.weight
		};

		try {
			let res: any;
			if (action === 'update') {
				modifiedData.id = id;
				res = await updateProduct(modifiedData).unwrap();
			} else {
				res = await addProduct(modifiedData).unwrap();
			}
			if (res.success) {
				toast.success(res?.message);
				form.resetFields();

				// if defaultValues is present then it means we are making a variant product, so we will navigate to products page after adding the product
				if (defaultValues) {
					navigate('/products');
				}
			}
		} catch (error: any) {
			console.log({ error });
			// show error message
			toast.error((error as any)?.data?.errorMessage || 'Something went wrong!');
		}
	};
	return (
		<Row gutter={[20, 20]} className='p-6 w-full overflow-hidden'>
			<Col span={24}>
				<GMTitle title={title || 'Add new product'} />
			</Col>
			<Col span={24}>
				<Form
					className='w-full'
					form={form}
					name='horizontal_login'
					layout='vertical'
					onFinish={onFinish}
					// setting default values if we are making a variant product
					initialValues={defaultValues || {}}
				>
					<Row gutter={16}>
						<Col span={12}>
							<GMInput name='product_name' placeholder='Product Name' label='Product Name' />
						</Col>
						<Col span={12}>
							<GMInput name='product_image' label='Product image link' />
						</Col>

						<Col span={6}>
							<GMSelect name='category' label='Category' options={categoryOptions} />
						</Col>

						<Col span={6}>
							<GMSelect name='brand' label='Brand' options={optionsForBrands} disabled={!selectedCategory} />
						</Col>
						<Col span={6}>
							<GMInput name='model_number' placeholder='exm. iPhone 13, S24 Ultra' label='model' />
						</Col>
						<Col span={6}>
							<GMInput name='product_price' placeholder='Product Price' label='Product Price' type='number' />
						</Col>
						<Col span={6}>
							<GMInput name='quantity' label='Product quantity' type='number' />
						</Col>
						<Col span={6}>
							<GMSelect name='operating_system' label='Operating system' options={osOptions} />
						</Col>
						<Col span={6}>
							<GMSelect name='connectivity' label='Connectivity' options={connectivityOptions} />
						</Col>
						<Col span={6}>
							<GMSelect name='power_source' label='power source' options={powerSourceOptions} />
						</Col>
						<Col span={6}>
							<GMSelect name='camera_resolution' label='Camera resolution' options={cameraResolutionOptions} />
						</Col>
						<Col span={6}>
							<GMSelect
								name='storage_capacity'
								label='Storage capacity'
								options={storageCapacityOptions}
								required={false}
							/>
						</Col>
						<Col span={6}>
							<GMSelect name='screen_resolution' label='Screen resolution' options={screenResolutionOptions} />
						</Col>
						<Col span={6}>
							<GMSelect name='ram_capacity' label='Ram capacity' options={ramCapacityOptions} required={false} />
						</Col>
						<Col span={6}>
							<GMInput
								name='warranty'
								label='Product warranty (in month)'
								placeholder='exm. 12, 24, 36'
								type='number'
							/>
						</Col>
						<Col span={6}>
							<GMInput name='weight' label='Product weight (in gram)' placeholder='exm. 100, 200' type='number' />
						</Col>

						<Col span={24}>
							<Button
								loading={adding || updating}
								className='p-2 h-max shadow-lg border-gray-400'
								type='dashed'
								htmlType='submit'
								block
							>
								Submit
							</Button>
						</Col>
					</Row>
				</Form>
			</Col>
		</Row>
	);
};

export default AddProduct;
