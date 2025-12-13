@namespace
class SpriteKind:
    Machine = SpriteKind.create()
    Tree = SpriteKind.create()
    Button = SpriteKind.create()

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

def on_up_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-up
            """),
        500,
        False)
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def generar_arbol():
    global x, y, arboles_actuales
    x = randint(3, 8) * 30
    y = randint(3, 8) * 30
    sprites.create(img("""
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
        SpriteKind.Tree).set_position(x, y)
    arboles_actuales += 1
boton: Sprite = None
arboles_actuales = 0
y = 0
x = 0
nena: Sprite = None
MAX_ARBOLES = 10
tiles.set_current_tilemap(tilemap("""
    nivel1
    """))
maquina_expendedora = sprites.create(assets.image("""
    miImagen
    """), SpriteKind.Machine)
maquina_expendedora.set_position(56, 40)
nena = sprites.create(assets.image("""
    nena-front
    """), SpriteKind.player)
nena.set_position(56, 65)
scene.camera_follow_sprite(nena)
controller.move_sprite(nena)

def on_on_update():
    global boton
    if arboles_actuales < MAX_ARBOLES:
        generar_arbol()
    if nena.overlaps_with(maquina_expendedora):
        boton = sprites.create(assets.image("""
            miImagen0
            """), SpriteKind.Button)
        boton.set_position(56, 40)
    else:
        sprites.destroy(boton)
game.on_update(on_on_update)
