$(function () {

    var randomIndexes = function (count) {
        var array = [];
        var result = [];
        for (var i = 0; i < count; i++) {
            array.push(i);
        };
        for (i = count; i > 0; i--) {
            var randIndex = Math.floor(Math.random() * i);
            result.push(array.splice(randIndex, 1)[0]);
        };
        return result;
    }

    var $container = $('.container').first();
    var imgPath = "img/"
    var rowTemplate = `<div class="row line">
    <div class="col-md-4">
        <img src="" class="svg" id="leftSide" />
    </div >
    <div class="col-md-4 offset-4">
        <img src="" class="svg" id="rightSide" />
    </div>
</div>`;
    var count = animals_info.anumal_food_home_items.length;

    var animals = animals_info.anumal_food_home_items.map(function (item) {
        return item.animal
    });
    var animalRandIndexes = randomIndexes(count);

    var foods = animals_info.anumal_food_home_items.map(function (item) {
        return item.food;
    });
    var foodRandIndexes = randomIndexes(count);


    for (var i = 0; i < count; i++) {
        var $row = $(rowTemplate);
        var animal = animals[animalRandIndexes[i]];

        $row.find("#leftSide")
            .attr("src", imgPath + animals_info.images[animal])
            .attr("id", animal);

        var food = foods[foodRandIndexes[i]];
        $row.find("#rightSide")
            .attr("src", imgPath + animals_info.images[food])
            .attr("id", food);

        $container.append($row);
    };

    animals_info.anumal_food_home_items.forEach(function (item) {
        Draggable.create("#" + item.food, {
            onDrag: function () {
                if (this.hitTest("#" + item.animal)) {
                    gsap.to(this.target, { duration: 0.6, opacity: 0, scale: 0, svgOrigin: "675 143" });
                }
            }
        });
    });
});
