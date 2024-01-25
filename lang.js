// for now just toggle En/Cy, can add other lang support later if wanted
const langs = ["En", "Cy"];

function toggleLang(currentLang){
  if(currentLang == langs[0]){return langs[1]};
  if(currentLang == langs[1]){return langs[0]};
}

var launchYmd, landingYmd, launchD, landingD;

// En Strings
var titleEn = "ExoMars Rosalind Franklin Mission";
var launchYmdEn = "Launch window opens in " + d_to_ymd(daysUntilLaunch, langs[0]);
var landingYmdEn = d_to_ymd(daysUntilLanding, langs[0]) + " until mission starts";
var launchDaysEn = "Launch window opens in " + daysUntilLaunch + " days";
var landingDaysEn = daysUntilLanding + " days until mission starts";
var mtctagEn = "MTC (Mars)";
var utctagEn = "UTC (Earth)";

// Cy Strings
var titleCy = "Cenhadaeth ExoMars Rosalind Franklin";
var launchYmdCy = "Ffenestr lansio yn agor mewn " + d_to_ymd(daysUntilLaunch, langs[1]);
var landingYmdCy = d_to_ymd(daysUntilLanding, langs[1]) + " tan ddechrau'r cenhadaeth";
var launchDaysCy = "Ffenestr lansio yn agor mewn " + daysUntilLaunch + " dyddiau";
var landingDaysCy = daysUntilLanding + " dydd tan ddechrau'r cenhadaeth";
var mtctagCy = "MTC (Mawrth)";
var utctagCy = "UTC (Y Ddaear)";

// set-lang specific strings, default to En in case of an issue
function setStrings(currentLang = langs[0]){
  console.log(currentLang);
  if(currentLang == langs[0]){
    document.getElementById('title').innerHTML = titleEn;
    document.getElementById('utcCap').innerHTML = utctagEn;
    document.getElementById('mtcCap').innerHTML = mtctagEn;
    launchYmd = launchYmdEn;
    landingYmd = landingYmdEn;
    launchD = launchDaysEn;
    landingD = landingDaysEn;
  }
  if(currentLang == langs[1]){
    document.getElementById('title').innerHTML = titleCy;
    document.getElementById('utcCap').innerHTML = utctagCy;
    document.getElementById('mtcCap').innerHTML = mtctagCy;
    launchYmd = launchYmdCy;
    landingYmd = landingYmdCy;
    launchD = launchDaysCy;
    landingD = landingDaysCy;
  }

  if(dayFormatYMD){
    document.getElementById('landing').innerHTML = landingYmd;
    document.getElementById('launch').innerHTML = launchYmd;
  } else {
    document.getElementById('landing').innerHTML = landingD;
    document.getElementById('launch').innerHTML = launchD;
  }
}
