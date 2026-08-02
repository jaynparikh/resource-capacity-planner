import { useEffect, useMemo, useState } from "react";

import "./reports.css";

import Card from "../../components/ui/Card/Card";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

import { getReportData } from "../../services/reportService";

export default function Reports() {
  const [report, setReport] = useState({
    summary: {
      employees: 0,
      projects: 0,
      allocations: 0,
      averageUtilization: 0,
    },
    employeeUtilization: [],
    projectAllocation: [],
    topEmployees: [],
  });

  useEffect(() => {
    loadReport();
  }, []);

  async function loadReport() {
    try {
      const data = await getReportData();
      setReport(data);
    } catch (error) {
      console.error(error);
    }
  }

  const utilizationData = useMemo(() => {
    return report.employeeUtilization.map(
      (employee) => ({
        ...employee,
        fill:
          employee.utilization > 100
            ? "#dc2626"
            : employee.utilization === 100
            ? "#f59e0b"
            : "#16a34a",
      })
    );
  }, [report]);

  return (
    <div className="reports-page">
      <div className="page-header">
        <div>
          <h1>Reports Dashboard</h1>

          <p>
            Executive overview of delivery and
            resource utilization.
          </p>
        </div>
      </div>

      <div className="reports-summary">
        <Card>
          <h4>Total Employees</h4>
          <h2>{report.summary.employees}</h2>
        </Card>

        <Card>
          <h4>Total Projects</h4>
          <h2>{report.summary.projects}</h2>
        </Card>

        <Card>
          <h4>Total Allocations</h4>
          <h2>{report.summary.allocations}</h2>
        </Card>

        <Card>
          <h4>Average Utilization</h4>
          <h2>
            {report.summary.averageUtilization}%
          </h2>
        </Card>
      </div>

      <div className="reports-chart-grid">
        <Card>
          <h3>Employee Utilization</h3>

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <BarChart data={utilizationData}>
              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="utilization">
                {utilizationData.map((entry) => (
                  <Cell
                    key={entry.id}
                    fill={entry.fill}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3>Project Allocation</h3>

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <BarChart
              layout="vertical"
              data={report.projectAllocation}
              margin={{
                left: 20,
              }}
            >
              <XAxis type="number" />

              <YAxis
                type="category"
                dataKey="name"
                width={120}
              />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#2563eb"
                radius={[0, 6, 6, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <h3>Top Utilized Employees</h3>

        <table className="reports-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Employee</th>
              <th>Status</th>
              <th>Utilization</th>
            </tr>
          </thead>

          <tbody>
            {report.topEmployees.map(
              (employee, index) => {
                let status = "Available";

                if (
                  employee.utilization === 100
                ) {
                  status = "Fully Utilized";
                }

                if (
                  employee.utilization > 100
                ) {
                  status = "Overallocated";
                }

                return (
                  <tr key={employee.id}>
                    <td>{index + 1}</td>

                    <td>{employee.name}</td>

                    <td>{status}</td>

                    <td>
                      {employee.utilization}%
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}