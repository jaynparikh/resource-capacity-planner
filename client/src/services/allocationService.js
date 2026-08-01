const allocations = [
  {
    id: 1,
    employeeId: 1,
    projectId: 1,
    allocation: 60,
  },
  {
    id: 2,
    employeeId: 2,
    projectId: 2,
    allocation: 100,
  },
  {
    id: 3,
    employeeId: 3,
    projectId: 1,
    allocation: 40,
  },
];

export function getAllocations() {
  return allocations;
}