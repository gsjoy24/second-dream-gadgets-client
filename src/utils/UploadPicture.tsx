type TUploadPicture = (image: any, name: string) => Promise<Response>;

export const UploadPicture: TUploadPicture = async (image, name) => {
	const formData = new FormData();
	formData.append('image', image);

	const response = await fetch(
		`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}&name=${name}`,
		{
			method: 'POST',
			body: formData
		}
	);
	return response;
};
