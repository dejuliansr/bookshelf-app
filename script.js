let unfinishedBooks = JSON.parse(localStorage.getItem('unfinishedBooks')) || [];
let finishedBooks = JSON.parse(localStorage.getItem('finishedBooks')) || [];

function renderBooks() {
  const unfinishedBooksList = document.getElementById('unfinished-books');
  const finishedBooksList = document.getElementById('finished-books');

  unfinishedBooksList.innerHTML = '';
  finishedBooksList.innerHTML = '';

  unfinishedBooks.forEach(book => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="book-info">
        <strong>${book.title}</strong><br>
        <span>Penulis: ${book.author}</span><br>
        <span>Tahun: ${book.year}</span>
      </div>
      <div class="book-actions">
        <button class="btn-move" onclick="moveBook(${book.id}, 'unfinished', 'finished')">Selesai</button>
        <button class="btn-delete" onclick="deleteBook(${book.id}, 'unfinished')">Hapus</button>
      </div>
    `;
    unfinishedBooksList.appendChild(li);
  });

  finishedBooks.forEach(book => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="book-info">
        <strong>${book.title}</strong><br>
        <span>Penulis: ${book.author}</span><br>
        <span>Tahun: ${book.year}</span>
      </div>
      <div class="book-actions">
        <button class="btn-move" onclick="moveBook(${book.id}, 'finished', 'unfinished')">Belum Selesai</button>
        <button class="btn-delete" onclick="deleteBook(${book.id}, 'finished')">Hapus</button>
      </div>
    `;
    finishedBooksList.appendChild(li);
  });

  localStorage.setItem('unfinishedBooks', JSON.stringify(unfinishedBooks));
  localStorage.setItem('finishedBooks', JSON.stringify(finishedBooks));
}

function addBook() {
  const title = document.getElementById('book-title').value;
  const author = document.getElementById('book-author').value;
  const year = parseInt(document.getElementById('book-year').value);

  if (title && author && year) {
    const newBook = {
      id: Date.now(),
      title,
      author,
      year,
      isComplete: false
    };
    unfinishedBooks.push(newBook);
    renderBooks();
    document.getElementById('book-title').value = '';
    document.getElementById('book-author').value = '';
    document.getElementById('book-year').value = '';
  }
}

function moveBook(bookId, fromShelf, toShelf) {
  if (fromShelf === 'unfinished') {
    const index = unfinishedBooks.findIndex(b => b.id === bookId);
    if (index !== -1) {
      const book = unfinishedBooks.splice(index, 1)[0];
      book.isComplete = true;
      finishedBooks.push(book);
      renderBooks();
    }
  } else if (fromShelf === 'finished') {
    const index = finishedBooks.findIndex(b => b.id === bookId);
    if (index !== -1) {
      const book = finishedBooks.splice(index, 1)[0];
      book.isComplete = false;
      unfinishedBooks.push(book);
      renderBooks();
    }
  }
}

function deleteBook(bookId, shelf) {
  if (shelf === 'unfinished') {
    const index = unfinishedBooks.findIndex(b => b.id === bookId);
    if (index !== -1) {
      unfinishedBooks.splice(index, 1);
      renderBooks();
    }
  } else if (shelf === 'finished') {
    const index = finishedBooks.findIndex(b => b.id === bookId);
    if (index !== -1) {
      finishedBooks.splice(index, 1);
      renderBooks();
    }
  }
}

renderBooks();
