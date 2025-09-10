// ================================
// Student Grades Manager (DOM Lab)
// ================================

// Select main elements
const studentList = document.getElementById("student-list");
const averageDisplay = document.getElementById("average");
const topStudentDisplay = document.getElementById("top-student");
const form = document.getElementById("student-form");

// ================================
// Helper Functions
// ================================

// Get all scores from the student list
function getScores() {
  return Array.from(studentList.children).map(li =>
    parseInt(li.getAttribute("data-score"))
  );
}

// Calculate average score from an array of scores
function getAverage(scores) {
  if (scores.length === 0) return 0;
  let total = scores.reduce((a, b) => a + b, 0);
  return total / scores.length;
}

// Find the top student (highest score)
function getTopStudent() {
  let items = Array.from(studentList.children);
  return items.reduce((best, current) => {
    return parseInt(current.getAttribute("data-score")) >
           parseInt(best.getAttribute("data-score"))
           ? current
           : best;
  });
}

// Update pass/fail status of each student
function updatePassFail() {
  Array.from(studentList.children).forEach(li => {
    let score = parseInt(li.getAttribute("data-score"));
    // Remove old classes
    li.classList.remove("pass", "fail");
    if (score >= 60) {
      li.classList.add("pass");
    } else {
      li.classList.add("fail");
    }
  });
}

// Update results (average + top student)
function updateResults() {
  let scores = getScores();
  let avg = getAverage(scores).toFixed(2);
  averageDisplay.textContent = `Class Average: ${avg}`;

  if (scores.length > 0) {
    let top = getTopStudent();
    let topName = top.textContent;
    let topScore = top.getAttribute("data-score");
    topStudentDisplay.textContent = `Top Student: ${topName} (${topScore})`;

    // Reset styles for all students
    Array.from(studentList.children).forEach(li => {
      li.style.fontWeight = "normal";
      li.style.color = "inherit";
    });

    // Highlight top student
    top.style.fontWeight = "bold";
    top.style.color = "blue";
  } else {
    topStudentDisplay.textContent = "No students in the list.";
  }
}

// ================================
// Event Listeners
// ================================

// Handle form submission to add a new student
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nameInput = document.getElementById("name");
  const scoreInput = document.getElementById("score");

  const name = nameInput.value.trim();
  const score = scoreInput.value;

  if (name && score) {
    // Create a new <li> element for the student
    let li = document.createElement("li");
    li.textContent = name;
    li.setAttribute("data-score", score);
    li.classList.add("student");

    // Append to student list
    studentList.appendChild(li);

    // Clear form
    form.reset();

    // Update results after adding student
    updatePassFail();
    updateResults();
  }
});

// ================================
// Initial Setup
// ================================
updatePassFail();
updateResults();
