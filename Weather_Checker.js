let place = document.querySelector(`.Inp_Text`);
let current = document.getElementById(`current`);
let History = document.getElementById(`History`);
let forecast = document.getElementById(`forecast`);
let SubmitButton = document.getElementById(`SubmitButton`);
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
  checkingErrors(data,api)
  if(result){
  document.location.href = "current.html"}
    
}
function checkingErrors(data,api){
  if(data.error) return (result = false,window.alert(data.error.message))
  localStorage.setItem(`data`,JSON.stringify(data))
  result=true;
  
}