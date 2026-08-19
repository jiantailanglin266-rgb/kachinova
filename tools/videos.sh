#!/usr/bin/env bash
# KACHINOVA — video pass
# Builds the six looping background films from the graded masters produced by
# tools/media.py. Motion is sinusoidal (starts and ends on the same frame) so
# every clip loops seamlessly with no visible cut.
#
#   bash tools/videos.sh            # all six
#   bash tools/videos.sh city ai    # only the named shots
set -u

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
IN="$ROOT/.media-masters"
OUT="$ROOT/assets/videos"
mkdir -p "$OUT"

FPS=30
DUR=12                 # seconds
N=$((FPS * DUR))       # frames
W=1280
H=720
UP=2880                # oversample so sub-pixel motion stays smooth

# shot|zoom base|zoom amplitude|x drift px|y drift px
SHOTS=(
  "city|1.000|0.115|40|-60"
  "ai|1.090|-0.085|-70|20"
  "revalue|1.040|0.060|110|0"
  "smart|1.020|0.085|-90|30"
  "eco|1.060|0.070|60|-45"
  "future|1.000|0.100|0|-70"
)

want() {
  [ $# -eq 0 ] && return 0
  return 1
}

targets=("$@")
selected() {
  [ ${#targets[@]} -eq 0 ] && return 0
  for t in "${targets[@]}"; do [ "$t" = "$1" ] && return 0; done
  return 1
}

for row in "${SHOTS[@]}"; do
  IFS='|' read -r name zb za dx dy <<< "$row"
  selected "$name" || continue
  src="$IN/$name.png"
  [ -f "$src" ] || { echo "!! missing $src"; continue; }

  # s = 0..1..0 over the clip -> perfectly seamless loop
  S="(1-cos(2*PI*on/$N))/2"
  Z="$zb+($za)*$S"
  X="iw/2-(iw/zoom/2)+($dx)*$S"
  Y="ih/2-(ih/zoom/2)+($dy)*$S"

  VF="scale=$UP:-2:flags=lanczos,zoompan=z='$Z':x='$X':y='$Y':d=$N:s=${W}x${H}:fps=$FPS,noise=alls=6:allf=t,format=yuv420p"

  echo "==> $name.mp4"
  ffmpeg -hide_banner -loglevel error -y -loop 1 -i "$src" \
    -vf "$VF" -frames:v "$N" \
    -c:v libx264 -profile:v high -level 4.0 -pix_fmt yuv420p \
    -crf 27 -preset medium -g $((FPS * 2)) -movflags +faststart -an \
    "$OUT/kachinova-$name.mp4"

  echo "==> $name.webm"
  ffmpeg -hide_banner -loglevel error -y -loop 1 -i "$src" \
    -vf "$VF" -frames:v "$N" \
    -c:v libvpx-vp9 -pix_fmt yuv420p -b:v 0 -crf 40 \
    -row-mt 1 -deadline good -cpu-used 3 -an \
    "$OUT/kachinova-$name.webm"
done

echo
ls -la "$OUT"
