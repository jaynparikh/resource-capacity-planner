import api from "./api";

export async function getAllocations() {
  const { data } = await api.get("/allocations");
  return data;
}

export async function createAllocation(allocation) {
  const { data } = await api.post(
    "/allocations",
    allocation
  );

  return data;
}

export async function updateAllocation(allocation) {
  const { data } = await api.put(
    `/allocations/${allocation.id}`,
    allocation
  );

  return data;
}

export async function deleteAllocation(id) {
  await api.delete(`/allocations/${id}`);
}