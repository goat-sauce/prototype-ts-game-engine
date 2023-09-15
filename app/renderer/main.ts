async function start(): Promise<void> {
    const payload = await window.api.game.launch()
    document.addEventListener('keydown', payload.keyboard.add)
    document.addEventListener('keyup', payload.keyboard.remove)
    window.addEventListener('resize', payload.resize)
}

start()
