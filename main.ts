namespace SpriteKind {
    export const Gas = SpriteKind.create()
    export const Enemey2 = SpriteKind.create()
    export const SuperCharg = SpriteKind.create()
}
namespace StatusBarKind {
    export const SuperCharg = StatusBarKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Ost == 100) {
        Projectile2 = sprites.createProjectileFromSprite(assets.image`Supercharge`, mySprite, 0, -70)
        statusbar2.value = 0
        music.zapped.play()
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    music.pewPew.play()
    projectile = sprites.createProjectileFromSprite(img`
        3 3 3 3 3 3 3 3 
        3 . . . . . . 3 
        3 . 3 3 3 3 . 3 
        3 . 3 . . 3 . 3 
        3 . 3 . . 3 . 3 
        3 . 3 3 3 3 . 3 
        3 . . . . . . 3 
        3 3 3 3 3 3 3 3 
        `, mySprite, 0, -70)
    projectile.startEffect(effects.ashes)
    statusbar.value += -1.5
})
statusbars.onStatusReached(StatusBarKind.SuperCharg, statusbars.StatusComparison.EQ, statusbars.ComparisonType.Fixed, 100, function (status) {
    Ost = 100
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemey2, function (sprite, otherSprite) {
    statusbar.value += -50
    otherSprite.destroy(effects.disintegrate, 500)
    music.bigCrash.play()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Gas, function (sprite, otherSprite) {
    statusbar.value = 100
    otherSprite.destroy()
    music.beamUp.play()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.SuperCharg, function (sprite, otherSprite) {
    statusbar2.value = 100
    otherSprite.destroy()
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemey2, function (sprite, otherSprite) {
    sprite.destroy(effects.bubbles, 500)
    otherSprite.destroy(effects.smiles, 500)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy(effects.bubbles, 500)
    otherSprite.destroy(effects.smiles, 500)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.disintegrate, 500)
    music.smallCrash.play()
})
let myFuel2: Sprite = null
let myEnemy: Sprite = null
let myEnemey2: Sprite = null
let myFuel: Sprite = null
let projectile: Sprite = null
let Projectile2: Sprite = null
let Ost = 0
let statusbar2: StatusBarSprite = null
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
game.splash("Move with ASDW/Joystick", "Shoot with Space/A")
game.splash("Super shoot with Enter/B")
effects.starField.startScreenEffect()
mySprite = sprites.create(assets.image`myImages.image0`, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setFlag(SpriteFlag.StayInScreen, true)
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.attachToSprite(mySprite, -25, 0)
statusbar2 = statusbars.create(5, 5, StatusBarKind.SuperCharg)
statusbar2.attachToSprite(mySprite, -30, 0)
statusbar2.value = 0
game.onUpdateInterval(5300, function () {
    myFuel = sprites.createProjectileFromSide(img`
        .............beebbbb............
        ............eebbbb4bb...........
        ............eb344bb4bb..........
        ............e44334bb4bb.........
        ............eb433344b4be........
        ............4eb43344444be.......
        ...........bd4eb43333344bb......
        ..........b455d4443333444bb.....
        ..........4d5555d444333444bb....
        .........4555555dd4b4443444be...
        ........bd5555d555d4bb444444ee..
        ........b55ddd665555bb4b44444ee.
        .......bd5555677655554ebb44444eb
        .......43222558855555d4eeb44b4ee
        ......b422332ddd555222d4eebbb4be
        ......be22232ed55522332db4ebbbbe
        .....bde22222e555e22232edd4bbbbe
        .....b52e222e3555e22222eddd4ebee
        ....bd552eee355552e222e355544eee
        ....665dd5555555552eee355dd4deee
        ...6776555555555555555551554d4ee
        ...4885222555dddd6655551544d4eee
        ..b45522332555dd677611d444ddeee.
        ..4d5222232e55555881d44ddd4eee..
        .bdd5e22222e555115114d54d4ee....
        .b55d2e222e351144d1d55eeee......
        bd5ddd2eee3d444555dd4e..........
        b555115dddd55d544eede...........
        4511d444d5544ee...4de...........
        41d4555d4ee........44...........
        41554eede.......................
        44ee...4e.......................
        `, 0, 50)
    myFuel.x = randint(5, 155)
    myFuel.setKind(SpriteKind.Gas)
})
game.onUpdateInterval(2000, function () {
    myEnemey2 = sprites.createProjectileFromSide(assets.image`Energy enemey`, 0, 50)
    myEnemey2.x = randint(5, 155)
    myEnemey2.setKind(SpriteKind.Enemey2)
})
forever(function () {
    music.setVolume(17)
    music.playMelody("G A F A F G F F ", 120)
})
game.onUpdateInterval(500, function () {
    myEnemy = sprites.createProjectileFromSide(img`
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 . . . . . . . . . . . . . . 2 
        2 . 2 2 2 2 2 2 2 2 2 2 2 2 . 2 
        . 2 . 2 2 2 . . . . 2 2 2 . 2 . 
        . 2 . 2 2 2 . 2 2 2 2 2 2 . 2 . 
        . . 2 . 2 2 . . . 2 2 2 . 2 . . 
        . . 2 . 2 2 . 2 2 2 2 2 . 2 . . 
        . . . 2 . 2 . . . . 2 . 2 . . . 
        . . . 2 . 2 2 2 2 2 2 . 2 . . . 
        . . . . 2 . 2 2 2 2 . 2 . . . . 
        . . . . 2 . 2 2 2 2 . 2 . . . . 
        . . . . . 2 . 2 2 . 2 . . . . . 
        . . . . . 2 . 2 2 . 2 . . . . . 
        . . . . . . 2 . . 2 . . . . . . 
        . . . . . . 2 . . 2 . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        `, 0, 50)
    myEnemy.x = randint(5, 155)
    myEnemy.setKind(SpriteKind.Enemy)
})
game.onUpdateInterval(300, function () {
    statusbar.value += -3.5
})
game.onUpdateInterval(20000, function () {
    myFuel2 = sprites.createProjectileFromSide(img`
        ..........bbbbbb................
        .......bbb444444bb..............
        .....2244444ddd444b.............
        ....244444444dddd44e............
        ...244444444444ddd4be...........
        ..244444444444444d44be..........
        .2b444444444444444d4be..........
        .2b44444444444444444bbe.........
        2bbb4444444444444444bbe.........
        2bbb4444444444444444bbe.........
        2bb4b4444444444444444bbe........
        2bb4444444444444444444be........
        2bb44444444444444444444e........
        2bbb444bbb4444444444444e........
        22bbb444bb4bb444444444be........
        .2bbbbb44bbbb44444444bbe........
        .22bbbbbbbb44bbb444444bbe.......
        ..eeebbbbbbb44bbb444444be.......
        ...eeeeebbbbbbbb44b4444be.......
        .....eeeeee222bb44bbb4bbe.......
        .......eeeee222bb44bbbbee.......
        ............e222bbbbbbbec.......
        ..............ee2bbbbeebdb......
        .................eeeeecdddb.....
        .......................cd11bbbb.
        ........................cd111dbb
        .........................b11111c
        .........................c11dd1c
        .........................cd1dbc.
        .........................cb11c..
        ..........................ccc...
        ................................
        `, 0, 50)
    myFuel2.x = randint(5, 155)
    myFuel2.setKind(SpriteKind.SuperCharg)
})
