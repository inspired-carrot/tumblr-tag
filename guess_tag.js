let jsonResults;
const list = document.getElementById('list-data');
const tagArray = ['RACOON', 'FLORAL', 'HEDGEHOG', 'CORGI', 'COMPUTER', 'SAUNA', 'PEOPLE', 'IT', 'APPLE', 'PEAR', 'MANGO', 'ANIME', 'WEEB', 'NERD'];
const displayArray = ['CENDOL', 'SINGAPORE', 'MALAYSIA', 'CITY'];
var tags = document.querySelectorAll('.tag');
var pos, tagName, trueTag, correctTag;
var points = 0;
const userScore = document.getElementById('points');



for (let i = 0; i < tags.length; i++){
	tags[i].onclick = function(event){

		// Check if the selected tag is the correct or incorrect tag //
		if (checkTag(tags[i].innerHTML)){

			// Get new tag //
			pos  = randomTag(tagArray);
			// Replace tag label content //
			tags[i].innerHTML = tagArray[pos];
			// Place tag name in array //
			displayArray[i] = tags[i].innerHTML;
			// Remove tag name in our stored array of tags //
			tagArray.splice(pos, 1);
			// Remove displayed tags before displaying new guessed tag to user //
			removePrevTag();
			// Randomly search for new tag based on the 4 tags in displayArray //
			getTaggedPhotos(displayArray[randomNum()]);
			// Increment in score point //
			points += 1;
			userScore.innerHTML = points;
			console.log("Next true tag (T): ", displayArray[trueTag])

			checkEnd(tagArray, points);

		}
		else {

			// Replace the tag that the user selected //
			pos = randomTag(tagArray)
			tags[i].innerHTML =  tagArray[pos];
			displayArray[i] = tags[i].innerHTML;
			tagArray.splice(pos, 1);
			// Remove displayed tags before displaying new guessed tag to user //			
			removePrevTag();
			// Get new tags on random and display to user //
			getTaggedPhotos(displayArray[randomNum()]);
			// Reshuffle display of tumblr api //
			console.log("Next true tag (F): ", displayArray[trueTag])

			checkEnd(tagArray, points);

		}

	}
}

function removePrevTag(){
	while (list.firstChild){
		list.removeChild(list.firstChild);
	}
}

function checkTag(tagString){

	if (tagString == displayArray[trueTag]){
		window.alert("You selected the right tag!");
		return true;
	}
	else {
		window.alert("Oops ! You picked the wrong tag!");
		return false;
	}

}

// randomNum function is used to random between the 4 tags to be searched for in tumblr //
function randomNum(){
	var random = Math.floor(Math.random() * 4);
	trueTag = random;
	return random;}

// randomTag function is used to get a random position of our new tag when user clicks on a tag //
// so we can provide a new tag //
function randomTag(tagArray){
	var randomNum = Math.floor(Math.random() * tagArray.length);
	return randomNum;}

function checkEnd(tagArray, points){
	if (tagArray.length == 0){
		window.alert("Congratulations ! You completed the game with a total of " + points + " points!")
		return;
	}
}

function getTaggedPhotos(tagName){
	fetch('https://api.tumblr.com/v2/tagged?tag=' + tagName + '&api_key=OpKDQ7x4YjBhZqPdhiuXjWBYYB0LbRd8cARfHqa2YZnHL2j8SL')

		.then(function(response){
			return response.json();
		})
		.then(function(result){
			jsonResults = result
			const items = result.response;
			for (let i = 0; i < items.length; i++){
				const item = items[i]
				if (item.photos != undefined){
					const imgSrc = item.photos[0].original_size.url;
					const img = document.createElement('img');
					img.src = imgSrc;

					const li = document.createElement('li');
					li.appendChild(img)
					list.appendChild(li)
				}
			}
		})
		.catch(function(error){
			window.alert("Error detected ! Please come back again while we try to recover from this issue !")
			console.log('Error: ', error)
		})
	}

getTaggedPhotos(displayArray[randomNum()]);
correctTag = displayArray[trueTag];
console.log("True tag: ", displayArray[trueTag]);















