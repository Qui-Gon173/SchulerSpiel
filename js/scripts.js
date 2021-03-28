$(function () {
    var backsounds = null;


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

    var animals_info = get_animals_info();
    backsounds = new Audio(animals_info.audio.backsounds);
    backsounds.volume = 0.5;
    backsounds.loop = true;

    var $back_sound_block = $("#back_sound_block").click(togleSound);

    var imgPath = "img/"

    $('body').css('background-image', 'url("' + imgPath + animals_info.images.background + '")');

    var $container = $('.container').first();

    var rowTemplate = `<div class="row line">
    <div class="col-md-4">
        <img src="" class="svg animal" id="leftSide" />
    </div >
    <div class="col-md-4 offset-4">
        <img src="" class="svg" id="rightSide" />
    </div>
</div>`;
    var count = animals_info.anumal_food_items.length;

    var animals = animals_info.anumal_food_items.map(function (item) {
        return item.animal
    });
    var animalRandIndexes = randomIndexes(count);

    var foods = animals_info.anumal_food_items.map(function (item) {
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

    animals_info.anumal_food_items.forEach(function (item) {
        Draggable.create("#" + item.food, {
            onDrag: function () {
                var animalId = "#" + item.animal;
                if (this.hitTest(animalId)) {
                    gsap.to(this.target,
                        {
                            duration: 0.6,
                            opacity: 0,
                            scale: 0,
                            svgOrigin: "675 143",
                            onComplete: function () {
                                $(animalId).data("ate", true);
                                check_ate();
                            }
                        }
                    );

                }
            }
        });
    });

    var $animals = $('.container img.animal');
    var anyHungry = true;

    function check_ate() {
        if ($animals.length != 0 && anyHungry) {
            var ateAnimalsCount = $animals.filter(function () {
                return !!$(this).data("ate");
            }).length;

            if ($animals.length == ateAnimalsCount) {
                anyHungry = false;
                $('#my-modal').modal('show');
                /*
                $('#myModal').on('hidden.bs.modal', function (e) {
                // do something...
                })
                */
            }
        }
    }

    function togleSound() {
        if (backsounds.paused) {
            $back_sound_block.find("img").attr('src', "img/" + animals_info.images.backsounds_on);
            backsounds.play();
        } else {
            $back_sound_block.find("img").attr('src', "img/" + animals_info.images.backsounds_off);
            backsounds.pause();
        }
    }
});
