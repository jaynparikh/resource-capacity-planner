import api from "./api";

export async function getEmployees() {
  const { data } = await api.get("/employees");
  return data;
}

export async function createEmployee(employee) {
  const { data } = await api.post(
    "/employees",
    employee
  );

  return data;
}

export async function updateEmployee(employee) {
  const { data } = await api.put(
    `/employees/${employee.id}`,
    employee
  );

  return data;
}

export async function deleteEmployee(id) {
  await api.delete(`/employees/${id}`);
}