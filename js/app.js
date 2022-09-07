// function: Get all categories from API. 
const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(response => response.json())
    .then(data => displayCategory(data.data.news_category))
    .catch(error => console.error(error))
}

// function: Showing all news categories.
const displayCategory = categories => {
    const newsCategoryField = document.getElementById('news-catagory-field')
    categories.forEach(element => {
        //console.log(element);
        const newsCategoryNamesDiv = document.createElement('div');
        newsCategoryNamesDiv.innerHTML = ` 
           <button onclick="getNewsId('${element.category_id}')" type="button" class="btn-style btn-hover"><h6>${element.category_name}</h6></button> 
       ` 
       
       newsCategoryField.appendChild(newsCategoryNamesDiv);
    });
}

loadCategory();


// function: for get single category by id. 
const getNewsId = news_id => {
    spinner(true); // start spinner
    const url = `https://openapi.programming-hero.com/api/news/category/${news_id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayNewsDetail(data.data))
    .catch(error => console.error(error))
}

// function: for showing news
const displayNewsDetail = newsArray =>{
    displayTotalNews(newsArray); // calling display total for getting total number of news.

    const displayNewsFiled = document.getElementById('display-news-field');
    displayNewsFiled.innerHTML = '';
    
    newsArray.sort((a, b) => b.total_view - a.total_view); // array elements shorted 
    
    newsArray.forEach(news =>{
        const displayElementDiv = document.createElement('div');
        displayElementDiv.innerHTML = `
        <div class="row mt-5 border-0 flex-column flex-sm-column flex-md-row flex-lg-row rounded bg-light p-4">
            <div class="col-4">
                <img src="${news.thumbnail_url}" class="img-fluid rounded" alt="">
            </div>
            <div class="col-8">
                <h4 class="">${news.title}</h4>
                <p>${news.details.slice(0,200)+'...'}</p>
                <div class="row flex-column flex-sm-column flex-md-row flex-lg-row align-items-sm-center">
                    <div class="col-4">
                        <div class="row align-items-center flex-column flex-sm-column flex-md-row flex-lg-row">
                            <div class="col-4">
                                <img class="img-header m-0 p-0" src="${news.author.img}" width="30" height="30" alt="">
                            </div>
                            <div class="col-8 m-0 p-0">
                                <h6>${news.author.name? news.author.name:'No name Found'}</h6>
                                <p>${news.author.published_date? news.author.published_date: 'no date found'}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-4"><i class="fa-solid fa-eye"></i>${news.total_view? news.total_view: 'Not found'}</div>
                    <div class="col-4"><button type="button" onclick="getModalNewsId('${news._id}')" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">See more</button></div>
                </div>
            </div>
        </div>
        `

        displayNewsFiled.appendChild(displayElementDiv);
    })

    spinner(false); // stop spinner 
}


// function: get news modal by id.
const getModalNewsId = id => {
    const url =  `https://openapi.programming-hero.com/api/news/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayNewsModal(data.data))
    .catch(error => console.error(error))
    
}


// function: showing news modal.
const displayNewsModal = dataArray =>{

    dataArray.forEach(element => {
        const modalTile = document.getElementById('staticBackdropLabel');
        modalTile.innerText = element.title;

        const modalImgAndText = document.getElementById('modal-text-and-thumbnail');
        modalImgAndText.innerHTML = `
            <img src=${element.thumbnail_url}>
            <p class="pt-3">${element.details}</p>
        `;

        const modalFooter = document.getElementById('modal-footer');
        modalFooter.innerHTML = `
        <div class="">
        <img class="img-header m-0 p-0" src="${element.author.img}" width="30" height="30" alt="">
        </div>
        <div class="m-0 p-0">
        <h6>${element.author.name? element.author.name:'No name Found'}</h6>
        <p>${element.author.published_date? element.author.published_date: 'no date found'}</p>
        </div>
        `;
    })
}