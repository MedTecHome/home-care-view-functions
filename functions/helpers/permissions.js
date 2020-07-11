const access = {
  "/": {
    get: ["admin", "clinic", "doctor", "nurse", "patient"],
    post: ["admin", "clinic", "doctor", "nurse", "patient"],
    put: ["admin", "clinic", "doctor", "nurse", "patient"],
    delete: ["admin", "clinic", "doctor", "nurse", "patient"],
  },
  "/data": {
    get: ["admin", "clinic", "doctor", "nurse", "patient"],
    post: ["admin", "clinic", "doctor", "nurse", "patient"],
    put: ["admin", "clinic", "doctor", "nurse", "patient"],
    delete: ["admin", "clinic", "doctor", "nurse", "patient"],
  },
  "/profiles": {
    get: ["admin", "clinic", "doctor", "nurse", "patient"],
    post: ["admin", "clinic", "doctor", "nurse"],
    put: ["admin", "clinic", "doctor", "nurse"],
    delete: ["admin", "clinic", "doctor"],
  },
  "/medicines": {
    get: ["doctor", "patient", "nurse"],
    post: ["doctor", "nurse"],
    put: ["doctor", "nurse"],
    delete: ["doctor"],
  },
  "/treatments": {
    get: ["doctor", "nurse", "patient"],
    post: ["doctor", "nurse"],
    put: ["doctor", "nurse"],
    delete: ["doctor"],
  },
  "/pressure": {
    get: ["doctor", "nurse", "patient"],
    post: ["patient"],
    put: ["patient"],
    delete: ["patient"],
  },
  "/heartrate": {
    get: ["doctor", "nurse", "patient"],
    post: ["patient"],
    put: ["patient"],
    delete: ["patient"],
  },
  "/temperature": {
    get: ["doctor", "nurse", "patient"],
    post: ["patient"],
    put: ["patient"],
    delete: ["patient"],
  },
  "/weight": {
    get: ["doctor", "nurse", "patient"],
    post: ["patient"],
    put: ["patient"],
    delete: ["patient"],
  },
  "/glucose": {
    get: ["doctor", "nurse", "patient"],
    post: ["patient"],
    put: ["patient"],
    delete: ["patient"],
  },
  "/inr": {
    get: ["doctor", "nurse", "patient"],
    post: ["patient"],
    put: ["patient"],
    delete: ["patient"],
  },
  "/breathing": {
    get: ["doctor", "nurse", "patient"],
    post: ["patient"],
    put: ["patient"],
    delete: ["patient"],
  },
  "/oxygen": {
    get: ["doctor", "nurse", "patient"],
    post: ["patient"],
    put: ["patient"],
    delete: ["patient"],
  },
  "/exercises": {
    get: ["doctor", "nurse", "patient"],
    post: ["patient"],
    put: ["patient"],
    delete: ["patient"],
  },
  "/otherstest": {
    get: ["doctor", "nurse", "patient"],
    post: ["patient"],
    put: ["patient"],
    delete: ["patient"],
  },
  "/clinicaltest": {
    get: ["doctor", "nurse", "patient"],
  },
  "/evolution": {
    get: ["doctor", "nurse"],
  },
  "/monitoring": {
    get: ["doctor", "nurse"],
  },
  "/roles": {
    get: ["admin", "clinic", "doctor", "nurse"],
  },
  "/administrationroute": {
    get: ["admin", "clinic", "doctor", "nurse", "patient"],
  },
  "/dosis": {
    get: ["admin", "clinic", "doctor", "nurse", "patient"],
  },
  "/shedules": {
    get: ["admin", "clinic", "doctor", "nurse", "patient"],
  },
  "/concentrations": {
    get: ["admin", "clinic", "doctor", "nurse", "patient"],
  },
};

const permissions = async (req, res, next) => {
  const { userLogin, method, baseUrl } = req;
  const splitedUrl = baseUrl.includes("api")
    ? baseUrl.split("api")[1]
    : baseUrl;
  try {
    if (userLogin) {
      const rolesWithAccess = access[splitedUrl][method.toLowerCase()];
      const haveAccess = rolesWithAccess
        ? rolesWithAccess.includes(userLogin.role)
        : false;
      if (!haveAccess) {
        req.status = 401;
        throw new Error("Access Denied");
      }
      return next();
    } else {
      req.status = 401;
      throw new Error("Access Denied");
    }
  } catch (e) {
    return next(e);
  }
};

module.exports = { permissions };
