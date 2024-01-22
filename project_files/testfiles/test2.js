/* eslint-disable no-undef */
function code(codeblock) {
  const structure = '`' + codeblock + '`'
  console.log(structure)
}

function heading(heading, text) {
  let syntx
  if (heading == 'h1') {
    syntx = '# '
  }
  if (heading == 'h2') {
    syntx = '## '
  }
  if (heading == 'h3') {
    syntx = '### '
  }
  const structure = syntx + text
  console.log(structure)
}

function bold(text) {
  const structure = '**' + text + '**'
  console.log(structure)
}

function italic(text) {
  const structure = '*' + text + '*'
  console.log(structure)
}

function blockquote(text) {
  const structure = '> ' + text
  console.log(structure)
}

function orderedList(items) {
  const list = []
  for (i in items) {
    const structure = i + '. ' + items[i]
    console.log(structure)
    list.push(structure)
    i++
  }
  console.log(list)
}

function unorderedList(items) {
  const list = []
  for (i in items) {
    const structure = '- ' + items[i]
    console.log(structure)
    list.push(structure)
    i++
  }
  console.log(list)
}

function hzrule() {
  const structure = '---'
  console.log(structure)
}

function link(url, text) {
  const structure = '[' + text + '](' + url + ')'
  console.log(structure)
}

function img(url, text) {
  const structure = '[' + text + '](' + url + ')'
  console.log(structure)
}

function table(items, texts) {
  const list = []
  for (i in items) {
    const structure = items[i] + ' | ' + texts[i]
    console.log(structure)
    list.push(structure)
    i++
  }
  console.log(list)
}

function fencedCode(codeblock) {
  const structure = '```' + codeblock + '```'
  console.log(structure)
}

function footnote(text) {
  const structure = '[^' + text + ']'
  console.log(structure)
}

function headingid(id, text) {
  const structure = '<h' + id + '>' + text + '</h' + id + '>'
  console.log(structure)
}

function strike(text) {
  const structure = '~~' + text + '~~'
  console.log(structure)
}

function taskList(items) {
  const list = []
  for (i in items) {
    const structure = '- [ ] ' + items[i]
    console.log(structure)
    list.push(structure)
    i++
  }
  console.log(list)
}

function highlight(text) {
  const structure = '===' + text + '==='
  console.log(structure)
}

code('test')
heading('h2', 'test')
bold('test')
italic('test')
blockquote('test')
orderedList(['test1', 'test2', 'test3'])
unorderedList(['test1', 'test2', 'test3'])
hzrule()
link('github.com', 'test')
img('github.com', 'alt-txt')
table(['test1', 'test2', 'test3'], ['test1', 'test2', 'test3'])
fencedCode('{{test}}test')
footnote('test')
headingid('1', 'test')
strike('test')
taskList(['test1', 'test2', 'test3'])
highlight('test')
