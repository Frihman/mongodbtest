//'http://localhost:3000/query'
//'https://pixmongodbtest.herokuapp.com/query'

var url = 'https://pixmongodbtest.herokuapp.com/query';

fetch(url)
.then (response => response.json())
.then(data => {
    
    data.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('entry');
        const markup = ` 
                    <p>${item.firstName} ${item.lastName}</p>
                    <br>
        `;

    li.innerHTML = markup;
    document.getElementById('entries').appendChild(li);
    });
});