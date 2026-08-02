import prisma from "../config/prisma.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        id: "asc",
      },
    });

    res.json(projects);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch projects.",
    });
  }
};

export const createProject = async (req, res) => {
  try {
    const {
      name,
      client,
      status,
    } = req.body;

    const project = await prisma.project.create({
      data: {
        name,
        client,
        status,
      },
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create project.",
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const {
      name,
      client,
      status,
    } = req.body;

    const project = await prisma.project.update({
      where: {
        id,
      },
      data: {
        name,
        client,
        status,
      },
    });

    res.json(project);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update project.",
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.project.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Project deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete project.",
    });
  }
};