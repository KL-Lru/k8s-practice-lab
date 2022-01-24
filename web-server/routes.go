package main

import (
	"net/http"
	apiHandlers "webserver/apis/handlers"
)

func apiRoutingHandler() *http.ServeMux {
	mux := http.NewServeMux()

	mux.HandleFunc("/healthz", apiHandlers.HealthzHandler)
	mux.HandleFunc("/projects", apiHandlers.ProjectsHandler)
	mux.HandleFunc("/tasks", apiHandlers.TaskHandler)

	return mux
}

func ConfigureRoutingHandler() *http.ServeMux {
	mux := http.NewServeMux()
	apiMux := apiRoutingHandler()

	mux.Handle("/apis/", http.StripPrefix("/apis", apiMux))
	return mux
}
