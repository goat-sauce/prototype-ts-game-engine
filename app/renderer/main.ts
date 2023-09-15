async function start(): Promise<void> {
    const payload = await window.api.game.launch()

    document.addEventListener('keydown', (event: KeyboardEvent) => {
        payload.keyboard.codes.add(event.code)
        console.log('keydown')
    })

    document.addEventListener('keyup', (event: KeyboardEvent) => {
        payload.keyboard.codes.remove(event.code)
        console.log('keyup')
    })
}

start()
