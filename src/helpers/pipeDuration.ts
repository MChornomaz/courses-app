const pipeDuration = (time: number) => {
	let fullHours = Math.floor(time / 60);
	let minutes = time % 60;
	let finalHours = '';
	let finalMinutes = '';
	if (fullHours < 10) {
		finalHours = `0${fullHours}`;
	} else {
		finalHours = `${fullHours}`;
	}
	if (minutes < 10) {
		finalMinutes = `0${minutes}`;
	} else {
		finalMinutes = `${minutes}`;
	}
	return `${finalHours}:${finalMinutes}`;
};

export default pipeDuration;
