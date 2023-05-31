const express = require("express");
const router = express.Router();
const Faculty = require("../models/Faculty");
const multer = require("multer");

const path = require("path");
const fs = require("fs");
// const { default: mongoose } = require("mongoose");
const {
  photo,
  getFacultyById,
} = require("../controlers/auth");
const util = require("util");
const Cv = require("../models/cv");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const dir = `./uploads`;
    fs.mkdirSync(dir, { recursive: true });
    callback(null, dir);
  },
  filename: (req, file, callback) => {
    const filename = `${file.originalname}`;
    callback(null, filename);
  },
});
const upload = multer({ storage });

router.get("/:email/profile", async (req, res) => {
  try {
    const userId = req.params.email;
    // console.log(userId)
    const user = await Faculty.findById(userId) // find the user by ID
    console.log(user);

    if (!user) {
      return res.status(404).send("User not found");
    }

    // const projects = await Project.find({ _id: user.projects }); // find all projects where the user ID matches

    res.send(user); // send the projects back as a response
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.use("/uploads", express.static("uploads"));

router.post('/createFaculty',upload.single('file'), async (req, res) => {

  const { filename, mimetype, size  } = req.file;
      const { name,profession,specialization,qualification,phone} = req.body;
 
   if (!name || !email ) {
     console.log('missing some details ');
     return res.status(404).json({
       error: 'ALL deatils must be included',
     });
   }
   
   console.log(__dirname)
   console.log(path)
  

   let faculty = new Faculty({name:name,profession:profession,specialization:specialization,image: {
     data: fs.readFileSync(path.join(__dirname, `../uploads/${filename}`)),
     contentType: mimetype
   },qualification:qualification,phone:phone});

 
   faculty.save()
   .then(() => {
     console.log('Faculty created successfully');
     res.send('Faculty created successfully');
   })
   .catch((err) => {
     console.error(err);
     res.status(500).send('Internal server error');
   });

 
 }
)




router.put("/updateFaculty", async (req, res) => {
  try {
    const { email, Conference_publications, International_Journal } = req.body;
    console.log(Conference_publications + " " + International_Journal);
    const updateFields = {};

    if (Conference_publications) {
      updateFields.Conference_Publications = Conference_publications;
    }

    if (International_Journal) {
      updateFields.International_journal = International_Journal;
    }
    console.log(">>>>>>>>helow ", updateFields);
    const updatedUser = await Faculty.findOneAndUpdate(
      { email },
      { $push: updateFields },
      { new: true, useFindAndModify: false }
    );

    // Return the updated user
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/facultys", async (req, res) => {
  try {
    const classrooms = await Faculty.find();
    // console.log(classrooms);
    res.json(classrooms);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch Alumnis" });
  }
});


router.put("/updateFacultys", async (req, res) => {
  try {
    const { email, profession } = req.body;
    const updateFields = {};

    if (profession) {
      updateFields.profession = profession; // replace skill field with new profession value
    }

    const updatedUser = await Faculty.findOneAndUpdate(
      { email },
      { $set: updateFields }, // use $set operator to update the field instead of $push
      { new: true, useFindAndModify: false }
    );

    // Return the updated user
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/editFaculty", async (req, res) => {
  try {
    const { email, conferencePublications, internationalJournals } = req.body;

    const updateFields = {};

    if (conferencePublications && conferencePublications.length > 0) {
      updateFields.Conference_Publications = conferencePublications;
    } else {
      updateFields.$unset = { Conference_Publications: 1 }; // Delete the field if the data is empty or an empty array
    }

    if (internationalJournals && internationalJournals.length > 0) {
      updateFields.International_journal = internationalJournals;
    } else {
      updateFields.$unset = { International_journal: 1 }; // Delete the field if the data is empty or an empty array
    }

    const updatedUser = await Faculty.findOneAndUpdate(
      { email },
      updateFields,
      { new: true, useFindAndModify: false }
    );

    // Return the updated user
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
router.param("emailId", getFacultyById);
router.get("/image/:emailId", photo);

module.exports = router;
