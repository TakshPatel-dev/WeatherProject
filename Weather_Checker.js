let place = document.querySelector(`.Inp_Text`);
let current = document.getElementById(`current`);
let History = document.getElementById(`History`);
let forecast = document.getElementById(`forecast`);
let SubmitButton = document.getElementById(`SubmitButton`);
document.addEventListener(`keydown`,(e)=>{if(e.key === `Enter`) Validate()})
function Validate(){
  if(place.value == "") return window.alert(`Enter Correct Place`);
  if(!current.checked && !History.checked && !forecast.checked) return window.alert(`Select One Of The Options`);
    GeneratingApi();
}
function GeneratingApi(){
switch(true){
case current.checked:currentWeather(); break;
                     
case History.checked:HistoryWeather(); break;

case forecast.checked:forecastWeather(); break; 
  default:console.error(`There is an error contact the developer`);;                 
  }
}
async function currentWeather(){
  let api = `https://api.weatherapi.com/v1/current.json?key=17fbee2d5e634fbe89181703241107&q=${place.value}&aqi=no`
  let data = await(fetch(api).then(res => res.json()))
  checkingErrors(data)
  if(result){
  document.location.href = "current.html"}
    
}
async function HistoryWeather(){
 let dataArray = []
 let tareek = new Date()
 let date_issh = new Date(tareek)
 let val=true;
 for(let i = 1;i<7;i++){
 date_issh.setDate(tareek.getDate() - i)
 let api = `https://api.weatherapi.com/v1/history.json?key=17fbee2d5e634fbe89181703241107&q=${place.value}&dt=${date_issh.getFullYear()}-${date_issh.getMonth() +1}-${date_issh.getDate()}`
 let data=await(fetch(api).then(res => res.json()))
 checkingErrors(data,val,dataArray)
 if(result === false) break;
}
localStorage.setItem(`data`,JSON.stringify(dataArray))
if(result) document.location.href = `History.html`
}
async function forecastWeather(){
  let api = `https://api.weatherapi.com/v1/forecast.json?key=17fbee2d5e634fbe89181703241107&q=${place.value}&days=3&aqi=no&alerts=no`
  let data = await(fetch(api).then(res=>res.json()))
  checkingErrors(data)
  if(result){
    document.location.href = "forecast.html"
  }
}

function checkingErrors(data,val,dataArray){
if(data.error) return (result = false,window.alert(data.error.message))
if(val){
  dataArray.push(data)
  result = true
}
else{
    localStorage.setItem(`data`,JSON.stringify(data))
    result=true;
  }

}
 