main () {
    if [ -d "build" ]; then
        rm -r build
    fi

    source bash .plok/log.sh build clean
}

main