import { DomLyricPlayer } from "./dom/index.ts";

export { LyricPlayerBase } from "./base.ts";
export * from "./canvas/index.ts";
export * from "./dom-slim/index.ts";
export * from "./dom/index.ts";

/**
 * 默认导出的歌词播放组件
 */
export const LyricPlayer = DomLyricPlayer;
