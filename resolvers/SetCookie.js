const CookieResolver = {
  Query: {
    setCookie: (_, __, { res }) => {
      res.cookie("token", "cookie from graphql", {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
        secure: true,
        sameSite: "none",
        signed: true,
      });

      return "cookie set";
    },
  },
};

export default CookieResolver;
