
const bounds = {
    px: 512 / 2,
    nx: -(512 / 2),
    py: 512 / 2,
    ny: -(512 / 2)
}

for (let x = bounds.nx; x <= bounds.px; x++) {
    for (let y = bounds.ny; y <= bounds.py; y++) {
        console.log(x, y);
    }
}
