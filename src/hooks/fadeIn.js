const fadeIn = () => {
  const fadeInElements = document.querySelectorAll('[data-fadeIn]')

  const showFadeInElement = (element) => {
    let duration = element.getAttribute('data-fadeIn')
    let delay = element.getAttribute('data-fadeIn-delay')
    if (duration) {
      element.style.animationDuration = duration + 's'
    }
    if (delay) {
      element.style.animationDelay = delay + 's'
    }
    element.classList.add('fade-in')
  }

  fadeInElements.forEach((element) => {
    const observer = new IntersectionObserver(entries => {
      entries.map(entry => {
        if (entry.isIntersecting && entry.target === element) {
          showFadeInElement(entry.target);
          // 释放掉observer，减少性能负担
          observer.disconnect()
        }
      })
    })
    observer.observe(element, { rootMargin: '-300px 0' })
  })
}

export default fadeIn
