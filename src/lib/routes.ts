const routes = {
    home: "/",
    login: "/login",
    signup: "/signup",
    dashboard: {
      root: "/dashboard",
      accountOverview: "/dashboard/account-overview",
      transactions: "/dashboard/transactions",
      settings: "/dashboard/settings",
    },
    settings: {
      profile: "/settings/profile",
      security: "/settings/security",
    },
    api: {
      login: "/api/auth/login",
      logout: "/api/auth/logout",
      transactions: "/api/transactions",
    },
  };
  
  export default routes;