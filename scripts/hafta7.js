const rootElement = document.documentElement;
const themeToggleButton = document.getElementById("themeToggle");
const registrationForm = document.getElementById("registrationForm");
const summaryBox = document.getElementById("summaryBox");
const feedbackBox = document.getElementById("feedbackBox");
const resetSummaryButton = document.getElementById("resetSummary");

function showFeedback(message, variant) {
  feedbackBox.textContent = message;
  feedbackBox.className = `alert alert-${variant}`;
}

function clearFeedback() {
  feedbackBox.textContent = "";
  feedbackBox.className = "alert alert-warning d-none";
}

function updateThemeButtonLabel(theme) {
  themeToggleButton.textContent = theme === "dark" ? "Acik Temaya Gec" : "Koyu Temaya Gec";
}

if (themeToggleButton) {
  updateThemeButtonLabel(rootElement.getAttribute("data-bs-theme") || "light");

  themeToggleButton.addEventListener("click", () => {
    const currentTheme = rootElement.getAttribute("data-bs-theme") === "dark" ? "dark" : "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    rootElement.setAttribute("data-bs-theme", nextTheme);
    updateThemeButtonLabel(nextTheme);
  });
}

function createSummaryMarkup(formData) {
  return `
    <div class="summary-card">
      <p class="text-uppercase text-secondary small fw-semibold mb-2">Kayit Basarili</p>
      <h3 class="h4 mb-3">${formData.fullName}</h3>
      <ul class="mb-3">
        <li><strong>E-posta:</strong> ${formData.email}</li>
        <li><strong>Bolum:</strong> ${formData.department}</li>
        <li><strong>Secilen oturum:</strong> ${formData.session}</li>
      </ul>
      <p class="mb-0 text-secondary">
        <strong>Motivasyon:</strong> ${formData.motivation}
      </p>
    </div>
  `;
}

if (registrationForm) {
  registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = {
      fullName: document.getElementById("fullName").value.trim(),
      email: document.getElementById("email").value.trim(),
      department: document.getElementById("department").value,
      session: document.getElementById("session").value,
      motivation: document.getElementById("motivation").value.trim(),
      agreement: document.getElementById("agreement").checked
    };

    if (!formData.fullName || !formData.email || !formData.department || !formData.session || !formData.motivation || !formData.agreement) {
      showFeedback("Lutfen tum alanlari doldurun ve onay kutusunu isaretleyin.", "warning");
      summaryBox.innerHTML = `
        <p class="mb-0 text-secondary">
          Form eksik oldugu icin basvuru ozeti olusturulamadi. Gerekli alanlari tamamlayip yeniden deneyin.
        </p>
      `;
      return;
    }

    clearFeedback();
    showFeedback("Basvurun kaydedildi. Ozetin asagida guncellendi.", "success");
    summaryBox.innerHTML = createSummaryMarkup(formData);
  });
}

if (resetSummaryButton) {
  resetSummaryButton.addEventListener("click", () => {
    clearFeedback();
    summaryBox.innerHTML = `
      <p class="mb-0 text-secondary">
        Formu doldurdugunda burada etkinlik basvuru ozetin dinamik olarak olusacak.
      </p>
    `;
  });
}
