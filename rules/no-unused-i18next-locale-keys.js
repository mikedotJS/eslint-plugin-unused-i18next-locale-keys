const fs = require("fs");
const path = require("path");
const { globby } = require("globby");
const babel = require("@babel/core");
const _traverse = require("@babel/traverse");
const traverse = _traverse.default;

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Warn or error when locale keys are unused in locale JSON files",
      category: "Possible Errors",
      recommended: true,
    },
    schema: [
      {
        type: "object",
        properties: {
          localesDir: { type: "string" },
          supportedExtensions: { type: "array", items: { type: "string" } },
          locales: { type: "string" },
          folder: { type: "string" },
        },
        additionalProperties: false,
      },
    ],
  },

  create: async function (context) {
    const options = context.options[0] || {};

    const { supportedExtensions, localesDir, locales, folder } = options;

    if (!localesDir || !supportedExtensions || !locales || !folder) {
      return {};
    }

    // Add the original code here, but modify the lintLocales function.
    // Replace the console.warn calls with context.report to report the issues.
    function lintLocales(localesDir, usedKeys) {
      const locales = fs.readdirSync(localesDir);

      locales.forEach((locale) => {
        const localePath = path.join(localesDir, locale);
        const translations = JSON.parse(fs.readFileSync(localePath, "utf8"));

        const translationKeys = new Set();

        const findKeys = (obj, prefix = "") => {
          for (const key in obj) {
            const currentKey = prefix ? `${prefix}.${key}` : key;
            if (typeof obj[key] === "object") {
              findKeys(obj[key], currentKey);

              translationKeys.add(currentKey);
            } else {
              translationKeys.add(currentKey);
            }
          }
        };

        findKeys(translations);

        const unusedKeys = new Array(...translationKeys)
          .filter((key) => {
            return !usedKeys.has(key);
          })
          .filter((key) => key.includes("."));

        if (unusedKeys.length > 0) {
          console.report(`Locales file ${locale} has unused keys:`);
          console.report(unusedKeys.join("\n"));
        }
      });
    }

    const paths = await globby(
      `${folder}/**/*.{${supportedExtensions.join(",")}}`
    );

    const keys = new Set();

    paths.forEach((filePath) => {
      const code = fs.readFileSync(filePath, "utf-8");
      const ast = babel.parseSync(code, {
        filename: filePath,
        configFile: false,
        presets: [
          "@babel/preset-env",
          "@babel/preset-react",
          "@babel/preset-typescript",
        ],
        sourceType: "module",
      });

      traverse(ast, {
        CallExpression({ node }) {
          if (node.callee.type === "Identifier" && node.callee.name === "t") {
            const key = node.arguments[0];
            if (key && key.type === "StringLiteral") {
              keys.add(key.value);
            }
          }
        },
      });
    });

    lintLocales(localesDir, keys);

    return {};
  },
};
