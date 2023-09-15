main () {
    if [ -d "build" ]; then
        rm -r build
    fi

    source .plok/log.sh build clean
}

main