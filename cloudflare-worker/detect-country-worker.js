export default {
    async fetch(request, env, ctx) {
      const response = await fetch(request);
  
      const rewriter = new HTMLRewriter().on('input#countryCode', {
        element(element) {
          const countryCode = request.headers.get('cf-ipcountry');
          element.setAttribute('value', countryCode || 'UNKNOWN');
        },
      });
  
      return rewriter.transform(response);
    },
  };