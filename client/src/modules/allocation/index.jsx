import { useMemo, useState } from "react";

import "./allocation.css";

import Card from "../../components/ui/Card/Card";

import AllocationForm from "./components/AllocationForm";
import AllocationTable from "./components/AllocationTable";

import { getEmployees } from "../../services/employeeService";
import { getProjects } from "../../services/projectService";
import { getAllocations } from "../../services/allocationService";

export default function Allocation() {
  const employees = getEmployees();
  const projects = getProjects();

  // Store only raw allocation data
  const [allocations, setAllocations] = useState(getAllocations());

  // Build table view with calculated fields
  const allocationView = useMemo(() => {
    return allocations.map((allocation) => {
      const employee = employees.find(
        (e) => e.id === allocation.employeeId
      );

      const project = projects.find(
        (p) => p.id === allocation.projectId
      );

      const utilization = allocations
        .filter(
          (a) => a.employeeId === allocation.employeeId
        )
        .reduce((sum, a) => sum + a.allocation, 0);

      return {
        ...allocation,
        employee: employee?.name || "",
        project: project?.name || "",
        utilization,
        remaining: 100 - utilization,
      };
    });
  }, [allocations, employees, projects]);

  function handleAssign(newAllocation) {
    setAllocations((prev) => {
      const currentTotal = prev
        .filter(
          (allocation) =>
            allocation.employeeId ===
              newAllocation.employeeId &&
            allocation.projectId !==
              newAllocation.projectId
        )
        .reduce(
          (sum, allocation) =>
            sum + allocation.allocation,
          0
        );

      if (
        currentTotal + newAllocation.allocation >
        100
      ) {
        alert(
          "Employee allocation cannot exceed 100%."
        );

        return prev;
      }

      const existing = prev.find(
        (allocation) =>
          allocation.employeeId ===
            newAllocation.employeeId &&
          allocation.projectId ===
            newAllocation.projectId
      );

      if (existing) {
        return prev.map((allocation) =>
          allocation.employeeId ===
            newAllocation.employeeId &&
          allocation.projectId ===
            newAllocation.projectId
            ? {
                ...allocation,
                allocation:
                  newAllocation.allocation,
              }
            : allocation
        );
      }

      return [...prev, newAllocation];
    });
  }

  return (
    <div className="allocation-page">
      <div className="page-header">
        <div>
          <h1>Resource Allocation</h1>
          <p>
            Assign employees to projects.
          </p>
        </div>
      </div>

      <Card>
        <AllocationForm
          employees={employees}
          projects={projects}
          allocations={allocations}
          onAssign={handleAssign}
        />
      </Card>

      <br />

      <Card>
        <AllocationTable
          allocations={allocationView}
        />
      </Card>
    </div>
  );
}