module.exports = function withShop({ authBaseUrl } = {}) {
  return function verifyRequest(request, response, next) {
    const { query: { shop }, session, baseUrl } = request;

    if (session && session.accessToken && session.shop && session.shop === shop) {
      next();
      return;
    }

    if (shop) {
      response.redirect(`${authBaseUrl || baseUrl}/auth?shop=${shop}`);
      return;
    }

    response.redirect('/install');
    return;
  };
};
