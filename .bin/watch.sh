main () {
    source .bin/env.sh
    webpack --watch --config ./compiler/export.ts
}

main