fetch('https://openapi.programming-hero.com/api/phones?search=${searchText}')
.then(res=>res.json())
.then(res=> console.log(res));