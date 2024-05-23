## Development

Clone the repo, install dependencies, and start the Hugo server locally.

```shell
git clone https://github.com/twbs/icons/
cd icons
npm i
npm start
```

Then open `http://localhost:4000` in your browser.

### npm scripts

Here are some key scripts you'll use during development. Be sure to look to our `package.json` or `npm run` output for a complete list of scripts.

| Script       | Description                                                                   |
| ------------ | ----------------------------------------------------------------------------- |
| `start`      | Alias for running `docs-serve`                                                |
| `docs-serve` | Starts a local Hugo server                                                    |
| `pages`      | Generates permalink pages for each icon with template Markdown                |
| `icons`      | Processes and optimizes SVGs in `icons` directory, generates fonts and sprite |

## Adding SVGs

Icons are typically only added by @mdo, but exceptions can be made. New glyphs are designed in Figma first on a 16x16px grid, then exported as flattened SVGs with `fill` (no stroke). Once a new SVG icon has been added to the `icons` directory, we use an npm script to:

1. Optimize our SVGs with SVGO.
2. Modify the SVGs source code, removing all attributes before setting new attributes and values in our preferred order.

Use `npm run icons` to run the script, run `npm run pages` to build permalink pages, complete those pages, and, finally, commit the results in a new branch for updating.

**Warning**: Please exclude any auto-generated files, like `font/**` and `bootstrap-icons.svg` from your branch because they cause conflicts, and we generally update the dist files before a release.