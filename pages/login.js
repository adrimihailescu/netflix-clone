import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/login.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { magic } from "../lib/magic-client";

const Login = () => {
	const [userMsg, setUserMsg] = useState("");

	const [email, setEmail] = useState("");

	const router = useRouter();

	const handleOnChangeEmail = (e) => {
		setUserMsg("");
		console.log("event", e);
		const email = e.target.value;
		setEmail(email);
	};

	const handleLoginWithEmail = async (e) => {
		e.preventDefault();
		console.log("hi button");
		if (email) {
			if (email === "adriana.mihalescu@gmail.com") {
				// log in a user by their email
				try {
					const didToken = await magic.auth.loginWithMagicLink({ email });
					console.log({ didToken });
					if (didToken) {
						router.push("/");
					}
				} catch (error) {
					// Handle errors if required!
					console.error("Something wnet wrong logging in", error);
				}
			} else {
				setUserMsg("Something went wrong!");
			}
		} else {
			//show user message
			setUserMsg("Enter a valid email address");
		}
	};
	return (
		<div className={styles.container}>
			<Head>
				<title>Netflix SignIn</title>
			</Head>
			<header className={styles.header}>
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
			<main className={styles.main}>
				<div className={styles.mainWrapper}>
					<h1 className={styles.signinHeader}>Sign In</h1>
					<input
						type="text"
						placeholder="Email address"
						className={styles.emailInput}
						onChange={handleOnChangeEmail}
					/>
					<p className={styles.userMsg}>{userMsg}</p>
					<button onClick={handleLoginWithEmail} className={styles.loginBtn}>
						Sign In
					</button>
				</div>
			</main>
		</div>
	);
};

export default Login;
