(() => {

  function getSVGHeightFromWidth(svgData, width) {
    const parser = new DOMParser()
    const svgDoc = parser.parseFromString(svgData, 'image/svg+xml')
    const svgElement = svgDoc.documentElement

    // Get the width and height of the SVG
    const originalWidth = svgElement.getAttribute('width')
    const originalHeight = svgElement.getAttribute('height')

    // Calculate the aspect ratio
    const aspectRatio = originalWidth / originalHeight
    const targetHeight = width / aspectRatio

    return targetHeight
  }

  function colorSVG(svgString, color) {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
    const pathElements = svgDoc.getElementsByTagName('path');

    // Change the fill color to red for all path elements
    for (let i = 0; i < pathElements.length; i++) {
      pathElements[i].setAttribute('fill', color)
    }

    return new XMLSerializer().serializeToString(svgDoc)
  }

  function convertSVGtoPNG(svgString, width, color, callback) {
    const height = getSVGHeightFromWidth(svgString, width)

    // Create an image element
    const img = new Image()

    // Create a canvas element
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    // Set canvas dimensions
    canvas.width = width
    canvas.height = height

    const coloredSvgString = colorSVG(svgString, color)

    // Create a Blob from the SVG string
    const blob = new Blob([coloredSvgString], {
      type: 'image/svg+xml'
    })
    const url = URL.createObjectURL(blob)

    // Set the image source to the SVG Blob URL
    img.onload = function () {
      // Draw the SVG image onto the canvas
      ctx.drawImage(img, 0, 0, width, height)

      // Convert the canvas to a PNG data URL
      const pngDataUrl = canvas.toDataURL('image/png')

      // Call the callback with the PNG data URL
      callback(pngDataUrl)

      // Revoke the Blob URL
      URL.revokeObjectURL(url)
    }

    // Handle image load errors
    img.onerror = function () {
      console.error('Failed to load SVG as image.')
      URL.revokeObjectURL(url)
    }

    // Start loading the image
    img.src = url
  }

  try {
    document.getElementById('downloadPNG').addEventListener('click', function (event) {
      event.preventDefault()


      const svgUrl = event.target.getAttribute('data-svg-href')
      const filename = event.target.getAttribute('data-filename') || 'download.png'
      const targetWidth = document.getElementById('downloadWidth').value || 100
      const color = document.getElementById('downloadColor').value || 'red'

      console.log(svgUrl, filename, targetWidth, color);
      fetch(svgUrl)
        .then(response => response.text())
        .then(svgData => convertSVGtoPNG(svgData, targetWidth, color, (pngDataUrl) => {
          console.log(pngDataUrl)

          var element = document.createElement('a')
          element.setAttribute('href', pngDataUrl)
          element.setAttribute('download', filename)

          element.style.display = 'none'
          document.body.appendChild(element)
          element.click()
          document.body.removeChild(element)
        }))
        .catch(error => {
          console.error('Error fetching SVG:', error)
        })
    })
  } catch (error) {}
})()
