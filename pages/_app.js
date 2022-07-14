import { useEffect, useState } from "react";
import { magic } from "../lib/magic-client";
import { useRouter } from "next/router";
import "../styles/globals.css";
import Loading from "../components/loading/loading";

function MyApp({ Component, pageProps }) {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		// async function getUsername() {
		// 	const isLoggedIn = await magic.user.isLoggedIn();
		// 	if (isLoggedIn) {
		// 		// setIsLoading(false);
		// 		router.push("/");
		// 	} else {
		// 		// setIsLoading(false);
		// 		router.push("/login");
		// 	}
		// }
		// getUsername();
	}, []);

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
	return isLoading ? <Loading /> : <Component {...pageProps} />;
}

export default MyApp;
