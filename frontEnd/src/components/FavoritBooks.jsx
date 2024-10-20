import { Divider, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import Category from './CategoryBook';

const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    publisher: "Charles Scribner's Sons",
    year: 1925,
    coverUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPj1vUFsc1tTIjxqbX1bwUxOYFNL8_9KNmOSOfhRCtAu7Bqz68I9ASkfDowE93RWfbDJM&usqp=CAU"
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    publisher: "J.B. Lippincott & Co.",
    year: 1960,
    coverUrl: "https://m.media-amazon.com/images/I/81aY1lxk+9L._AC_UF1000,1000_QL80_.jpg"
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    publisher: "Secker & Warburg",
    year: 1949,
    coverUrl: "https://m.media-amazon.com/images/I/61NAx5pd6XL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    publisher: "T. Egerton",
    year: 1813,
    coverUrl: "https://m.media-amazon.com/images/M/MV5BYzNkMjRmZGMtODg1Ni00MjIxLWI4MTYtOGEwM2YyMmZiMjUzXkEyXkFqcGc@._V1_.jpg"
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    publisher: "Little, Brown and Company",
    year: 1951,
    coverUrl: "https://cdn.britannica.com/94/181394-050-2F76F7EE/Reproduction-cover-edition-The-Catcher-in-the.jpg"
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    publisher: "George Allen & Unwin",
    year: 1937,
    coverUrl: "https://m.media-amazon.com/images/I/71S7Z+YhJFL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    genre: "Dystopian",
    publisher: "Ballantine Books",
    year: 1953,
    coverUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKVTgiTFN1cnWLWlpJqgSX3-9ELLSPSl11fQ&s"
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Dystopian",
    publisher: "Chatto & Windus",
    year: 1932,
    coverUrl: "https://m.media-amazon.com/images/I/91D4YvdC0dL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    title: "Moby-Dick",
    author: "Herman Melville",
    genre: "Adventure",
    publisher: "Harper & Brothers",
    year: 1851,
    coverUrl: "https://m.media-amazon.com/images/I/61PBBKyZ1rL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    title: "War and Peace",
    author: "Leo Tolstoy",
    genre: "Historical Fiction",
    publisher: "The Russian Messenger",
    year: 1869,
    coverUrl: "https://m.media-amazon.com/images/I/91teiIZ5vwL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    publisher: "George Allen & Unwin",
    year: 1954,
    coverUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6D1xdceTr1qkGNw238JUqvZPVBXwayjCsoaZtT8Ech6CascCfg9h8JEtaJCNU7QUjZhM&usqp=CAU"
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Adventure",
    publisher: "HarperOne",
    year: 1988,
    coverUrl: "https://m.media-amazon.com/images/I/61HAE8zahLL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    genre: "Philosophical Fiction",
    publisher: "Lippincott's Monthly Magazine",
    year: 1890,
    coverUrl: "https://m.media-amazon.com/images/M/MV5BMTY5ODc1NjU5N15BMl5BanBnXkFtZTcwMTUyNDg3Mg@@._V1_.jpg"
  }
];

function FavoritBooks(props) {
  const theme = useTheme()
  return (
    <Stack
      sx={{
        width: '100%',
        margin: '10px auto',
      }}
    >
      <Stack
        sx={{
          margin: '0 auto',
          width: '95%',
          borderRadius: '10px',
          padding: '10px 20px',
          boxShadow: theme.boxShadow.main,
        }}
      >
        <Typography
          variant='h6'
          sx={{ color: theme.text.primary.main, fontWeight: 600 }}
        >Sách yêu thích</Typography>

        <Divider />

        <Category bookList={books} isHomePage={false} />

      </Stack >
    </Stack >
  );
}

export default FavoritBooks;