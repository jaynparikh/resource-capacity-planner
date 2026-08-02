import api from "./api";

export async function getProjects() {
  const { data } = await api.get("/projects");
  return data;
}

export async function createProject(project) {
  const { data } = await api.post(
    "/projects",
    project
  );

  return data;
}

export async function updateProject(project) {
  const { data } = await api.put(
    `/projects/${project.id}`,
    project
  );

  return data;
}

export async function deleteProject(id) {
  await api.delete(`/projects/${id}`);
}