export function splitLine (selector) {
  const elements = document.querySelectorAll(selector)

  elements.forEach(el => {
    if (el.classList.contains('splitted')) return

    const chars = el.innerHTML.replace(/<!-- -->/g, '').toString()
    el.innerHTML = null
    
    let lines
    if (chars.indexOf('<br>') > -1) {
      if (window.innerWidth < 528) lines = [chars.replace('<br>', '')]
      else lines = chars.split('<br>')
    } else {
      lines = [chars]
    }

    let tmp = ''
    lines.forEach(line => {
      Array.from(line).forEach(char => {
        tmp += `<span>${char}</span>`
      })
      el.innerHTML += `<p>${tmp}</p>`
      tmp = ''
    })

    let top = el.offsetTop
    let text = ''
    let childs = ''
    lines = []
    el.childNodes.forEach(child => lines.push(child.children))
    lines.forEach(line => {
      const words = Array.from(line)
      words.forEach((word, i) => {
        if (top < word.offsetTop) {
          if (0 < i) {
            childs += `<div><span>${text}</span></div>`
          }
          text = ''
        }

        text += word.innerHTML
        top = word.offsetTop

        if (words.length === ++i) {
          childs += `<div><span>${text}</span></div>`
        }
      })
    })

    el.innerHTML = childs
    el.classList.add('splitted')
  })
}
