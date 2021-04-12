$(function () {
    
    
    var animals_info = get_animals_info();
    var images = animals_info.images;
    var sounds = animals_info.audio;

    var extract=function(element_name){
        return animals_info.animal_food_items.map(function (item) {
            return item[element_name];
        })
    };


    var backsounds = new ToggleSound(
        sounds.backsounds,
        images.backsounds_off,
        images.backsounds_on,
        $("#back_sound_block")
    );

    $('body').css('background-image', 'url("' + ImagePath(images.background) + '")');
    var container = new Container($('.container').first());

    var animal_food_items = shakeItems(animals_info.animal_food_items);

    var foods = shakeItems(extract("food"));

    for (var i = 0; i < animal_food_items.length; i++) {
        var animalFood = animal_food_items[i];
        var foodId = foods[i];

        var dropping = new Dropping(foodId, images[foodId]);
        var catcher = new Catcher(animalFood.animal, images[animalFood.animal], animalFood.food);
        catcher.onCatch = function (catcherObj) {
            var ateSound = new ActionSound(sounds[catcherObj.id]);
            ateSound.play();

            if (container.caughtCount() == container.items.length) {
                $('#my-modal').on('hidden.bs.modal',onModalHidden)
                              .modal('show');

            }
        }
        container.append(catcher,dropping);
    };
    container.init();
    container.show();

    function onModalHidden(event){
        container.hide(function(){
            container.clear();
            
            var animal_food_items = shakeItems(animals_info.animal_food_items);
            var animals = shakeItems(extract("animal"));
            

            for (var i = 0; i < animal_food_items.length; i++) {
                var animalHome = animal_food_items[i];
                var animalId = animals[i];
        
                var dropping = new Dropping(animalId, images[animalId]);
                var catcher = new Catcher(animalHome.home, images[animalHome.home], animalHome.animal);
                catcher.onCatch = function (catcherObj) {
                    var ateSound = new ActionSound(sounds[catcherObj.droppingId]);
                    ateSound.play();
        
                    if (container.caughtCount() == container.items.length) {
                        $('#my-modal').unbind()
                            .on('hidden.bs.modal',function(){
                                container.hide()
                            }).modal('show');
                    }
                }
                container.append(catcher,dropping);
            };
            container.init();
            container.show();
        });
    }
});
