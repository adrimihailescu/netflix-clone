import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner/banner";
import NavBar from "../components/navbar/navbar";
import Card from "../components/card/card";
import SectionCards from "../components/card/section-cards";
import { getPopularVideos, getVideos } from "../lib/videos";

export async function getServerSideProps() {
	const disneyVideos = await getVideos("disney trailer");

	const productivityVideos = await getVideos("Productivity");

	const popularVideos = await getPopularVideos("Popular videos");

	const travelVideos = await getVideos("Travel");

	return {
		props: {
			disneyVideos,
			productivityVideos,
			travelVideos,
			popularVideos,
		},
	};
}

export default function Home({
	disneyVideos,
	productivityVideos,
	travelVideos,
	popularVideos,
}) {
	return (
		<div className={styles.container}>
			<Head>
				<title>Netflix</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className={styles.main}>
				<NavBar username="adriana.mihalescu@gmail.com" />
				<Banner
					videoId="4zH5iYM4wJo"
					title="Clifford the red dog"
					subTitle="a very cute dog"
					imgUrl="/static/clifford-the-big-red-dog.jpg"
				/>
				<div className={styles.sectionWrapper}>
					<SectionCards title="Disney" videos={disneyVideos} size="large" />
					<SectionCards title="Travel" videos={travelVideos} size="small" />
					<SectionCards
						title="Productivity"
						videos={productivityVideos}
						size="medium"
					/>
					<SectionCards title="Popular" videos={popularVideos} size="small" />
				</div>
			</div>
		</div>
	);
}
