import {faker as $bVnGV$faker} from "@faker-js/faker";


const $52845ac29bae9a10$var$firstSection = document.querySelector(".first__section");
const $52845ac29bae9a10$var$button = document.querySelector("button");
$52845ac29bae9a10$var$button.addEventListener("click", ()=>{
    const productName = `<p>${(0, $bVnGV$faker).commerce.product()}</p>`;
    $52845ac29bae9a10$var$firstSection.insertAdjacentHTML("afterbegin", productName);
});


//# sourceMappingURL=script.js.map
