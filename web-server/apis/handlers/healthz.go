package handlers

import (
	"net/http"
)

/*
	Health Check Endpoint
	GET Methods only allowed
*/
func HealthzHandler(writer http.ResponseWriter, request *http.Request) {
	switch request.Method {
	case http.MethodGet:
		writer.WriteHeader(http.StatusOK)
	default:
		writer.WriteHeader(http.StatusMethodNotAllowed)
	}
}
