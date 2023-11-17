export default function initDragAndDrop() {
  document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".task");

    let draggedCard = null;

    cards.forEach((card) => {
      card.draggable = true;

      card.addEventListener("dragstart", function () {
        draggedCard = this;
        setTimeout(() => {
          this.style.display = "none";
        }, 0);
      });

      card.addEventListener("dragend", function () {
        setTimeout(() => {
          this.style.display = "block";
          draggedCard = null;
        }, 0);
      });
    });

    const quadros = document.querySelectorAll(".quadro");

    quadros.forEach((quadro) => {
      quadro.addEventListener("dragover", function (e) {
        e.preventDefault();
      });

      quadro.addEventListener("drop", function () {
        if (draggedCard) {
          this.querySelector(".tasksSpace").appendChild(draggedCard);
        }
      });
    });
  });
}
