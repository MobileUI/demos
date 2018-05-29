var CONTACTS = []

var db = null
var idEdit = null

document.addEventListener('deviceready', function () {
  db = window.sqlitePlugin.openDatabase({
    name: 'mydb.db',
    location: 'default'
  })
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS contacts (id INTEGER, name TEXT, email TEXT)')
  }, function (error) {
    console.log('Transaction ERROR: ' + error.message)
  }, function () {
    console.log('Database is ok!')
    loadList()
  })
})

function save () {
  var contact = MobileUI.objectByForm('myForm')
  MobileUI.clearForm('myForm')
  db.transaction(function (tx) {
    if (!idEdit) {
      tx.executeSql('insert into contacts (id, name, email) values (?, ?, ?)', [new Date().getTime(), contact.name, contact.email])
    } else {
      tx.executeSql('update contacts set name=?, email=? where id=?', [contact.name, contact.email, idEdit])
      idEdit = null
    }
  }, function (error) {
    console.log('Transaction ERROR: ' + error.message)
  }, function () {
    console.log('Saved!')
    loadList()
  })
}

function loadList () {
  db.transaction(function (tx) {
    tx.executeSql('select * from contacts order by id desc', [], function (tx, rs) {
      CONTACTS.length = 0 // clear array contacts
      for (var index = 0; index < rs.rows.length; index++) {
        CONTACTS.push(rs.rows.item(index))
      }
    }, function (tx, error) {
      console.log('SELECT error: ' + error.message)
    })
  })
}

function edit (id) {
  idEdit = id
  db.transaction(function (tx) {
    tx.executeSql('select * from contacts where id=?', [id], function (tx, rs) {
      MobileUI.formByObject('myForm', rs.rows.item(0))
    }, function (tx, error) {
      console.log('SELECT error: ' + error.message)
    })
  })
}

function remove (id) {
  idEdit = id
  db.transaction(function (tx) {
    tx.executeSql('delete from contacts where id=?', [id], function (tx, rs) {
      loadList()
    }, function (tx, error) {
      console.log('SELECT error: ' + error.message)
    })
  })
}
