const countries = {
    "am-ET": "Amharic",
    "ar-SA": "Arabic",
    "be-BY": "Bielarus",
    "bem-ZM": "Bemba",
    "bi-VU": "Bislama",
    "bjs-BB": "Bajan",
    "bn-IN": "Bengali",
    "bo-CN": "Tibetan",
    "br-FR": "Breton",
    "bs-BA": "Bosnian",
    "ca-ES": "Catalan",
    "cop-EG": "Coptic",
    "cs-CZ": "Czech",
    "cy-GB": "Welsh",
    "da-DK": "Danish",
    "dz-BT": "Dzongkha",
    "de-DE": "German",
    "dv-MV": "Maldivian",
    "el-GR": "Greek",
    "en-GB": "English",
    "es-ES": "Spanish",
    "et-EE": "Estonian",
    "eu-ES": "Basque",
    "fa-IR": "Persian",
    "fi-FI": "Finnish",
    "fn-FNG": "Fanagalo",
    "fo-FO": "Faroese",
    "fr-FR": "French",
    "gl-ES": "Galician",
    "gu-IN": "Gujarati",
    "ha-NE": "Hausa",
    "he-IL": "Hebrew",
    "hi-IN": "Hindi",
    "hr-HR": "Croatian",
    "hu-HU": "Hungarian",
    "id-ID": "Indonesian",
    "is-IS": "Icelandic",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "kk-KZ": "Kazakh",
    "km-KM": "Khmer",
    "kn-IN": "Kannada",
    "ko-KR": "Korean",
    "ku-TR": "Kurdish",
    "ky-KG": "Kyrgyz",
    "la-VA": "Latin",
    "lo-LA": "Lao",
    "lv-LV": "Latvian",
    "men-SL": "Mende",
    "mg-MG": "Malagasy",
    "mi-NZ": "Maori",
    "ms-MY": "Malay",
    "mt-MT": "Maltese",
    "my-MM": "Burmese",
    "ne-NP": "Nepali",
    "niu-NU": "Niuean",
    "nl-NL": "Dutch",
    "no-NO": "Norwegian",
    "ny-MW": "Nyanja",
    "ur-PK": "Pakistani",
    "pau-PW": "Palauan",
    "pa-IN": "Panjabi",
    "ps-PK": "Pashto",
    "pis-SB": "Pijin",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "rn-BI": "Kirundi",
    "ro-RO": "Romanian",
    "ru-RU": "Russian",
    "sg-CF": "Sango",
    "si-LK": "Sinhala",
    "sk-SK": "Slovak",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sq-AL": "Albanian",
    "sr-RS": "Serbian",
    "sv-SE": "Swedish",
    "sw-SZ": "Swahili",
    "ta-LK": "Tamil",
    "te-IN": "Telugu",
    "tet-TL": "Tetum",
    "tg-TJ": "Tajik",
    "th-TH": "Thai",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",
    "tl-PH": "Tagalog",
    "tn-BW": "Tswana",
    "to-TO": "Tongan",
    "tr-TR": "Turkish",
    "uk-UA": "Ukrainian",
    "uz-UZ": "Uzbek",
    "vi-VN": "Vietnamese",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-YD": "Yiddish",
    "zu-ZA": "Zulu"
}
const from_text=document.querySelector("#lang1")
const to_text =document.querySelector("#lang2")
const selectag= document.querySelectorAll("select");
const translatebtn=document.querySelector("button");
const exchange= document.querySelector("#arrow");
const speaker =document.querySelectorAll(".mic");
const copy=document.querySelectorAll(".copy");

console.log(copy[0].innerHTML);

selectag.forEach((tag,id) => {
    for(const country_code in countries){
        let selected;
        if (id==0 && country_code== "hi-IN"){
            selected="selected";
        }else if(id==1 &&country_code=="en-GB")
        {
            selected="selected";
        }   
    let option =`<option value = "${country_code}">${countries[country_code]}</option>`;
    tag.insertAdjacentHTML("beforeend",option);
    }
});

translatebtn.addEventListener("click", ()=>{
    let text =from_text.value;
    translatfrom= selectag[0].value,
    translateto=selectag[1].value;
    console.log(text,translatfrom,translateto)
    to_text.setAttribute("placeholde","translating")

    let apiurl =`https://api.mymemory.translated.net/get?q=${text}&langpair=${translatfrom}|${translateto}`
    fetch (apiurl).then(res => res.json()).then(data => {
        console.log(data)
        to_text.value=data.responseData.translatedText;
        to_text.setAttribute("placeholde","translating")
    })



})
exchange.addEventListener("click",() =>{
    let temptext= from_text.value;
    let templang=selectag[0].value;
    from_text.value= to_text.value;
    selectag[0].value = selectag[1].value;
    to_text.value = temptext;
    selectag[1].value= templang;
})

/*copy.forEach(copyy=>{
copyy.addEventListener("click",()=>{
    console.log("good")
    if (copy.FirstElement=="from"){     
    from_text.value.select()
     navigator.clipboard.writeText(from_text.value)
     message.innerText='text has been copied to the clipboard'
     console.log('from')
    }
    if (event.target.id=="to"){
     to_text.value.select();
     navigator.clipboard.writeText(to_text.value)
     document.execCommand("copy");
     console.log('to')
    }

})
})*/


copy[0].addEventListener("click",()=>{
    from_text.select()
    from_text.setSelectionRange(0,99999)
    navigator.clipboard.writeText(from_text.value)
    
})

copy[1].addEventListener("click",()=>{
    to_text.select()
    to_text.setSelectionRange(0,99999)
    navigator.clipboard.writeText(to_text.value)
    
})

speaker[0].addEventListener("click",() =>{
    const synth=window.speechSynthesis;
    const text=from_text.value;
    if(!synth.speaking && text){
        const utterance=new SpeechSynthesisUtterance(text)
        synth.speak(utterance);
       }

    utterance= new SpeechSynthesisUtterance(from_text.value);
    utterance.lang=selectag[0].value;
    SpeechSynthesis.speak(utterance);

})