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
    console.log(phones.slice(0, 20));
    phones.slice(0, 20).forEach((phone) => {
        const div = document.createElement('div');
        div.classList.add('d-flex', 'align-items-center', 'justify-content-center')
        div.innerHTML = `
            <div class="card border-dark p-0 w-100 text-center" >
                <div class="card-header bg-transparent d-flex align-items-center justify-content-center">
                    <img src=${phone.image} class="card-img-top" width="200px"  alt="" />
                </div>
                <div class="card-body text-dark">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                </div>
                <div class="card-footer bg-transparent">
                <button
                 type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" 
                 onclick="detailsUsingSlug('${phone.slug}')" class="btn btn-outline-dark d-block mx-auto">Show More</button>
                </div>
            </div>
        `
        getElement('cardHolder').appendChild(div);
    })


    const button = document.createElement('button')
    button.innerText = "Load All";
    button.classList.add('btn', ('btn-outline-dark'), 'mx-auto', 'my-3', 'd-block');
    button.addEventListener('click', () => {
        phones.slice(20).forEach((phone) => {
            const div = document.createElement('div');
            div.classList.add('d-flex', 'align-items-center', 'justify-content-center');
            div.innerHTML = `
            <div class="card border-dark p-0 w-100 text-center" >
                <div class="card-header bg-transparent d-flex align-items-center justify-content-center">
                    <img src=${phone.image} class="card-img-top" width="200px"  alt="" />
                </div>
                <div class="card-body text-dark">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                </div>
                <div class="card-footer bg-transparent">
                <button
                 type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" 
                 onclick="detailsUsingSlug('${phone.slug}')" class="btn btn-outline-dark d-block mx-auto">Show More</button>
                </div>
            </div>
        `;
            getElement('cardHolder').appendChild(div);
        })
        button.setAttribute('disabled', true);
        button.innerText = 'Loaded All';
    })
    getElement('wrapper').appendChild(button)


    /* 
        REMOVING SPINNER
    */
    spinner('d-flex', 'd-none');
    /*
        REMOVING SPINNER
    */
}



const detailsUsingSlug = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json())
        .then(res => modal(res.data))
}

const modal = (data) => {
    console.log(data)

    document.getElementById('modal').innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="card mb-3" style="max-width: 540px;">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src="${data.image}" class="img-fluid rounded-start" alt="${data.name}">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">${data.name} From ${data.brand}</h5>
                                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-close d-block mx-auto" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                </div>
            </div>
    
    `
    let myModal = new bootstrap.Modal(document.getElementById('modal'), {
        keyboard: false
    })
    myModal.show()

}