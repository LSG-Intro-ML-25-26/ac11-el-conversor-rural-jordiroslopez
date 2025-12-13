@namespace
class SpriteKind:
    Interactive = SpriteKind.create()

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

nena: Sprite = None
tiles.set_current_tilemap(tilemap("""
    nivel1
    """))
sprites.create(assets.image("""
    miImagen
    """), SpriteKind.enemy).set_position(80, 41)
nena = sprites.create(assets.image("""
    nena-front
    """), SpriteKind.player)
scene.camera_follow_sprite(nena)
controller.move_sprite(nena)