import { useEffect, useState } from "react";

import Button from "../../../components/ui/Button/Button";

import "../../../components/ui/Form/Form.css";


const initialProject = {
  name: "",
  client: "",
  status: "Planning",
};


export default function ProjectForm({
  project,
  onSave,
  onCancel,
}) {

  const [formData, setFormData] = useState(initialProject);


  useEffect(() => {

    if(project){

      setFormData(project);

    } else {

      setFormData(initialProject);

    }

  },[project]);


  function handleChange(e){

    const {name,value}=e.target;


    setFormData((prev)=>({

      ...prev,

      [name]: value,

    }));

  }


  function handleSubmit(e){

    e.preventDefault();

    onSave(formData);

  }


  return (

    <form onSubmit={handleSubmit}>

      <h2 className="form-title">

        {project 
          ? "Edit Project" 
          : "Add Project"}

      </h2>


      <div className="form-group">

        <label>
          Project Name
        </label>


        <input

          name="name"

          value={formData.name}

          onChange={handleChange}

          required

        />

      </div>



      <div className="form-group">

        <label>
          Client
        </label>


        <input

          name="client"

          value={formData.client}

          onChange={handleChange}

          required

        />

      </div>



      <div className="form-group">

        <label>
          Status
        </label>


        <select

          name="status"

          value={formData.status}

          onChange={handleChange}

        >

          <option value="Planning">
            Planning
          </option>


          <option value="Active">
            Active
          </option>


          <option value="Completed">
            Completed
          </option>


        </select>

      </div>



      <div className="form-actions">


        <Button

          type="button"

          onClick={onCancel}

        >

          Cancel

        </Button>



        <Button type="submit">

          {project
            ? "Update Project"
            : "Save Project"}

        </Button>


      </div>


    </form>

  );

}