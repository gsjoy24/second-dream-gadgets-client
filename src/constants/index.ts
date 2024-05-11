const categories = ['Laptop', 'Desktop', 'Smartphone', 'Tablet', 'Camera', 'other'];
const categoryOptions = categories.map((category) => ({ label: category, value: category }));

const laptopAndDesktopBrands = [
	'Apple',
	'Samsung',
	'Sony',
	'Dell',
	'HP',
	'Lenovo',
	'Acer',
	'Asus',
	'Microsoft',
	'Google',
	'Huawei',
	'Xiaomi',
	'OnePlus',
	'Realme',
	'Vivo',
	'Oppo',
	'Motorola',
	'Nokia',
	'LG',
	'Toshiba',
	'MSI',
	'Razer',
	'Alienware',
	'Gigabyte',
	'Aorus'
];
const laptopAndDesktopOptions = laptopAndDesktopBrands.map((brand) => ({ label: brand, value: brand }));

const smartphoneAndTabletBrands = [
	'Apple',
	'Samsung',
	'Sony',
	'Google',
	'Huawei',
	'Xiaomi',
	'OnePlus',
	'Realme',
	'Vivo',
	'Oppo',
	'Motorola',
	'Nokia',
	'LG'
];
const smartphoneAndTabletOptions = smartphoneAndTabletBrands.map((brand) => ({ label: brand, value: brand }));

const cameraBrands = ['Canon', 'Nikon', 'Olympus', 'Panasonic', 'Fujifilm', 'Sony', 'Samsung', 'GoPro', 'Leica'];
const cameraOptions = cameraBrands.map((brand) => ({ label: brand, value: brand }));
const allBrands = [...new Set([...laptopAndDesktopBrands, ...smartphoneAndTabletBrands, ...cameraBrands])];

const operatingSystems = ['Windows', 'MacOS', 'Linux', 'Android', 'iOS', 'iPadOS', 'ChromeOS', 'FireOS', 'other'];
const osOptions = operatingSystems.map((os) => ({ label: os, value: os }));

const connectives = ['WiFi', 'Bluetooth', 'USB', 'HDMI', 'VGA'];
const connectivityOptions = connectives.map((connectivity) => ({ label: connectivity, value: connectivity }));

const powerSources = ['Battery', 'AC_Adapter'];
const powerSourceOptions = powerSources.map((powerSource) => ({ label: powerSource, value: powerSource }));

const storageCapacities = ['128GB', '256GB', '512GB', '1TB', '2TB', '4TB', '8TB', '16TB'];
const storageCapacityOptions = storageCapacities.map((storageCapacity) => ({
	label: storageCapacity,
	value: storageCapacity
}));

const ramCapacities = ['2GB', '4GB', '8GB', '16GB', '32GB', '64GB', '128GB', '256GB'];
const ramCapacityOptions = ramCapacities.map((ramCapacity) => ({ label: ramCapacity, value: ramCapacity }));

const cameraResolutions = ['12MP', '16MP', '20MP', '24MP', '32MP', '48MP', '64MP', '108MP'];
const cameraResolutionOptions = cameraResolutions.map((cameraResolution) => ({
	label: cameraResolution,
	value: cameraResolution
}));

const screenResolutions = ['HD', 'Full HD', 'Quad HD', '4K', '8K'];
const screenResolutionOptions = screenResolutions.map((screenResolution) => ({
	label: screenResolution,
	value: screenResolution
}));

export {
	allBrands,
	cameraBrands,
	cameraOptions,
	cameraResolutionOptions,
	cameraResolutions,
	categories,
	categoryOptions,
	connectives,
	connectivityOptions,
	laptopAndDesktopBrands,
	laptopAndDesktopOptions,
	operatingSystems,
	osOptions,
	powerSourceOptions,
	powerSources,
	ramCapacities,
	ramCapacityOptions,
	screenResolutionOptions,
	screenResolutions,
	smartphoneAndTabletBrands,
	smartphoneAndTabletOptions,
	storageCapacities,
	storageCapacityOptions
};
