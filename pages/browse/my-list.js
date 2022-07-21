import Head from "next/head";
import NavBar from "../../components/navbar/navbar";
import SectionCards from "../../components/card/section-cards";
const MyList = () => {
	return (
		<div>
			<Head>
				<title>My List</title>
			</Head>
			<main>
				<NavBar />
				<div>
					<SectionCards title="My List" size="small" />
				</div>
			</main>
		</div>
	);
};

export default MyList;
