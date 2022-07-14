import { useState, useEffect } from "react";
import React from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/router";
import { magic } from "../../lib/magic-client";

const NavBar = () => {
	// const { username } = props;

	const [showDropdown, setSHowDropdown] = useState(false);
	const [username, setUsername] = useState("");

	const router = useRouter();

	useEffect(() => {
		async function getUsername() {
			try {
				const { email } = await magic.user.getMetadata();
				if (email) {
					console.log(email);
					setUsername(email);
				}
			} catch (error) {
				console.log("Error retrieving email:", error);
			}
		}
		getUsername();
	}, []);

	const handleOnClickHome = (e) => {
		e.preventDefault();
		router.push("/");
	};

	const handleOnClickMyList = (e) => {
		e.preventDefault();
		router.push("/browser/my-list");
	};

	//handler function for showing dropdown
	const handleShowDropdown = (e) => {
		e.preventDefault();
		setSHowDropdown(!showDropdown);
	};

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
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
				<ul className={styles.navItems}>
					<li className={styles.navItem} onClick={handleOnClickHome}>
						Home
					</li>
					<li className={styles.navItem2} onClick={handleOnClickMyList}>
						My List
					</li>
				</ul>

				<nav className={styles.navContainer}>
					<div>
						<button className={styles.usernameBtn} onClick={handleShowDropdown}>
							<p className={styles.username}>{username}</p>
							<Image
								src={"/static/dropdown-icon.svg"}
								alt="Dropdown Icon"
								width="24px"
								height="24px"
							/>
						</button>
						{showDropdown && (
							<div className={styles.navDropdown}>
								<div>
									<Link href="/login">
										<a className={styles.linkName}>Sign out</a>
									</Link>
									<div className={styles.lineWrapper}></div>
								</div>
							</div>
						)}
					</div>
				</nav>
			</div>
		</div>
	);
};

export default NavBar;
