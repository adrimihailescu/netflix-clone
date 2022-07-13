import React from "react";
import Image from "next/image";
import styles from "./card.module.css";
import { useState } from "react";

const Card = (props) => {
	const { imgUrl = "/static/carina-nebula.jpg", size = "medium" } = props;

	const [imgSrc, setImgSrc] = useState(imgUrl);

	const handleOnError = () => {
		console.log("hi error");
		setImgSrc("/static/carina-nebula.jpg");
	};

	//configure specifix size
	const classMap = {
		large: styles.lgItem,
		medium: styles.mdItem,
		small: styles.smItem,
	};

	return (
		<div className={styles.container}>
			Card
			<div className={classMap[size]}>
				<Image
					src={imgUrl}
					alt="image"
					layout="fill"
					className={styles.cardImg}
					onError={handleOnError}
				/>
			</div>
		</div>
	);
};

export default Card;
