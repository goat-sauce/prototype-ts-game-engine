export {}

declare global {
  interface Window {
    client: {
      launch: () => void
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.client.launch()
})
