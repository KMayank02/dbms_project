const router = require("express").Router();
const User = require("../schemas/user");
const bcrypt = require("bcrypt");

router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;
    if (username.length < 5) {
      return res
        .status(400)
        .json({ msg: "Username length must be greater than 4" });
    }

    const existing_username = await User.findOne({ username: username });
    if (existing_username) {
      return res.status(400).json({ msg: "Username already exists" });
    }

    const existing_email = await User.findOne({ email: email });
    if (existing_email) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password must contain atleast 6 characters" });
    }
    const password_hash = await bcrypt.hash(password, 10);

    const new_user = new User({
      username: username,
      email: email,
      password: password_hash,
      address: address,
    });
    await new_user.save();
    return res.status(200).json({ msg: "Sign Up Successful!!!" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error!!!" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existing_user = await User.findOne({ username });
    if (!existing_user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    bcrypt.compare(password, existing_user.password, (err, data) => {
      if (data) {
        res
          .status(200)
          .json({ id: existing_user.id, role: existing_user.role });
      } else {
        res.status(400).json({ msg: "Invalid credentials" });
      }
    });
  } catch (error) {
    res.status(500).json({ msg: "Server Error!!!" });
  }
});

router.get("/get-user", async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id).select("-password");
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: "Server Error!!!" });
  }
});

router.put("/update-address", async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;
    await User.findByIdAndUpdate(id,{address: address});
    return res.status(200).json({msg:"Address updated successfully!!!"});
  } catch (error) {
    res.status(500).json({ msg: "Server Error!!!" });
  }
});

module.exports = router;
