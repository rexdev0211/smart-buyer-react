const xpath = require("path");
const fs = require("fs");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const BUILD = xpath.resolve(__dirname, "../build");
const path = (...parts) => xpath.resolve(BUILD, ...parts);

function preloadFontTag(font) {
  const BASE = "https://images.smartbuyer.me/content";
  return `<link rel="preload" href="${BASE}/${font}" as="font" type="font/ttf" crossorigin />`;
}

async function main() {
  const fonts = ["Nunito-Bold", "Nunito-Regular", "Nunito-SemiBold", "Nunito-ExtraLight"];
  const fontPreloads = fonts
    .map(x => x + ".ttf")
    .map(preloadFontTag);
  
  const index = await readFile(path("index.html"), "utf-8");
  const [beforeHead, afterHead] = index.split("</head>");
  const result =
    beforeHead +
    fontPreloads.join("") +
    "</head>" +
    afterHead;

  await writeFile(path("index.html"), result); 
}

main();