export {}

declare global {
    interface Window {
        client: {
            launch: () => void
            test: () => void
        }
    }
}

window.client.launch()
