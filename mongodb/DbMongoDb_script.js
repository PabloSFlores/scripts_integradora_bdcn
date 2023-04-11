//String de acceso
//mongodb+srv://admin:admin@lego.lldgz34.mongodb.net/?retryWrites=true&w=majority

db.getCollectionNames()

db.users.find()

//Indices de datos de usuarios
//Únicos
db.users.createIndexes([
    {name: 1},
    {email: 1},
    {status: 1}
])
//Compuestos
db.users.createIndexes([
    {name: 1, surname: 1},
    {email: 1, password: 1},
    {email: 1, status: 1}
])

//Indices de datos de publicaciones
//Únicos
db.users.createIndexes([
    {'posts.title': 1},
    {'posts.rating': 1},
    {'posts.price': 1}
])
//Compuestos
db.users.createIndexes([
    {'posts.title': 1, 'posts.status': 1},
    {'posts.rating': 1, 'posts.price': 1},
    {'posts.price': 1,'posts.status': 1}
])

//Indices de datos de productos
//Únicos
db.users.createIndexes([
    {'posts.product.name': 1},
    {'posts.product.details': 1},
    {'posts.product.vip_points': 1}
])
//Compuestos
db.users.createIndexes([
    {'posts.product.name': 1, 'posts.product.status': 1},
    {'posts.product.details': 1, 'posts.product.pieces': 1},
    {'posts.product.min_age': 1, 'posts.product.max_age': 1}
])

db.users.getIndexes()