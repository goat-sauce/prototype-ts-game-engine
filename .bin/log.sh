main () {
  source  .bin/colors.sh

  log=""
  colors=($CYAN $PURPLE $BLUE $GREEN)
  i=0

  if (($# > ${#colors[@]}))
  then
    source .bin/error.sh "$# args passed. Ran out of colors. Only ${#colors[@]} available."
    exit 2
  fi

  for arg in "$@"
  do
    log+=":${colors[$i]}$arg$NC"
    i=$((i+1))
  done

  printf "${log:1}\n"
}

main "$@"