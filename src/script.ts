const main = document.querySelector("main") as HTMLElement;
const section = document.querySelector("section") as HTMLElement;
const nav = document.querySelector("nav") as HTMLElement;
const button = document.querySelector("button") as HTMLButtonElement;

main.addEventListener("click", (e) => {
  console.log(
    "Main",
    "TARGET: ",
    e.target,
    "CURRENT TARGET: ",
    e.currentTarget,
  );
});

button.addEventListener("click", () => {
  console.log("button"); // Current Target
});
