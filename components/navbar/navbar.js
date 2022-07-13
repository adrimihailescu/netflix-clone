import { useState } from "react";
import React from "react";
import styles from "./navbar.module.css";
import Link from "next/link";

import { useRouter } from "next/router";

const NavBar = (props) => {
	const { username } = props;

	const [showDropdown, setSHowDropdown] = useState(false);

	const router = useRouter();

	const handleOnClickHome = (e) => {
		e.preventDefault();
		router.push("/");
	};

	const handleOnClickMyList = (e) => {
		e.preventDefault();
		router.push("/browser/my-list");
	};

	const handleShowDropdown = (e) => {
		e.preventDefault();
		setSHowDropdown(!showDropdown);
	};

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<Link className={styles.logoLink} href="/">
					<div className={styles.logoWrapper}>NETFLIX</div>
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
