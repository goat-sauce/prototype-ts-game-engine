all () {
    .plok/log.sh watch all
    npx webpack --watch --config ./compiler/export.ts
}

specific () {
    .plok/log.sh watch $1
    npx webpack --watch --config ./compiler/configs/$1.ts
}

main () {
    if [[ $# -eq 0 ]] ; then
        all
    else
        specific $1
    fi
}

main $@
