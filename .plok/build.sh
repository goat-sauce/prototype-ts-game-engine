all () {
    source .plok/log.sh build all
    npx webpack --config ./compiler/export.ts
}

specific () {
    source .plok/log.sh build $1
    npx webpack --config ./compiler/configs/$1.ts
}

main () {
    source .plok/env.sh

    if [[ $# -eq 0 ]] ; then
        all
    else
        specific $1
    fi
}

main $@
