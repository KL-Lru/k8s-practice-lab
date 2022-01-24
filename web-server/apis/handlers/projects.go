package handlers

import (
	"encoding/json"
	"net/http"

	"webserver/repos"
)

func ProjectsHandler(writer http.ResponseWriter, request *http.Request) {
	switch request.Method {
	case http.MethodGet:
		readProjects(writer, request)
	case http.MethodPost:
		createProject(writer, request)
	case http.MethodPut:
		updateProject(writer, request)
	case http.MethodDelete:
		deleteProject(writer, request)
	case http.MethodOptions:
		// Accept NO CORS
		writer.WriteHeader(http.StatusAccepted)
	default:
		writer.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func readProjects(w http.ResponseWriter, r *http.Request) {
	projects, err := repos.Project{}.List()
	if err != nil {
		w.WriteHeader(http.StatusServiceUnavailable)
		return
	}

	writeJsonResponse(w, projects)
	return
}

func createProject(w http.ResponseWriter, r *http.Request) {
	var project repos.Project
	body := parseJsonRequest(r)
	json.Unmarshal(body, &project)

	record, err := project.Create()
	if err != nil {
		w.WriteHeader(http.StatusServiceUnavailable)
		return
	}

	writeJsonResponse(w, record)
	return
}

func updateProject(w http.ResponseWriter, r *http.Request) {
	var project repos.Project
	body := parseJsonRequest(r)
	json.Unmarshal(body, &project)

	record, err := project.Update()
	if err != nil {
		w.WriteHeader(http.StatusServiceUnavailable)
		return
	}

	writeJsonResponse(w, record)
	return
}

func deleteProject(w http.ResponseWriter, r *http.Request) {
	var project repos.Project
	body := parseJsonRequest(r)
	json.Unmarshal(body, &project)
	record, err := project.Delete()
	if err != nil {
		w.WriteHeader(http.StatusServiceUnavailable)
		return
	}

	writeJsonResponse(w, record)
	return
}
