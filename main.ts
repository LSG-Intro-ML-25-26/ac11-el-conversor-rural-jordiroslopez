//  CREADO POR JORDI ROS LÓPEZ
//  DEFINICION DE OBJETOS
namespace SpriteKind {
    export const Tree = SpriteKind.create()
    export const Button = SpriteKind.create()
    export const Item = SpriteKind.create()
    export const Menu = SpriteKind.create()
    export const Venta = SpriteKind.create()
}

//  FUNCION PARA CREAR EL JUGADOR AL INICIO DEL JUEGO O DESPUES DE SER DESTRUIDO
function crearPlayer(x: number, y: number) {
    
    nena = sprites.create(assets.image`
        nena-front
        `, SpriteKind.Player)
    nena.setPosition(x, y)
    scene.cameraFollowSprite(nena)
    controller.moveSprite(nena)
}

//  ANIMACION PLAYER HACIA ABAJO
controller.down.onEvent(ControllerButtonEvent.Pressed, function on_down_pressed() {
    animation.runImageAnimation(nena, assets.animation`
            nena-animation-down
            `, 500, false)
})
//  ANIMACION PLAYER HACIA LA DERECHA
controller.right.onEvent(ControllerButtonEvent.Pressed, function on_right_pressed() {
    animation.runImageAnimation(nena, assets.animation`
            nena-animation-right
            `, 500, false)
})
//  ANIMACION PLAYER HACIA LA IZQUIERDA
controller.left.onEvent(ControllerButtonEvent.Pressed, function on_left_pressed() {
    animation.runImageAnimation(nena, assets.animation`
            nena-animation-left
            `, 500, false)
})
//  AL PUSLAR EL BOTON "A"
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    
    //  SI PLAYER ESTA JUNTO A LA MAQUINA EXPENDEDORA SE MOSTRARA EL MENU DE ESTA
    if (maquina_expendedora.overlapsWith(nena) && (!menu_maquina_activa && !menu_items_activo)) {
        menu_maquina_activa = true
        sprites.destroy(nena)
        menu_maquina = miniMenu.createMenu(miniMenu.createMenuItem("Gallina = 6 troncos"), miniMenu.createMenuItem("Patatas(1.5kg) = 2 troncos"), miniMenu.createMenuItem("Cabra = 5 troncos"), miniMenu.createMenuItem("Huevos(12 un.) = 3 troncos"), miniMenu.createMenuItem("Caballo = 12 troncos"), miniMenu.createMenuItem("Salir"))
        //  ELEGIR ITEM DE LA TIENDA
        menu_maquina.onButtonPressed(controller.A, function on_button_pressed(selection: any, selectedIndex: any) {
            
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
            
            crearPlayer(59, 45)
            menu_maquina_activa = false
        })
    }
    
})
//  SI PLAYER ESTA JUNTO A UN ARBOL Y PULSA EL BOTON "A" SE TALARA EL ARBOL, SE AGREGARA UN TRONCO A LA PUNTUACION Y SE GENERARA UN NUEVO ARBOL
function talarArbol() {
    if (arbol.overlapsWith(nena)) {
        if (controller.A.isPressed()) {
            sprites.destroyAllSpritesOfKind(SpriteKind.Tree, effects.disintegrate, 1000)
            sprites.destroyAllSpritesOfKind(SpriteKind.Button)
            info.changeScoreBy(1)
            generar_arbol()
        }
        
    }
    
}

//  AL PULSAR EL BOTON DE MENU SE MOSTRAR LA LISTA DE ITEMS DE PLAYER
//  PARA EVITAR BUG LO QUE HACE ES ALMACENAR LAS COORDENADAS X, Y DE PLAYER, LO DESTRUYE Y MUESTRA
//  EL MENU Y CUANDO SALE GENERA UN NUEVO PLAYER AL QUE LE ASIGNA LAS COORDENADAS ANTERIORES.
controller.menu.onEvent(ControllerButtonEvent.Pressed, function on_menu_pressed() {
    
    if (!menu_items_activo && !menu_maquina_activa) {
        menu_items_activo = true
        sprites.destroy(nena)
        player_x_actual = nena.x
        player_y_actual = nena.y
        menu_items = miniMenu.createMenu(miniMenu.createMenuItem(convertToText(n_gallina), assets.image`
                    miImagen2
                    `), miniMenu.createMenuItem(convertToText(n_patata), assets.image`
                    miImagen3
                    `), miniMenu.createMenuItem(convertToText(n_cabra), assets.image`
                    miImagen4
                    `), miniMenu.createMenuItem(convertToText(n_huevos), assets.image`
                    miImagen5
                    `), miniMenu.createMenuItem(convertToText(n_caballo), assets.image`
                    miImagen6
                    `), miniMenu.createMenuItem("Salir"))
        scene.cameraFollowSprite(menu_items)
        menu_items.onButtonPressed(controller.A, function on_button_pressed2(selection2: any, selectedIndex2: any) {
            
            menu_items_activo = false
            crearPlayer(player_x_actual, player_y_actual)
            menu_items.close()
        })
    }
    
})
//  ANIMACION PLAYER HACIA ARRIBA
controller.up.onEvent(ControllerButtonEvent.Pressed, function on_up_pressed() {
    animation.runImageAnimation(nena, assets.animation`
            nena-animation-up
            `, 500, false)
})
//  DETERMINA SI LA COMPRA SE EFECTIA O NO EN FUNCION DEL PRECIO DEL ITEM SELSCCIONADO
//  SI LA PUNTUACION (TRONCOS) ES MAYOR O IGUAL AL PRECIO INTRODUCIDO, SE AGREGARA EL ITEM A PLAYER Y SE MOSTRARA UN MENSAGE DE COMPRA REALIZADA
//  EN CASO CONTRARIO MOSTRARA UN ERROR DE SALDO INSUFICIENTE.
function efectuarCompra(núm: number): number {
    if (info.score() >= núm) {
        info.changeScoreBy(núm * -1)
        game.splash("Compra realizada")
        return 1
    } else {
        game.splash("No tienes", "suficientes troncos")
    }
    
    return 0
}

//  GENERAR UN ARBOL EN UN PUNTO ALEATORIO Y CONTROLADO DEL MAPA
function generar_arbol() {
    
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
}

//  VARIABLES
let boton_arbol : Sprite = null
let boton_maquina : Sprite = null
//  COORDENADAS
let y = 0
let x = 0
let player_y_actual = 0
let player_x_actual = 0
//  DECLARACION DE OBJETOS
let menu_items : miniMenu.MenuSprite = null
let arbol : Sprite = null
let menu_maquina : miniMenu.MenuSprite = null
let menu_items_activo = false
let menu_maquina_activa = false
let nena : Sprite = null
let maquina_expendedora : Sprite = null
tiles.setCurrentTilemap(tilemap`
    nivel1
    `)
info.setScore(0)
maquina_expendedora = sprites.create(assets.image`
    miImagen
    `, SpriteKind.Venta)
maquina_expendedora.setPosition(59, 25)
//  ITEMS INVENTARIO
let n_gallina = 0
let n_patata = 0
let n_cabra = 0
let n_huevos = 0
let n_caballo = 0
//  FUNCIONES
crearPlayer(59, 45)
generar_arbol()
//  MENSAGES DE INICIO
game.showLongText("Tala arboles y vende los troncos por cosméticos de la máquina expendedora", DialogLayout.Center)
game.showLongText("Pulsa el botón de menú para ver tu inventario", DialogLayout.Center)
//  FUNCION MAIN
game.onUpdate(function on_on_update() {
    
    talarArbol()
    if (nena.overlapsWith(maquina_expendedora)) {
        boton_maquina = sprites.create(assets.image`
            miImagen1
            `, SpriteKind.Button)
        boton_maquina.setPosition(maquina_expendedora.x, maquina_expendedora.y - 10)
        if (controller.A.isPressed()) {
            menu_maquina_activa = true
        }
        
    } else if (nena.overlapsWith(arbol)) {
        boton_arbol = sprites.create(assets.image`
            miImagen1
            `, SpriteKind.Button)
        boton_arbol.setPosition(arbol.x, arbol.y)
    } else {
        sprites.destroyAllSpritesOfKind(SpriteKind.Button)
    }
    
})
