$().ready(function () {
    Draggable.create("#worm", {
        onDrag: function () {
            if (this.hitTest("#fish")) {
                gsap.to(this.target, { duration: 0.6, opacity: 0, scale: 0, svgOrigin: "675 143" });
            }
        }
    });

    Draggable.create("#snail", {
        onDrag: function () {
            if (this.hitTest("#tortoise")) {
                gsap.to(this.target, { duration: 0.6, opacity: 0, scale: 0, svgOrigin: "675 143" });
            }
        }
    });

    Draggable.create("#mosqueto", {
        onDrag: function () {
            if (this.hitTest("#salamandra")) {
                gsap.to(this.target, { duration: 0.6, opacity: 0, scale: 0, svgOrigin: "675 143" });
            }
        }
    });

    Draggable.create("#bug", {
        onDrag: function () {
            if (this.hitTest("#frog")) {
                gsap.to(this.target, { duration: 0.6, opacity: 0, scale: 0, svgOrigin: "675 143" });
            }
        }
    });
});
