import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants';

const Page404 = () => {
	return (
		<div>
			<h2>Page was not found.</h2>
			<p>
				Go back to <NavLink to={ROUTES.COURSES}>Main Page</NavLink>
			</p>
		</div>
	);
};

export default Page404;
