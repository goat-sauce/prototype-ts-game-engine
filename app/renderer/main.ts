export { }

declare global {
    interface Window {
        client: {
            launch: () => void
        }
    }
}

window.client.launch()