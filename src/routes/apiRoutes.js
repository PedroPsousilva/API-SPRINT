const router = require("express").Router();
const verifyJWT = require('../services/verifyJWT');

const userController = require("../controller/userController");
const classroomController = require("../controller/classroomController");
const scheduleController = require("../controller/scheduleController");

//User
router.post("/user/", userController.createUser);
router.post("/user/login", userController.postLogin);
router.get("/user/",verifyJWT, userController.getAllUsers);
router.get("/user/:cpf",verifyJWT, userController.getUserById);
router.put("/user/:cpf",verifyJWT, userController.updateUser);
router.delete("/user/:cpf",verifyJWT, userController.deleteUser);

//Classroom
router.post("/classroom/",verifyJWT, classroomController.createClassroom);
router.get("/classroom/", classroomController.getAllClassrooms);
router.get("/classroom/:number", classroomController.getClassroomById);
router.put("/classroom/",verifyJWT, classroomController.updateClassroom);
router.delete("/classroom/:number",verifyJWT, classroomController.deleteClassroom);

//Schedule
router.post("/schedule/",verifyJWT, scheduleController.createSchedule);
router.get("/schedule/",verifyJWT, scheduleController.getAllSchedules);
router.get("/schedule/:id",verifyJWT, scheduleController.getSchedulesByIdClassroom);
router.get("/schedule/ranges/:id",verifyJWT,scheduleController.getSchedulesByIdClassroomRanges);
router.delete("/schedule/:id",verifyJWT, scheduleController.deleteSchedule);

module.exports = router;
