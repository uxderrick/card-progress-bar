import React, { useEffect, useState } from "react";

const progressDuration = 3000;

const totalProgressBars = 3;
let currentProgress = 0;
let allComplete = false;

// Function to change the background image based on the card index
function changeCardBackgroundImage(cardIndex) {
  const redBox = document.querySelector(".red-box");

  if (cardIndex === 1) {
    redBox.style.backgroundImage =
      "url(https://github.com/uxderrick/card-progress-bar/blob/main/src/assets/image-1.png?raw=true)";
  } else if (cardIndex === 2) {
    redBox.style.backgroundImage =
      "url('https://github.com/uxderrick/card-progress-bar/blob/main/src/assets/image-2.png?raw=true')";
  } else if (cardIndex === 3) {
    redBox.style.backgroundImage =
      "url('https://github.com/uxderrick/card-progress-bar/blob/main/src/assets/image-3.png?raw=true')";
  }
}

function updateProgressBar(progressElements, setProgressElements) {
  if (!allComplete) {
    //change progress bar color when complete
    const progressBar = document.querySelectorAll(".progress-bar");
    progressBar[currentProgress].style.backgroundColor = "#0073e6";
    // If all progress bars have not completed, update them
    const updatedProgressElements = [...progressElements];

    // Update the progress bar based on the current progress
    updatedProgressElements[currentProgress] += (100 / progressDuration) * 100;

    // If the progress bar is complete, move to the next one
    if (updatedProgressElements[currentProgress] >= 100) {
      //change progress bar color when complete
      const progressBar = document.querySelectorAll(".progress-bar");
      progressBar[currentProgress].style.backgroundColor = "transparent";

      // Set the current progress to 100
      updatedProgressElements[currentProgress] = 100;
      currentProgress = (currentProgress + 1) % totalProgressBars;
      if (currentProgress === 0) {
        allComplete = true;
      }

      // Change the card background image based on the card index
      changeCardBackgroundImage(currentProgress + 1);
    }

    setProgressElements(updatedProgressElements);
  } else {
    // If all progress bars have completed, reset them
    const updatedProgressElements = progressElements.map(() => 0);
    setProgressElements(updatedProgressElements);
    currentProgress = 0;
    allComplete = false;
  }
}

function CardProgressBar() {
  const [progressElements, setProgressElements] = useState([0, 0, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateProgressBar(progressElements, setProgressElements);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [progressElements]);

  return (
    <div className="box">
      <div className="layout">
        <div className="container">
          <p className="card-name">Card 1</p>
          <div
            className="progress-bar"
            style={{ width: `${progressElements[0]}%`, height: "10px" }}
          />
        </div>
        <div className="container">
          <p className="card-name">Card 2</p>
          <div
            className="progress-bar"
            style={{ width: `${progressElements[1]}%`, height: "10px" }}
          />
        </div>
        <div className="container">
          <p className="card-name">Card 3</p>
          <div
            className="progress-bar"
            style={{ width: `${progressElements[2]}%`, height: "10px" }}
          />
        </div>
      </div>
      <div className="red-box"></div>
    </div>
  );
}

export default CardProgressBar;
