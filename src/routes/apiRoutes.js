const router = require("express").Router();
const verifyJWT = require('../services/verifyJWT');

const userController = require("../controller/userController");
const classroomController = require("../controller/classroomController");
const scheduleController = require("../controller/scheduleController");

//User
router.post("/user/", userController.createUser);
router.post("/user/login", userController.postLogin);
router.get("/user/",verifyJWT, userController.getAllUsers);
router.get("/user/:cpf",verifyJWT, userController.getUserByCPF);
router.put("/user/:cpf",userController.updateUser);
router.delete("/user/:cpf", userController.deleteUser);

//Classroom
router.post("/classroom/", classroomController.createClassroom);
router.get("/classroom/", classroomController.getAllClassrooms);
router.get("/classroom/:number", classroomController.getClassroomById);
router.put("/classroom/", classroomController.updateClassroom);
router.delete("/classroom/:number", classroomController.deleteClassroom);

//Schedule
router.post("/schedule/", scheduleController.createSchedule);
router.get("/schedule/", scheduleController.getAllSchedules);
router.get("/scheduleRoom/:id", scheduleController.getSchedulesByIdClassroom);
router.get("/scheduleUser/:cpf", scheduleController.getSchedulesByUserCPF);
router.get("/schedule/ranges/:id", scheduleController.getSchedulesByIdClassroomRanges);
router.delete("/schedule/:id", scheduleController.deleteSchedule);

module.exports = router;
