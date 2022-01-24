package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"webserver/repos"
)

func TaskHandler(writer http.ResponseWriter, request *http.Request) {
	switch request.Method {
	case http.MethodGet:
		readTasks(writer, request)
	case http.MethodPost:
		createTask(writer, request)
	case http.MethodPut:
		updateTask(writer, request)
	case http.MethodDelete:
		deleteTask(writer, request)
	case http.MethodOptions:
		// Accept NO CORS
		writer.WriteHeader(http.StatusAccepted)
	default:
		writer.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func readTasks(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("project_id")

	tasks, err := repos.Task{}.List(id)

	if err != nil {
		w.WriteHeader(http.StatusServiceUnavailable)
		fmt.Println(err)
		return
	}
	writeJsonResponse(w, tasks)
	return
}

func createTask(w http.ResponseWriter, r *http.Request) {
	var task repos.Task
	body := parseJsonRequest(r)
	json.Unmarshal(body, &task)

	record, err := task.Create()
	if err != nil {
		w.WriteHeader(http.StatusServiceUnavailable)
		fmt.Println(err)
		return
	}

	writeJsonResponse(w, record)
	return
}

func updateTask(w http.ResponseWriter, r *http.Request) {
	var task repos.Task
	body := parseJsonRequest(r)
	json.Unmarshal(body, &task)

	record, err := task.Update()
	if err != nil {
		w.WriteHeader(http.StatusServiceUnavailable)
		fmt.Println(err)
		return
	}

	writeJsonResponse(w, record)
	return
}

func deleteTask(w http.ResponseWriter, r *http.Request) {
	var task repos.Task
	body := parseJsonRequest(r)
	json.Unmarshal(body, &task)

	record, err := task.Delete()
	if err != nil {
		w.WriteHeader(http.StatusServiceUnavailable)
		fmt.Println(err)
		return
	}

	writeJsonResponse(w, record)
	return
}
