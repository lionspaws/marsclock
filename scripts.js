function startTime() {
  const today = new Date();
  const ut = new Date(0);
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  
  // dates
  const launchwindowopen = new Date(2022, 09, 20);
  const launchwindowclose = new Date(2022, 10, 01);
  const landing = new Date(2023, 05, 10);
  daysUntilLaunch = Math.floor((launchwindowopen.getTime() - date.getTime()) / (1000 * 3600 * 24))
  daysUntilLanding = Math.floor((landing.getTime() - date.getTime()) / (1000 * 3600 * 24))
  
  dateTimeCalcs(today);
  
  document.getElementById('earthUTC').innerHTML =  h + ":" + m + ":" + s;
  document.getElementById('marsCT').innerHTML = h_to_hms(mstPM);
  document.getElementById('ltstOP').innerHTML = h_to_hms(ltst);
  document.getElementById('test').innerHTML = daysUntilLanding + " days until mission starts"
  
  // make time tick
  setTimeout(startTime, 1000);
}

function startTimeDebug() {
  const today = new Date();
  const ut = new Date(0);
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  dateTimeCalcs();
  
  document.getElementById("utc").innerHTML = "A-1. Get a starting Earth time: " + h + ":" + m + ":" + s;
  document.getElementById("jdut").innerHTML = "A-2. Convert millis to Julian Date (UT): jdut = " + jdut.toFixed(5);
  document.getElementById("jdtt").innerHTML = "A-5. Determine Julian Date (TT): jdtt = " + jdtt.toFixed(5);
  document.getElementById("dtj2000").innerHTML = "A-6. Determine time offset from J2000 epoch (TT): dtj2000 = " + dtj2000.toFixed(5);
  document.getElementById("mma").innerHTML = "B-1. Determine Mars mean anomaly: mma = " + mma.toFixed(5);
  document.getElementById("aFMS").innerHTML = "B-2. Determine angle of Fiction Mean Sun: aFMS = " + aFMS.toFixed(5);
  document.getElementById("pbs").innerHTML = "B-3. Determine perturbers: pbs = " + pbs.toFixed(5);
  document.getElementById("eqocentre").innerHTML = "B-4. Determine Equation of Center: eqocentre = " + eqocentre.toFixed(5);
  document.getElementById("Ls").innerHTML = "B-5. Determine areocentric solar longitude: Ls = " + Ls.toFixed(5);
  document.getElementById("eotdeg").innerHTML = "C-1a. Determine Equation of Time (degrees): eotdeg = " + eotdeg.toFixed(5);
  document.getElementById("eothrs").innerHTML = "C-1b. Determine Equation of Time (hours): eothrs = " + eothrs.toFixed(5) + " = " + h_to_hms(eothrs);
  document.getElementById("mstPM").innerHTML = "C-2. Determine Mean Solar Time at Mars's prime meridian, i.e., Airy Mean Time: mstPM = " + mstPM.toFixed(5) + " = " + h_to_hms(mstPM);
  document.getElementById("lmst").innerHTML = "C-3. Determine Local Mean Solar Time: lmst = " + lmst.toFixed(5) + " = " + h_to_hms(lmst);
  document.getElementById("ltst").innerHTML = "C-4. Determine Local True Solar Time: ltst = " + ltst.toFixed(5) + " = " + h_to_hms(ltst);
  document.getElementById("msd").innerHTML = "Mars Sol Date (MSD): msd = " + msd.toFixed(5);
  
  // make time tick
  setTimeout(startTimeDebug, 1000);
}

function dateTimeCalcs(date){
  const ut = new Date(0);
  
  // calls
  jdut = julianDate(date.getTime());
  jdtt = julianTT(jdut);
  dtj2000 = dtJ2000(jdtt);
  mma = marsMeanAnomaly(dtj2000)
  aFMS = alphaFMS(dtj2000)
  pbs = perturbers(dtj2000)
  eqocentre = eoc(dtj2000,mma,pbs)
  Ls = aFMS + eqocentre
  eotdeg = eotDeg(Ls,eqocentre)
  eothrs = eotHrs(eotdeg)
  mstPM = meanSolarTime(jdtt)
  lmst = localMeanSolarTime(mstPM,24)
  ltst = localTrueSolarTime(lmst,eotdeg)
  msd = marsSolarDate(dtj2000)
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

function julianDate(i){
 return 2440587.5 + (i / 86400000)
}

function julianTT(jdut){
 return jdut + (69.184 / 86400)
}

function dtJ2000(jdtt){
 return jdtt - 2451545.0 
}

function marsMeanAnomaly(dt) {
 return (19.3871 + 0.52402073 * dt) % 360
}

function alphaFMS(dt){
 return (270.3871 + 0.524038496 * dt) % 360
}

function perturbers(dt) {
  return 0.0071 * cos((0.985626 * dt /  2.2353) +  49.409) +
    0.0057 * cos((0.985626 * dt /  2.7543) + 168.173) +
    0.0039 * cos((0.985626 * dt /  1.1177) + 191.837) +
    0.0037 * cos((0.985626 * dt / 15.7866) +  21.736) +
    0.0021 * cos((0.985626 * dt /  2.1354) +  15.704) +
    0.0020 * cos((0.985626 * dt /  2.4694) +  95.528) +
    0.0018 * cos((0.985626 * dt / 32.8493) +  49.095)
}

function eoc(dt,m,pbs) {
  //ν - M = (10.691° + 3.0° × 10-7 ΔtJ2000) sin M + 0.623° sin 2M + 0.050° sin 3M + 0.005° sin 4M + 0.0005° sin 5M + PBS
  return (10.691 + 3.0E-7 * dt) * sin(m) + 0.623 * sin(2 * m) + 0.050 * sin(3 * m) + 0.005 * sin(4 * m) + 0.0005 * sin(5 * m) + pbs
}

function eotDeg(ls,eoc){
  // 2.861° sin 2Ls - 0.071° sin 4Ls + 0.002° sin 6Ls - (ν - M)
  return 2.861 * sin(2*ls) - 0.071 * sin(4*ls) + 0.02 * sin(6*ls) - eoc
}

function eotHrs(eotDeg){
  // Multiply by (24 h / 360°) = (1 h / 15°) to obtain the result in hours.
  return eotDeg * (24/360)
}

function meanSolarTime(jdtt){
  // MST = mod24 { 24 h × ( [(JDTT - 2451549.5) / 1.0274912517] + 44796.0 - 0.0009626 ) }
  return (24 * (((jdtt - 2451549.5) / 1.0274912517) + 44796.0 - 0.0009626)) % 24
}

function localMeanSolarTime(mst,long) {
  // LMST = mod24 { MST - Λ (24 h / 360°) } = mod24 { MST - Λ (1 h / 15°) }
  return (mst - long * (24/360)) % 24
}

function localTrueSolarTime(lmst,eot) {
  //LTST = LMST + EOT (24 h / 360°) = LMST + EOT (1 h / 15°)
  return (lmst + eot * (24/360)) % 24
}

function marsSolarDate(dt) {
  return (((dt - 4.5) / 1.027491252) + 44796.0 - 0.00096)
}

function cos(deg) {
  return Math.cos(deg * Math.PI / 180);
}

function sin(deg) {
  return Math.sin(deg * Math.PI / 180);
}

function h_to_hms(h) {
  var x = h * 3600;
  var hh = Math.floor(x / 3600);
  if (hh < 10) hh = "0" + hh;
  var y = x % 3600;
  var mm = Math.floor(y / 60);
  if (mm < 10) mm = "0" + mm;
  var ss = Math.round(y % 60);
  if (ss < 10) ss = "0" + ss;
  return hh + ":" + mm + ":" + ss;
}
