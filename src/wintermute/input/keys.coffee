class Keys
  @keysPressed = []
  @keysReleased = []

  @controlsPressed = []
  @controlsReleased = []

  @bindings = {}

  @codes = {
    "backspace": 8,
    "tab": 9,
    "enter": 13,
    "shift": 16,
    "ctrl": 17,
    "alt": 18,
    "pause": 19,
    "caps lock": 20,
    "esc": 27,
    "space": 32,
    "page up": 33,
    "page down": 34,
    "end": 35,
    "home": 36,
    "left": 37,
    "up": 38,
    "right": 39,
    "down": 40,
    "prnt scrn": 44,
    "insert": 45,
    "delete": 46,
    "0": 48,
    "1": 49,
    "2": 50,
    "3": 51,
    "4": 52,
    "5": 53,
    "6": 54,
    "7": 55,
    "8": 56,
    "9": 57,
    "a": 65,
    "b": 66,
    "c": 67,
    "d": 68,
    "e": 69,
    "f": 70,
    "g": 71,
    "h": 72,
    "i": 73,
    "j": 74,
    "k": 75,
    "l": 76,
    "m": 77,
    "n": 78,
    "o": 79,
    "p": 80,
    "q": 81,
    "r": 82,
    "s": 83,
    "t": 84,
    "u": 85,
    "v": 86,
    "w": 87,
    "x": 88,
    "y": 89,
    "z": 90,
    "f1": 112,
    "f2": 113,
    "f3": 114,
    "f5": 115,
    "f6": 116,
    "f7": 117,
    "f8": 118,
    "f9": 119,
    "f10": 120,
    "f11": 121,
    "f12": 122,
    "f13": 123,
    "num lock": 144,
    "scroll lock": 145,
    ",": 188,
    ".": 190,
    "/": 191,
    "`": 192,
    "[": 219,
    "\\": 220,
    "]": 221,
    "'": 222
  }

  @names: (=>
    unless @_names
      @_names = {}
      for name, code of @codes
        @_names[code] = name

    return @_names
  )()

  @listen: (win = window) ->
    win.addEventListener "keydown", @onKeyDown
    win.addEventListener "keyup", @onKeyUp

  @stopListening: (win = window) ->
    win.removeEventListener "keydown", @onKeyDown
    win.removeEventListener "keyup", @onKeyUp

  @onKeyDown: (event) =>
    @pressed.push @names[event.keyCode]

  @onKeyUp: (event) =>
    @released.push @names[event.keyCode]

  @isPressed: (control) ->
    control in @pressed

  @isReleased: (key) ->
    control in @released

  @update: (delta) ->
    @released = []
    @pressed = []

module.exports = Keys
