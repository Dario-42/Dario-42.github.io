const button = document.getElementById('Button');
let count = 0;

button.addEventListener('click', () => {
   count++;
   document.getElementById('text').innerText = "clicks: " + count;
});