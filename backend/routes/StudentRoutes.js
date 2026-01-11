import express from "express";
import { createStudent, getAllStudents,deleteStudent,updateStudent, getStudentById, deactivateStudent, activateStudent } from "../controller/studentController.js";


const router = express.Router();

/*
  Students CRUD
*/
router.post("/", createStudent);
router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);
router.patch("/:id/activate", activateStudent);
router.patch("/:id/deactivate", deactivateStudent);
router.delete("/:id", deleteStudent);
export default router;
