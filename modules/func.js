export function playTrack(audio) {
  if(audio.paused) {
    audio.play();
  }
  else {
    audio.pause();
  }
}