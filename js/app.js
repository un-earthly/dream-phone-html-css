/* 
    GETTING ELEMENT WITH ID
*/
const getElement = (id) => document.getElementById(id);
/* 
    GETTING ELEMENT WITH ID
*/


/* 
   SPINNER FUNCTION
*/
const spinner = (classToRemove, classToAdd) => {
    getElement('spinner').classList.remove(classToRemove)
    getElement('spinner').classList.add(classToAdd)
}
/* 
   SPINNER FUNCTION
*/


/* 
    GETTING SRARCH INPUT VALUE 
*/
const searchBtn = getElement('findPhone');
searchBtn.addEventListener('click', () => {
    const userAskedPhoneName = getElement('phoneName');
    fetchByName(userAskedPhoneName.value.toLowerCase());
    userAskedPhoneName.value = "";

    /* 
        SHOWING SPINNER
    */
    spinner('d-none', 'd-flex')
    /* 
        SHOWING SPINNER
    */


});



/* 
    GETTING SRARCH INPUT VALUE 
*/


/* 
    INVOKING FETCHEDBYNAME FUNTION IN ORDER TO FETCH API AND SEND IT TO THE FETCHED FUNCTION TO SHOW IT IN THE DOM
*/
const fetchByName = (searchParam) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchParam}`)
        .then(res => res.json())
        .then(res => fetchedPhones(res.data));

}

/* 
    INVOKING FETCHEDBYNAME FUNTION IN ORDER TO FETCH API AND SEND IT TO THE FETCHED FUNCTION TO SHOW IT IN THE DOM
*/

const fetchedPhones = (phones) => {
    console.log(phones);
    phones.forEach((phone) => {
        console.log(phone)
    })

    /* 
       REMOVING SPINNER
   */
    spinner('d-flex', 'd-none')
    /*
        REMOVING SPINNER
    */
}
