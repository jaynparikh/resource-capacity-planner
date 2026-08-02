import prisma from "../config/prisma.js";

export const getEmployees = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: {
        id: "asc",
      },
    });

    res.json(employees);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch employees.",
    });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const {
      name,
      role,
      skill,
      capacity,
      status,
    } = req.body;

    const employee = await prisma.employee.create({
      data: {
        name,
        role,
        skill,
        capacity: Number(capacity),
        status,
      },
    });

    res.status(201).json(employee);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create employee.",
    });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const {
      name,
      role,
      skill,
      capacity,
      status,
    } = req.body;

    const employee = await prisma.employee.update({
      where: {
        id,
      },
      data: {
        name,
        role,
        skill,
        capacity: Number(capacity),
        status,
      },
    });

    res.json(employee);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update employee.",
    });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.employee.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Employee deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete employee.",
    });
  }
};