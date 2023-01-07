const { build } = require("esbuild");
const { stylusLoader } = require("esbuild-stylus-loader");
const JSZip = require("jszip");
const fs = require("fs");

let entryPoints = [
  "src/index.tsx",
  "src/worker_script.ts",
  "src/startup_script.ts",
  "src/index.styl",
  "src/lyric-test.ts",
];

if (process.argv.includes("--style-only")) {
  entryPoints = ["src/index.styl"];
}

build({
  entryPoints,
  bundle: true,
  sourcemap: process.argv.includes("--dev") ? "inline" : false,
  minify: !process.argv.includes("--dev"),
  outdir: process.argv.includes("--dist") ? "dist" : ".",
  define: {
    DEBUG: process.argv.includes("--dev").toString(),
    OPEN_PAGE_DIRECTLY: process.argv
      .includes("--open-page-directly")
      .toString(),
  },
  watch: process.argv.includes("--watch")
    ? {
        onRebuild(err, result) {
          console.log("Rebuilding");
          if (err) {
            console.warn(err.message);
          } else if (result) {
            console.log("Build success");
          }
        },
      }
    : undefined,
  plugins: [
    stylusLoader({
      stylusOptions: {
        include: ["node_modules"],
        includeCss: true,
      },
    }),
  ],
}).then((result) => {
  console.log("Build success");
  if (process.argv.includes("--dist")) {
    const plugin = new JSZip();
    function addIfExist(filename, name = filename) {
      if (fs.existsSync(filename)) plugin.file(name, fs.readFileSync(filename));
    }
    if (process.argv.includes("--dist")) {
      addIfExist("dist/manifest.json", "manifest.json");
      addIfExist("dist/index.js", "index.js");
      addIfExist("dist/index.css", "index.css");
      addIfExist("dist/worker_script.js", "worker_script.js");
      addIfExist("dist/startup_script.js", "startup_script.js");
    } else {
      addIfExist("manifest.json");
      addIfExist("index.js");
      addIfExist("worker_script.js");
      addIfExist("index.css");
      addIfExist("startup_script.js");
    }
    const output = plugin.generateNodeStream({
      compression: "DEFLATE",
      compressionOptions: {
        level: 9,
      },
    });
    output.pipe(fs.createWriteStream("Apple Music-like lyrics.plugin"));
    fs.copyFileSync("manifest.json", "dist/manifest.json");
    fs.copyFileSync("assets/thumbnail.svg", "dist/thumbnail.svg");
  }
});
