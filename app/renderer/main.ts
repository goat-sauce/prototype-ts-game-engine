async function start() {
    const payload = await window.client.launch()
    document.addEventListener('keydown', payload.keyboard.add)
    document.addEventListener('keyup', payload.keyboard.remove)
    window.addEventListener('resize', payload.resize)
}

start()
