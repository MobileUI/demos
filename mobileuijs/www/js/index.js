var users = [
  { id: 1, name: 'Fábio Rogério' },
  { id: 2, name: 'João da Silva', disabled: true },
  { id: 3, name: 'Ana Maria' }
]

MobileUI.validUser = function (disabled) {
  if (disabled) {
    return '<span class="red radius padding">User disabled!</span>'
  } else {
    return ''
  }
}
