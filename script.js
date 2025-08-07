const steps = [
  { img: "assets/1.png", title: "Step 1", description: "Open Settings", help: null, buttons: [] },
  { img: "assets/2.png", title: "Step 2", description: "Open \"About tablet\"", help: null, buttons: [] },
  { img: "assets/3.png", title: "Step 3", description: "Tap \"Build number\" 7 times.\nEnter your passcode if asked", help: null, buttons: [] },
  { img: "assets/4.png", title: "Step 4", description: "Tap on \"OEM unlocking\"", help: {
      steps: [
        { img: "assets/4.1.png", text: "If OEM-Unlock isn't there, we can check a few things." },
        { img: "assets/4.2.png", text: "Check if your tablet is actually unlockable.\nUsually USA models aren't unlockable." },
        { img: "assets/4.3.png", text: "Make sure you're connected to Wi-Fi." },
        { img: "assets/4.4.png", text: "Make sure you're logged into a Google account." }
      ]
    }, buttons: [] },
  { img: "assets/5.png", title: "Step 5", description: "Turn off the Tablet", help: null, buttons: [] },
  { img: "assets/6.png", title: "Step 6", description: "Connect a Cable to PC.\nConnect it to the Tablet and hold both Volume keys.", help: null, buttons: [] },
  { img: "assets/7.png", title: "Step 7", description: "Hold the Volume Up key for a few seconds.", help: null, buttons: [] },
  { img: "assets/8.png", title: "Step 8", description: "To Unlock the bootloader press Volume Up.\n\nWarning: This will FACTORY RESET your device.\n\nPress and hold the Volume buttons again.", help: null, buttons: [] },
  { img: "assets/9.png", title: "Step 9", description: "Press Volume Up to enter the Download Mode", help: null, buttons: [] },
  { img: "assets/10.png", title: "Step 10", description: "Now We're in Download mode.\nPlease use the 'Downloads' button.", help: null, buttons: [{ name: "Downloads", url: "./pages/odin/" }]},
  { img: "assets/11.png", title: "Step 11", description: "Start the Program and make sure your Device is recognized.\nDownload the next Pack.", help: null, buttons: [{ name: "Downloads", url: "./pages/choose/" }]},
  { img: "assets/12.png", title: "Step 12", description: "Add the .tar file into Odin. Position doesn't matter.", help: null, buttons: [] },
  { img: "assets/13.png", title: "Step 13", description: "Press and hold Power + Volume Up. Then press Start in Odin and wait.", help: null, buttons: [] },
  { img: "assets/14.png", title: "Step 14", description: "Welcome to TWRP.", help: null, buttons: [] },
  { img: "assets/15.png", title: "Step 15", description: "Press \"Wipe\".", help: null, buttons: [] },
  { img: "assets/16.png", title: "Step 16", description: "Press \"Format Data\".", help: null, buttons: [] },
  { img: "assets/17.png", title: "Step 17", description: "Type \"yes\" and press blue button at bottom right.", help: null, buttons: [{ name: "Next steps", url: "https://example.com" }]},
  { img: "assets/14.png", title: "Step 17", description: "And we're done.", help: null, buttons: [{ name: "Next steps (soon)", url: "./pages/next/" }]},
];

let currentStep = 0;
let currentHelpIndex = 0;


const guideImg = document.getElementById("guide-image");
const title = document.getElementById("step-title");
const desc = document.getElementById("step-description");

const problemBtn = document.getElementById("problem-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const customBtnContainer = document.getElementById("custom-btn-container");


const helpOverlay = document.getElementById("help-overlay");
const helpImage = document.getElementById("help-image");
const helpText = document.getElementById("help-text");
const helpClose = document.getElementById("help-close");
const helpNext = document.getElementById("help-next");
const helpPrev = document.getElementById("help-prev");


function isValidButtonsArray(step) {
  return step && Array.isArray(step.buttons) && step.buttons.length > 0;
}

function openUrlOrDownload(url) {
  if (!url) return;
  const isFile = /\.(zip|exe|dmg|tar\.gz|rar|7z|apk|img|bin|iso)$/i.test(url);
  if (isFile) {
    const a = document.createElement("a");
    a.href = url;
    a.download = url.split("/").pop() || "file";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    window.open(url, "_blank");
  }
}


function updateStep() {
  const step = steps[currentStep];


  guideImg.src = step.img || "";
  guideImg.alt = step.title || "Step image";
  title.textContent = step.title || "";
  desc.textContent = step.description || "";


  const hasHelp = step.help && Array.isArray(step.help.steps) && step.help.steps.length > 0;
  problemBtn.disabled = !hasHelp;
  problemBtn.title = hasHelp ? "Open help" : "No help available";

  customBtnContainer.innerHTML = "";
  if (isValidButtonsArray(step)) {
    step.buttons.forEach((b, idx) => {
      const btn = document.createElement("button");
      btn.className = "mdc-button mdc-button--outlined";
      btn.innerHTML = `<span class="mdc-button__label">${b.name}</span>`;
      btn.onclick = () => openUrlOrDownload(b.url);
      btn.setAttribute("data-step-btn-index", idx);
      customBtnContainer.appendChild(btn);
    });
  }
}


nextBtn.addEventListener("click", () => {
  currentStep = (currentStep + 1) % steps.length;
  updateStep();
});
prevBtn.addEventListener("click", () => {
  currentStep = (currentStep - 1 + steps.length) % steps.length;
  updateStep();
});


problemBtn.addEventListener("click", () => {
  const step = steps[currentStep];
  if (!step || !step.help || !Array.isArray(step.help.steps) || step.help.steps.length === 0) return;
  currentHelpIndex = 0;
  showHelpStep(step.help.steps[currentHelpIndex]);
  helpOverlay.setAttribute("aria-hidden", "false");
});

helpClose.addEventListener("click", () => {
  helpOverlay.setAttribute("aria-hidden", "true");
});


helpNext.addEventListener("click", () => {
  const step = steps[currentStep];
  if (!step || !step.help) return;
  currentHelpIndex = (currentHelpIndex + 1) % step.help.steps.length;
  showHelpStep(step.help.steps[currentHelpIndex]);
});
helpPrev.addEventListener("click", () => {
  const step = steps[currentStep];
  if (!step || !step.help) return;
  currentHelpIndex = (currentHelpIndex - 1 + step.help.steps.length) % step.help.steps.length;
  showHelpStep(step.help.steps[currentHelpIndex]);
});


function showHelpStep(helpStep) {
  if (!helpStep) return;
  helpImage.src = helpStep.img || "";
  helpImage.alt = helpStep.text || "Help image";
  helpText.textContent = helpStep.text || "";

  const helpSteps = steps[currentStep].help.steps;
  if (!helpSteps || helpSteps.length <= 1) {
    helpPrev.style.display = "none";
    helpNext.style.display = "none";
  } else {
    helpPrev.style.display = "";
    helpNext.style.display = "";
  }
}


helpOverlay.addEventListener("click", (e) => {
  if (e.target === helpOverlay) helpOverlay.setAttribute("aria-hidden", "true");
});


window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && helpOverlay.getAttribute("aria-hidden") === "false") {
    helpOverlay.setAttribute("aria-hidden", "true");
  }
});


function checkOrientation() {
  const warning = document.getElementById("rotate-warning");
  if (window.innerHeight > window.innerWidth) {
    warning.classList.add("show");
  } else {
    warning.classList.remove("show");
  }
}


let touchStartX = null;
const swipeArea = document.getElementById("swipe-area");
swipeArea.addEventListener("touchstart", e => {
  touchStartX = e.touches[0].clientX;
});
swipeArea.addEventListener("touchend", e => {
  if (touchStartX === null) return;
  const deltaX = e.changedTouches[0].clientX - touchStartX;
  if (deltaX > 50) prevBtn.click();
  if (deltaX < -50) nextBtn.click();
  touchStartX = null;
});


window.addEventListener("resize", checkOrientation);
window.addEventListener("load", () => {
  checkOrientation();
  updateStep();
});
