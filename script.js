$(document).ready(function () {
  // Function to fetch data from the API
  function fetchDataFromApi() {
    $.ajax({
      url: "https://lotto.api.rayriffy.com/latest",
      dataType: "json",
    })
      .done(function (data) {
        // Check the winning number
        checkWinningNumber(data);

        // Display the data on the HTML page
        displayData(data);
      })
      .fail(function (error) {
        console.error("Error fetching data:", error);
      });
  }

  // Function to display the data on the HTML page
  function displayData(data) {
    // TODO: Display the data on the HTML page
  }

  // Function to validate the input number
  function validateInputNumber(inputNumber) {
    // TODO: Validate the input number
  }

  // Function to check if the input number is a winning number
  function checkWinningNumber(data) {
    $("#check-button").on("click", function () {
      // TODO: Get the input number from the input field with the ID input-number and check if it is a winning number
    });
  }

  // Call the function to fetch data from the API and display it
  fetchDataFromApi();
});
