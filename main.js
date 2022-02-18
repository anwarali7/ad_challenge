const videoContainer = document.getElementById("video-container");
const video = document.getElementById("video");
const content = document.getElementById("content");
const arrow = document.getElementById("arrowup");
const under = document.getElementById("under");
const ellipseP = document.getElementById("ellipseP")

// video.onpause = () => { // A utiliser avec sleep, pour lancer l'animation plus tôt.
video.onended = () => { // Comportement normal

  // Dimensions de la page.
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Faire disparaitre la vidéo.
  video.style.transition = "height 0.3s linear, width 0.3s linear";
  video.style.height = "0";
  video.style.width = "0";

  // Position du conteneur vidéo.
  const videoRect = videoContainer.getBoundingClientRect();

  // Distance entre content et videoContainer à parcourir.
  const contentDistanceTopTop = content.getBoundingClientRect().top - videoRect.top;

  // Faire remonter content.
  const distance = (height - content.getBoundingClientRect().bottom) + contentDistanceTopTop;
  content.style.transition = "bottom 0.4s linear";
  content.style.bottom = `${distance}px`;

  // Faire remonter la fleche avec fade out, et changer texte ellipse.
  arrow.style.animation = "unset";
  arrow.style.transition = "bottom 0.4s linear, opacity 0.4s linear";
  arrow.style.bottom = `${distance}px`;
  arrow.style.opacity = '0';
  ellipseP.style.transition = "opacity 0.3s linear";
  ellipseP.ontransitionend = () => {
    ellipseP.innerText = "J'y vais";
    ellipseP.style.opacity = "1"
  }
  ellipseP.style.opacity = "0";

  // Faire remonter under (l'adresse avec carte).
  under.style.transition = "bottom 0.4s linear";
  under.style.bottom = `${distance}px`;

  // Lorsque la transition se termine, on place les éléments
  // par rapport à la largeur de l'écran, en responsive.
  content.ontransitionend = () => {
    const contentRatioVw = 100 * videoRect.top / width;
    content.style.transition = "unset";
    content.style.bottom = "unset";
    content.style.top = `${contentRatioVw}vw`;

    const underRatioVw = 100 * under.getBoundingClientRect().top / width;
    under.style.transition = "unset"
    under.style.bottom = "unset";
    under.style.top = `${underRatioVw}vw`;
  }
}


// Fonction pour lancer l'animation si on fait pause.

// const sleep = ms => new Promise(r => setTimeout(r, ms));
// (async () => { await sleep(500); video.pause(); })();
