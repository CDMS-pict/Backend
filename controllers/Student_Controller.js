const User = require("../models/Students");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signup = async (req, res, next) => {
  try {
    const { fullname, collegeId, password, rollno, div, branch } = req.body;
    const emailRegex = /@ms.pict.edu/;
    if (!emailRegex.test(collegeId)) throw "CollgeId is not valid";
    if (password.length < 6) throw "Password must be of atleast 6 characters";
    const user = await User.findOne({ collegeId });
    if (user) {
      res.status(200).json("User if Already Exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(password, salt);
    const newStudent = new User({
      fullname,
      collegeId,
      password: hashedpass,
      rollno,
      div,
      branch,
    });
    const student = await newStudent.save();
    res.status(200).json(student);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const login = async (req, res, next) => {
  const { collegeId, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ collegeId: collegeId });
  } catch (err) {
    return new Error(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "User not found. Signup Please" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Inavlid collegeId / Password" });
  }
  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

  // console.log("Generated Token\n", token);

  //   if (req.cookies[`${existingUser._id}`]) {
  //     req.cookies[`${existingUser._id}`] = "";
  //   }

  res.cookie(String(existingUser._id), token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 60 * 60), // 30 seconds
    httpOnly: true,
    sameSite: "lax",
  });

  return res
    .status(200)
    .json({ message: "Successfully Logged In", user: existingUser, token });
};

const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  let token = cookies.split("=")[2];
  token = token.split(";")[0];
  if (!token) {
    res.status(404).json({ message: "No token found" });
  }
 
  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid TOken" });
    }
    // console.log(user.id);
    req.id = user.id;
  });
  next();
};

const getUser = async (req, res, next) => {
  const userId = req.id;
  console.log(userId);
  let user;
  try {
    user = await User.findById(userId, "-password");
  } catch (err) {
    return new Error(err);
  }
  if (!user) {
    return res.status(404).json({ messsage: "User Not FOund" });
  }
  return res.status(200).json({ user });
};
const refreshToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  console.log(cookies);
  const prevToken = cookies.split("=")[1];
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "35s",
    });
    console.log("Regenerated Token\n", token);

    res.cookie(String(user.id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 30), // 30 seconds
      httpOnly: true,
      sameSite: "lax",
    });

    req.id = user.id;
    next();
  });
};

const logout = (req, res, next) => {
  const cookies = req.headers.cookie;
  let prevToken = cookies.split("=")[2];
  prevToken = prevToken.split(";")[0];
  // console.log(cookies + "\n\n" + prevToken);
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }
    res.clearCookie(`${user.id}`);
    // req.cookies[`${user.id}`] = "";
    return res.status(200).json({ message: "Successfully Logged Out" });
  });
};

exports.logout = logout;
exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.refreshToken = refreshToken;
