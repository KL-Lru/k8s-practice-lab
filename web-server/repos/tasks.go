package repos

import "github.com/google/uuid"

type Task struct {
	Id          string `json:"id"`
	ProjectId   string `json:"project_id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Deadline    string `json:"deadline"`
	FinishedAt  string `json:"finished_at"`
}

func (Task) List(projectId string) (tasks []Task, err error) {
	statement := `
		SELECT id, project_id, title, description, deadline, finished_at 
		FROM tasks 
		WHERE project_id = $1
	`
	tasks = []Task{}
	rows, err := Db.Query(statement, projectId)
	defer rows.Close()

	if err != nil {
		return
	}

	for rows.Next() {
		var task Task
		if err = bindTask(rows, &task); err != nil {
			return
		}
		tasks = append(tasks, task)
	}
	return
}

func (t Task) Create() (task Task, err error) {
	statement := `
		INSERT INTO tasks 
		(id, project_id, title, description, deadline, finished_at) 
		VALUES ($1, $2, $3, $4, $5, $6) 
		RETURNING id, project_id, title, description, deadline, finished_at
	`
	stmt, err := Db.Prepare(statement)
	if err != nil {
		return
	}
	defer stmt.Close()

	u, err := uuid.NewRandom()
	if err != nil {
		return
	}
	bindTask(stmt.QueryRow(u.String(), t.ProjectId, t.Title, t.Description, t.Deadline, t.FinishedAt), &task)
	return
}

func (t Task) Update() (task Task, err error) {
	statement := `
		UPDATE tasks 
		SET title = $2, description = $3, deadline = $4, finished_at = $5 
		WHERE id = $1 
		RETURNING id, project_id, title, description, deadline, finished_at
	`
	err = bindTask(Db.QueryRow(statement, t.Id, t.Title, t.Description, t.Deadline, t.FinishedAt), &task)
	return
}

func (t Task) Delete() (task Task, err error) {
	statement := "DELETE FROM tasks WHERE id = $1 RETURNING id, project_id, title, description, deadline, finished_at"
	err = bindTask(Db.QueryRow(statement, t.Id), &task)
	return
}

func bindTask(row Scanner, task *Task) (err error) {
	err = row.Scan(&task.Id, &task.ProjectId, &task.Title, &task.Description, &task.Deadline, &task.FinishedAt)
	return
}
