const express = require('express');
const axios = require('axios');
const ejs = require('ejs');
const app = express();

app.set('view engine',ejs);
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res)=>{

    res.render('index.ejs', {CountryData: ''});
});

app.post('/DataCountry', (req, res)=> {
    let country;
    
    
        if (req.body.optionCountry === "EST") {
            country = "estonia";
        }else if (req.body.optionCountry === "LV") {
            country = "latvia";
        } else {
            country = "lithuania"
        }
       
        
       
    const url = 'https://restcountries.com/v3/name/'+country; 
   
    axios.get(url)
    .then((response) => {
            
        let Country = {
            name: '',
            Domain: '',
            CallingCode: '',
            Capital: '',
            Region:'',
            Subregion:'',
            population: '',
            Timezone: '',
            LanguageEnglish: '',
            Currencycode: '',
            Currencyname: '',
            Currencysymbol: '',
            urlflag: ''
        };
        
        Country.name = response.data[0].name.common;
        Country.Domain = response.data[0].tld[0];
        Country.Capital = response.data[0].capital[0];
        Country.Region = response.data[0].region;
        Country.Subregion = response.data[0].subregion;
        Country.population = response.data[0].population;
        Country.Timezone = response.data[0].idd.root;
        Country.LanguageEnglish = response.data[0].languages.est;
        Country.Currencyname = response.data[0].currencies.EUR.name;
        Country.Currencysymbol = response.data[0].currencies.EUR.symbol;
        Country.urlflag = response.data[0].flags[0];
        res.render('index.ejs', {CountryData: Country});
    })
    .catch((error) => {
        console.log(error)
    })
});
app.listen(3000, ()=>{
    console.log('app is runnig on a 3000 port');
    });