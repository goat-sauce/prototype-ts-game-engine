postMessage({ running: true })

onmessage = (e) => {
    postMessage({ result: true })
}
