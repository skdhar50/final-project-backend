// const { faker } = require('@faker-js/faker');
const mongoose = require("./db");
const { CityLocation } = require("../models/cityLocation");


const data = [
	{
		"name": "South Pahartali",
		"upazilla": []
	},
	{
		"name": "Jalalabad",
		"upazilla": []
	},
	{
		"name": "Panchlaish",
		"upazilla": []
	},
	{
		"name": "Chandgaon",
		"upazilla": []
	},
	{
		"name": "Mohra",
		"upazilla": []
	},
	{
		"name": "East Sholashahar",
		"upazilla": []
	},
	{
		"name": "West Sholashahar",
		"upazilla": []
	},
	{
		"name": "Sulakbahar",
		"upazilla": []
	},
	{
		"name": "North Pahartali",
		"upazilla": []
	},
	{
		"name": "North Kattali",
		"upazilla": []
	},
	{
		"name": "South Kattali",
		"upazilla": []
	},
	{
		"name": "Saraipara",
		"upazilla": []
	},
	{
		"name": "Pahartali",
		"upazilla": []
	},
	{
		"name": "Lal Khan Bazar",
		"upazilla": []
	},
	{
		"name": "Bagmoniram",
		"upazilla": []
	},
	{
		"name": "Chawk Bazar",
		"upazilla": []
	},
	{
		"name": "West Bakalia",
		"upazilla": []
	},
	{
		"name": "East Bakalia",
		"upazilla": []
	},
	{
		"name": "South Bakalia",
		"upazilla": []
	},
	{
		"name": "Dewan Bazar",
		"upazilla": []
	},
	{
		"name": "Jamal Khan",
		"upazilla": []
	},
	{
		"name": "Enayet Bazar",
		"upazilla": []
	},
	{
		"name": "North Pathantooli",
		"upazilla": []
	},
	{
		"name": "North Agrabad",
		"upazilla": []
	},
	{
		"name": "Rampur",
		"upazilla": []
	},
	{
		"name": "North Halishahar",
		"upazilla": []
	},
	{
		"name": "South Agrabad",
		"upazilla": []
	},
	{
		"name": "Pathantooli",
		"upazilla": []
	},
	{
		"name": "West Madarbari",
		"upazilla": []
	},
	{
		"name": "East Madarbari",
		"upazilla": []
	},
	{
		"name": "Alkaran",
		"upazilla": []
	},
	{
		"name": "Anderkilla",
		"upazilla": []
	},
	{
		"name": "Firingee Bazar",
		"upazilla": []
	},
	{
		"name": "Patharghata",
		"upazilla": []
	},
	{
		"name": "Boxir Hat",
		"upazilla": []
	},
	{
		"name": "Gosaildanga",
		"upazilla": []
	},
	{
		"name": "North Middle Halishahar",
		"upazilla": []
	},
	{
		"name": "South Middle Halishahar",
		"upazilla": []
	},
	{
		"name": "South Halishahar",
		"upazilla": []
	},
	{
		"name": "North Pothenga",
		"upazilla": []
	},
	{
		"name": "South Pothenga",
		"upazilla": []
	},
	{
		"name": "Sandwip",
		"upazilla": [
			"Amanullah",
			"Azimpur",
			"Bauria",
			"Gachhua",
			"Haramia",
			"Harispur",
			"Kalapania",
			"Magdhara",
			"Maitbhanga",
			"Musapur",
			"Rahmatpur",
			"Santoshpur",
			"Sarikait",
			"Urirchar"
		]
	},
	{
		"name": "Lohagara",
		"upazilla": [
			"Adhunagar",
			"Amirabad",
			"Barahatia",
			"Charamba",
			"Chunati",
			"Kalauzan",
			"Lohagara",
			"Padua",
			"Putibila"
		]
	},
	{
		"name": "Satkania",
		"upazilla": [
			"Amilais",
			"Eochia",
			"Bazalia",
			"Charati",
			"Dhemsa",
			"Dharmapur",
			"Kaliais",
			"Kanchana",
			"Keochia",
			"Khagaria",
			"Madrasa",
			"Nalua",
			"Puranghar",
			"Chhadaha",
			"Satkania",
			"Sonakania",
			"Paschim Dhemsa"
		]
	},
	{
		"name": "Patiya",
		"upazilla": [
			"Asia",
			"Baralia",
			"Bara Uthan",
			"Bhatikhain",
			"Chanhara",
			"Char Lakshya",
			"Char Patharghata",
			"Dhalghat",
			"Habilas Dwip",
			"Haidgaon",
			"Junglekhain",
			"Juldha",
			"Kachuai",
			"Kasiais",
			"Kelishahar",
			"Kharana",
			"Kolagaon",
			"Kusumpura",
			"Sikalbaha",
			"Sobhandandi",
			"South Bhurshi",
			"Jiri"
		]
	},
	{
		"name": "Chandanish",
		"upazilla": [
			"Bailtali",
			"Barkal",
			"Barama",
			"Dhopachhari",
			"Dohazari",
			"Hashimpur",
			"Joara",
			"Kanchanabad",
			"Satbaria"
		]
	},
	{
		"name": "Boalkhali",
		"upazilla": [
			"Ahla Karaldanga",
			"Amuchia",
			"Charandwip",
			"Purba Gomdandi",
			"Kadhurkhil",
			"Popadia",
			"Saroatali",
			"Shakpura",
			"Sreepur Kharandwip",
			"Paschim Gomdandi"
		]
	},
	{
		"name": "Banskhali",
		"upazilla": [
			"Baharchhara",
			"Bailchhari",
			"Chambal",
			"Chhanua",
			"Gandamara",
			"Kalipur",
			"Katharia",
			"Khankhanabad",
			"Puichhari",
			"Pukuria",
			"Sadhanpur",
			"Saral",
			"Sekherkhil",
			"Silkup"
		]
	},
	{
		"name": "Sitakunda",
		"upazilla": [
			"Banshbaria",
			"Barabkunda",
			"Baraiardhala",
			"Bhatiari",
			"Kumira",
			"Muradpur",
			"Salimpur",
			"Sonaichhari",
			"Syedpur"
		]
	},
	{
		"name": "Fatikchari",
		"upazilla": [
			"Abdullapur",
			"Bagan Bazar",
			"Baktapur",
			"Bhujpur",
			"Dantmara",
			"Dharmapur",
			"Dhurung",
			"Daulatpur",
			"Harwalchhari",
			"Jafatnagar",
			"Kanchan Nagar",
			"Lelang",
			"Nanupur",
			"Narayanhat",
			"Paindang",
			"Rangamatia",
			"Roushangiri",
			"Suabil",
			"Samitirhat",
			"Sundarpur"
		]
	},
	{
		"name": "Anwara",
		"upazilla": [
			"Anowara",
			"Bairag",
			"Barakhain",
			"Barasat",
			"Burumchara",
			"Battali",
			"Chatari",
			"Haildhar",
			"Paraikora",
			"Roypur",
			"Juindandi"
		]
	},
	{
		"name": "Mirsharai",
		"upazilla": [
			"Dhum",
			"Durgapur",
			"Haitkandi",
			"Hinguli",
			"Ichhakhali",
			"Karerhat",
			"Katachhara",
			"Khaiyachhara",
			"Mayani",
			"Mirsharai",
			"Mithanala",
			"Maghadia",
			"Osmanpur",
			"Saherkhali",
			"Wahedpur",
			"Zorwarganj"
		]
	},
	{
		"name": "Rangunia",
		"upazilla": [
			"Betagi",
			"Chandraghona",
			"Hosnabad",
			"Kodala",
			"Mariamnagar",
			"Padua",
			"Parua",
			"Pomara",
			"Rajanagar",
			"Rangunia",
			"Sarapbhata",
			"Silak",
			"Islampur",
			"Dakshin Rajanagar",
			"Lalanagar"
		]
	},
	{
		"name": "Raojan",
		"upazilla": [
			"Bagoan",
			"Binajuri",
			"Chikdair",
			"Dabua",
			"Purba Guzara",
			"Gahira",
			"Haludia",
			"Kadalpur",
			"Noajispur",
			"Noa Para",
			"Pahartali",
			"Raozan",
			"Urkirchar",
			"Paschim Guzara"
		]
	},
	{
		"name": "Hathazari",
		"upazilla": [
			"Burir Char",
			"Chhipatali",
			"Chikandanti",
			"Dakshin Madrasha",
			"Dhalai",
			"Fatehpur",
			"Forhadabad",
			"Garduara",
			"Guman Mardan",
			"Hathazari",
			"Mekhal",
			"Mirzapur",
			"Nangalmora",
			"Shikarpur",
			"Uttar Madarsa"
		]
	},
	{
		"name": "Karnaphuli",
		"upazilla": [
			"Char Patharghata",
			"Shikalbaha",
			"Char Lakhya",
			"Juldha",
			"Bara Uthan"
		]
	}
]


CityLocation.insertMany(data, (err) => {
    console.log("Seeding: CityLocation")
    if (err) {
        console.log(err);
        mongoose.disconnect();
    } else {
        console.log("Seeded: CityLocation")
        mongoose.disconnect();
    }
});



