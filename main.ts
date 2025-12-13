namespace SpriteKind {
    export const Machine = SpriteKind.create()
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
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-up`,
    500,
    false
    )
})
let nena: Sprite = null
tiles.setCurrentTilemap(tilemap`nivel1`)
sprites.create(assets.image`miImagen`, SpriteKind.Machine).setPosition(56, 40)
nena = sprites.create(assets.image`nena-front`, SpriteKind.Player)
nena.setPosition(56, 65)
scene.cameraFollowSprite(nena)
controller.moveSprite(nena)
