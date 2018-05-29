var src = null

function showImage (img) {
  src = document.getElementById(img).src
  openPage('preview', function () {
    src = src.replace('&w=400&h=400&', '&w=600&h=1024&')
    document.getElementById('image-preview').src = src
  })
}
