package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gorilla/websocket"
	"github.com/joho/godotenv"
)

type User struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

type Message struct {
	User    User   `json:"user"`
	Message string `json:"message"`
}

var clients = make(map[*websocket.Conn]bool)
var broadcast = make(chan Message)
var upgrader = websocket.Upgrader{}

func main() {
	envErr := godotenv.Load()
	if envErr != nil {
		log.Fatal("Error loading .env file")
	}

	fs := http.FileServer(http.Dir("./public"))

	http.Handle("/", fs)
	http.HandleFunc("/ws", handleConnections)
	http.HandleFunc("/register", register)
	http.HandleFunc("/auth", auth)

	go handleMessages()

	log.Println("http server started on :8000")
	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func handleConnections(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
	}

	defer ws.Close()

	clients[ws] = true

	for {
		var msg Message
		err := ws.ReadJSON(&msg)
		if err != nil {
			delete(clients, ws)
			break
		}
		broadcast <- msg
	}
}

func handleMessages() {
	for {
		msg := <-broadcast
		for client := range clients {
			err := client.WriteJSON(msg)
			if err != nil {
				client.Close()
				delete(clients, client)
			}
		}
	}
}

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
	cookie, err := r.Cookie("gochat-auth-token")
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
	}

	token, err := jwt.Parse(cookie.Value, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(os.Getenv("SIGNING_SECRET")), nil
	})

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
