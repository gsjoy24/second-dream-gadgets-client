type TOptions = {
	weekday: 'long' | 'short' | 'narrow';
	month: 'long' | 'short' | 'narrow' | 'numeric' | '2-digit';
	day: 'numeric' | '2-digit';
	year: 'numeric' | '2-digit';
};
const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	const options: TOptions = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
	return date.toLocaleDateString(undefined, options);
};
export default formatDate;
