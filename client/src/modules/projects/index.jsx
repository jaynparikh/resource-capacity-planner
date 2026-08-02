import { useEffect, useMemo, useState } from "react";

import "./projects.css";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject as deleteProjectApi,
} from "../../services/projectService";

import ProjectTable from "./components/ProjectTable";
import ProjectForm from "./components/ProjectForm";

import Card from "../../components/ui/Card/Card";
import Button from "../../components/ui/Button/Button";
import SearchBox from "../../components/ui/SearchBox/SearchBox";
import Modal from "../../components/ui/Modal/Modal";

export default function Projects() {

  const [projects, setProjects] = useState([]);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);

  const [sortColumn, setSortColumn] = useState("name");

  const [sortDirection, setSortDirection] = useState("asc");


  useEffect(() => {
    loadProjects();
  }, []);


  async function loadProjects() {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error(error);
    }
  }


  function handleSort(column) {

    if (sortColumn === column) {

      setSortDirection((prev) =>
        prev === "asc" ? "desc" : "asc"
      );

    } else {

      setSortColumn(column);
      setSortDirection("asc");

    }
  }


  function handleAddProject() {
    setSelectedProject(null);
    setShowModal(true);
  }


  function handleEdit(project) {
    setSelectedProject(project);
    setShowModal(true);
  }


  async function saveProject(project) {

    try {

      if (selectedProject) {

        await updateProject(project);

      } else {

        await createProject(project);

      }


      await loadProjects();

      setSelectedProject(null);
      setShowModal(false);

    } catch(error) {

      console.error(error);

    }

  }


  async function deleteProject(id) {

    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );


    if(!confirmed)
      return;


    try {

      await deleteProjectApi(id);

      await loadProjects();

    } catch(error){

      console.error(error);

    }

  }


  function closeModal(){

    setSelectedProject(null);
    setShowModal(false);

  }


  const filteredProjects = useMemo(() => {

    const filtered = projects.filter(
      (project) =>
        project.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        project.client
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );


    filtered.sort((a,b)=>{

      const valueA = a[sortColumn];
      const valueB = b[sortColumn];


      if(typeof valueA === "string"){

        return sortDirection === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);

      }


      return 0;

    });


    return filtered;

  },[
    projects,
    search,
    sortColumn,
    sortDirection
  ]);


  return (

    <div className="employees-page">

      <div className="page-header">

        <div>

          <h1>Projects</h1>

          <p>
            Manage active and upcoming projects.
          </p>

        </div>


        <Button onClick={handleAddProject}>
          + Add Project
        </Button>

      </div>


      <SearchBox
        placeholder="Search project..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />


      <Card>

        <ProjectTable
          projects={filteredProjects}
          onHeaderClick={handleSort}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onEdit={handleEdit}
          onDelete={deleteProject}
        />

      </Card>


      <Modal
        isOpen={showModal}
        onClose={closeModal}
      >

        <ProjectForm
          project={selectedProject}
          onSave={saveProject}
          onCancel={closeModal}
        />

      </Modal>


    </div>

  );

}