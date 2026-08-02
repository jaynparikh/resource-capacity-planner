import { useEffect, useMemo, useState } from "react";

import "./allocation.css";

import Card from "../../components/ui/Card/Card";

import AllocationForm from "./components/AllocationForm";
import AllocationTable from "./components/AllocationTable";

import { getEmployees } from "../../services/employeeService";
import { getProjects } from "../../services/projectService";
import {
  getAllocations,
  createAllocation,
  updateAllocation,
} from "../../services/allocationService";

export default function Allocation() {
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [allocations, setAllocations] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [employeeData, projectData, allocationData] =
        await Promise.all([
          getEmployees(),
          getProjects(),
          getAllocations(),
        ]);

      setEmployees(employeeData);
      setProjects(projectData);
      setAllocations(allocationData);
    } catch (error) {
      console.error(error);
    }
  }

  const allocationView = useMemo(() => {
    return allocations.map((allocation) => {
      const utilization = allocations
        .filter(
          (a) => a.employeeId === allocation.employeeId
        )
        .reduce((sum, a) => sum + a.allocation, 0);

      return {
        ...allocation,
        employee:
          allocation.employee?.name ?? "",
        project:
          allocation.project?.name ?? "",
        utilization,
        remaining: 100 - utilization,
      };
    });
  }, [allocations]);

  async function handleAssign(newAllocation) {
    try {
      const currentTotal = allocations
        .filter(
          (a) =>
            a.employeeId ===
              newAllocation.employeeId &&
            a.projectId !==
              newAllocation.projectId
        )
        .reduce(
          (sum, a) => sum + a.allocation,
          0
        );

      if (
        currentTotal + newAllocation.allocation >
        100
      ) {
        alert(
          "Employee allocation cannot exceed 100%."
        );
        return;
      }

      const existing = allocations.find(
        (a) =>
          a.employeeId ===
            newAllocation.employeeId &&
          a.projectId ===
            newAllocation.projectId
      );

      if (existing) {
        await updateAllocation({
          ...existing,
          allocation:
            newAllocation.allocation,
        });
      } else {
        await createAllocation(newAllocation);
      }

      await loadData();
    } catch (error) {
      console.error(error);
      alert("Failed to save allocation.");
    }
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