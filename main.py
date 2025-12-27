# CREADO POR JORDI ROS LÓPEZ

@namespace
# DEFINICION DE OBJETOS
class SpriteKind:
    Tree = SpriteKind.create()
    Button = SpriteKind.create()
    Item = SpriteKind.create()
    Menu = SpriteKind.create()
    Venta = SpriteKind.create()

# FUNCION PARA CREAR EL JUGADOR AL INICIO DEL JUEGO O DESPUES DE SER DESTRUIDO
def crearPlayer(x: number, y: number):
    global nena
    nena = sprites.create(assets.image("""
        nena-front
        """), SpriteKind.player)
    nena.set_position(x, y)
    scene.camera_follow_sprite(nena)
    controller.move_sprite(nena)

# ANIMACION PLAYER HACIA ABAJO
def on_down_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-down
            """),
        500,
        False)
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

# ANIMACION PLAYER HACIA LA DERECHA
def on_right_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-right
            """),
        500,
        False)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

# ANIMACION PLAYER HACIA LA IZQUIERDA
def on_left_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-left
            """),
        500,
        False)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

# AL PUSLAR EL BOTON "A"
def on_a_pressed():
    global menu_maquina_activa, menu_maquina
    # SI PLAYER ESTA JUNTO A LA MAQUINA EXPENDEDORA SE MOSTRARA EL MENU DE ESTA
    if maquina_expendedora.overlaps_with(nena) and (not (menu_maquina_activa) and not (menu_items_activo)):
        menu_maquina_activa = True
        sprites.destroy(nena)
        menu_maquina = miniMenu.create_menu(miniMenu.create_menu_item("Gallina = 6 troncos"),
            miniMenu.create_menu_item("Patatas(1.5kg) = 2 troncos"),
            miniMenu.create_menu_item("Cabra = 5 troncos"),
            miniMenu.create_menu_item("Huevos(12 un.) = 3 troncos"),
            miniMenu.create_menu_item("Caballo = 12 troncos"),
            miniMenu.create_menu_item("Salir"))
        # ELEGIR ITEM DE LA TIENDA
        def on_button_pressed(selection, selectedIndex):
            global n_gallina, n_patata, n_cabra, n_huevos, n_caballo, menu_maquina_activa
            menu_maquina.close()
            if selectedIndex == 0:
                n_gallina += efectuarCompra(6)
            elif selectedIndex == 1:
                n_patata += efectuarCompra(2)
            elif selectedIndex == 2:
                n_cabra += efectuarCompra(5)
            elif selectedIndex == 3:
                n_huevos += efectuarCompra(3)
            elif selectedIndex == 4:
                n_caballo += efectuarCompra(12)
            crearPlayer(59, 45)
            menu_maquina_activa = False
        menu_maquina.on_button_pressed(controller.A, on_button_pressed)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

# SI PLAYER ESTA JUNTO A UN ARBOL Y PULSA EL BOTON "A" SE TALARA EL ARBOL, SE AGREGARA UN TRONCO A LA PUNTUACION Y SE GENERARA UN NUEVO ARBOL
def talarArbol():
    if arbol.overlaps_with(nena):
        if controller.A.is_pressed():
            sprites.destroy_all_sprites_of_kind(SpriteKind.Tree, effects.disintegrate, 1000)
            sprites.destroy_all_sprites_of_kind(SpriteKind.Button)
            info.change_score_by(1)
            generar_arbol()

# AL PULSAR EL BOTON DE MENU SE MOSTRAR LA LISTA DE ITEMS DE PLAYER
# PARA EVITAR BUG LO QUE HACE ES ALMACENAR LAS COORDENADAS X, Y DE PLAYER, LO DESTRUYE Y MUESTRA
# EL MENU Y CUANDO SALE GENERA UN NUEVO PLAYER AL QUE LE ASIGNA LAS COORDENADAS ANTERIORES.
def on_menu_pressed():
    global menu_items_activo, player_x_actual, player_y_actual, menu_items
    if not (menu_items_activo) and not (menu_maquina_activa):
        menu_items_activo = True
        sprites.destroy(nena)
        player_x_actual = nena.x
        player_y_actual = nena.y
        menu_items = miniMenu.create_menu(miniMenu.create_menu_item(convert_to_text(n_gallina),
                assets.image("""
                    miImagen2
                    """)),
            miniMenu.create_menu_item(convert_to_text(n_patata),
                assets.image("""
                    miImagen3
                    """)),
            miniMenu.create_menu_item(convert_to_text(n_cabra),
                assets.image("""
                    miImagen4
                    """)),
            miniMenu.create_menu_item(convert_to_text(n_huevos),
                assets.image("""
                    miImagen5
                    """)),
            miniMenu.create_menu_item(convert_to_text(n_caballo),
                assets.image("""
                    miImagen6
                    """)),
            miniMenu.create_menu_item("Salir"))
        scene.camera_follow_sprite(menu_items)
        
        def on_button_pressed2(selection2, selectedIndex2):
            global menu_items_activo
            menu_items_activo = False
            crearPlayer(player_x_actual, player_y_actual)
            menu_items.close()
        menu_items.on_button_pressed(controller.A, on_button_pressed2)
controller.menu.on_event(ControllerButtonEvent.PRESSED, on_menu_pressed)

# ANIMACION PLAYER HACIA ARRIBA
def on_up_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-up
            """),
        500,
        False)
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

# DETERMINA SI LA COMPRA SE EFECTIA O NO EN FUNCION DEL PRECIO DEL ITEM SELSCCIONADO
# SI LA PUNTUACION (TRONCOS) ES MAYOR O IGUAL AL PRECIO INTRODUCIDO, SE AGREGARA EL ITEM A PLAYER Y SE MOSTRARA UN MENSAGE DE COMPRA REALIZADA
# EN CASO CONTRARIO MOSTRARA UN ERROR DE SALDO INSUFICIENTE.
def efectuarCompra(núm: number):
    if info.score() >= núm:
        info.change_score_by(núm * -1)
        game.splash("Compra realizada")
        return 1
    else:
        game.splash("No tienes", "suficientes troncos")
    return 0

# GENERAR UN ARBOL EN UN PUNTO ALEATORIO Y CONTROLADO DEL MAPA
def generar_arbol():
    global x, y, arbol
    x = randint(1, 7) * 30
    y = randint(3, 7) * 30
    arbol = sprites.create(img("""
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
            """),
        SpriteKind.Tree)
    arbol.set_position(x, y)

# VARIABLES


boton_arbol: Sprite = None
boton_maquina: Sprite = None

# COORDENADAS
y = 0
x = 0
player_y_actual = 0
player_x_actual = 0

# DECLARACION DE OBJETOS
menu_items: miniMenu.MenuSprite = None
arbol: Sprite = None
menu_maquina: miniMenu.MenuSprite = None
menu_items_activo = False
menu_maquina_activa = False
nena: Sprite = None
maquina_expendedora: Sprite = None
tiles.set_current_tilemap(tilemap("""
    nivel1
    """))
info.set_score(0)
maquina_expendedora = sprites.create(assets.image("""
    miImagen
    """), SpriteKind.Venta)
maquina_expendedora.set_position(59, 25)

# ITEMS INVENTARIO
n_gallina = 0
n_patata = 0
n_cabra = 0
n_huevos = 0
n_caballo = 0

# FUNCIONES
crearPlayer(59, 45)
generar_arbol()

# MENSAGES DE INICIO
game.show_long_text("Tala arboles y vende los troncos por cosméticos de la máquina expendedora",
    DialogLayout.CENTER)
game.show_long_text("Pulsa el botón de menú para ver tu inventario",
    DialogLayout.CENTER)

# FUNCION MAIN
def on_on_update():
    global boton_maquina, menu_maquina_activa, boton_arbol
    talarArbol()
    if nena.overlaps_with(maquina_expendedora):
        boton_maquina = sprites.create(assets.image("""
            miImagen1
            """), SpriteKind.Button)
        boton_maquina.set_position(maquina_expendedora.x, maquina_expendedora.y - 10)
        if controller.A.is_pressed():
            menu_maquina_activa = True
    elif nena.overlaps_with(arbol):
        boton_arbol = sprites.create(assets.image("""
            miImagen1
            """), SpriteKind.Button)
        boton_arbol.set_position(arbol.x, arbol.y)
    else:
        sprites.destroy_all_sprites_of_kind(SpriteKind.Button)
game.on_update(on_on_update)
