main () {
    npx eslint "libs/**/*.ts" $@
    npx eslint "compiler/**/*.ts" $@
    npx eslint "app/**/*.ts" $@
}

main $@