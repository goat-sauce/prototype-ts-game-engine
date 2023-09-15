main () {
    echo $1
    cd ../packer
    plok compile $@
    plok delivery
}

main $@