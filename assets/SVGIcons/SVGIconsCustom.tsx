import Svg, { Path } from "react-native-svg";

export const TrendUp = () => {
	return (
		<Svg
			width={116}
			height={86}
			viewBox="10 15 30 66"
			fill="none"
			strokeWidth={2}
		>
			<Path
				d="M64 28H88V52"
				stroke="#27AE60"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M88 28L54 62L34 42L8 68"
				stroke="#27AE60"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};

export const TrendDown = () => {
	return (
		<Svg
			width={116}
			height={86}
			viewBox="10 15 30 66"
			fill="none"
			strokeWidth={2}
		>
			<Path
				d="M64 68H88V44"
				stroke="#EB5757"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M88 68L54 34L34 54L8 28"
				stroke="#EB5757"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};

export const HomeIcon = () => {
	return (
		<Svg width="80" height="80" strokeWidth={5} viewBox="0 0 80 80" fill="none">
			<Path
				d="M6.66669 40C6.66669 24.2867 6.66669 16.43 11.5467 11.5467C16.4334 6.66669 24.2867 6.66669 40 6.66669C55.7134 6.66669 63.57 6.66669 68.45 11.5467C73.3334 16.4334 73.3334 24.2867 73.3334 40C73.3334 55.7134 73.3334 63.57 68.45 68.45C63.5734 73.3334 55.7134 73.3334 40 73.3334C24.2867 73.3334 16.43 73.3334 11.5467 68.45C6.66669 63.5734 6.66669 55.7134 6.66669 40Z"
				stroke="#06D6A0"
			/>
			<Path
				d="M23.3333 46.6667L29.3233 39.48C31.6966 36.63 32.8833 35.2067 34.4433 35.2067C36.0066 35.2067 37.1933 36.63 39.5666 39.48L40.4333 40.52C42.8066 43.37 43.9933 44.7934 45.5566 44.7934C47.12 44.7934 48.3033 43.37 50.6766 40.52L56.6666 33.3334"
				stroke="#06D6A0"
			/>
		</Svg>
	);
};
