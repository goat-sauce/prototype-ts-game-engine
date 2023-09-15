async function start(): Promise<void> {
    const payload = await window.api.game.launch()
    console.log('ran')

    document.addEventListener('keydown', (event: KeyboardEvent) => {
        payload.keyboard.codes.add(event.code)
    })

    document.addEventListener('keyup', (event: KeyboardEvent) => {
        payload.keyboard.codes.remove(event.code)
    })

    window.addEventListener('resize', () => {
        payload.resize()
    })
}

start()
