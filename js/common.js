// function: showing total number of news
const displayTotalNews = newsArray => {
    const totalNews = newsArray.length;

    const totalNewsField = document.getElementById('total-news-field');
    totalNewsField.innerHTML = '';

    const totalNewsDiv = document.createElement('div');
    if(totalNews > 0) {
        totalNewsDiv.innerHTML = `
            <h6 class='bg-light p-3 rounded'>${newsArray.length} news found</h6>
        `;
        totalNewsField.appendChild(totalNewsDiv);
    } else {
        totalNewsDiv.innerHTML = `
            <h6 class='bg-light p-3 rounded'>No news found</h6>
        `;
        totalNewsField.appendChild(totalNewsDiv);
    }
}

// function: for spinner.
const spinnerField = document.getElementById('spinner-field');
const spinner = isTrue => {
    if(isTrue) {
        spinnerField.classList.remove('d-none');
    }else {
        spinnerField.classList.add('d-none');
    }
}