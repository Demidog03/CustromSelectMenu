const wrapper = document.querySelector('.wrapper')
const selectBtn = document.querySelector('.select-btn')
const searchInp = document.querySelector('.search input')
const options = document.querySelector('.options')
let countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"]

//click eventListener for selectBtn
selectBtn.addEventListener('click', () => {
    wrapper.classList.toggle('active') //when clicking the button toggles extra class 'active'
})
searchInp.addEventListener('keyup', () => { //when typing keys
    let arr = []
    let searchedVal = searchInp.value.toLowerCase()
    //returning all countries which starts from inserted value in search bar
    arr = countries.filter(data => {
        return data.toLowerCase().startsWith(searchedVal) //do not change to lowercase in result, just when filtering
    }).map(data => `<li onclick="updateName(this)">${data}</li>`).join("") //join creates an array seperated by commas or a specified separator string

    // for(let i=0; i<arr.length; i++){
    //     if(arr[i].innerHTML === selectBtn.innerHTML.toLowerCase()){
    //         arr[i] = `<li onclick="updateName(this)" class="isSelected">${arr[i].innerHTML}</li>`;
    //     }
    //     arr.replace()
    // }

    options.innerHTML = arr ? arr : `<p>Country not found</p>`
})


const addCountry = (selectedCountry) => {
    options.innerHTML = ''
    countries.forEach(country => {
        let isSelected = country == selectedCountry ? 'selected' : '' //if country is selected
        //inserting each country inside 'li' and inserting all 'li' into tag with 'options' class
        let li=`<li onclick="updateName(this)" class="${isSelected}" >${country}</li>`
        //insertAdjacentHTML() faster than simple insertHTML()
        //this function does not overwrite existing elements, which prevents additional serialization
        options.insertAdjacentHTML('beforeend', li)
    })
}

//updating select text into selected country
const updateName = (selectedLi) => {
    //remove search bar input value
    searchInp.value = ''
    //reset options elements (countries)
    addCountry(selectedLi.innerHTML)
    wrapper.classList.remove('active')//removing options because we do note need it after selecting country
    //firstChild() returns whole element with text and comments
    //while firstChildElement() ignores text and comment nodes
    //<span></span>
    selectBtn.firstElementChild.innerHTML = selectedLi.innerHTML

}

addCountry()