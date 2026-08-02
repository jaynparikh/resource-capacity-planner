import prisma from "../config/prisma.js";

export const getAllocations = async (req, res) => {
  try {
    const allocations = await prisma.allocation.findMany({
      include: {
        employee: true,
        project: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    res.json(allocations);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch allocations.",
    });
  }
};

export const createAllocation = async (req, res) => {
  try {
    const {
      employeeId,
      projectId,
      allocation,
    } = req.body;

    const newAllocation =
      await prisma.allocation.create({
        data: {
          employeeId: Number(employeeId),
          projectId: Number(projectId),
          allocation: Number(allocation),
        },
        include: {
          employee: true,
          project: true,
        },
      });

    res.status(201).json(newAllocation);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create allocation.",
    });
  }
};

export const updateAllocation = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const {
      employeeId,
      projectId,
      allocation,
    } = req.body;

    const updatedAllocation =
      await prisma.allocation.update({
        where: {
          id,
        },
        data: {
          employeeId: Number(employeeId),
          projectId: Number(projectId),
          allocation: Number(allocation),
        },
        include: {
          employee: true,
          project: true,
        },
      });

    res.json(updatedAllocation);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update allocation.",
    });
  }
};

export const deleteAllocation = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.allocation.delete({
      where: {
        id,
      },
    });

    res.json({
      message:
        "Allocation deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete allocation.",
    });
  }
};