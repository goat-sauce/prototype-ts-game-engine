main () {
    rm pnpm-lock.yaml
    pnpm i
    bash .plok/log.sh install node_modules
}

main