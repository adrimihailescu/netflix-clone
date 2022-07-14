import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/login.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { magic } from "../lib/magic-client";

const Login = () => {
	const [userMsg, setUserMsg] = useState("");

	const [email, setEmail] = useState("");

	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	useEffect(() => {
		const handleComplete = () => {
			setIsLoading(false);
		};
		router.events.on("routeChangeComplete", handleComplete);
		router.events.on("routeChangeError", handleComplete);

		return () => {
			router.events.off("routeChangeComplete", handleComplete);
			router.events.off("routeChangeError", handleComplete);
		};
	}, [router]);

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
				setIsLoading(true);
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
					setIsLoading(false);
				}
			} else {
				setUserMsg("Something went wrong!");
				setIsLoading(false);
			}
		} else {
			//show user message
			setUserMsg("Enter a valid email address");
			setIsLoading(false);
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
						{isLoading ? "Loading.." : "Sign In"}
					</button>
				</div>
			</main>
		</div>
	);
};

export default Login;
