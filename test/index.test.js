const fs = require("fs");
const util = require("util");
const webpack = util.promisify(require("webpack"));
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackProcessingPlugin = require("../src");
const cheerio = require("cheerio");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const path = require("path");
const pretty = require("pretty");

chai.use(chaiAsPromised);
const expect = chai.expect;

const ENTRY = path.resolve(__dirname, "main.js");
const OUTPUT_DIR = path.resolve(__dirname, "dist");
const OUTPUT_HTML = path.resolve(__dirname, "dist/index.html");

describe("HtmlWebpackProcessingPlugin", function () {
  it("should return original html by default", () => {
    return webpack({
      entry: ENTRY,
      output: {
        path: OUTPUT_DIR,
      },
      plugins: [
        new HtmlWebpackPlugin({
          filename: "index.html",
        }),
        new HtmlWebpackProcessingPlugin(),
      ],
    }).then(() => {
      const originHTML = pretty(fs.readFileSync("test/index.html", "utf-8"));
      const newHTML = pretty(fs.readFileSync(OUTPUT_HTML, "utf-8"));
      expect(newHTML).to.be.equal(originHTML);
    });
  });

  it("should add a base tag", () => {
    return webpack({
      entry: ENTRY,
      output: {
        path: OUTPUT_DIR,
      },
      plugins: [
        new HtmlWebpackPlugin({
          filename: "index.html",
          preProcessing: (html) => {
            let $ = cheerio.load(html);
            $("head").append("<base>");
            return $.html();
          },
        }),
        new HtmlWebpackProcessingPlugin(),
      ],
    }).then(() => {
      let newHTML = fs.readFileSync(OUTPUT_HTML, "utf-8");
      let $ = cheerio.load(newHTML);

      expect($("base").length).to.be.equal(1);
    });
  });

  it("should remove the title tag", () => {
    return webpack({
      entry: ENTRY,
      output: {
        path: OUTPUT_DIR,
      },
      plugins: [
        new HtmlWebpackPlugin({
          filename: "index.html",
          postProcessing: (html) => {
            let $ = cheerio.load(html);
            $("title").remove();
            return $.html();
          },
        }),
        new HtmlWebpackProcessingPlugin(),
      ],
    }).then(() => {
      let newHTML = fs.readFileSync(OUTPUT_HTML, "utf-8");
      let $ = cheerio.load(newHTML);

      expect($("title").length).to.be.equal(0);
    });
  });
});
