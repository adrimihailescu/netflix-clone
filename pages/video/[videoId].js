import { useRouter } from "next/router";
import Modal from "react-modal";

import styles from "../../styles/Video.module.css";
import { getYoutubeVideoById } from "../../lib/videos";
import NavBar from "../../components/navbar/navbar";

import clsx from "classnames";

Modal.setAppElement("#__next");

export async function getStaticProps(context) {
	const videoId = context.params.videoId;
	const video = await getYoutubeVideoById(videoId);

	return {
		props: {
			video,
		},
		revalidate: 10,
	};
}

export async function getStaticPaths() {
	const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];

	const paths = listOfVideos.map((videoId) => ({
		params: { videoId },
	}));

	return { paths, fallback: "blocking" };
}

//dynamic route
const Video = ({ video }) => {
	const router = useRouter();

	const {
		title,
		publishTime,
		description,
		channelTitle,
		statistics: { viewCount } = { viewCount: 0 },
	} = video;
	console.log({ video });
	return (
		<div className={styles.container}>
			<NavBar />
			<Modal
				isOpen={true}
				contentLabel="Watch the video"
				onRequestClose={() => router.back()}
				overlayClassName={styles.overlay}
				className={styles.modal}
			>
				<iframe
					id="ytplayer"
					type="text/html"
					className={styles.videoPlayer}
					width="100%"
					height="360"
					src={`https://www.youtube.com/embed/${router.query.videoId}?autoplay=0&origin=http://example.com&controls=0&rel=0`}
					frameBorder="0"
				></iframe>
				<div className={styles.modalBody}>
					<div className={styles.modalBodyContent}>
						<div className={styles.col1}>
							<p className={styles.publishTime}>{publishTime}</p>
							<p className={styles.title}>{title}</p>
							<p className={styles.description}>{description}</p>
						</div>
						<div className={styles.col2}>
							<p className={clsx(styles.subText, styles.subTextWrapper)}>
								<span className={styles.textColor}>Cast: </span>
								<span className={styles.channelTitle}>{channelTitle}</span>
							</p>
							<p className={clsx(styles.subText, styles.subTextWrapper)}>
								<span className={styles.textColor}>View Count: </span>
								<span className={styles.channelTitle}>{viewCount}</span>
							</p>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default Video;
