// main.ts
import { router } from "./router"

document.addEventListener("DOMContentLoaded", () => {
  router()

  document.body.addEventListener("click", (e) => {
    const target = e.target as HTMLElement
    const linkElement = target.closest("[data-link]") as HTMLElement

    if (linkElement) {
      e.preventDefault()
      const href = linkElement.getAttribute("href")

      if (href) {
        history.pushState(null, "", href)
        router()
      }
    }
  })

  window.addEventListener("popstate", router)
})
