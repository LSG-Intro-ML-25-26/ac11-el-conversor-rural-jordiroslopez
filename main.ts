namespace SpriteKind {
    export const Machine = SpriteKind.create()
    export const Tree = SpriteKind.create()
}

controller.down.onEvent(ControllerButtonEvent.Pressed, function on_down_pressed() {
    animation.runImageAnimation(nena, assets.animation`
            nena-animation-down
            `, 500, false)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function on_right_pressed() {
    animation.runImageAnimation(nena, assets.animation`
            nena-animation-right
            `, 500, false)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function on_left_pressed() {
    animation.runImageAnimation(nena, assets.animation`
            nena-animation-left
            `, 500, false)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function on_up_pressed() {
    animation.runImageAnimation(nena, assets.animation`
            nena-animation-up
            `, 500, false)
})
function generar_arbol() {
    
    let x = randint(3, 8) * 30
    let y = randint(3, 8) * 30
    sprites.create(img`
            ................................
            ................................
            ................................
            .............ffffff.............
            ..........fff666666fff..........
            ........ff666888888666ff........
            ......ff666688666688666fff......
            .....ff6666886666668866668f.....
            ....fff688688886688886886fff....
            ...f8fff8666688888866778fff8f...
            ..f8888f6666666666666777f8888f..
            .f8888ff6666666666666677ff6688f.
            .f8866fff66886666668866fff6668f.
            f888668ff88888666688888ff877688f
            f886666688888888888888888677788f
            f886666666666688886666666667788f
            f886666666666666666666666666688f
            .ff6666666666666666666666666688f
            .fff668866666666666666668866fff.
            ..ff88886666666886666666888fff..
            ...ff8888666668888666668888ff...
            .....fff8866688888866688fff.....
            ........fffffeeeeeeffffff.......
            ......fffeeebbbbbbbbeeefff......
            .....ffefeebbbbbbbbbbeefeff.....
            ....fefeffebbbbbbbbbbeffefef....
            ....fffffbeebbbeeeebeebfffff....
            .......febbeebeebbeeebbef.......
            ......fbeebeeeebbbbeebeebf......
            ......ffffffffcbeeefffffff......
            ...............cebf.............
            ................ff..............
            `, SpriteKind.Tree).setPosition(x, y)
    arboles_actuales += 1
}

let arboles_actuales = 0
let nena : Sprite = null
let MAX_ARBOLES = 10
tiles.setCurrentTilemap(tilemap`
    nivel1
    `)
sprites.create(assets.image`
    miImagen
    `, SpriteKind.Machine).setPosition(56, 40)
nena = sprites.create(assets.image`
    nena-front
    `, SpriteKind.Player)
nena.setPosition(56, 65)
scene.cameraFollowSprite(nena)
controller.moveSprite(nena)
game.onUpdate(function on_on_update() {
    if (arboles_actuales < MAX_ARBOLES) {
        generar_arbol()
    }
    
})
