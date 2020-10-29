//DOM Variables

const quoteContainer = document.getElementById('quote-container');
const quote = document.getElementById('quote');
const author = document.getElementById('author');
const twitter = document.getElementById('twitter');
const newQuote = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//show loading
function loading() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

function complete() {
	if (!loader.hidden) {
		quoteContainer.hidden = false;
		loader.hidden = true;
	}
}

// get quote from API
async function getQuote() {
	loading();
	const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
	try {
		const response = await fetch(proxyUrl + apiUrl);
		const data = await response.json();
		quote.innerText = data.quoteText;
		//if author is blank, add unknown
		if (data.quoteAuthor === '') {
			author.innerText = 'Unknown'
		} else {
			author.innerText = data.quoteAuthor;
		}
		//stop loader and show quote
		complete();
	} catch (error) {
		getQuote();
		console.log('whoops, no quote!', error);

	}
}

//twitter functionality

function tweetQuote() {
	const quoteText = quote.innerText;
	const authorText = author.innerText;
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText} - ${authorText}`;
	window.open(twitterUrl, '_blank');
}

//event listener
twitter.addEventListener('click', tweetQuote);
newQuote.addEventListener('click', getQuote);


// on load
getQuote();