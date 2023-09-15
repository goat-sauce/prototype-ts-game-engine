main () {
    if [ -f "pnpm-lock.yaml" ]; then
        rm pnpm-lock.yaml
    fi

    pnpm i
    bash .plok/log.sh install node_modules
}

main