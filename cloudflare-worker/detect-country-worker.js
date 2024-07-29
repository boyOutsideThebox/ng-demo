addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Fetch the original response from the origin server
  let response = await fetch(request)

  // Only modify HTML content
  if (response.headers.get("Content-Type")?.includes("text/html")) {
    // Read the response body
    let html = await response.text()

    // Modify the HTML - example: insert country code
    const countryCode = request.headers.get('cf-ipcountry')
    html = html.replace('<!--COUNTRY_PLACEHOLDER-->', countryCode)

    // Create a new response with the modified HTML
    response = new Response(html, response)
    response.headers.set('Content-Type', 'text/html')
  }

  return response
}