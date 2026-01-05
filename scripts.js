/* =====================================================
   script.js
   Purpose:
   - Handle small, page-level behavior
   - Keep JavaScript minimal for this static portfolio
   ===================================================== */

/* -----------------------------------------------------
   FOOTER: AUTO-UPDATE COPYRIGHT YEAR
   -----------------------------------------------------
   This script finds the HTML element with id="year"
   and inserts the current year automatically.

   HTML reference:
   <span id="year"></span>

   This avoids having to manually update the year
   every January.
----------------------------------------------------- */

// Get the span element that will hold the year
const yearEl = document.getElementById("year");

// If the element exists, insert the current year
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
