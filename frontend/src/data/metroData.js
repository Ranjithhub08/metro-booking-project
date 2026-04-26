export const CITIES = {
  hyderabad: {
    name: "Hyderabad",
    officialUrl: "https://www.ltmetro.com/",
    lines: {
      red: { name: "Red Line", color: "#E53935" },
      blue: { name: "Blue Line", color: "#1E88E5" },
      green: { name: "Green Line", color: "#43A047" },
    },
    stations: [
      // Red Line
      { id: "miyapur", name: "Miyapur", line: "red", order: 1, x: 50, y: 200 },
      { id: "jntu", name: "JNTU College", line: "red", order: 2, x: 110, y: 200 },
      { id: "kphb", name: "KPHB Colony", line: "red", order: 3, x: 170, y: 200 },
      { id: "kukatpally", name: "Kukatpally", line: "red", order: 4, x: 230, y: 200 },
      { id: "balanagar", name: "Balanagar", line: "red", order: 5, x: 290, y: 200 },
      { id: "moosapet", name: "Moosapet", line: "red", order: 6, x: 350, y: 200 },
      { id: "bhelhq", name: "BHEL", line: "red", order: 7, x: 410, y: 200 },
      { id: "erragadda", name: "Erragadda", line: "red", order: 8, x: 470, y: 200 },
      { id: "esi", name: "ESI Hospital", line: "red", order: 9, x: 530, y: 200 },
      { id: "sr_nagar", name: "SR Nagar", line: "red", order: 10, x: 590, y: 200 },
      { id: "ameerpet", name: "Ameerpet", line: "red", order: 11, x: 650, y: 200, interchange: ["blue"] },
      { id: "panjagutta", name: "Panjagutta", line: "red", order: 12, x: 710, y: 200 },
      { id: "irrum_manzil", name: "Irrum Manzil", line: "red", order: 13, x: 770, y: 200 },
      { id: "khairatabad", name: "Khairatabad", line: "red", order: 14, x: 830, y: 200 },
      { id: "lakdikapul", name: "Lakdikapul", line: "red", order: 15, x: 890, y: 200 },
      { id: "assembly", name: "Assembly", line: "red", order: 16, x: 950, y: 200 },
      { id: "nampally", name: "Nampally", line: "red", order: 17, x: 1010, y: 200 },
      { id: "gandhibhavan", name: "Gandhi Bhavan", line: "red", order: 18, x: 1070, y: 200 },
      { id: "osmania", name: "Osmania Medical", line: "red", order: 19, x: 1130, y: 200 },
      { id: "mgbs", name: "MG Bus Station", line: "red", order: 20, x: 1190, y: 200, interchange: ["green"] },
      { id: "malakpet", name: "Malakpet", line: "red", order: 21, x: 1250, y: 200 },
      { id: "new_market", name: "New Market", line: "red", order: 22, x: 1310, y: 200 },
      { id: "musarambagh", name: "Musarambagh", line: "red", order: 23, x: 1370, y: 200 },
      { id: "dilsukhnagar", name: "Dilsukhnagar", line: "red", order: 24, x: 1430, y: 200 },
      { id: "chaitanyapuri", name: "Chaitanyapuri", line: "red", order: 25, x: 1490, y: 200 },
      { id: "victoria", name: "Victoria Memorial", line: "red", order: 26, x: 1550, y: 200 },
      { id: "lbnagar", name: "LB Nagar", line: "red", order: 27, x: 1610, y: 200 },
      // Blue Line
      { id: "nagpur", name: "Nagole", line: "blue", order: 1, x: 650, y: 80 },
      { id: "uppal", name: "Uppal", line: "blue", order: 2, x: 650, y: 120 },
      { id: "survey_settlement", name: "Survey Settlement", line: "blue", order: 3, x: 650, y: 150 },
      { id: "ngri", name: "NGRI", line: "blue", order: 4, x: 650, y: 175 },
      // ameerpet is interchange
      { id: "madhura_nagar", name: "Madhura Nagar", line: "blue", order: 5, x: 650, y: 240 },
      { id: "yusufguda", name: "Yusufguda", line: "blue", order: 6, x: 650, y: 280 },
      { id: "road_no5", name: "Road No. 5 Jubilee Hills", line: "blue", order: 7, x: 650, y: 320 },
      { id: "jubilee_hills", name: "Jubilee Hills Check Post", line: "blue", order: 8, x: 650, y: 360 },
      { id: "peddamma", name: "Peddamma Temple", line: "blue", order: 9, x: 650, y: 400 },
      { id: "mindspace", name: "Mindspace", line: "blue", order: 10, x: 650, y: 440 },
      { id: "hitech_city", name: "Hitec City", line: "blue", order: 11, x: 650, y: 480 },
      { id: "durgam_cheruvu", name: "Durgam Cheruvu", line: "blue", order: 12, x: 650, y: 520 },
      { id: "raidurg", name: "Raidurg", line: "blue", order: 13, x: 650, y: 560 },
      // Green Line
      { id: "jubilee_bus", name: "Jubilee Bus Station", line: "green", order: 1, x: 1190, y: 80 },
      { id: "parade_grounds", name: "Parade Grounds", line: "green", order: 2, x: 1190, y: 120 },
      { id: "secunderabad_east", name: "Secunderabad East", line: "green", order: 3, x: 1190, y: 160 },
      // mgbs is interchange
      { id: "gandhi", name: "Gandhi Hospital", line: "green", order: 4, x: 1190, y: 240 },
      { id: "musheerabad", name: "Musheerabad", line: "green", order: 5, x: 1190, y: 280 },
      { id: "rein_bazar", name: "Rein Bazar", line: "green", order: 6, x: 1190, y: 320 },
      { id: "chikkadpally", name: "Chikkadpally", line: "green", order: 7, x: 1190, y: 360 },
      { id: "narayanguda", name: "Narayanguda", line: "green", order: 8, x: 1190, y: 400 },
      { id: "sultan_bazar", name: "Sultan Bazar", line: "green", order: 9, x: 1190, y: 440 },
      { id: "mj_market", name: "MJ Market", line: "green", order: 10, x: 1190, y: 480 },
    ],
    connections: [
      // Red Line connections
      ["miyapur","jntu"],["jntu","kphb"],["kphb","kukatpally"],["kukatpally","balanagar"],
      ["balanagar","moosapet"],["moosapet","bhelhq"],["bhelhq","erragadda"],["erragadda","esi"],
      ["esi","sr_nagar"],["sr_nagar","ameerpet"],["ameerpet","panjagutta"],["panjagutta","irrum_manzil"],
      ["irrum_manzil","khairatabad"],["khairatabad","lakdikapul"],["lakdikapul","assembly"],
      ["assembly","nampally"],["nampally","gandhibhavan"],["gandhibhavan","osmania"],
      ["osmania","mgbs"],["mgbs","malakpet"],["malakpet","new_market"],["new_market","musarambagh"],
      ["musarambagh","dilsukhnagar"],["dilsukhnagar","chaitanyapuri"],["chaitanyapuri","victoria"],
      ["victoria","lbnagar"],
      // Blue Line connections
      ["nagpur","uppal"],["uppal","survey_settlement"],["survey_settlement","ngri"],
      ["ngri","ameerpet"],["ameerpet","madhura_nagar"],["madhura_nagar","yusufguda"],
      ["yusufguda","road_no5"],["road_no5","jubilee_hills"],["jubilee_hills","peddamma"],
      ["peddamma","mindspace"],["mindspace","hitech_city"],["hitech_city","durgam_cheruvu"],
      ["durgam_cheruvu","raidurg"],
      // Green Line connections
      ["jubilee_bus","parade_grounds"],["parade_grounds","secunderabad_east"],
      ["secunderabad_east","mgbs"],["mgbs","gandhi"],["gandhi","musheerabad"],
      ["musheerabad","rein_bazar"],["rein_bazar","chikkadpally"],["chikkadpally","narayanguda"],
      ["narayanguda","sultan_bazar"],["sultan_bazar","mj_market"],
    ]
  },

  chennai: {
    name: "Chennai",
    officialUrl: "https://chennaimetrorail.org/",
    lines: {
      blue: { name: "Blue Line", color: "#1565C0" },
      green: { name: "Green Line", color: "#2E7D32" },
    },
    stations: [
      // Blue Line
      { id: "wimco", name: "Wimco Nagar", line: "blue", order: 1, x: 100, y: 150 },
      { id: "thiruvotriyur", name: "Thiruvotriyur", line: "blue", order: 2, x: 170, y: 150 },
      { id: "kaladipet", name: "Kaladipet", line: "blue", order: 3, x: 240, y: 150 },
      { id: "tollgate", name: "Tollgate", line: "blue", order: 4, x: 310, y: 150 },
      { id: "tiruvottiyur_theradi", name: "Tiruvottiyur Theradi", line: "blue", order: 5, x: 380, y: 150 },
      { id: "manali", name: "Manali", line: "blue", order: 6, x: 450, y: 150 },
      { id: "moolakkadai", name: "Moolakkadai", line: "blue", order: 7, x: 520, y: 150 },
      { id: "new_washermenpet", name: "New Washermenpet", line: "blue", order: 8, x: 590, y: 150 },
      { id: "washermenpet", name: "Washermenpet", line: "blue", order: 9, x: 660, y: 150 },
      { id: "korukkupet", name: "Korukkupet", line: "blue", order: 10, x: 730, y: 150 },
      { id: "central", name: "Chennai Central", line: "blue", order: 11, x: 800, y: 150, interchange: ["green"] },
      { id: "egmore", name: "Egmore", line: "blue", order: 12, x: 870, y: 150 },
      { id: "nehru_park", name: "Nehru Park", line: "blue", order: 13, x: 940, y: 150 },
      { id: "kilpauk", name: "Kilpauk Medical", line: "blue", order: 14, x: 1010, y: 150 },
      { id: "ashok_nagar", name: "Ashok Nagar", line: "blue", order: 15, x: 1080, y: 150 },
      { id: "aminjikarai", name: "Aminjikarai", line: "blue", order: 16, x: 1150, y: 150 },
      { id: "arumbakkam", name: "Arumbakkam", line: "blue", order: 17, x: 1220, y: 150 },
      { id: "vadapalani", name: "Vadapalani", line: "blue", order: 18, x: 1290, y: 150, interchange: ["green"] },
      { id: "virugambakkam", name: "Virugambakkam", line: "blue", order: 19, x: 1360, y: 150 },
      { id: "nerkundram", name: "Nerkundram", line: "blue", order: 20, x: 1430, y: 150 },
      { id: "koyambedu", name: "Koyambedu", line: "blue", order: 21, x: 1500, y: 150 },
      { id: "cmbt", name: "CMBT", line: "blue", order: 22, x: 1570, y: 150 },
      // Green Line
      { id: "airport", name: "Airport", line: "green", order: 1, x: 800, y: 500 },
      { id: "meenambakkam", name: "Meenambakkam", line: "green", order: 2, x: 800, y: 440 },
      { id: "tirusulam", name: "Tirusulam", line: "green", order: 3, x: 800, y: 380 },
      { id: "pallavaram", name: "Pallavaram", line: "green", order: 4, x: 800, y: 320 },
      { id: "chromepet", name: "Chromepet", line: "green", order: 5, x: 800, y: 260 },
      { id: "tambaram", name: "Tambaram", line: "green", order: 6, x: 800, y: 200 },
      // central is interchange
      { id: "government_estate", name: "Government Estate", line: "green", order: 7, x: 800, y: 110 },
      { id: "high_court", name: "High Court", line: "green", order: 8, x: 800, y: 70 },
    ],
    connections: [
      ["wimco","thiruvotriyur"],["thiruvotriyur","kaladipet"],["kaladipet","tollgate"],
      ["tollgate","tiruvottiyur_theradi"],["tiruvottiyur_theradi","manali"],["manali","moolakkadai"],
      ["moolakkadai","new_washermenpet"],["new_washermenpet","washermenpet"],["washermenpet","korukkupet"],
      ["korukkupet","central"],["central","egmore"],["egmore","nehru_park"],["nehru_park","kilpauk"],
      ["kilpauk","ashok_nagar"],["ashok_nagar","aminjikarai"],["aminjikarai","arumbakkam"],
      ["arumbakkam","vadapalani"],["vadapalani","virugambakkam"],["virugambakkam","nerkundram"],
      ["nerkundram","koyambedu"],["koyambedu","cmbt"],
      ["airport","meenambakkam"],["meenambakkam","tirusulam"],["tirusulam","pallavaram"],
      ["pallavaram","chromepet"],["chromepet","tambaram"],["tambaram","central"],
      ["central","government_estate"],["government_estate","high_court"],
    ]
  },

  bengaluru: {
    name: "Bengaluru",
    officialUrl: "https://english.bmrcl.com/",
    lines: {
      purple: { name: "Purple Line", color: "#6A1B9A" },
      green: { name: "Green Line", color: "#2E7D32" },
    },
    stations: [
      // Purple Line
      { id: "challaghatta", name: "Challaghatta", line: "purple", order: 1, x: 80, y: 200 },
      { id: "kengeri", name: "Kengeri", line: "purple", order: 2, x: 150, y: 200 },
      { id: "pattanagere", name: "Pattanagere", line: "purple", order: 3, x: 220, y: 200 },
      { id: "jnanabharathi", name: "Jnanabharathi", line: "purple", order: 4, x: 290, y: 200 },
      { id: "rajarajeshwari", name: "Rajarajeshwari Nagar", line: "purple", order: 5, x: 360, y: 200 },
      { id: "nayandahalli", name: "Nayandahalli", line: "purple", order: 6, x: 430, y: 200 },
      { id: "mysuru_road", name: "Mysuru Road", line: "purple", order: 7, x: 500, y: 200 },
      { id: "deepanjali", name: "Deepanjali Nagar", line: "purple", order: 8, x: 570, y: 200 },
      { id: "attiguppe", name: "Attiguppe", line: "purple", order: 9, x: 640, y: 200 },
      { id: "vijayanagar", name: "Vijayanagar", line: "purple", order: 10, x: 710, y: 200 },
      { id: "hosahalli", name: "Hosahalli", line: "purple", order: 11, x: 780, y: 200 },
      { id: "magadi_road", name: "Magadi Road", line: "purple", order: 12, x: 850, y: 200 },
      { id: "city_railway", name: "City Railway Station", line: "purple", order: 13, x: 920, y: 200 },
      { id: "majestic", name: "Majestic", line: "purple", order: 14, x: 990, y: 200, interchange: ["green"] },
      { id: "cubbon_park", name: "Cubbon Park", line: "purple", order: 15, x: 1060, y: 200 },
      { id: "mg_road", name: "MG Road", line: "purple", order: 16, x: 1130, y: 200 },
      { id: "trinity", name: "Trinity", line: "purple", order: 17, x: 1200, y: 200 },
      { id: "halasuru", name: "Halasuru", line: "purple", order: 18, x: 1270, y: 200 },
      { id: "indiranagar", name: "Indiranagar", line: "purple", order: 19, x: 1340, y: 200 },
      { id: "swami_vivekananda", name: "Swami Vivekananda Road", line: "purple", order: 20, x: 1410, y: 200 },
      { id: "baiyappanahalli", name: "Baiyappanahalli", line: "purple", order: 21, x: 1480, y: 200 },
      // Green Line
      { id: "nagasandra", name: "Nagasandra", line: "green", order: 1, x: 990, y: 60 },
      { id: "dasarahalli", name: "Dasarahalli", line: "green", order: 2, x: 990, y: 100 },
      { id: "jalahalli", name: "Jalahalli", line: "green", order: 3, x: 990, y: 140 },
      { id: "peenya_industry", name: "Peenya Industry", line: "green", order: 4, x: 990, y: 170 },
      // majestic is interchange
      { id: "chickpete", name: "Chickpete", line: "green", order: 5, x: 990, y: 240 },
      { id: "krishnarajendra", name: "Krishnarajendra Market", line: "green", order: 6, x: 990, y: 280 },
      { id: "national_college", name: "National College", line: "green", order: 7, x: 990, y: 320 },
      { id: "lalbagh", name: "Lalbagh", line: "green", order: 8, x: 990, y: 360 },
      { id: "south_end", name: "South End Circle", line: "green", order: 9, x: 990, y: 400 },
      { id: "jayanagar", name: "Jayanagar", line: "green", order: 10, x: 990, y: 440 },
      { id: "jp_nagar", name: "JP Nagar", line: "green", order: 11, x: 990, y: 480 },
      { id: "yelachenahalli", name: "Yelachenahalli", line: "green", order: 12, x: 990, y: 520 },
    ],
    connections: [
      ["challaghatta","kengeri"],["kengeri","pattanagere"],["pattanagere","jnanabharathi"],
      ["jnanabharathi","rajarajeshwari"],["rajarajeshwari","nayandahalli"],["nayandahalli","mysuru_road"],
      ["mysuru_road","deepanjali"],["deepanjali","attiguppe"],["attiguppe","vijayanagar"],
      ["vijayanagar","hosahalli"],["hosahalli","magadi_road"],["magadi_road","city_railway"],
      ["city_railway","majestic"],["majestic","cubbon_park"],["cubbon_park","mg_road"],
      ["mg_road","trinity"],["trinity","halasuru"],["halasuru","indiranagar"],
      ["indiranagar","swami_vivekananda"],["swami_vivekananda","baiyappanahalli"],
      ["nagasandra","dasarahalli"],["dasarahalli","jalahalli"],["jalahalli","peenya_industry"],
      ["peenya_industry","majestic"],["majestic","chickpete"],["chickpete","krishnarajendra"],
      ["krishnarajendra","national_college"],["national_college","lalbagh"],["lalbagh","south_end"],
      ["south_end","jayanagar"],["jayanagar","jp_nagar"],["jp_nagar","yelachenahalli"],
    ]
  },

  kochi: {
    name: "Kochi",
    officialUrl: "https://kochimetro.org/",
    lines: {
      blue: { name: "Blue Line", color: "#0D47A1" },
    },
    stations: [
      { id: "petta", name: "Petta", line: "blue", order: 1, x: 100, y: 300 },
      { id: "idappally", name: "Idappally", line: "blue", order: 2, x: 190, y: 300 },
      { id: "perandoor", name: "Perandoor Junction", line: "blue", order: 3, x: 280, y: 300 },
      { id: "ambattukavu", name: "Ambattukavu", line: "blue", order: 4, x: 370, y: 300 },
      { id: "muttom", name: "Muttom", line: "blue", order: 5, x: 460, y: 300 },
      { id: "companypady", name: "Companypady", line: "blue", order: 6, x: 550, y: 300 },
      { id: "ambedkar", name: "Ambedkar", line: "blue", order: 7, x: 640, y: 300 },
      { id: "tp_nagar", name: "T P Nagar", line: "blue", order: 8, x: 730, y: 300 },
      { id: "mg_road_kochi", name: "MG Road", line: "blue", order: 9, x: 820, y: 300 },
      { id: "maharajas", name: "Maharajas", line: "blue", order: 10, x: 910, y: 300 },
      { id: "edapally", name: "Edapally", line: "blue", order: 11, x: 1000, y: 300 },
      { id: "changampuzha", name: "Changampuzha Park", line: "blue", order: 12, x: 1090, y: 300 },
      { id: "palarivattom", name: "Palarivattom", line: "blue", order: 13, x: 1180, y: 300 },
      { id: "jlnstadium", name: "JLN Stadium", line: "blue", order: 14, x: 1270, y: 300 },
      { id: "kaloor", name: "Kaloor", line: "blue", order: 15, x: 1360, y: 300 },
      { id: "lissie", name: "Lissie", line: "blue", order: 16, x: 1450, y: 300 },
      { id: "ernakulam_south", name: "Ernakulam South", line: "blue", order: 17, x: 1540, y: 300 },
      { id: "kadavanthra", name: "Kadavanthra", line: "blue", order: 18, x: 1630, y: 300 },
      { id: "elamkulam", name: "Elamkulam", line: "blue", order: 19, x: 1720, y: 300 },
      { id: "vyttila", name: "Vyttila", line: "blue", order: 20, x: 1810, y: 300 },
      { id: "thykoodam", name: "Thykoodam", line: "blue", order: 21, x: 1900, y: 300 },
      { id: "tripunithura", name: "Tripunithura", line: "blue", order: 22, x: 1990, y: 300 },
    ],
    connections: [
      ["petta","idappally"],["idappally","perandoor"],["perandoor","ambattukavu"],
      ["ambattukavu","muttom"],["muttom","companypady"],["companypady","ambedkar"],
      ["ambedkar","tp_nagar"],["tp_nagar","mg_road_kochi"],["mg_road_kochi","maharajas"],
      ["maharajas","edapally"],["edapally","changampuzha"],["changampuzha","palarivattom"],
      ["palarivattom","jlnstadium"],["jlnstadium","kaloor"],["kaloor","lissie"],
      ["lissie","ernakulam_south"],["ernakulam_south","kadavanthra"],["kadavanthra","elamkulam"],
      ["elamkulam","vyttila"],["vyttila","thykoodam"],["thykoodam","tripunithura"],
    ]
  }
};

export const getCityStations = (cityId) => {
  const city = CITIES[cityId];
  if (!city) return [];
  return city.stations;
};

export const getCityConnections = (cityId) => {
  const city = CITIES[cityId];
  if (!city) return [];
  return city.connections;
};