export function newTop() {
  const towers = document.querySelectorAll(".tower");
  // setTimeout(() => {
  towers.forEach(item => {
    const top = item.lastElementChild;
    if (top) {
      top.draggable = "true";
      top.classList.add("draggable");
      const supTop = top.previousElementSibling;
      if (supTop) {
        supTop.draggable = false;
        supTop.classList.remove("draggable");
      }
    }
  });
  // }, 0);
}
