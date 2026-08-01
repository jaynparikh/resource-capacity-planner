import { useMemo } from "react";

import "./capacity.css";

import Card from "../../components/ui/Card/Card";
import CapacityCard from "./components/CapacityCard";

import { getEmployees } from "../../services/employeeService";
import { getAllocations } from "../../services/allocationService";

export default function Capacity() {
  const employees = getEmployees();
  const allocations = getAllocations();

  const capacityData = useMemo(() => {
    const data = employees.map((employee) => {
      const employeeAllocations = allocations.filter(
        (allocation) => allocation.employeeId === employee.id
      );

      const utilization = employeeAllocations.reduce(
        (sum, allocation) => sum + allocation.allocation,
        0
      );

      return {
        employee: employee.name,
        utilization,
        remaining: Math.max(0, 100 - utilization),
        projectCount: employeeAllocations.length,
      };
    });

    // Sort by utilization (highest first)
    data.sort((a, b) => b.utilization - a.utilization);

    return data;
  }, [employees, allocations]);

  const summary = useMemo(() => {
    const totalEmployees = capacityData.length;

    const averageUtilization =
      totalEmployees > 0
        ? Math.round(
            capacityData.reduce(
              (sum, employee) => sum + employee.utilization,
              0
            ) / totalEmployees
          )
        : 0;

    const availableEmployees = capacityData.filter(
      (employee) => employee.utilization < 100
    ).length;

    const overAllocated = capacityData.filter(
      (employee) => employee.utilization > 100
    ).length;

    return {
      totalEmployees,
      averageUtilization,
      availableEmployees,
      overAllocated,
    };
  }, [capacityData]);

  return (
    <div className="capacity-page">
      <div className="page-header">
        <div>
          <h1>Capacity Dashboard</h1>
          <p>View employee utilization across projects.</p>
        </div>
      </div>

      <div className="capacity-summary">
        <Card>
          <h4>Total Employees</h4>
          <h2>{summary.totalEmployees}</h2>
        </Card>

        <Card>
          <h4>Average Utilization</h4>
          <h2>{summary.averageUtilization}%</h2>
        </Card>

        <Card>
          <h4>Available Employees</h4>
          <h2>{summary.availableEmployees}</h2>
        </Card>

        <Card>
          <h4>Overallocated</h4>
          <h2>{summary.overAllocated}</h2>
        </Card>
      </div>

      <div className="capacity-grid">
        {capacityData.map((employee) => (
          <CapacityCard
            key={employee.employee}
            {...employee}
          />
        ))}
      </div>
    </div>
  );
}