/// <reference types="vitest/globals" />

import stophtml from '../src/index.js'

describe('stophtml', () => {
  test('returns an array of plain text segments when input contains HTML tags', () => {
    const input = '<div>Hello <span>world</span>!</div>'
    const expected = ['Hello ', 'world', '!']
    expect(stophtml(input)).toEqual(expected)
  })

  test('returns an array with single segment when input does not contain HTML tags', () => {
    const input = 'Plain text without HTML tags'
    const expected = ['Plain text without HTML tags']
    expect(stophtml(input)).toEqual(expected)
  })

  test('handles input with nested HTML tags', () => {
    const input = '<div><p>Nested <span>HTML</span> tags</p></div>'
    const expected = ['Nested ', 'HTML', ' tags']
    expect(stophtml(input)).toEqual(expected)
  })

  test('handles input with empty HTML tags', () => {
    const input = 'Text with <br /> empty <img src="test.jpg" /> tags'
    const expected = ['Text with ', ' empty ', ' tags']
    expect(stophtml(input)).toEqual(expected)
  })

  test('handles input with attributes in HTML tags', () => {
    const input = '<a href="https://example.com">Link</a>'
    const expected = ['Link']
    expect(stophtml(input)).toEqual(expected)
  })

  test('handles input with special characters inside HTML tags', () => {
    const input = '<div>Special characters: &lt; &gt; &amp;</div>'
    const expected = ['Special characters: &lt; &gt; &amp;'] // should be '< > &'?
    expect(stophtml(input)).toEqual(expected)
  })

  test('handles input with multiple spaces between HTML tags', () => {
    const input = '<div>Text  with  multiple  spaces</div>'
    const expected = ['Text  with  multiple  spaces']
    expect(stophtml(input)).toEqual(expected)
  })

  test('handles input with inline CSS and JavaScript', () => {
    const input =
      '<p style="color: red;">Red text</p><script>alert("Hello");</script>'
    const expected = ['Red text', 'alert("Hello");']
    expect(stophtml(input)).toEqual(expected)
  })
})
