//alert('hi');
//console.log('hello');

//Challenge 1 below, your age in days.
function ageInDays() {
  var birthYear = prompt('What Year Were You Born?');
  var ageInDias = (2018 - birthYear) * 365;
  var h1 = document.createElement('h1');
  var textAnswer = document.createTextNode('You are ' + ageInDias + ' days old');
  h1.setAttribute('id', 'ageInDays');
  h1.appendChild(textAnswer);
  document.getElementById('flex-box-result').appendChild(h1);
  console.log(ageInDias);
}

function reset() {
  document.getElementById('ageInDays').remove();

}

//Challenge 2 below, cat generator GIF
function generateCat() {
  var image = document.createElement('img');
  var div = document.getElementById('flex-cat-gen');
  image.src = "https://78.media.tumblr.com/tumblr_m0lbulQH4r1r94e9jo1_250.gif"
  div.appendChild(image);
}
