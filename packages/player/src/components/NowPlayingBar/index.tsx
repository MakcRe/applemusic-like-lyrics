import {
	MediaButton,
	TextMarquee,
	isLyricPageOpenedAtom,
	musicArtistsAtom,
	musicCoverAtom,
	musicNameAtom,
	musicPlayingAtom,
	onPlayOrResumeAtom,
	onRequestNextSongAtom,
	onRequestPrevSongAtom,
} from "@applemusic-like-lyrics/react-full";
import lyricIcon from "@iconify/icons-ic/round-lyrics";
import { Icon } from "@iconify/react";
import {
	ListBulletIcon,
	PauseIcon,
	PlayIcon,
	TrackNextIcon,
	TrackPreviousIcon,
} from "@radix-ui/react-icons";
import { Flex, IconButton } from "@radix-ui/themes";
import classNames from "classnames";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { type FC, useLayoutEffect, useRef } from "react";
import IconForward from "../../assets/icon_forward.svg?react";
import IconPause from "../../assets/icon_pause.svg?react";
import IconPlay from "../../assets/icon_play.svg?react";
import IconRewind from "../../assets/icon_rewind.svg?react";
import {
	hideNowPlayingBarAtom,
	playlistCardOpenedAtom,
} from "../../states/index.ts";
import { NowPlaylistCard } from "../NowPlaylistCard/index.tsx";
import styles from "./index.module.css";

export const NowPlayingBar: FC = () => {
	const hideNowPlayingBar = useAtomValue(hideNowPlayingBarAtom);
	const musicName = useAtomValue(musicNameAtom);
	const musicArtists = useAtomValue(musicArtistsAtom);
	const musicPlaying = useAtomValue(musicPlayingAtom);
	const musicCover = useAtomValue(musicCoverAtom);
	const [playlistOpened, setPlaylistOpened] = useAtom(playlistCardOpenedAtom);
	const setLyricPageOpened = useSetAtom(isLyricPageOpenedAtom);

	const onPlayOrResume = useAtomValue(onPlayOrResumeAtom).onEmit;
	const onRequestPrevSong = useAtomValue(onRequestPrevSongAtom).onEmit;
	const onRequestNextSong = useAtomValue(onRequestNextSongAtom).onEmit;

	const playbarRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const playbarEl = playbarRef.current;
		if (!playbarEl) return;
		const updateSafeBound = () => {
			const { top } = playbarEl.getBoundingClientRect();
			document.body.style.setProperty(
				"--amll-player-playbar-bottom",
				`${innerHeight - top}px`,
			);
		};
		const observer = new ResizeObserver(updateSafeBound);
		addEventListener("resize", updateSafeBound);
		observer.observe(playbarEl);
		return () => {
			removeEventListener("resize", updateSafeBound);
			observer.disconnect();
		};
	}, []);

	return (
		<>
			{/* <Container
		 	className={classNames(
		 		styles.nowPlayingBar,
		 		hideNowPlayingBar && styles.hide,
		 	)}
		 	position="fixed"
		 	bottom="0"
		 	left="0"
		 	right="0"
		 > */}
			{playlistOpened && (
				<Flex
					direction="row-reverse"
					mx="3"
					position="absolute"
					right="0"
					bottom="calc(var(--amll-player-playbar-bottom) + var(--space-3))"
				>
					<NowPlaylistCard className={classNames(styles.playlistCard)} />
				</Flex>
			)}
			<Flex
				className={classNames(styles.playBar, hideNowPlayingBar && styles.hide)}
				overflow="hidden"
				ref={playbarRef}
			>
				<Flex
					direction="row"
					justify="center"
					align="center"
					flexGrow="1"
					flexBasis="33.3%"
				>
					<button
						className={styles.coverButton}
						type="button"
						style={{
							backgroundImage: `url(${musicCover})`,
						}}
						onClick={() => setLyricPageOpened(true)}
					>
						<div className={styles.lyricIconButton}>
							<Icon width={34} icon={lyricIcon} className="icon" />
						</div>
					</button>
					<Flex
						direction="column"
						justify="center"
						ml="4"
						flexGrow="1"
						minWidth="0"
						overflow="hidden"
						style={{
							textWrap: "nowrap",
						}}
					>
						<TextMarquee>{musicName}</TextMarquee>
						<TextMarquee>
							{musicArtists.map((v) => v.name).join(", ")}
						</TextMarquee>
					</Flex>
				</Flex>
				<Flex
					direction="row"
					justify="center"
					align="center"
					flexGrow="1"
					flexBasis="33.3%"
					gap="5"
					display={{
						initial: "none",
						sm: "flex",
					}}
				>
					<MediaButton
						style={{
							scale: "1.5",
						}}
						onClick={onRequestPrevSong}
					>
						<IconRewind
							style={{
								scale: "1.25",
							}}
						/>
					</MediaButton>
					<MediaButton
						style={{
							scale: "1.5",
						}}
						onClick={onPlayOrResume}
					>
						{musicPlaying ? (
							<IconPause
								style={{
									scale: "0.75",
								}}
							/>
						) : (
							<IconPlay
								style={{
									scale: "0.75",
								}}
							/>
						)}
					</MediaButton>
					<MediaButton
						style={{
							scale: "1.5",
						}}
						onClick={onRequestNextSong}
					>
						<IconForward
							style={{
								scale: "1.25",
							}}
						/>
					</MediaButton>
				</Flex>
				<Flex
					direction="row"
					justify="end"
					align="center"
					flexGrow={{
						initial: "0",
						sm: "1",
					}}
					flexBasis={{
						initial: "",
						sm: "33.3%",
					}}
					gap="1"
				>
					<Flex
						direction="row"
						justify="end"
						align="center"
						gap="1"
						display={{
							initial: "flex",
							sm: "none",
						}}
					>
						<IconButton onClick={onRequestPrevSong} variant="soft">
							<TrackPreviousIcon />
						</IconButton>
						<IconButton onClick={onPlayOrResume} variant="soft">
							{musicPlaying ? <PauseIcon /> : <PlayIcon />}
						</IconButton>
						<IconButton onClick={onRequestNextSong} variant="soft">
							<TrackNextIcon />
						</IconButton>
					</Flex>
					<IconButton
						variant="soft"
						onClick={() => setPlaylistOpened((v) => !v)}
					>
						<ListBulletIcon />
					</IconButton>
				</Flex>
			</Flex>
			{/* </Container> */}
		</>
	);
};
