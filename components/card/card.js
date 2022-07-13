import React from "react";
import Image from "next/image";
import styles from "./card.module.css";
import { useState } from "react";
import { motion } from "framer-motion";
import cls from "classnames";

const Card = (props) => {
	const { imgUrl = "/static/carina-nebula.jpg", size = "medium", id } = props;

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

	const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };

	return (
		<div className={styles.container}>
			<motion.div
				className={cls(styles.imgMotionWrapper, classMap[size])}
				whileHover={{ ...scale }}
			>
				<Image
					src={imgUrl}
					alt="image"
					layout="fill"
					className={styles.cardImg}
					onError={handleOnError}
				/>
			</motion.div>
		</div>
	);
};

export default Card;
