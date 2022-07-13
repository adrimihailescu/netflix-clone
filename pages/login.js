import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/login.module.css";

const Login = () => {
	return (
		<div>
			Login
			<Head>
				<title>Netflix SignIn</title>
			</Head>
			<header>
				<div className={styles.headerWrapper}>
					<Link className={styles.logoLink} href="/">
						<div className={styles.logoWrapper}>
							<Image
								src={"/static/netflix.svg"}
								alt="Netflix Icon"
								width="128px"
								height="40px"
							/>
						</div>
					</Link>
				</div>
			</header>
		</div>
	);
};

export default Login;
