namespace SpriteKind {
    export const Tree = SpriteKind.create()
    export const Button = SpriteKind.create()
    export const Item = SpriteKind.create()
    export const Menu = SpriteKind.create()
    export const Venta = SpriteKind.create()
}
function revisar_arboles () {
    if (arbol.overlapsWith(nena)) {
        colocarBoton(nena, arbol)
        if (controller.A.isPressed()) {
            sprites.destroyAllSpritesOfKind(SpriteKind.Tree)
            sprites.destroyAllSpritesOfKind(SpriteKind.Button)
            info.changeScoreBy(1)
            generar_arbol()
        }
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-down`,
    500,
    false
    )
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-right`,
    500,
    false
    )
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-left`,
    500,
    false
    )
})
function colocarBoton (mySprite: Sprite, mySprite2: Sprite) {
    if (mySprite.overlapsWith(mySprite2)) {
        boton = sprites.create(assets.image`miImagen1`, SpriteKind.Button)
        boton.setPosition(mySprite2.x, mySprite2.y - 10)
    } else {
        sprites.destroyAllSpritesOfKind(SpriteKind.Button)
    }
}
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    myMenu = miniMenu.createMenuFromArray([miniMenu.createMenuItem("Inventario"), miniMenu.createMenuItem("Comprar")])
    myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
        myMenu.close()
    })
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-up`,
    500,
    false
    )
})
function generar_arbol () {
    x = randint(1, 7) * 30
    y = randint(3, 7) * 30
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
let arboles_actuales = 0
let y = 0
let x = 0
let myMenu: miniMenu.MenuSprite = null
let boton: Sprite = null
let arbol: Sprite = null
let nena: Sprite = null
tiles.setCurrentTilemap(tilemap`nivel1`)
info.setScore(0)
let maquina_expendedora = sprites.create(assets.image`miImagen`, SpriteKind.Venta)
nena = sprites.create(assets.image`nena-front`, SpriteKind.Player)
maquina_expendedora.setPosition(59, 25)
nena.setPosition(59, 55)
scene.cameraFollowSprite(nena)
controller.moveSprite(nena)
generar_arbol()
game.onUpdate(function () {
    colocarBoton(nena, maquina_expendedora)
    revisar_arboles()
})
