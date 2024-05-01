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
    const dateContainer = $("#date-text");
    const prize1Number = $("#prize1-number");
    const prize2Number = $("#prize2-number");
    const prize3Number = $("#prize3-number");
    const prize4Number = $("#prize4-number");

    // Check if the API response contains the required fields
    if (!data.response || !data.response.date || !data.response.prizes) {
      dateContainer.text("Error: Data format is incorrect.");
      return;
    }

    // Format the date in a more readable way
    const dateParts = data.response.date.split(" ");
    const formattedDate = `${dateParts[0]} ${dateParts[1]} ${dateParts[2]}`;

    // Display the date and prizes information
    dateContainer.text(`งวดประจำวันที่ ${formattedDate}`);

    // Display prizes information
    const prizes = data.response.prizes;
    prize1Number.text(prizes[0].number.join(", "));
    prize2Number.text(data.response.runningNumbers[0].number.join(", "));
    prize3Number.text(data.response.runningNumbers[1].number.join(", "));
    prize4Number.text(data.response.runningNumbers[2].number.join(", "));
  }

  // Function to validate the input number
  function validateInputNumber(inputNumber) {
    return /^\d{6}$/.test(inputNumber);
  }

  // Function to check if the input number is a winning number
  function checkWinningNumber(data) {
    // Add event listener to the button with the ID check-button
    $("#check-button").on("click", function () {
      const inputNumber = $("#input-number").val();

      if (!validateInputNumber(inputNumber)) {
        return Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "กรุณากรอกเลข 6 หลักที่ต้องการตรวจสอบ",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "ตกลง",
        });
      }

      const prizeNumbers = [];

      for (let i = 0; i < 6; i++) {
        prizeNumbers.push(...data.response.prizes[i].number);
      }

      prizeNumbers.push(
        ...data.response.runningNumbers[0].number,
        ...data.response.runningNumbers[1].number,
        ...data.response.runningNumbers[2].number
      );

      // Find the prize names associated with the winning number
      const wonPrizes = [];

      for (let i = 0; i < 6; i++) {
        if (data.response.prizes[i].number.includes(inputNumber)) {
          wonPrizes.push(data.response.prizes[i].name);
        }
      }

      if (
        data.response.runningNumbers[0].number.includes(
          inputNumber.substr(0, 3)
        )
      ) {
        wonPrizes.push(data.response.runningNumbers[0].name);
      }

      if (
        data.response.runningNumbers[1].number.includes(
          inputNumber.substr(3, 3)
        )
      ) {
        wonPrizes.push(data.response.runningNumbers[1].name);
      }

      if (
        data.response.runningNumbers[2].number.includes(
          inputNumber.substr(4, 2)
        )
      ) {
        wonPrizes.push(data.response.runningNumbers[2].name);
      }

      if (wonPrizes.length > 0) {
        const prizeText = `${wonPrizes.join(" และ")}`;
        Swal.fire({
          iconHtml:
            '<lottie-player src="https://lottie.host/cb1c67b4-00bd-48fd-b63f-5c59d432718b/8SrFUu6xvC.json" speed="1" style="width: 300px; height: 300px;" direction="1" mode="normal" loop autoplay></lottie-player>',
          customClass: {
            icon: "border-none",
          },
          title: "ยินดีด้วยคุณถูกรางวัล!",
          text: `เลข ${inputNumber} ของคุณ ถูก${prizeText}`,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "ตกลง",
        });
      } else {
        Swal.fire({
          iconHtml:
            '<lottie-player src="https://lottie.host/d5df2619-56d7-4bee-b17f-22effa289d64/QS8gJMVEKI.json" speed="1" style="width: 125px; height: 125px;" direction="1" mode="normal" loop autoplay></lottie-player>',
          customClass: {
            icon: "border-none",
          },
          title: "เสียใจด้วยคุณไม่ถูกรางวัล!",
          text: `เลข ${inputNumber} ของคุณไม่ถูกรางวัล`,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "ตกลง",
        });
      }
    });
  }

  // Call the function to fetch data from the API and display it
  fetchDataFromApi();
});
