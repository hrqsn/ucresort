const md = require('markdown-it')({
  html: true
})
const implicitFigures = require('markdown-it-implicit-figures')

export default async function markdownToHtml (markdown) {
  const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const aIndex = tokens[idx].attrIndex('target')

    if (aIndex < 0) {
      tokens[idx].attrPush(['target', '_blank'])
    } else {
      tokens[idx].attrs[aIndex][1] = '_blank'
    }

    const relIndex = tokens[idx].attrIndex('rel')
    if (relIndex < 0) {
      tokens[idx].attrPush(['rel', 'noopener noreferrer'])
    } else {
      tokens[idx].attrs[relIndex][1] = 'noopener noreferrer'
    }

    return defaultRender(tokens, idx, options, env, self)
  }

  md.use(implicitFigures, {
    figcaption: true
  })
  return md.render(markdown)
}
