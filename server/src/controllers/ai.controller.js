import { PrismaClient } from "@prisma/client";
import { askGemini } from "../services/gemini.service.js";

const prisma = new PrismaClient();

export async function askAI(req, res) {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const employees = await prisma.employee.findMany();
    const projects = await prisma.project.findMany();
    const allocations = await prisma.allocation.findMany();

    const employeeSummary = employees.map((employee) => {
      const employeeAllocations = allocations.filter(
        (allocation) => allocation.employeeId === employee.id
      );

      const allocated = employeeAllocations.reduce(
        (sum, allocation) => sum + allocation.allocation,
        0
      );

      return {
        name: employee.name,
        role: employee.role,
        skill: employee.skill,
        capacity: employee.capacity,
        allocated,
        available: employee.capacity - allocated,
        status: employee.status,
      };
    });

    const projectSummary = projects.map((project) => {
      const projectAllocations = allocations.filter(
        (allocation) => allocation.projectId === project.id
      );

      const totalAllocation = projectAllocations.reduce(
        (sum, allocation) => sum + allocation.allocation,
        0
      );

      return {
        name: project.name,
        client: project.client,
        status: project.status,
        totalAllocation,
      };
    });

    const allocationSummary = allocations.map((allocation) => {
      const employee = employees.find(
        (e) => e.id === allocation.employeeId
      );

      const project = projects.find(
        (p) => p.id === allocation.projectId
      );

      return {
        employee: employee?.name,
        project: project?.name,
        allocation: allocation.allocation,
      };
    });

    const totalCapacity = employeeSummary.reduce(
      (sum, employee) => sum + employee.capacity,
      0
    );

    const totalAllocated = employeeSummary.reduce(
      (sum, employee) => sum + employee.allocated,
      0
    );

    const averageUtilization =
      totalCapacity > 0
        ? ((totalAllocated / totalCapacity) * 100).toFixed(1)
        : 0;

    const context = {
      summary: {
        totalEmployees: employeeSummary.length,
        totalProjects: projectSummary.length,
        totalAllocations: allocationSummary.length,
        totalCapacity,
        totalAllocated,
        averageUtilization: `${averageUtilization}%`,
      },

      employees: employeeSummary,

      projects: projectSummary,

      allocations: allocationSummary,
    };

    const answer = await askGemini(question, context);

    res.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to process AI request",
    });
  }
}