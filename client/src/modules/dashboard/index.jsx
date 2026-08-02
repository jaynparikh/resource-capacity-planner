import { useEffect, useMemo, useState } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import Card from "../../components/ui/Card/Card";

import { getEmployees } from "../../services/employeeService";
import { getProjects } from "../../services/projectService";
import { getAllocations } from "../../services/allocationService";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#dc2626",
  "#7c3aed",
  "#0891b2",
];

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [allocations, setAllocations] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [
        employeeData,
        projectData,
        allocationData,
      ] = await Promise.all([
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

  const employeeChart = useMemo(() => {
    return employees.map((employee) => {
      const total = allocations
        .filter(
          (a) => a.employeeId === employee.id
        )
        .reduce(
          (sum, a) => sum + a.allocation,
          0
        );

      return {
        name: employee.name,
        utilization: total,
      };
    });
  }, [employees, allocations]);

  const projectChart = useMemo(() => {
    return projects.map((project) => {
      const total = allocations
        .filter(
          (a) => a.projectId === project.id
        )
        .reduce(
          (sum, a) => sum + a.allocation,
          0
        );

      return {
        name: project.name,
        value: total,
      };
    });
  }, [projects, allocations]);

  const averageUtilization = useMemo(() => {
    if (!employees.length) return 0;

    const total = employeeChart.reduce(
      (sum, e) => sum + e.utilization,
      0
    );

    return Math.round(total / employees.length);
  }, [employeeChart, employees]);

  const attentionList = useMemo(() => {
    return employeeChart
      .filter((e) => e.utilization >= 80)
      .sort(
        (a, b) =>
          b.utilization - a.utilization
      );
  }, [employeeChart]);

  return (
    <div className="dashboard-page">
      <h1 className="page-title">
        Dashboard
      </h1>

      <p className="page-subtitle">
        Real-time overview of resource
        allocation and capacity.
      </p>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-title">
            Employees
          </div>

          <div className="stat-value">
            {employees.length}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-title">
            Projects
          </div>

          <div className="stat-value">
            {projects.length}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-title">
            Allocations
          </div>

          <div className="stat-value">
            {allocations.length}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-title">
            Avg Utilization
          </div>

          <div className="stat-value">
            {averageUtilization}%
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <Card>
          <h3>
            Employee Utilization
          </h3>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart
              data={employeeChart}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="utilization"
                fill="#2563eb"
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3>
            Project Allocation
          </h3>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>
              <Pie
                data={projectChart}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                                {projectChart.map(
                  (entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3>
            Employees Requiring Attention
          </h3>

          {attentionList.length === 0 ? (
            <p>
              No employees require
              attention.
            </p>
          ) : (
            <table className="simple-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Utilization</th>
                </tr>
              </thead>

              <tbody>
                {attentionList.map(
                  (employee) => (
                    <tr
                      key={employee.name}
                    >
                      <td>
                        {employee.name}
                      </td>

                      <td>
                        {
                          employee.utilization
                        }
                        %
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </Card>

        <Card>
          <h3>
            Recent Allocations
          </h3>

          {allocations.length === 0 ? (
            <p>
              No allocations found.
            </p>
          ) : (
            <table className="simple-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Project</th>
                  <th>Allocation</th>
                </tr>
              </thead>

              <tbody>
                {allocations
                  .slice()
                  .reverse()
                  .map(
                    (allocation) => {
                      const employee =
                        employees.find(
                          (e) =>
                            e.id ===
                            allocation.employeeId
                        );

                      const project =
                        projects.find(
                          (p) =>
                            p.id ===
                            allocation.projectId
                        );

                      return (
                        <tr
                          key={
                            allocation.id
                          }
                        >
                          <td>
                            {employee?.name}
                          </td>

                          <td>
                            {project?.name}
                          </td>

                          <td>
                            {
                              allocation.allocation
                            }
                            %
                          </td>
                        </tr>
                      );
                    }
                  )}
              </tbody>
            </table>
          )}
        </Card>
      </div>
    </div>
  );
}