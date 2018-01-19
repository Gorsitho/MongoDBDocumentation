show dbs //Muestra las base de datos

use mycustomers // Crea una base de datos

db.createUser({  // Crea un usuario con sus roles.
  user: 'fazt',
  pwd: '123',
  roles: ['readWrite', 'dbAdmin']
});

db.createCollection('customers') // Crea una coleccion de datos.(tabla)

show collections // Muestra las colecciones

db.customers.insert( // Inserta los datos en la coleccion.
  {
    firstName: 'Isaac',
    lastName: 'Asimov'
  }
)

db.customers.find() // find() es para buscar algun dato.
  .pretty()   // pretty() lo muestra de una manera mas legible.


  //JSON = Javascript Object Notation
db.customers.insert(  // Inserta datos en cantidad en forma de array.
  [                         
    {firstName: 'Joe', lastName: 'MacMillan'},
    {firstName: 'Elena', lastName: 'Soraya'},
    {firstName: 'Isaac', lastName: 'delahaye'}
  ]
)

db.customers.find();
db.customers.find({firstName: 'Joe'}, {firstName: true, lastName:false}); // Que tenga primer nombre pero no segundo nombre.

// replace or update data
db.customers.update(  //Actualiza, siendo el primer parametro el objeto a buscar y el segundo lo que quiere actualizar
  {firstName: 'Joe'}, //query
  {
    firstName: 'Joe',
    lastName: 'MacMillan',
    gender: 'male'
  } // new data
);

// add a new date
db.customers.update( // Agrega un nuevo dato sin tener que actualizarlo todo.
  {firstName: 'Isaac'},
  {
    $set: {gender: 'male'}
  }
);

db.customers.update(
  {firstName: 'Isaac'},
  {
    $set: {age: 45}
  }
);
db.customers.update( //Incrementa en 5 la edad del objeto buscado.
  {firstName: 'Isaac'},
  {
    $inc: {age: 5}
  }
);

db.customers.update( // Elimina un dato, siendo 1=true.
  {firstName: 'Isaac'},
  {
    $unset:  {age: 1}
  }
)

db.customers.update( // Actualizar los datos, si no encuentra el dato lo crea.
  {firstName: 'Elena'} ,
  {
    firstName: 'Elena',
    lastName: 'Soraya'
  },
  { upsert: true}
)

db.customers.update(  // Renombrar .
  {firstName: 'Isaac'},
  {
    $rename: {"gender": "sex"}
  }
)

db.customers.remove({firstName: "Isaac"}) // Remueve un dato.
db.customers.remove({firstName: "Isaac"}, {justOne: true}) // Remueve un dato, pero solo el primero que encuentre.

db.customers.find({firstName: "Elena"});
db.customers.find({$or: [{firstName: "Elena"}, {firstName: "Isaac"}]}) // Busca a Elena o Issac
db.customers.fid({gender: "male"}) // Error?

db.customers.find({age: {$lt: 40}}) // Busca entre x<40
db.customers.find({age: {$gt: 40}}) // Busca entre x>40
db.customers.find({age: {$gt: 30, $lt: 90}}); // Entre dos rangos.

db.customers.insert({
  firstName: 'Isaac', 
  address:{ // Adress es un objeto con notaciones.
  city:"Londres"
  }
})

db.customers.find({"address.city": "Boston"})  // Busca address con la notacion city y con su valor Boston.

db.customers.find({name: {$regex: 'ston'}}); // Busca algun objeto con una particula "ston" como valor.

// sorting
db.customers.find().sort({lastName: 1}); // Organiza de menor a mayor.
db.customers.find().sort({lastName: -1}); // Organiza de mayor a menor.
db.customers.find().count() // Muestra la cantidad de datos.
db.customers.find({gender: "male"}).count()
db.customers.find().limit(4) // Solo busca con un limite de 4 datos.
db.customers.find().limit(4).sort({lastName: -1}) // Limite de 4 datos organizandolo de mayor a menor.

db.customers.find().forEach(function(doc) { // Muestra todos los datos, con una impresion.
  print("Customer Name" + doc.firstName);
});
