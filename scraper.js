const fetch = require('node-fetch');
const cheerio = require('cheerio');

const url = 'https://www.imdb.com/find?s=tt&ttype=ft&ref_=fn_ft&q=';

function searchMovies(searchTerm) {
    return fetch(`${url}${searchTerm}`)
    .then(response => response.text())
    .then(body => {
        const movies = [];
        const $ = cheerio.load(body);
        $('.findResult').each(function(i, element) {
            const $element = $(element);
            const $image = $element.find('td a img');
            const $title = $element.find('td.result_Text a');
            
            //const href = $title.attr('href').match(/title\/(.*)\//)[1];
            
            const movie = {
                image: $image.attr('src'),
                title: $title.text()
            };
            movies.push(movie);
        });
        return movies;
    });
}

module.exports = {
    searchMovies
};