import { useEffect, useState } from "react"

import Input from "../form/Input"
import Select from "../form/Select"
import SubmitButton from "../form/SubmitButton"
import styles from "./ProjectForm.module.css"

function ProjectForm({handleSubmit, btnText, projectData}) {

  const [categories, setCategories] = useState([])
  const [project, setProject] = useState(projectData || {})

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((resp) => resp.json())
    .then((data) => setCategories(data))
    .catch(err => console.log(err))
  }, [])

  const submit = (e) => {
    e.preventDefault()
    handleSubmit(project)
  }

  function handleChange(e) {
    setProject({...project, [e.target.name]: e.target.value})
  }

  function handleCategory(e) {
    setProject({
      ...project,
      category: {
        id: parseInt(e.target.value),
        name: e.target.options[e.target.selectedIndex].text
      }
    })
  }

  return (
    <form onSubmit={submit} className={styles.form}>
        <Input
            label="Nome do projeto"
            type="text"
            name="name"
            value={project.name}
            placeholder="Insira o nome do projeto"
            handleOnChange={handleChange}
        />
        <Input
            label="Orçamento do projeto"
            type="number"
            name="budget"
            value={project.budget}
            placeholder="Insira o orçamento total"
            handleOnChange={handleChange}
        />
        <Select
          label="Selecione uma categoria"
          name="category_id"
          options={categories}
          value={project.category ? project.category.id : ""}
          handleOnChange={handleCategory}
        />
        <SubmitButton text={btnText}/>
    </form>
  )
}

export default ProjectForm