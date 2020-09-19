const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
//Handles submit button
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (search.value) {
    const location = search.value;
    fetch("/weather?address=" + location).then((response) => {
      response.json().then((data) => {
        if (data.err) {
          messageOne.textContent = data.err;
          messageTwo.textContent = "";
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent =
            data.currentTemp +
            "c and " +
            data.desc +
            ". It feels like " +
            data.feelsLikeTemp +
            "c with a humidity of " +
            data.humidity;
        }
      });
    });
  }
});
