export function getPersonName(person) {
  if (Array.isArray(person)) return person[0]?.name || "";
  return person?.name || "";
}

export function formatDate(dateString) {
  if (!dateString) return "noch offen";

  return new Date(dateString).toLocaleString("de-DE", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export function cleanHtmlText(value) {
  if (!value) return "";

  let text = value.replace(/<[^>]*>/g, "");

  for (let i = 0; i < 5; i++) {
    text = text
      .replace(/&amp;/g, "&")
      .replace(/&auml;/g, "ä")
      .replace(/&Auml;/g, "Ä")
      .replace(/&ouml;/g, "ö")
      .replace(/&Ouml;/g, "Ö")
      .replace(/&uuml;/g, "ü")
      .replace(/&Uuml;/g, "Ü")
      .replace(/&aum;/g, "ä")
.replace(/&Aum;/g, "Ä")
.replace(/&oum;/g, "ö")
.replace(/&Oum;/g, "Ö")
.replace(/&uum;/g, "ü")
.replace(/&Uum;/g, "Ü")
      .replace(/&szlig;/g, "ß")
      .replace(/&nbsp;/g, " ")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
  }

  return text;
}