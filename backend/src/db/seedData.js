const seededBooks = [
  {
    title: '1984',
    author: 'George Orwell',
    price: 14.99,
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg',
    description: 'Big Brother is watching, but at least the prose is sharp.',
    stock: 9,
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 13.49,
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg',
    description: 'Champagne, chaos, and one very mysterious neighbor.',
    stock: 7,
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    price: 15.99,
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg',
    description: 'Courtroom drama with heart and an unforgettable moral compass.',
    stock: 12,
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    price: 11.99,
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg',
    description: 'Love, manners, and world-class side-eye.',
    stock: 10,
  },
  {
    title: 'Moby-Dick',
    author: 'Herman Melville',
    price: 16.5,
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9781503280786-L.jpg',
    description: 'One captain, one whale, and absolutely no chill.',
    stock: 6,
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    price: 17.99,
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg',
    description: 'Small hero, big adventure, excellent snacks.',
    stock: 14,
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    price: 18.99,
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg',
    description: 'Sand, spice, and political drama on hard mode.',
    stock: 8,
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    price: 12.75,
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9780316769488-L.jpg',
    description: 'Teen angst, iconic voice, zero fake energy.',
    stock: 11,
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    price: 14.25,
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9780060850524-L.jpg',
    description: 'A future that is efficient, shiny, and deeply alarming.',
    stock: 5,
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    price: 13.95,
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg',
    description: 'Follow your dreams, and maybe talk to the desert.',
    stock: 13,
  },
  {
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    price: 19.5,
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg',
    description: 'A history of us, featuring many questionable choices.',
    stock: 9,
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 18.25,
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg',
    description: 'Tiny changes, huge gains, fewer excuses.',
    stock: 16,
  },
  {
    title: 'The Little Prince',
    author: 'Antoine de Saint-Exupery',
    price: 10.99,
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg',
    description: 'A tiny traveler with giant emotional damage.',
    stock: 7,
  },
  {
    title: 'The Book Thief',
    author: 'Markus Zusak',
    price: 14.5,
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9780375842207-L.jpg',
    description: 'Words, war, and a narrator you did not expect.',
    stock: 0,
  },
  {
    title: 'The Kite Runner',
    author: 'Khaled Hosseini',
    price: 15.5,
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9781594631931-L.jpg',
    description: 'Friendship, regret, and one very windy symbol.',
    stock: 6,
  },
  {
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    price: 18.75,
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9780756404741-L.jpg',
    description: 'Magic school, music, and a dangerously confident narrator.',
    stock: 4,
  },
  {
    title: 'Educated',
    author: 'Tara Westover',
    price: 16.25,
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg',
    description: 'Memoir level-up unlocked through pure determination.',
    stock: 8,
  },
  {
    title: 'The Martian',
    author: 'Andy Weir',
    price: 17.5,
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9780553418026-L.jpg',
    description: 'Science, sarcasm, and potatoes in space.',
    stock: 0,
  },
  {
    title: 'Circe',
    author: 'Madeline Miller',
    price: 15.75,
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9780316556347-L.jpg',
    description: 'Mythology, witchcraft, and a very strong personal brand.',
    stock: 5,
  },
  {
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    price: 19.25,
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9780593135204-L.jpg',
    description: 'Save the world with math, duct tape, and panic.',
    stock: 10,
  },
];

function seededOrderDates(count) {
  const dates = [];
  const now = new Date();
  const start = new Date(now.getFullYear() - 2, now.getMonth(), 1);

  for (let i = 0; i < count; i += 1) {
    const d = new Date(start);
    d.setDate(d.getDate() + Math.floor((now - start) / (1000 * 60 * 60 * 24) * Math.random()));
    dates.push(d);
  }

  return dates.sort((a, b) => a - b);
}

module.exports = {
  seededBooks,
  seededOrderDates,
};
