package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
)

func register(w http.ResponseWriter, r *http.Request) {
	user := r.FormValue("user")
	email := r.FormValue("email")

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user":  user,
		"email": email,
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("SIGNING_SECRET")))

	if err != nil {
		log.Fatalf("Error signing: %s", err.Error())
	}

	http.SetCookie(w, &http.Cookie{
		Name:    "gochat-auth-token",
		Value:   tokenString,
		Expires: time.Now().Add(time.Hour * 168),
	})

	w.WriteHeader(http.StatusOK)
}

func auth(w http.ResponseWriter, r *http.Request) {
	cookie, cookieErr := r.Cookie("gochat-auth-token")
	if cookieErr != nil {
		w.WriteHeader(http.StatusUnauthorized)
	}

	token, err := jwt.Parse(cookie.Value, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(os.Getenv("SIGNING_SECRET")), nil
	})
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		u := User{
			Name:  claims["user"].(string),
			Email: claims["email"].(string),
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(u)
	} else {
		w.WriteHeader(http.StatusUnauthorized)
	}
}
