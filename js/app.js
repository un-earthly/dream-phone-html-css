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
const togglingDisplay = (id, classToRemove, classToAdd) => {
    getElement(id).classList.remove(classToRemove)
    getElement(id).classList.add(classToAdd)
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
    togglingDisplay('spinner', 'd-none', 'd-flex')
    /* 
            SHOWING SPINNER
        */

    /* 
            CLEANING DOM 
        */

    getElement('cardHolder').innerHTML = "";

    /*
            CLEANING DOM
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
        .then((res) => {
            if (res.data.length === 0 || res.data === []) {
                togglingDisplay('error', 'd-none', 'd-flex')
                getElement('cardHolder').innerHTML = "";
                /* 
                        REMOVING SPINNER
                    */
                togglingDisplay('spinner', 'd-flex', 'd-none');
                /*
                        REMOVING SPINNER
                    */
            } else {
                fetchedPhones(res.data)
                togglingDisplay('error', 'd-flex', 'd-none')
            }
        })


}

/* 
        INVOKING FETCHEDBYNAME FUNTION IN ORDER TO FETCH API AND SEND IT TO THE FETCHED FUNCTION TO SHOW IT IN THE DOM
    */

const fetchedPhones = (phones) => {
    console.log(phones);
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
        /* 
                REMOVING SPINNER
            */
        togglingDisplay('spinner', 'd-flex', 'd-none');
        /*
                REMOVING SPINNER
            */
    });

    /*
            BUTTON FUNCTUIONALITY 
        */
    if (phones.length > 20) {
        const button = document.createElement('button');
        button.innerText = "Load All";
        button.setAttribute('id', 'loadButton');
        button.classList.add('btn', 'btn-outline-dark', 'mx-auto', 'my-3', 'd-block');
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
            });
            button.classList.remove('d-block')
            button.classList.add('d-none')
        });
        getElement('wrapper').appendChild(button);
    }


    /* 
            REMOVING SPINNER
        */
    togglingDisplay('spinner', 'd-flex', 'd-none');
    /*
            REMOVING SPINNER
        */
};



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
                        <div class="card mb-3">
                            <div class="d-flex flex-column g-0">
                                <div class="">
                                    <img src="${data.image}" width="100%" class="img-fluid rounded-start" alt="${data.name}">
                                </div>
                                <div class="">
                                    <div class="card-body p-0 ps-2">
                                        <h4 class="card-title">${data.name} From ${data.brand}</h4>
                                        <p class="card-text m-0"><small class="text-muted">${data.releaseDate ? data.releaseDate : 'Realease Date Will Be Available Soon'}</small></p>
                                        <p class="card-text m-0"><small class="text-dark">Chipset:${data.mainFeatures.chipSet ? data.mainFeatures.chipSet : 'Not Available'}</small></p>
                                        <p class="card-text m-0"><small class="text-dark">Display:${data.mainFeatures.displaySize ? data.mainFeatures.displaySize : 'Not Available'}</small></p>
                                        <p class="card-text m-0"><small class="text-dark">Memory:${data.mainFeatures.memory ? data.mainFeatures.memory : "Not Available"}</small></p>
                                        <p class="card-text m-0"><small class="text-dark">Storage:${data.mainFeatures.storage ? data.mainFeatures.storage : "Not Available"}</small></p>
                                        <p class="card-text m-0" ><small class="text-dark">Sensors: ${data.mainFeatures.sensors ? data.mainFeatures.sensors : "Not Available"}</small></p >
                                        <p class="card-text m-0" ><small class="text-dark">Other Features: ${Object.entries(data.others ? data.others : "Not Available")}</small></p >
                                    </div >
                                </div >
                            </div >
                        </div >
                    </div >
                    <div class="modal-footer">
                        <button type="button" class="btn-close d-block mx-auto" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                </div >
            </div >

    `
    let myModal = new bootstrap.Modal(document.getElementById('modal'), {
        keyboard: false
    })
    myModal.show()

};
