"use strict";
const main = document.querySelector("main");
const section = document.querySelector("section");
const nav = document.querySelector("nav");
const button = document.querySelector("button");
main.addEventListener("click", (e) => {
    console.log("Main", "TARGET: ", e.target, "CURRENT TARGET: ", e.currentTarget);
});
button.addEventListener("click", () => {
    console.log("button"); // Current Target
});
