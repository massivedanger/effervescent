_ = require "lodash"

Keys =
  pressed: []
  released: []

  map: [
    '',
    '',
    '',
    'Cancel',
    '',
    '',
    'Help',
    '',
    'BackSpace',
    'Tab',
    '',
    '',
    'Clear',
    'Enter',
    'Return',
    '',
    'Shift',
    'Control',
    'Alt',
    'Pause',
    'CapsLock',
    'Kana',
    'Eisu',
    'Junja',
    'Final',
    'Hanja',
    '',
    'Escape',
    'Convert',
    'Nonconvert',
    'Accept',
    'Modechange',
    'Space',
    'PageUp',
    'PageDown',
    'End',
    'Home',
    'Left',
    'Up',
    'Right',
    'Down',
    'Select',
    'Print',
    'Execute',
    'Printscreen',
    'Insert',
    'Delete',
    '',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'Colon',
    'Semicolon',
    'LessThan',
    'Equals',
    'GreaterThan',
    'QuestionMark',
    'At',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'Win',
    '',
    'ContextMenu',
    '',
    'Sleep',
    'Numpad0',
    'Numpad1',
    'Numpad2',
    'Numpad3',
    'Numpad4',
    'Numpad5',
    'Numpad6',
    'Numpad7',
    'Numpad8',
    'Numpad9',
    'Multiply',
    'Add',
    'Separator',
    'Subtract',
    'Decimal',
    'Divide',
    'F1',
    'F2',
    'F3',
    'F4',
    'F5',
    'F6',
    'F7',
    'F8',
    'F9',
    'F10',
    'F11',
    'F12',
    'F13',
    'F14',
    'F15',
    'F16',
    'F17',
    'F18',
    'F19',
    'F20',
    'F21',
    'F22',
    'F23',
    'F24',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    'NumLock',
    'ScrollLock',
    'WinOemFjJisho',
    'WinOemFjMasshou',
    'WinOemFjTouroku',
    'WinOemFjLoya',
    'WinOemFjRoya',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    'Circumflex',
    'Exclamation',
    'DoubleQuote',
    'Hash',
    'Dollar',
    'Percent',
    'Ampersand',
    'Underscore',
    'OpenParen',
    'CloseParen',
    'Asterisk',
    'Plus',
    'Pipe',
    'HyphenMinus',
    'OpenCurlyBracket',
    'CloseCurlyBracket',
    'Tilde',
    '',
    '',
    '',
    '',
    'VolumeMute',
    'VolumeDown',
    'VolumeUp',
    '',
    '',
    '',
    '',
    'Comma',
    '',
    'Period',
    'Slash',
    'BackQuote',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    'OpenBracket',
    'BackSlash',
    'CloseBracket',
    'Quote',
    '',
    'Meta',
    'Altgr',
    '',
    'WinIcoHelp',
    'WinIco00',
    '',
    'WinIcoClear',
    '',
    '',
    'WinOemReset',
    'WinOemJump',
    'WinOemPa1',
    'WinOemPa2',
    'WinOemPa3',
    'WinOemWsctrl',
    'WinOemCusel',
    'WinOemAttn',
    'WinOemFinish',
    'WinOemCopy',
    'WinOemAuto',
    'WinOemEnlw',
    'WinOemBacktab',
    'Attn',
    'Crsel',
    'Exsel',
    'Ereof',
    'Play',
    'Zoom',
    '',
    'Pa1',
    'WinOemClear',
    ''
  ]

  listen: (win = window) ->
    win.addEventListener "keydown", @onKeyDown
    win.addEventListener "keyup", @onKeyUp

  stopListening: (win = window) ->
    win.removeEventListener "keydown", @onKeyDown
    win.removeEventListener "keyup", @onKeyUp

  onKeyDown: (event) ->
    @pressed.push @map[event.keyCode]

  onKeyUp: (event) ->
    @released.push @map[event.keyCode]
    @pressed = _.without @pressed, @map[event.keyCode]

  isPressed: (key) ->
    key in @pressed

  isReleased: (key) ->
    key in @released

  update: (delta) ->
    @released = []

module.exports = Keys
