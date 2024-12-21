package middleware

import (
	"log"
	"net/http"
)

func ReuqestLogger(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("Request: %s %s %s, %s", r.Method, r.URL.Path, r.URL.RawQuery, r.Body)
		next.ServeHTTP(w, r)
	})
}
