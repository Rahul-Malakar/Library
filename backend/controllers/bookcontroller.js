const Book = require('../models/book');
const statuscode = require('../statuscode')

const book_index = (req, res) => {
  Book.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { title: 'Books', books: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const bookDetails = async (req, res) => {
  const id = req.params.id;
  const book = await Book.findById(id);
  try{
    if(book){
      res.status(success).render('details', { book, title: `Details of book : ${book.title}` });
    }
  }
  catch(err){
    res.status(failed)
  }
  
};

const book_create_get = (req, res) => {
  res.render('create', { title: 'Create Book' });
};

const book_create_post = (req, res) => {
  const book = new Book(req.body);
  book
    .save()
    .then((result) => {
      console.log(res.statusCode);
      res.redirect('/books');
    })
    .catch((err) => {
      console.log(res.statusCode);
      console.log(err);
    });
};

const book_delete = (req, res) => {
  const id = req.params.id;
  Book.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/books' });
    })
    .catch((err) => console.log(err));
};

const book_update_get = (req, res) => {
  const book = Book.findById(req.params.id);
  book.then((result)=>{
    res.render('update',{title:'update',book:result})
  })
  .catch((err)=>{
    console.log(err);
  })

};

const book_update_patch = (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  
  Book.findByIdAndUpdate(id, req.body, {new:true}).then((result)=>{
    res.redirect(`/books/${id}`)
  })
  .catch((err)=>{
    console.log(err);
  })
};

module.exports = {
  book_index,
  bookDetails,
  book_create_get,
  book_create_post,
  book_delete,
  book_update_get,
  book_update_patch
};