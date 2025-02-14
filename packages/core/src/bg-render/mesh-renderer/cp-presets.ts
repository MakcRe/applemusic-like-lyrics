interface ControlPointConf {
	cx: number;
	cy: number;
	x: number;
	y: number;
	ur: number;
	vr: number;
	up: number;
	vp: number;
}

interface ControlPointPreset {
	width: number;
	height: number;
	conf: ControlPointConf[];
}

const p = (
	cx: number,
	cy: number,
	x: number,
	y: number,
	ur = 0,
	vr = 0,
	up = 1,
	vp = 1,
) => Object.freeze({ cx, cy, x, y, ur, vr, up, vp }) as ControlPointConf;
const preset = (width: number, height: number, conf: ControlPointConf[]) =>
	Object.freeze({ width, height, conf }) as ControlPointPreset;

export const CONTROL_POINT_PRESETS = [
	// TODO: 竖屏推荐
	preset(5, 5, [
		p(0, 0, -1, -1, 0, 0, 1, 1),
		p(1, 0, -0.5, -1, 0, 0, 1, 1),
		p(2, 0, 0, -1, 0, 0, 1, 1),
		p(3, 0, 0.5, -1, 0, 0, 1, 1),
		p(4, 0, 1, -1, 0, 0, 1, 1),
		p(0, 1, -1, -0.5, 0, 0, 1, 1),
		p(1, 1, -0.5, -0.5, 0, 0, 1, 1),
		p(2, 1, -0.0052029684413368305, -0.6131420587090777, 0, 0, 1, 1),
		p(3, 1, 0.5884227308309977, -0.3990805107556692, 0, 0, 1, 1),
		p(4, 1, 1, -0.5, 0, 0, 1, 1),
		p(0, 2, -1, 0, 0, 0, 1, 1),
		p(1, 2, -0.4210024670505933, -0.11895058380429502, 0, 0, 1, 1),
		p(2, 2, -0.1019613423315412, -0.023812118047224606, 0, -47, 0.629, 0.849),
		p(3, 2, 0.40275125660925437, -0.06345314544600389, 0, 0, 1, 1),
		p(4, 2, 1, 0, 0, 0, 1, 1),
		p(0, 3, -1, 0.5, 0, 0, 1, 1),
		p(1, 3, 0.06801958477287173, 0.5205913248960121, -31, -45, 1, 1),
		p(2, 3, 0.21446469120128908, 0.29331610114301043, 6, -56, 0.566, 1.321),
		p(3, 3, 0.5, 0.5, 0, 0, 1, 1),
		p(4, 3, 1, 0.5, 0, 0, 1, 1),
		p(0, 4, -1, 1, 0, 0, 1, 1),
		p(1, 4, -0.31378372841550195, 1, 0, 0, 1, 1),
		p(2, 4, 0.26153633255328046, 1, 0, 0, 1, 1),
		p(3, 4, 0.5, 1, 0, 0, 1, 1),
		p(4, 4, 1, 1, 0, 0, 1, 1),
	]),
	// TODO: 横屏推荐
	preset(4, 4, [
		p(0, 0, -1, -1, 0, 0, 1, 1),
		p(1, 0, -0.33333333333333337, -1, 0, 0, 1, 1),
		p(2, 0, 0.33333333333333326, -1, 0, 0, 1, 1),
		p(3, 0, 1, -1, 0, 0, 1, 1),
		p(0, 1, -1, -0.04495399932657351, 0, 0, 1, 1),
		p(1, 1, -0.24056117520129328, -0.22465999020104, 0, 0, 1, 1),
		p(2, 1, 0.334758885767489, -0.00531297192779423, 0, 0, 1, 1),
		p(3, 1, 0.9989920470678106, -0.3382976020775408, 8, 0, 0.566, 1.792),
		p(0, 2, -1, 0.33333333333333326, 0, 0, 1, 1),
		p(1, 2, -0.3425497314639411, -0.000027501607956947893, 0, 0, 1, 1),
		p(2, 2, 0.3321437945812673, 0.1981776353859399, 0, 0, 1, 1),
		p(3, 2, 1, 0.0766118180296832, 0, 0, 1, 1),
		p(0, 3, -1, 1, 0, 0, 1, 1),
		p(1, 3, -0.33333333333333337, 1, 0, 0, 1, 1),
		p(2, 3, 0.33333333333333326, 1, 0, 0, 1, 1),
		p(3, 3, 1, 1, 0, 0, 1, 1),
	]),
	preset(4, 4, [
		p(0, 0, -1, -1, 0, 0, 1, 2.075),
		p(1, 0, -0.33333333333333337, -1, 0, 0, 1, 1),
		p(2, 0, 0.33333333333333326, -1, 0, 0, 1, 1),
		p(3, 0, 1, -1, 0, 0, 1, 1),
		p(0, 1, -1, -0.4545779491139603, 0, 0, 1, 1),
		p(1, 1, -0.33333333333333337, -0.33333333333333337, 0, 0, 1, 1),
		p(2, 1, 0.0889403142626457, -0.6025711180694033, -32, 45, 1, 1),
		p(3, 1, 1, -0.33333333333333337, 0, 0, 1, 1),
		p(0, 2, -1, -0.07402408608567845, 1, 0, 1, 0.094),
		p(1, 2, -0.2719422694359541, 0.09775369930903222, 25, -18, 1.321, 0),
		p(2, 2, 0.19877414408395877, 0.4307383294587789, 48, -40, 0.755, 0.975),
		p(3, 2, 1, 0.33333333333333326, -37, 0, 1, 1),
		p(0, 3, -1, 1, 0, 0, 1, 1),
		p(1, 3, -0.33333333333333337, 1, 0, 0, 1, 1),
		p(2, 3, 0.5125850864305672, 1, -20, -18, 0, 1.604),
		p(3, 3, 1, 1, 0, 0, 1, 1),
	]),
	preset(5, 5, [
		p(0, 0, -1, -1, 0, 0, 1, 1),
		p(1, 0, -0.4501953125, -1, 0, 55, 1, 2.075),
		p(2, 0, 0.1953125, -1, 0, 0, 1, 1),
		p(3, 0, 0.4580078125, -1, 0, -25, 1, 1),
		p(4, 0, 1, -1, 0, 0, 1, 1),
		p(0, 1, -1, -0.2514475377525607, -16, 0, 2.327, 0.943),
		p(1, 1, -0.55859375, -0.6609325945787148, 47, 0, 2.358, 0.377),
		p(2, 1, 0.232421875, -0.5244375756366635, -66, -25, 1.855, 1.164),
		p(3, 1, 0.685546875, -0.3753706470552125, 0, 0, 1, 1),
		p(4, 1, 1, -0.6699125300354287, 0, 0, 1, 1),
		p(0, 2, -1, 0.035910396862284255, 0, 0, 1, 1),
		p(1, 2, -0.4921875, 0.005378616309457018, 90, 23, 1, 1.981),
		p(2, 2, 0.021484375, -0.1365043639066228, 0, 42, 1, 1),
		p(3, 2, 0.4765625, 0.05925822904974043, -30, 0, 1.95, 0.44),
		p(4, 2, 1, 0.251428847823418, 0, 0, 1, 1),
		p(0, 3, -1, 0.6968336464764276, -68, 0, 1, 0.786),
		p(1, 3, -0.6904296875, 0.5890744209958608, -68, 0, 1, 1),
		p(2, 3, 0.1845703125, 0.3879238667654693, 61, 0, 1, 1),
		p(3, 3, 0.60546875, 0.4633553246018661, -47, -59, 0.849, 1.73),
		p(4, 3, 1, 0.6214021886400309, -33, 0, 0.377, 1.604),
		p(0, 4, -1, 1, 0, 0, 1, 1),
		p(1, 4, -0.5, 1, 0, -73, 1, 1),
		p(2, 4, -0.3271484375, 1, 0, -24, 0.314, 2.704),
		p(3, 4, 0.5, 1, 0, 0, 1, 1),
		p(4, 4, 1, 1, 0, 0, 1, 1),
	]),
] as const;
