// import mongoose from "mongoose";
// import StudentModel from "../models/Student.js";

// export const createStudent = async (req, res) => {
//   try {
//     const {
//       studentId,
//       fullName,
//       email,
//       phone,
//       department,
//       yearOfStudy
//     } = req.body;

//     // Check duplicate studentId or email
//     const existingStudent = await StudentModel.findOne({
//       $or: [{ studentId }, { email }]
//     });

//     if (existingStudent) {
//       return res.status(400).json({
//         message: "Student with same ID or email already exists"
//       });
//     }

//     const student = await StudentModel.create({
//       studentId,
//       fullName,
//       email,
//       phone,
//       department,
//       yearOfStudy
//     });

//     res.status(201).json(student);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getAllStudents = async (req, res) => {
//   try {
//     const { search } = req.query;

//     let query = { isActive: true };

//     if (search) {
//       query.$or = [
//         { fullName: { $regex: search, $options: "i" } },
//         { studentId: { $regex: search, $options: "i" } },
//         { department: { $regex: search, $options: "i" } }
//       ];
//     }

//     const students = await StudentModel.find(query).sort({ createdAt: -1 });
//     res.json(students);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const updateStudent = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Validate MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid student ID" });
//     }

//     const student = await StudentModel.findById(id);

//     if (!student || !student.isActive) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     const {
//       fullName,
//       email,
//       phone,
//       department,
//       yearOfStudy
//     } = req.body;

//     if (fullName !== undefined) student.fullName = fullName;
//     if (email !== undefined) student.email = email;
//     if (phone !== undefined) student.phone = phone;
//     if (department !== undefined) student.department = department;
//     if (yearOfStudy !== undefined) student.yearOfStudy = yearOfStudy;

//     await student.save();

//     res.json({
//       message: "Student updated successfully",
//       student
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getStudentById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid student ID" });
//     }

//     const student = await StudentModel.findById(id);

//     if (!student || !student.isActive) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     res.json(student);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// export const softDeleteStudent = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Validate MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid student ID" });
//     }

//     const student = await StudentModel.findById(id);

//     if (!student || !student.isActive) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     student.isActive = false;
//     await student.save();

//     res.json({
//       message: "Student deactivated successfully"
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const activateStudent = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid student ID" });
//     }

//     const student = await StudentModel.findById(id);

//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     if (student.isActive) {
//       return res.status(400).json({ message: "Student already active" });
//     }

//     student.isActive = true;
//     await student.save();

//     res.json({
//       message: "Student activated successfully"
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

import mongoose from "mongoose";
import StudentModel from "../models/Student.js";

/**
 * CREATE STUDENT
 * POST /api/students
 */
export const createStudent = async (req, res) => {
  try {
    const {
      studentId,
      fullName,
      email,
      phone,
      department,
      yearOfStudy,
    } = req.body;

    // Check duplicate studentId or email
    const existingStudent = await StudentModel.findOne({
      $or: [{ studentId }, { email }],
    });

    if (existingStudent) {
      return res.status(400).json({
        message: "Student with same ID or email already exists",
      });
    }

    const student = await StudentModel.create({
      studentId,
      fullName,
      email,
      phone,
      department,
      yearOfStudy,
      isActive: true, // default
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET ALL STUDENTS (ACTIVE + INACTIVE)
 * GET /api/students
 */
export const getAllStudents = async (req, res) => {
  try {
    const { search, status } = req.query;

    let query = {};

    // Optional status filter
    if (status === "active") query.isActive = true;
    if (status === "inactive") query.isActive = false;

    // Search filter
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { studentId: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { department: { $regex: search, $options: "i" } },
      ];
    }

    const students = await StudentModel.find(query).sort({
      createdAt: -1,
    });

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET STUDENT BY ID (ACTIVE OR INACTIVE)
 * GET /api/students/:id
 */
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const student = await StudentModel.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * UPDATE STUDENT (ACTIVE OR INACTIVE)
 * PUT /api/students/:id
 */
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const student = await StudentModel.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const {
      fullName,
      email,
      phone,
      department,
      yearOfStudy,
    } = req.body;

    if (fullName !== undefined) student.fullName = fullName;
    if (email !== undefined) student.email = email;
    if (phone !== undefined) student.phone = phone;
    if (department !== undefined) student.department = department;
    if (yearOfStudy !== undefined) student.yearOfStudy = yearOfStudy;

    await student.save();

    res.json({
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DEACTIVATE STUDENT (SOFT DELETE)
 * PATCH /api/students/:id/deactivate
 */
export const deactivateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const student = await StudentModel.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (!student.isActive) {
      return res.status(400).json({ message: "Student already inactive" });
    }

    student.isActive = false;
    await student.save();

    res.json({
      message: "Student deactivated successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ACTIVATE STUDENT
 * PATCH /api/students/:id/activate
 */
export const activateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const student = await StudentModel.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (student.isActive) {
      return res.status(400).json({ message: "Student already active" });
    }

    student.isActive = true;
    await student.save();

    res.json({
      message: "Student activated successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * HARD DELETE STUDENT
 * DELETE /api/students/:id
 */
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const student = await StudentModel.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      message: "Student deleted permanently",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};