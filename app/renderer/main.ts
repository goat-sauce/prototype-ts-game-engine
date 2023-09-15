export { }

declare global {
    interface Window {
        client: { launch: () => void, addEnemies: (number: number) => void }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.client.launch();
});