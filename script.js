const gradeForm = document.getElementById("gradeForm");
const converterForm = document.getElementById("converterForm");

function getLetterGrade(average) {
  if (average >= 90) return "AA";
  if (average >= 85) return "BA";
  if (average >= 80) return "BB";
  if (average >= 75) return "CB";
  if (average >= 65) return "CC";
  if (average >= 58) return "DC";
  if (average >= 50) return "DD";
  if (average >= 40) return "FD";
  return "FF";
}

if (gradeForm) {
  gradeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const studentName = document.getElementById("studentName").value.trim();
    const midterm = Number(document.getElementById("midterm").value);
    const finalGrade = Number(document.getElementById("finalGrade").value);
    const resultBox = document.getElementById("gradeResult");

    if (!studentName || Number.isNaN(midterm) || Number.isNaN(finalGrade) || midterm < 0 || midterm > 100 || finalGrade < 0 || finalGrade > 100) {
      resultBox.innerHTML = `
        <h2>Gecersiz Giris</h2>
        <p>Lutfen ad soyad bilgisini doldurun ve notlari 0 ile 100 arasinda girin.</p>
      `;
      return;
    }

    const average = (midterm * 0.4) + (finalGrade * 0.6);
    const letterGrade = getLetterGrade(average);
    const status = average >= 50 ? "Gecti" : "Kaldi";
    const statusClass = average >= 50 ? "status-pass" : "status-fail";

    resultBox.innerHTML = `
      <p class="result-label">Ogrenci Sonucu</p>
      <h2>${studentName}</h2>
      <div class="result-grid">
        <div class="result-item">
          <span>Ortalama</span>
          <strong>${average.toFixed(2)}</strong>
        </div>
        <div class="result-item">
          <span>Harf Notu</span>
          <strong>${letterGrade}</strong>
        </div>
      </div>
      <p class="result-status ${statusClass}">Durum: ${status}</p>
    `;
  });
}

function formatNumber(value) {
  return Number.isInteger(value) ? value.toString() : value.toFixed(2);
}

function convertUnits(value, type) {
  switch (type) {
    case "c_to_f":
      return {
        label: "Celsius -> Fahrenheit",
        result: (value * 9 / 5) + 32,
        unit: "°F"
      };
    case "f_to_c":
      return {
        label: "Fahrenheit -> Celsius",
        result: (value - 32) * 5 / 9,
        unit: "°C"
      };
    case "m_to_km":
      return {
        label: "Metre -> Kilometre",
        result: value / 1000,
        unit: "km"
      };
    case "km_to_m":
      return {
        label: "Kilometre -> Metre",
        result: value * 1000,
        unit: "m"
      };
    case "kg_to_g":
      return {
        label: "Kilogram -> Gram",
        result: value * 1000,
        unit: "g"
      };
    case "g_to_kg":
      return {
        label: "Gram -> Kilogram",
        result: value / 1000,
        unit: "kg"
      };
    case "km_to_mi":
      return {
        label: "Kilometre -> Mil",
        result: value * 0.621371,
        unit: "mi"
      };
    case "mi_to_km":
      return {
        label: "Mil -> Kilometre",
        result: value / 0.621371,
        unit: "km"
      };
    default:
      return null;
  }
}

if (converterForm) {
  converterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const value = Number(document.getElementById("converterValue").value);
    const type = document.getElementById("conversionType").value;
    const resultBox = document.getElementById("converterResult");

    if (Number.isNaN(value)) {
      resultBox.innerHTML = `
        <h2>Gecersiz Giris</h2>
        <p>Lutfen sayisal bir deger girin.</p>
      `;
      return;
    }

    const conversion = convertUnits(value, type);

    if (!conversion) {
      resultBox.innerHTML = `
        <h2>Donusum Hatasi</h2>
        <p>Secilen donusum tipi desteklenmiyor.</p>
      `;
      return;
    }

    resultBox.innerHTML = `
      <p class="result-label">Donusum Sonucu</p>
      <h2>${conversion.label}</h2>
      <div class="result-grid single-result">
        <div class="result-item">
          <span>Sonuc</span>
          <strong>${formatNumber(conversion.result)} ${conversion.unit}</strong>
        </div>
      </div>
    `;
  });
}
