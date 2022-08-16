import { onUnmounted } from 'vue'

function createDom (parent, element, elementId, elementClass, style) {
  const node = document.createElement(element)
  if (elementId) {
    node.id = elementId
  } else if (elementClass) {
    node.classList.add(elementClass)
  }
  node.setAttribute('style', style)
  parent.appendChild(node)
  onUnmounted(() => {
    parent.removeChild(node)
  })
}

export default createDom
