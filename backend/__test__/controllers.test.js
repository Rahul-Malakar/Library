const {
  bookDetails,
  book_create_post,
} = require('../controllers/bookcontroller');
const Book = require('../models/book');

jest.mock('../models/book');

it('should send statuscode 200 when book details gained', async () => {

    const req = {
        params: {
          id: 'a1',
        },
      };
      
      const res = {
        status: jest.fn((x) => x),
        render: jest.fn((x) => x),
      };

    
  Book.findById.mockImplementationOnce(() => ({
    title: 'temptitle',
    author: 'tempauthor',
    pages: 123,
  }));
  await bookDetails(req, res);
  expect(res.status).toHaveBeenCalledWith(200); 
});

describe('book_create_post', () => {
  it('should create a new book and redirect to /books', async () => {
    const req = {
      body: { title: 'Test Book', author: 'Test Author', pages: 100 }
    };
    const res = {
      redirect: jest.fn(),
    };

    const saveMock = jest
      .fn()
      .mockResolvedValueOnce(undefined);
    Book.mockImplementation(() => ({ save: saveMock }));

    await book_create_post(req, res);

    // Assertions
    expect(typeof req.body.pages).toBe("number");
    expect(Book).toHaveBeenCalledWith(req.body);
    expect(saveMock).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/books');
  });

  it('should handle errors when creating a book', async () => {
    const req = {
      body: {
        title: 'Test Book', author: 'Test Author', pages: '100'
      },
    };
    const res = {
      redirect: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const saveMock = jest.fn().mockRejectedValueOnce(new Error('Some error'));
    Book.mockImplementation(() => ({ save: saveMock }));

    await book_create_post(req, res);

    // Assertions
    expect(Book).toHaveBeenCalledWith(req.body);
    expect(saveMock).toHaveBeenCalled();
  });


});
