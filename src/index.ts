/**
 * Tokenizes an HTML string, extracting plain text while ignoring HTML tags.
 *
 * @param input - The input HTML string to tokenize.
 * @returns An array of plain text segments.
 */
export default function stophtml(input: string): string[] {
  const segments: string[] = []
  let currentIndex = 0
  let insideTag = false

  for (let i = 0; i < input.length; i++) {
    const char = input[i]

    if (char === '<') {
      insideTag = true
    } else if (char === '>') {
      insideTag = false
    } else if (!insideTag) {
      if (!segments[currentIndex]) {
        segments[currentIndex] = ''
      }
      segments[currentIndex] += char
    }

    if ((char === '>' || i === input.length - 1) && !insideTag) {
      currentIndex++
    }
  }

  return segments.filter(segment => !!segment.trimEnd())
}
