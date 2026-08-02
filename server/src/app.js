import express from "express";
import cors from "cors";

import employeeRoutes from "./routes/employee.routes.js";
import projectRoutes from "./routes/project.routes.js";
import allocationRoutes from "./routes/allocation.routes.js";
import aiRoutes from "./routes/ai.routes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/employees", employeeRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/allocations", allocationRoutes);
app.use("/api/ai", aiRoutes);
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Resource Capacity Planner API is running",
  });
});

export default app;