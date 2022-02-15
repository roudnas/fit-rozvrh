import React from 'react';

const Hour = ({index, w}) => {
	const cls = "hour bg-dark pb-2 d-flex align-items-end justify-content-center";
	return (
		<div className={cls} style={{width: w}}>
			{index}:00
		</div>
	)
}

export default Hour;
