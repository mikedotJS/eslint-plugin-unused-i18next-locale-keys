# ESLint Plugin: Unused Locale Keys

This ESLint plugin checks for unused translation keys in your JSON locale files and warns or errors when it finds any. It's useful for detecting and removing unused translations in your project, keeping your locale files clean and optimized.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Options](#options)
- [Examples](#examples)
- [License](#license)

## Installation

1.  Install the plugin as a development dependency:

```bash
npm install eslint-plugin-unused-locale-keys --save-dev
```

2.  Add the plugin to your ESLint configuration file (`.eslintrc`):

```json
{ "plugins": ["unused-locale-keys"] }
```

## Configuration

Add the rule to your ESLint configuration file (`.eslintrc`) and specify the desired options:

```json
{
  "rules": {
    "unused-locale-keys/no-unused-locale-keys": [
      "error",
      {
        "localesDir": "path/to/your/locales/directory",
        "supportedExtensions": ["js", "jsx", "ts", "tsx"],
        "locales": "en,es,fr",
        "folder": "src"
      }
    ]
  }
}
```

## Usage

Once the plugin is installed and configured, ESLint will automatically check for unused translation keys in your JSON locale files whenever it is run.

To run ESLint manually:

```bash
npx eslint path/to/your/src
```

Or, you can add a script to your `package.json` file to run ESLint:

```json
{ "scripts": { "lint": "eslint path/to/your/src" } }
```

Then, run the script with:

```bash
npm run lint
```

## Options

The rule accepts an options object with the following properties:

- `localesDir` (required): A string representing the path to the directory containing your JSON locale files.
- `supportedExtensions` (required): An array of file extensions to search for translation keys (e.g., `["js", "jsx", "ts", "tsx"]`).
- `locales` (required): A comma-separated string of supported locales (e.g., `"en,es,fr"`).
- `folder` (required): A string representing the path to the directory containing your source files.

## Examples

### Basic Example

Assuming your project structure looks like this:

```css
project-root/
  ├── locales/
  │   ├── en.json
  │   ├── es.json
  │   └── fr.json
  ├── src/
  │   ├── components/
  │   └── utils/
  └── .eslintrc
```

Configure the plugin in your `.eslintrc` file:

```json
{
  "plugins": ["unused-locale-keys"],
  "rules": {
    "unused-locale-keys/no-unused-locale-keys": [
      "error",
      {
        "localesDir": "locales",
        "supportedExtensions": ["js", "jsx", "ts", "tsx"],
        "locales": "en,es,fr",
        "folder": "src"
      }
    ]
  }
}
```

When ESLint runs, it will check for unused keys in the `locales/` directory and report any issues it finds.

### Custom Configuration Example

If you have a custom project structure or naming conventions, you can adjust the plugin's options accordingly.

For example, let's say your project has a `translations/` directory instead of `locales/` and uses only TypeScript files:

```css
project-root/
  ├── translations/
  │   ├── en.json
  │   ├── es.json
  │   └── fr.json
  ├── src/
  │   ├── components/
  │   └── utils/
  └── .eslintrc
```

Configure the plugin in your `.eslintrc` file:

```json
{
  "plugins": ["unused-locale-keys"],
  "rules": {
    "unused-locale-keys/no-unused-locale-keys": [
      "error",
      {
        "localesDir": "translations",
        "supportedExtensions": ["ts"],
        "locales": "en,es,fr",
        "folder": "src"
      }
    ]
  }
}
```

In this case, ESLint will search for translation keys only in TypeScript files and check for unused keys in the `translations/` directory.

## License

MIT License. See the [LICENSE](LICENSE) file for more details.
