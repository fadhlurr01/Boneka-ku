
  try {
    var __theme = localStorage.getItem("bonekaku-theme") || "light";
    document.documentElement.setAttribute("data-theme", __theme);
  } catch (e) { document.documentElement.setAttribute("data-theme", "light"); }
