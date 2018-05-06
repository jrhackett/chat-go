package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
)

type (
	User struct {
		Name  string `json:"name"`
		Email string `json:"email"`
	}

	CustomClaims struct {
		Name  string `json:"name"`
		Email string `json:"email"`
		jwt.StandardClaims
	}
)

func register(w http.ResponseWriter, r *http.Request) {
	user := User{}

	if decodeErr := json.NewDecoder(r.Body).Decode(&user); decodeErr != nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	defer r.Body.Close()

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"name":  user.Name,
		"email": user.Email,
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("SIGNING_SECRET")))

	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:    "gochat-auth-token",
		Value:   tokenString,
		Expires: time.Now().Add(time.Hour * 168),
	})

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user)
}

func auth(w http.ResponseWriter, r *http.Request) {
	cookie, cookieErr := r.Cookie("gochat-auth-token")
	if cookieErr != nil || cookie == nil || cookie.Value == "" {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	token, err := jwt.ParseWithClaims(cookie.Value, &CustomClaims{}, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", t.Header["alg"])
		}

		return []byte(os.Getenv("SIGNING_SECRET")), nil
	})

	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	if claims, ok := token.Claims.(*CustomClaims); ok && token.Valid {
		user := User{
			Name:  claims.Name,
			Email: claims.Email,
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(user)
	} else {
		w.WriteHeader(http.StatusUnauthorized)
	}
}
