const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: () => 'Homepage',
  },
  {
    method: '*',
    path: '/',
    handler: () => 'Cannot access',
  },
  {
    method: 'GET',
    path: '/about',
    handler: () => 'About page',
  },
  // {
  //   method: '*',
  //   path: '/about',
  //   handler: (request, h) => { return 'Cannot access'; },
  // },
  {
    method: 'GET',
    path: '/hello/{name?}',
    handler: (request) => {
      const { name = 'stranger' } = request.params;
      const { lang } = request.query;

      if (lang === 'id') {
        return `Hai, ${name}!`;
      }

      return `Hello, ${name}!`;
    },
  },
  {
    method: 'POST',
    path: '/login',
    handler: (request) => {
      const { username, password } = request.payload;
      return `Welcome ${username} and ${password}! `;
    },
  },
  {
    method: 'POST',
    path: '/user',
    handler: (request, h) => h.response('created').code(201),
  },
  {
    method: '*',
    path: '/{any*}',
    handler: () => 'Not found',
  },
  // notes
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;
