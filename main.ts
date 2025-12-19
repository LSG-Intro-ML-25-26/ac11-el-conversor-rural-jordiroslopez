namespace SpriteKind {
    export const Tree = SpriteKind.create()
    export const Button = SpriteKind.create()
    export const Item = SpriteKind.create()
    export const Menu = SpriteKind.create()
    export const Venta = SpriteKind.create()
}
function crearPlayer () {
    nena = sprites.create(assets.image`nena-front`, SpriteKind.Player)
    nena.setPosition(59, 40)
    scene.cameraFollowSprite(nena)
    controller.moveSprite(nena)
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
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (maquina_expendedora.overlapsWith(nena)) {
        sprites.destroy(nena)
        menu_maquina = miniMenu.createMenu(
        miniMenu.createMenuItem("Gallina = 6 troncos"),
        miniMenu.createMenuItem("Patatas(1.5kg) = 2 troncos"),
        miniMenu.createMenuItem("Cabra = 5 troncos"),
        miniMenu.createMenuItem("Huevos(12 un.) = 3 troncos"),
        miniMenu.createMenuItem("Caballo = 12 troncos"),
        miniMenu.createMenuItem("Salir")
        )
        menu_maquina.onButtonPressed(controller.A, function (selection, selectedIndex) {
            menu_maquina.close()
            if (selectedIndex == 0) {
                n_gallina += efectuarCompra(6)
            } else if (selectedIndex == 1) {
                n_patata += efectuarCompra(2)
            } else if (selectedIndex == 2) {
                n_cabra += efectuarCompra(5)
            } else if (selectedIndex == 3) {
                n_huevos += efectuarCompra(3)
            } else if (selectedIndex == 4) {
                n_caballo += efectuarCompra(12)
            }
            crearPlayer()
        })
    }
})
function talarArbol () {
    if (arbol.overlapsWith(nena)) {
        if (controller.A.isPressed()) {
            sprites.destroyAllSpritesOfKind(SpriteKind.Tree)
            sprites.destroyAllSpritesOfKind(SpriteKind.Button)
            info.changeScoreBy(1)
            generar_arbol()
        }
    }
}
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    sprites.destroy(nena)
    menu_items = miniMenu.createMenu(
    miniMenu.createMenuItem(convertToText(n_gallina), assets.image`miImagen2`),
    miniMenu.createMenuItem(convertToText(n_patata), assets.image`miImagen3`),
    miniMenu.createMenuItem(convertToText(n_cabra), assets.image`miImagen4`),
    miniMenu.createMenuItem(convertToText(n_huevos), assets.image`miImagen5`),
    miniMenu.createMenuItem(convertToText(n_caballo), assets.image`miImagen6`),
    miniMenu.createMenuItem("Salir")
    )
    menu_items.onButtonPressed(controller.A, function (selection, selectedIndex) {
        if (selectedIndex == 5) {
            menu_items.close()
        }
        crearPlayer()
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
function efectuarCompra (núm: number) {
    if (info.score() >= núm) {
        info.changeScoreBy(núm * -1)
        game.splash("Compra realizada")
        return 1
    } else {
        game.splash("No tienes", "suficientes troncos")
    }
    return 0
}
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
let boton_arbol: Sprite = null
let menu_maquina_activa = false
let boton_maquina: Sprite = null
let y = 0
let x = 0
let menu_items: miniMenu.MenuSprite = null
let arbol: Sprite = null
let menu_maquina: miniMenu.MenuSprite = null
let nena: Sprite = null
let maquina_expendedora: Sprite = null
let n_caballo = 0
let n_huevos = 0
let n_cabra = 0
let n_patata = 0
let n_gallina = 0
tiles.setCurrentTilemap(tilemap`nivel1`)
info.setScore(0)
let arboles_actuales = 0
n_gallina = 0
n_patata = 0
n_cabra = 0
n_huevos = 0
n_caballo = 0
maquina_expendedora = sprites.create(assets.image`miImagen`, SpriteKind.Venta)
maquina_expendedora.setPosition(59, 25)
crearPlayer()
generar_arbol()
game.onUpdate(function () {
    talarArbol()
    if (nena.overlapsWith(maquina_expendedora)) {
        boton_maquina = sprites.create(assets.image`miImagen1`, SpriteKind.Button)
        boton_maquina.setPosition(maquina_expendedora.x, maquina_expendedora.y - 10)
        if (controller.A.isPressed()) {
            menu_maquina_activa = true
        }
    } else if (nena.overlapsWith(arbol)) {
        boton_arbol = sprites.create(assets.image`miImagen1`, SpriteKind.Button)
        boton_arbol.setPosition(arbol.x, arbol.y)
    } else {
        sprites.destroyAllSpritesOfKind(SpriteKind.Button)
    }
})
