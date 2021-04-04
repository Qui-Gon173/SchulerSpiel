function ImagePath(imageFile) {
    return "img/" + imageFile;
};

function AudioPath(soundFile) {
    return "./audio/" + soundFile;
};

var shakeItems = function (array) {
    var source = array.slice(0);
    var result = [];
    
    while (source.length > 0) {
        var randIndex = Math.floor(Math.random() * source.length);
        result.push(source.splice(randIndex, 1)[0]);
    };
    return result;
};

function Dropping(id, image) {
    this.$obj = $('<div class="col-md-4 offset-4">'
    + '<img src="' + ImagePath(image) + '" class="svg" id="' + id + '" />'
    + '</div >');
};

function Catcher(id, image, droppingId) {
    var _this = this;
    _this.id = id;
    _this.$obj = $('<div class="col-md-4">'
              + '<img src="' + ImagePath(image) + '" class="svg animal" id="' + id + '" />'
              + '</div >');
    
    _this.caught = false;
    _this.onCatch = function (catcher) { };
    var completeExecuted = false;

    this.init = function () {
        Draggable.create("#" + droppingId, {
            onDrag: function () {
                if (this.hitTest("#" + id)) {
                    gsap.to(this.target,
                        {
                            duration: 0.6,
                            opacity: 0,
                            scale: 0,
                            svgOrigin: "675 143",
                            onComplete: function () {
                                if (!completeExecuted) {
                                    completeExecuted = true;
                                    _this.caught = true;
                                    _this.onCatch(_this);
                                }
                            }
                        }
                    );
                }
            }
        });
    };
};

function ContainerItem(catcher, dropping) {
    var $obj = $('<div class="row line"/>');
    $obj.append(catcher.$obj)
       .append(dropping.$obj);

    this.$obj = $obj;
    this.catcher = catcher;
    this.dropping = dropping;
};

function Container($container) {
    var _this = this;

    _this.$container = $container;
    _this.items = [];
    _this.append = function (item) {
        _this.items.push(item);
        _this.$container.append(item.$obj);
    };
    _this.caughtCount = function () {
        return _this.items.filter(function (val) {
            return val.catcher.caught
        }).length;
    };
    _this.init = function () {
        _this.items.forEach(function (val) {
            val.catcher.init();
        });
    }
}

function ActionSound(path) {
    var audio = new Audio(AudioPath(path));
    audio.volume = 0.5;

    this.audio = audio;
    this.play = function () {
        audio.play();
    };
}

function ToggleSound(soundPath, pauseImagePath, playImagePath, $container) {
    var audio = new Audio(AudioPath(soundPath));
    audio.volume = 0.5;
    audio.loop = true;

    this.audio = audio;
    var $imageBlock = $container.find('img');
    $container.click(function () {
        if (audio.paused) {
            $imageBlock.attr('src', ImagePath(playImagePath));
            audio.play();
        } else {
            $imageBlock.attr('src', ImagePath(pauseImagePath));
            audio.pause();
        }  
    });
}