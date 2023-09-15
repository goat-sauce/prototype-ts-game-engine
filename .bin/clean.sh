main() {
    if [ -d "build" ]; then
        rm -r build
    fi

    .plok/log.sh build clean
}

main
