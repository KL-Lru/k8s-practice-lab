package repos

import (
	"github.com/google/uuid"
)

type Project struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

func (Project) List() (projects []Project, err error) {
	statement := "SELECT id, name FROM projects"
	projects = []Project{}
	rows, err := Db.Query(statement)
	defer rows.Close()

	if err != nil {
		return
	}

	for rows.Next() {
		var project Project
		if err = bindProject(rows, &project); err != nil {
			return
		}
		projects = append(projects, project)
	}
	return
}

func (p Project) Create() (project Project, err error) {
	statement := "INSERT INTO projects (id, name) VALUES ($1, $2) RETURNING id, name"
	stmt, err := Db.Prepare(statement)
	if err != nil {
		return
	}
	defer stmt.Close()

	u, err := uuid.NewRandom()
	if err != nil {
		return
	}

	bindProject(stmt.QueryRow(u.String(), p.Name), &project)
	return
}

func (p Project) Update() (project Project, err error) {
	statement := "UPDATE projects SET name = $2 WHERE id = $1 RETURNING id, name"
	err = Db.QueryRow(statement, p.Id, p.Name).Scan(&project.Id, &project.Name)
	return
}

func (p Project) Delete() (project Project, err error) {
	statement := "DELETE FROM projects WHERE id = $1 RETURNING id, name"
	err = Db.QueryRow(statement, p.Id).Scan(&project.Id, &project.Name)
	return
}

func bindProject(row Scanner, project *Project) (err error) {
	err = row.Scan(&project.Id, &project.Name)
	return
}
