find dummy/actors -name "*.aseprite" -print0 | while read -d $'\0' file

do
    base="dummy/"
    basename=$(basename ${file})
    dirname=$(dirname ${file#$base})
    filename="${basename%.*}"
    dist="out"
    sheet="$dist/$dirname/$filename.png"
    data="$dist/$dirname/atlas.json"

    ./compiler/aseprite/aseprite.exe --batch -script-param filename=$file -script-param sheet=$sheet -script-param data=$data -script dummy/import.lua
done
