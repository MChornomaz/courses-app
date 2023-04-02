const dateGenerator = (date: Date) => {
	let dd: number | string = date.getDate();
	if (dd < 10) dd = '0' + dd;

	let mm: number | string = date.getMonth() + 1;
	if (mm < 10) mm = '0' + mm;

	let yy: number | string = date.getFullYear();

	return dd + '/' + mm + '/' + yy;
};

export default dateGenerator;
