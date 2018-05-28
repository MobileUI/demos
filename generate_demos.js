const fs = require('fs')
const path = require('path')
const wrench = require('wrench')
const demos = require('./demos.json')

var template = fs.readFileSync(path.join('./template.html')).toString()

var content = ''

if (!fs.existsSync(path.join('./dist'))) {
  fs.mkdirSync(path.join('./dist'))
}

for (var i in demos.demos) {
  var item = demos.demos[i]
  content += `
    <div class="item-demo">
        <h1 class="text-strong">${item.label}</h1>
        <p>${item.description}</p>
        <button class="border-blue blue radius small" onclick="runDemo('${item.key}')">Run demo</button>
        <button class="border-blue text-blue radius small" onclick="openSource('${item.key}')">Source Code</button>
        <div class="line margin-bottom"></div>
    </div>
    `
  wrench.copyDirSyncRecursive(item.path, path.join('./dist', item.key), {
    forceDelete: true
  })
}
var index = template.replace(`<!-- SPACE-GENERATE-DOCS -->`, `<div class="content-list-demo padding">${content}</div>`)
fs.writeFileSync(path.join('./dist', 'index.html'), index)

if (!fs.existsSync(path.join(demos.site_dir, 'demos/'))) {
  fs.mkdirSync(path.join(demos.site_dir, 'demos/'))
}

wrench.copyDirSyncRecursive('./dist', path.join(demos.site_dir, 'demos/'), {
  forceDelete: true
})
