# stophtml

A utility for Node.js (`0.32 kB`) and the browser (`0.43 kB`) that extracts plain text from an HTML string while ignoring HTML tags. It's useful for Natural Language Processing (NLP) tasks that require only the textual content of HTML documents.

## Install

```bash
npm install stophtml
```

Or yarn:

```bash
yarn add stophtml
```

Alternatively, you can also include this module directly in your HTML file from CDN:

```yml
UMD: https://cdn.jsdelivr.net/npm/stophtml/dist/index.umd.js
ESM: https://cdn.jsdelivr.net/npm/stophtml/+esm
CJS: https://cdn.jsdelivr.net/npm/stophtml/dist/index.cjs
```

## Usage

```js
import stophtml from 'stophtml'

const input = '<p>This is <b>bold</b> and <i>italic</i>.</p>'
const segments = stophtml(input)

console.log(segments)
```

## API

### `stophtml(input: string): string[]`

Tokenizes an HTML string, extracting plain text while ignoring HTML tags.

- `input`: The input HTML string to tokenize.

Returns an array of plain text segments extracted from the HTML string.

## Related

- [boox](https://github.com/bent10/boox) – Performing full-text search across multiple documents by combining [TF-IDF](https://en.wikipedia.org/wiki/Tf%E2%80%93idf) score with [inverted index](https://en.wikipedia.org/wiki/Inverted_index) weight.
- [stopmarkdown](https://github.com/bent10/stopmarkdown) – Extracts plain text from an Markdown string.
- [to-plaintext](https://github.com/bent10/to-plaintext) – Convert hypertext (e.g., HTML, Markdown) strings into plain text for natural language processing (NLP) normalization.
- [stopword](https://github.com/fergiemcdowall/stopword) – Allows you to strip stopwords from an input text (supports a ton of languages).

## Benchmark

```bash
✓ test/index.bench.ts (2) 1305ms
     name                 hz     min     max    mean     p75     p99    p995    p999     rme  samples
   · stophtml     136,571.33  0.0064  0.3648  0.0073  0.0069  0.0241  0.0263  0.1222  ±0.70%    68286   fastest
   · htmlparser2   68,310.52  0.0131  2.0111  0.0146  0.0138  0.0348  0.0458  0.0769  ±0.96%    34156


 BENCH  Summary

  stophtml - test/index.bench.ts >
    2.00x faster than htmlparser2
```

<details>
<summary>See benchmark code</summary>

```js
import { bench } from 'vitest'
import { Parser } from 'htmlparser2'
import stophtml from 'stophtml'

const html = getHtml()

bench('stophtml', () => {
  stophtml(html)
})

bench('htmlparser2', () => {
  htmlparser2Parser(html)
})

function htmlparser2Parser(text: string) {
  const res: string[] = []

  const parser = new Parser({
    ontext(data) {
      res.push(data)
    }
  })

  parser.write(text)
  parser.end()

  return res.join(' ')
}

function getHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Template</title>
</head>
<body>
    <h1>Welcome to my HTML Template</h1>
    <p>This is a paragraph within the HTML template.</p>
    <ul>
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
    </ul>
    <img src="https://example.com/image.jpg" alt="Example Image">
    <a href="https://example.com">Visit our website</a>
</body>
</html>
`
}
```

</details>

## Contributing

We 💛&nbsp; issues.

When committing, please conform to [the semantic-release commit standards](https://www.conventionalcommits.org/). Please install `commitizen` and the adapter globally, if you have not already.

```bash
npm i -g commitizen cz-conventional-changelog
```

Now you can use `git cz` or just `cz` instead of `git commit` when committing. You can also use `git-cz`, which is an alias for `cz`.

```bash
git add . && git cz
```

## License

![GitHub](https://img.shields.io/github/license/bent10/stophtml)

A project by [Stilearning](https://stilearning.com) &copy; 2024.
