const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passport = require("passport");
const User = require("../models/user");
const flash = require("connect-flash");
const ensureLogin = require("connect-ensure-login");
const Project = require("../models/project");

const cloudinary = require("cloudinary").v2;
const uploadCloud = require("../config/cloudinary.js");

// cloudinary.config({
//   cloud_name: "viniciusadamy",
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET
// });

// ========================================= GET ROUTES =======================================
router.get("/signup", (req, res, next) => {
  res.render("auth/signup", { title: "Signup" });
});
//-----------------------------------------Changes--------------------------------------------

router.get("/feed", ensureLogin.ensureLoggedIn("/"), (req, res, next) => {
  Project.find()
    .populate("authorId")
    .then(projects => {
      User.find()
        .then(users => {
          res.render("feed", { Allprojects: projects, users, title: "Feed" });
        })
        .catch(err => {
          throw new Error(err);
        });
    })
    .catch(err => {
      throw new Error(err);
    });
});
//--------------------------------------------------------------------------------------------

router.get("/profile", ensureLogin.ensureLoggedIn("/"), (req, res, next) => {
  const user1 = req.user;
  User.findById(user1.id)
    .populate("projects")
    .then(user => {
      res.render("auth/profile", {
        user,
        currentUser: req.user,
        title: `Profile`
      });
    })
    .catch(err => {
      throw new Error(err);
    });
});

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

router.get(
  "/profile/:id",
  ensureLogin.ensureLoggedIn("/"),
  (req, res, next) => {
    const id = req.params.id;
    console.log(id);

    User.findById(id)
      .populate("projects")
      .then(user => {
        res.render("auth/profile", {
          user,
          currentUser: req.user,
          title: "Profile"
        });
      })
      .catch(err => {
        throw new Error(err);
      });
  }
);

// ========================================= POST ROUTES ======================================
router.post("/api", (req, res, next) => {
  const { query } = req.body;

  Project.find({
    $text: {
      $search: query,
      $caseSensitive: false
    }
  })
    .populate("authorId")
    .then(Allprojects => {
      // res.send(Allprojects);
      res.render("feed", { Allprojects });
    })
    .catch(err => {
      throw new Error(err);
    });
});

// Alterando profile image
router.post(
  "/edit-profile-avatar",
  uploadCloud.single("avatarUrl"),
  (req, res, next) => {
    const id = req.user._id;

    User.findByIdAndUpdate(id, {
      avatarUrl: req.file.url
    })
      .then(data => {
        res.redirect("/profile");
      })
      .catch(err => {
        throw new Error(err);
      });
  }
);

// Criando projetos
router.post("/newProject2", uploadCloud.single("image"), (req, res, next) => {
  const { projectName, description, languages, link } = req.body;
  const image = req.file.url;
  const authorId = req.user._id;

  Project.create({
    projectName,
    description,
    languages,
    link,
    image,
    authorId
  })
    .then(data => {
      User.findByIdAndUpdate(authorId, { $push: { projects: data.id } })
        .then(data2 => {
          console.log(data2);
          res.redirect("/profile");
        })
        .catch(err => {
          console.log("ERROR AQUI MESTRE", err);
          next(err);
        });
      console.log(data);
    })
    .catch(err => {
      throw new Error(err);
    });
  res.redirect("/profile");

  // res.send(req.file.url);
});

router.post("/signup", (req, res, next) => {
  let { username, password, password_check } = req.body;
  console.log(username, password);

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  if (password === password_check) {
    User.create({
      // Precisa fazer o login automaticamente
      username,
      password: hashPass
    })
      .then(data => {
        console.log(`User created: ${data}`);
        passport.authenticate("local")(req, res, function() {
          res.redirect("/feed");
        });
      })
      .catch(err => {
        throw new Error(err);
      });
  } else {
    res.render("auth/signup", { message: `Password doesn't match.` });
  }
});

// Updating profile image
router.post("/profile-edit-image", (req, res, next) => {
  const { data } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(
    id,
    {
      avatarUrl: data
    },
    { new: true }
  )
    .then(info => {
      console.log(info);
    })
    .catch(err => {
      throw new Error(err);
    });
});

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/feed",
    failureRedirect: "/",
    passReqToCallback: true
  })
);

// Updating About
router.post("/profile-edit-about", (req, res, next) => {
  const { about } = req.body;

  console.log(req.user);

  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      about
    }
  )
    .then(data => res.redirect("/profile"))
    .catch(err => {
      throw new Error(err);
    });
});

router.post("/delete-project", (req, res, next) => {
  const { id } = req.body;
  console.log(id);
  Project.findByIdAndDelete(id)
    .then(data => {
      console.log(data);
      res.redirect("/profile");
    })
    .catch(err => {
      throw new Error(err);
    });
});

// Updating profile image
router.post("/profile-edit-image", (req, res, next) => {});

//---------------------------------Dont Touch--------------------------------------------------------------------

// router.post("/newProject", (req, res, next) => {
//   const { projectName, description, languages, link, image } = req.body;
//   const authorId = req.user._id;
//   console.log(authorId);
//   Project.create({
//     projectName,
//     description,
//     languages,
//     link,
//     image,
//     authorId
//   })
//     .then(data => {
//       User.findByIdAndUpdate(authorId, { $push: { projects: data.id } })
//         .then(data2 => {
//           console.log(data2);
//           res.redirect("/profile");
//         })
//         .catch(err => {
//           console.log("ERROR AQUI MESTRE", err);
//           next(err);
//         });
//       console.log(data);
//     })
//     .catch(err => {
//       throw new Error(err);
//     });
//   res.redirect("/profile");
// });

//---------------------------------------------------------------------------------------------------------------

module.exports = router;
