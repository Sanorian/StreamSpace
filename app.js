const xhr = new XMLHttpRequest();
xhr.open('POST', 'localhost:8080/posts');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function() {
  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    console.log(data);
  } else {
    console.error('Error:', xhr.statusText);
  }
};
xhr.onerror = function() {
  console.error('Error:', xhr.statusText);
};
xhr.send();
fetch('http://localhost:8080/posts')
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });