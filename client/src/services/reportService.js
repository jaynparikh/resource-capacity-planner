import { getEmployees } from "./employeeService";
import { getProjects } from "./projectService";
import { getAllocations } from "./allocationService";

export async function getReportData() {
  const [employees, projects, allocations] =
    await Promise.all([
      getEmployees(),
      getProjects(),
      getAllocations(),
    ]);

  // Employee Utilization
  const employeeUtilization = employees.map(
    (employee) => {
      const utilization = allocations
        .filter(
          (allocation) =>
            allocation.employeeId === employee.id
        )
        .reduce(
          (sum, allocation) =>
            sum + allocation.allocation,
          0
        );

      return {
        id: employee.id,
        name: employee.name,
        utilization,
      };
    }
  );

  // Project Allocation
  const projectAllocation = projects.map(
    (project) => {
      const allocation = allocations
        .filter(
          (allocation) =>
            allocation.projectId === project.id
        )
        .reduce(
          (sum, allocation) =>
            sum + allocation.allocation,
          0
        );

      return {
        id: project.id,
        name: project.name,
        value: allocation,
      };
    }
  );

  const averageUtilization =
    employeeUtilization.length > 0
      ? Math.round(
          employeeUtilization.reduce(
            (sum, employee) =>
              sum + employee.utilization,
            0
          ) / employeeUtilization.length
        )
      : 0;

  const summary = {
    employees: employees.length,
    projects: projects.length,
    allocations: allocations.length,
    averageUtilization,
  };

  const topEmployees = [...employeeUtilization].sort(
    (a, b) => b.utilization - a.utilization
  );

  return {
    summary,
    employeeUtilization,
    projectAllocation,
    topEmployees,
  };
}