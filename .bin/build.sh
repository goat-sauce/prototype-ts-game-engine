all () {
    source .bin/env.sh
    source .bin/log.sh build all
    webpack --config ./compiler/export.ts
}

specific () {
    source .bin/env.sh
    source .bin/log.sh build $1
    webpack --config ./compiler/configs/$1.ts
}

if [[ $# -eq 0 ]] ; then
    all
else
    specific $1
fi