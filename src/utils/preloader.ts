export function removePreloader() {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.remove();
  }
}
