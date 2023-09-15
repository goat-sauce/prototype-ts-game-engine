main () {
    if [ -d "build" ] 
    then
        rm -r build
        .plok/log.sh remove build
    fi

    if [ -d "node_modules" ] 
    then
        rm -r node_modules
        .plok/log.sh remove node_modules
    fi

    .plok/log.sh reset ran
}

main