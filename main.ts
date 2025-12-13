namespace SpriteKind {
    export const Machine = SpriteKind.create()
    export const Tree = SpriteKind.create()
    export const Button = SpriteKind.create()
    export const Item = SpriteKind.create()
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
    
    x = randint(3, 8) * 30
    y = randint(3, 8) * 30
    arbol = sprites.create(img`
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
            `, SpriteKind.Tree)
    arbol.setPosition(x, y)
    arboles_actuales += 1
}

let boton : Sprite = null
let arboles_actuales = 0
let arbol : Sprite = null
let y = 0
let x = 0
let nena : Sprite = null
tiles.setCurrentTilemap(tilemap`
    nivel1
    `)
info.setScore(0)
let maquina_expendedora = sprites.create(assets.image`
    miImagen
    `, SpriteKind.Machine)
nena = sprites.create(assets.image`
    nena-front
    `, SpriteKind.Player)
maquina_expendedora.setPosition(56, 40)
nena.setPosition(56, 65)
scene.cameraFollowSprite(nena)
controller.moveSprite(nena)
generar_arbol()
game.onUpdate(function on_on_update() {
    
    if (nena.overlapsWith(maquina_expendedora)) {
        boton = sprites.create(assets.image`
            miImagen0
            `, SpriteKind.Button)
        boton.setPosition(56, 30)
        if (controller.B.isPressed()) {
            game.showLongText("MENU", DialogLayout.Center)
        }
        
    } else {
        sprites.destroyAllSpritesOfKind(SpriteKind.Button)
    }
    
    if (arbol.overlapsWith(nena)) {
        boton = sprites.create(assets.image`
            miImagen1
            `, SpriteKind.Button)
        boton.setPosition(arbol.x, arbol.y)
        if (controller.A.isPressed()) {
            sprites.destroyAllSpritesOfKind(SpriteKind.Tree)
            info.changeScoreBy(1)
            generar_arbol()
        }
        
    }
    
})
