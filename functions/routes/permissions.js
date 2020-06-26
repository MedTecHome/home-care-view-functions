const access = {
  "/": {
    get: ["admin", "clinic", "doctor", "patient"],
    post: ["admin", "clinic", "doctor", "patient"],
    put: ["admin", "clinic", "doctor", "patient"],
    delete: ["admin", "clinic", "doctor", "patient"],
  },
  "/data": {
    get: ["admin", "clinic", "doctor", "patient"],
    post: ["admin", "clinic", "doctor", "patient"],
    put: ["admin", "clinic", "doctor", "patient"],
    delete: ["admin", "clinic", "doctor", "patient"],
  },
  "/profiles": {
    get: ["admin", "clinic", "doctor", "patient"],
    post: ["admin", "clinic", "doctor"],
    put: ["admin", "clinic", "doctor"],
    delete: ["admin", "clinic", "doctor"],
  },
  "/medicines": {
    get: ["doctor", "patient"],
    post: ["doctor"],
    put: ["doctor"],
    delete: ["doctor"],
  },
  "/treatments": {
    get: ["doctor", "patient"],
    post: ["doctor"],
    put: ["doctor"],
    delete: ["doctor"],
  },
  "/pressure": {
    get: ["doctor", "patient"],
    post: ["patient"],
    put: ["patient"],
    delete: ["patient"],
  },
  "/heartrate": {
    get: ["doctor", "patient"],
    post: ["patient"],
    put: ["patient"],
    delete: ["patient"],
  },
  "/temperature": {
    get: ["doctor", "patient"],
    post: ["patient"],
    put: ["patient"],
    delete: ["patient"],
  },
  "/weight": {
    get: ["doctor", "patient"],
    post: ["patient"],
    put: ["patient"],
    delete: ["patient"],
  },
  "/glucose": {
    get: ["doctor", "patient"],
    post: ["patient"],
    put: ["patient"],
    delete: ["patient"],
  },
  "/inr": {
    get: ["doctor", "patient"],
    post: ["patient"],
    put: ["patient"],
    delete: ["patient"],
  },
  "/breathing": {
    get: ["doctor", "patient"],
    post: ["patient"],
    put: ["patient"],
    delete: ["patient"],
  },
  "/oxygen": {
    get: ["doctor", "patient"],
    post: ["patient"],
    put: ["patient"],
    delete: ["patient"],
  },
  "/exercises": {
    get: ["doctor", "patient"],
    post: ["patient"],
    put: ["patient"],
    delete: ["patient"],
  },
  "/otherstest": {
    get: ["doctor", "patient"],
    post: ["patient"],
    put: ["patient"],
    delete: ["patient"],
  },
  "/clinicaltest": {
    get: ["doctor", "patient"],
  },
  "/evolution": {
    get: ["doctor"],
  },
  "/monitoring": {
    get: ["doctor"],
  },
  "/roles": {
    get: ["admin","clinic","doctor"],
  },
  "/administrationroute": {
    get: ["admin", "clinic", "doctor", "patient"],
  },
  "/dosis": {
    get: ["admin", "clinic", "doctor", "patient"],
  },
  "/shedules": {
    get: ["admin", "clinic", "doctor", "patient"],
  },
  "/concentrations": {
    get: ["admin", "clinic", "doctor", "patient"],
  },
};

const permissions = async (req, res, next) => {
  const { userLogin, method, baseUrl } = req;
  const splitedUrl = baseUrl.split("api")[1];
  console.log(splitedUrl)
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
