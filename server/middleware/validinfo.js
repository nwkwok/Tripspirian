module.exports = (req, res, next) => {
    const { f_name, l_name, email, password } = req.body;
  
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (req.path === "/register") {
      if (![f_name, l_name, email, password].every(Boolean)) {
        return res.status(401).json("Incorrect Credentials - Please try again");
      } else if (!validEmail(email)) {
        return res.status(401).json("Incorrect Credentials - Please try again");
      }
    } else if (req.path === "/login") {
      if (![email, password].every(Boolean)) {
        return res.status(401).json("Incorrect Credentials - Please try again");
      } else if (!validEmail(email)) {
        return res.status(401).json("Incorrect Credentials - Please try again");
      }
    }
  
    next();
  };