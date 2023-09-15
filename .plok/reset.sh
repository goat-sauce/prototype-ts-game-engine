main () {
    if [ -d "build" ] 
    then
        rm -r build
        source .plok/log.sh remove build
    fi

    if [ -d "node_modules" ] 
    then
        rm -r node_modules
        source .plok/log.sh remove node_modules
    fi

    source .plok/log.sh reset ran
}

main