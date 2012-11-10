/*global screen:true*/
var screen = require("screen")
    , point = require("screen/point")

    , generator = require("../index")

    , x = 400
    , y = 300
    , center = point({ x: x, y: y })
    , world = screen(center, 800, 600)

    , gen = generator(world, {
        tick: 1000
        , density: 3
    })

/*
    Generator emits items if the density on the current screen
    is less then the set value.

    i.e. if there are less then 3 points in the world near
    the center it will emit new items to be created.

    It does so once every tick until the density is matched
*/
gen.on("item", function (pos) {
    // pos.x, pos.y

    console.log("new item", pos)

    var abs = point(pos)
    var rel = world.add(abs)
})

setInterval(function () {
    x += 1
    y += 1

    center({ x: x, y: y })
}, 30)
