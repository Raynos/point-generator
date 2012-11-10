var extend = require("xtend")
    , EventEmitter = require("events").EventEmitter

    , defaults = {
        tick: 1000
        , density: 3
    }

module.exports = generator

function generator(world, options) {
    var center = world.center
        , list = world.list
        , width = world.width
        , height = world.height
        , gen = new EventEmitter()

    options = extend(defaults, options || {})

    setInterval(function () {
        var count = 0

        list.forEach(function (tuple) {
            var relative = tuple[0]
                , x = relative.x
                , y = relative.y

            if (0 < x && x < width && 0 < y && y < height) {
                count++
            }
        })

        if (count < options.density) {
            var x = Math.floor(Math.random() * width)
                , y = Math.floor(Math.random() * height)

            x = center.x + x - (width / 2)
            y = center.y + y - (height / 2)

            gen.emit("item", {
                x: x
                , y: y
            })
        }
    }, options.tick)

    return gen
}

function size(p) { return { x: p.x, y: p.y } }

function mapsize(list) {
    return list.map(function (tuple) {
        return size(tuple[1])
    })
}
