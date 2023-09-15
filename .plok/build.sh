all () {
    source .plok/env.sh
    source .plok/log.sh build all
    npx webpack --config ./compiler/export.ts
}

specific () {
    source .plok/env.sh
    source .plok/log.sh build $1
    npx webpack --config ./compiler/configs/$1.ts
}

main () {
    if [[ $# -eq 0 ]] ; then
        all
    else
        specific $1
    fi
}

main $@
