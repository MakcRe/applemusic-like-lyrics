// @ts-check
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import { createStarlightTypeDocPlugin } from "starlight-typedoc";

const [coreStarlightTypeDoc, coreTypeDocSidebarGroup] =
	createStarlightTypeDocPlugin();
const [reactStarlightTypeDoc, reactTypeDocSidebarGroup] =
	createStarlightTypeDocPlugin();
const [vueStarlightTypeDoc, vueTypeDocSidebarGroup] =
	createStarlightTypeDocPlugin();
const [reactFullStarlightTypeDoc, reactFullTypeDocSidebarGroup] =
	createStarlightTypeDocPlugin();
const [lyricStarlightTypeDoc, lyricTypeDocSidebarGroup] =
	createStarlightTypeDocPlugin();

// https://astro.build/config
export default defineConfig({
	base: "applemusic-like-lyrics",
	integrations: [
		starlight({
			favicon: "favicon.ico",
			title: "Apple Music-like Lyrics",
			customCss: ["./src/styles/custom.css"],
			locales: {
				root: {
					label: "简体中文",
					lang: "zh-CN",
				},
				en: {
					label: "English",
					lang: "en",
				},
			},
			social: {
				github: "https://github.com/Steve-xmh/applemusic-like-lyrics",
			},
			plugins: [
				coreStarlightTypeDoc({
					entryPoints: ["../core/src/index.ts"],
					output: "reference/core",
					tsconfig: "../core/tsconfig.json",
					sidebar: {
						label: "core",
						collapsed: true,
					},
					typeDoc: {
						exclude: ["test.ts"],
					},
				}),
				reactStarlightTypeDoc({
					entryPoints: ["../react/src/index.ts"],
					output: "reference/react",
					tsconfig: "../react/tsconfig.json",
					sidebar: {
						label: "react",
						collapsed: true,
					},
				}),
				vueStarlightTypeDoc({
					entryPoints: ["../vue/src/index.ts"],
					output: "reference/vue",
					tsconfig: "../vue/tsconfig.json",
					sidebar: {
						label: "vue",
						collapsed: true,
					},
				}),
				reactFullStarlightTypeDoc({
					entryPoints: ["../react-full/src/index.ts"],
					output: "reference/react-full",
					tsconfig: "../react-full/tsconfig.json",
					sidebar: {
						label: "react-full",
						collapsed: true,
					},
				}),
				lyricStarlightTypeDoc({
					entryPoints: ["../lyric/src/types.d.ts"],
					output: "reference/lyric",
					tsconfig: "../lyric/tsconfig.json",
					sidebar: {
						label: "lyric",
						collapsed: true,
					},
				}),
			],
			sidebar: [
				{
					label: "核心组件",
					items: [{ slug: "guides/core/introduction" }],
				},
				{
					label: "React 绑定",
					items: [
						{ slug: "guides/react/introduction" },
						{ slug: "guides/react/quick-start" },
						{ slug: "guides/react/lyric-player" },
						{ slug: "guides/react/bg-render" },
					],
				},
				{
					label: "AMLL TTML Tools",
					items: [
						{ slug: "guides/ttml-tools/introduction" },
						{ slug: "guides/ttml-tools/tips" },
					],
				},
				{
					label: "接口参考",
					items: [
						coreTypeDocSidebarGroup,
						reactTypeDocSidebarGroup,
						vueTypeDocSidebarGroup,
						reactFullTypeDocSidebarGroup,
						lyricTypeDocSidebarGroup,
					],
				},
			],
		}),
	],
});
