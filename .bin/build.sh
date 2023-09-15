all() {
    npx webpack --config ./compiler/export.ts
    .plok/log.sh build all
}

specific() {
    npx webpack --config ./compiler/configs/$1.ts
    .plok/log.sh build $1
}

main() {
    if [[ $# -eq 0 ]]; then
        all
    else
        specific $1
    fi
}

main $@
