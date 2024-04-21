const express = require("express");
const app = express();
const session = require("express-session");
const data = require("./data")


const user = {
    email: "aloshy12@gmail.com",
    password: "1234"

}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}))

app.get("/", (req, res) => {

    if (req.session.log) {
        res.render("home", { data: data });
    } else {
        res.render("login");
    }
});

app.post("/login", (req, res) => {
    if (req.body.email === user.email && req.body.password === user.password) {
        req.session.log = true;
        res.redirect('/')
    } else {
        res.redirect("/");
    }
});

app.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/")
    })
});

app.listen(4000, (error) => {
    if (error) throw error
    console.log("server is running")
});