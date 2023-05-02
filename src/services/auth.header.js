const authHeader = () => {
  const admin = JSON.parse(sessionStorage.getItem("admin"));
  if (admin && admin.accessToken) {
    return {
      Authorization: `Bearer ` + admin.accessToken,
    };
  }
};

export { authHeader };
