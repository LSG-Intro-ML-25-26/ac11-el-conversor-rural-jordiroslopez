@namespace
class SpriteKind:
    Tree = SpriteKind.create()
    Button = SpriteKind.create()
    Item = SpriteKind.create()
    Menu = SpriteKind.create()
    Venta = SpriteKind.create()
def revisar_arboles():
    global boton
    if arbol.overlaps_with(nena):
        boton = sprites.create(assets.image("""
            miImagen1
            """), SpriteKind.Button)
        boton.set_position(arbol.x, arbol.y)
        if controller.A.is_pressed():
            sprites.destroy_all_sprites_of_kind(SpriteKind.Tree)
            sprites.destroy_all_sprites_of_kind(SpriteKind.Button)
            info.change_score_by(1)
            generar_arbol()
    else:
        sprites.destroy_all_sprites_of_kind(SpriteKind.Button)

def on_down_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-down
            """),
        500,
        False)
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def on_right_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-right
            """),
        500,
        False)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def on_left_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-left
            """),
        500,
        False)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_menu_pressed():
    global myMenu
    myMenu = miniMenu.create_menu_from_array([miniMenu.create_menu_item("Inventario"),
            miniMenu.create_menu_item("Comprar")])
    
    def on_button_pressed(selection, selectedIndex):
        myMenu.close()
    myMenu.on_button_pressed(controller.A, on_button_pressed)
    
controller.menu.on_event(ControllerButtonEvent.PRESSED, on_menu_pressed)

def on_up_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-up
            """),
        500,
        False)
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def generar_arbol():
    global x, y, arbol, arboles_actuales
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
    arboles_actuales += 1
def habilitar_boton(mySprite: Sprite):
    global boton
    boton = sprites.create(assets.image("""
        miImagen1
        """), SpriteKind.Button)
    boton.set_position(mySprite.x, mySprite.y - 10)
arboles_actuales = 0
y = 0
x = 0
myMenu: miniMenu.MenuSprite = None
boton: Sprite = None
arbol: Sprite = None
nena: Sprite = None
tiles.set_current_tilemap(tilemap("""
    nivel1
    """))
info.set_score(0)
menu_activo = False
nena = sprites.create(assets.image("""
    nena-front
    """), SpriteKind.player)
scene.center_camera_at(120, 0)
nena.set_position(120, 55)
scene.camera_follow_sprite(nena)
controller.move_sprite(nena)
generar_arbol()

def on_on_update():
    revisar_arboles()
game.on_update(on_on_update)
