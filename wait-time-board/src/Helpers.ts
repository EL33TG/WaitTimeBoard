export function toggleFullScreen() {
  const doc = window.document;
  const docEl = doc.documentElement;

  const fullScreenElement = doc['fullscreenElement']
    || doc['mozFullscreenElement']
    || doc['webkitFullscreenElement']
    || doc['msFullscreenElement']
  
  if (fullScreenElement) {
    doc.exitFullscreen();
  } else {
    docEl.requestFullscreen().catch(e=> console.log(e));
  }
}