main () {
    source .bin/env.sh
    webpack --watch --config ./compiler/webpack.config.js
}

main