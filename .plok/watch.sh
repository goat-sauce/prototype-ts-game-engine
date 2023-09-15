all () {
    npx webpack --watch --config ./compiler/export.ts
    .plok/log.sh watch all
}

specific () {
    npx webpack --watch --config ./compiler/configs/$1.ts
    .plok/log.sh watch $1
}

main () {
    if [[ $# -eq 0 ]] ; then
        all
    else
        specific $1
    fi
}

main $@
