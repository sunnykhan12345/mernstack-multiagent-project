import proxy from "express-http-proxy";
export const proxyWithHeader = (serviceUrl) => {
  return proxy(serviceUrl, {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      // Add custom header to the proxied request
      if (srcReq.user) {
        proxyReqOpts.headers["x-user-id"] = srcReq.user.userId;
      }
    },
  });
};

export default proxyWithHeader;
