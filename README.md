# criticalmaps-timelapser
Tool for generating Critical Maps timelapses

## Install
```npm install```

## Run
```node app.js```

## Generate timelapse
```
ffmpeg -framerate 150 -start_number 0 -i %d.png -vcodec flashsv -filter:v "crop=2048:1152:839:573" timelapse.avi
ffmpeg -loop 1 -f image2 -i outro.png -r 30 -vcodec flashsv -t 20 outro.avi
ffmpeg -i "concat:timelapse.avi|outro.avi" -c copy criticalmaps-timelapse.avi
```
