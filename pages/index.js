import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner/banner";
import NavBar from "../components/navbar/navbar";
import Card from "../components/card/card";
import SectionCards from "../components/card/section-cards";
import { getVideos } from "../lib/videos";

export default function Home() {
	const disneyVideos = getVideos();
	return (
		<div className={styles.container}>
			<Head>
				<title>Netflix</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<NavBar username="adriana@adri.com" />
			<Banner
				title="Clifford the red dog"
				subTitle="a very cute dog"
				imgUrl="/static/clifford-the-big-red-dog.jpg"
			/>
			<div className={styles.sectionWrapper}>
				<SectionCards title="Disney" videos={disneyVideos} size="large" />
				<SectionCards title="Disney" videos={disneyVideos} size="medium" />
			</div>
		</div>
	);
}
