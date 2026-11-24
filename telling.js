// Teller en sidevisning (side, dag og henvisende domene), uten informasjonskapsler og uten lagring i nettleseren.
// Sender bare stien og domenet besøket kom fra (aldri hele adressen). Se personvern.html.
(function () {
  if (!/^(www\.)?lettmateriell\.no$/.test(location.hostname)) return;
  var ref = null;
  try { if (document.referrer) ref = new URL(document.referrer).hostname; } catch (e) {}
  // Lenkene i e-postene har ?fra=epost: tell dem som eget «domene», så vi ser klikk fra e-post uten ny tabell.
  if (/[?&]fra=epost/.test(location.search)) ref = "epost.lettmateriell.no";
  var key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmaGlxY2NhbGRkbGZ2bXhqaXZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3NjQ5MTcsImV4cCI6MjEwODM0MDkxN30.yoEjcHJkRbF5asmTSjtvmkcM8sG5DjyXKw3zx15zQRg";
  try {
    fetch("https://afhiqccalddlfvmxjivs.supabase.co/rest/v1/rpc/count_page_view", {
      method: "POST",
      keepalive: true,
      credentials: "omit",
      headers: { "Content-Type": "application/json", apikey: key, Authorization: "Bearer " + key },
      body: JSON.stringify({ p_path: location.pathname, p_ref: ref }),
    }).catch(function () {});
  } catch (e) {}
})();
