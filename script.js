let unfinishedBooks = JSON.parse(localStorage.getItem('unfinishedBooks')) || [];
let finishedBooks = JSON.parse(localStorage.getItem('finishedBooks')) || [];


function renderBooks() {
  const unfinishedBooksList = document.getElementById('unfinished-books');
  const finishedBooksList = document.getElementById('finished-books');

  unfinishedBooksList.innerHTML = '';
  finishedBooksList.innerHTML = '';

  unfinishedBooks.forEach(book => {
    const li = document.createElement('li');
    li.textContent = `${book.title} - ${book.author}`;
    const moveButton = document.createElement('button');
    moveButton.textContent = 'Selesai';
    moveButton.addEventListener('click', function() {
      moveBook(book, 'unfinished', 'finished');
    });
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Hapus';
    deleteButton.addEventListener('click', function() {
      deleteBook(book, 'unfinished');
    });
    li.appendChild(moveButton);
    li.appendChild(deleteButton);
    unfinishedBooksList.appendChild(li);
  });

  finishedBooks.forEach(book => {
    const li = document.createElement('li');
    li.textContent = `${book.title} - ${book.author}`;
    const moveButton = document.createElement('button');
    moveButton.textContent = 'Belum Selesai';
    moveButton.addEventListener('click', function() {
      moveBook(book, 'finished', 'unfinished');
    });
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Hapus';
    deleteButton.addEventListener('click', function() {
      deleteBook(book, 'finished');
    });
    li.appendChild(moveButton);
    li.appendChild(deleteButton);
    finishedBooksList.appendChild(li);
  });


  localStorage.setItem('unfinishedBooks', JSON.stringify(unfinishedBooks));
  localStorage.setItem('finishedBooks', JSON.stringify(finishedBooks));
}


function addBook() {
  const title = document.getElementById('book-title').value;
  const author = document.getElementById('book-author').value;

  if (title && author) {
    const newBook = { title, author };
    unfinishedBooks.push(newBook);
    renderBooks();
    document.getElementById('book-title').value = '';
    document.getElementById('book-author').value = '';
  }
}

function moveBook(book, fromShelf, toShelf) {
  if (fromShelf === 'unfinished') {
    const index = unfinishedBooks.indexOf(book);
    if (index !== -1) {
      unfinishedBooks.splice(index, 1);
      finishedBooks.push(book);
      renderBooks();
    }
  } else if (fromShelf === 'finished') {
    const index = finishedBooks.indexOf(book);
    if (index !== -1) {
      finishedBooks.splice(index, 1);
      unfinishedBooks.push(book);
      renderBooks();
    }
  }
}

function deleteBook(book, shelf) {
  if (shelf === 'unfinished') {
    const index = unfinishedBooks.indexOf(book);
    if (index !== -1) {
      unfinishedBooks.splice(index, 1);
      renderBooks();
    }
  } else if (shelf === 'finished') {
    const index = finishedBooks.indexOf(book);
    if (index !== -1) {
      finishedBooks.splice(index, 1);
      renderBooks();
    }
  }
}

renderBooks();