main () {
    if [ -f .env ]; then
        export $(cat .env | grep -v '#' | sed 's/\r$//' | awk '/=/ {print $1}' )
    fi
}

main