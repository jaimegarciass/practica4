var express = require('express');//uso de interfaces html
var bodyParser = require('body-parser');//manejo de formularios
var pg = require("pg");//Modulo para conectar con la base de datos

var app = express();
app.use(bodyParser());

var conString = "pg://postgres:passwordc@localhost:5432/Practica4";
var client = new pg.Client(conString);
client.connect();


//LOGIN ADMINISTRADOR GET
//============================================================================================================================
app.get('/loginAdmin', function(req, res){

  var html = '<html> <body> <style>body{background-color: #D8D8D8;}h1{color: #08088A;}</style>'+
              '<form action="/Admin" method="post">' +
                '<h1>Administracion</h1> '+
                '<p>Nombre:' +
                '<input type="text" name="nom"  />' +
                '<br>'+
	        'Contrasenia:' +
                '<input type="password" name="pas"  />' +
                '<button type="submit">Iniciar sesion</button></p>' +
             '</form>'+
            '</body> </html>';
               
  res.send(html);
});
//============================================================================================================================



//LOGIN USUARIO GET
//============================================================================================================================
app.get('/loginUsuario', function(req, res){

  var html = '<html> <body> <style>body{background-color: #D8D8D8;}h1{color: #08088A;}</style>'+
              '<form action="/Usuario" method="post">' +
                '<h1>Usuarios</h1> '+
                '<p>Nombre:' +
                '<input type="text" name="nom"  />' +
                '<br>'+
                'Contrasenia:' +
                '<input type="password" name="pas"  />' +
                '<button type="submit">Iniciar sesion</button></p>' +
             '</form>'+
            '</body> </html>';

  res.send(html);
});
//============================================================================================================================


//ADMINISTRACION GET
//============================================================================================================================
app.get('/Admin', function(req, res){
  var nombre = req.body.nom;
  var html = '<html> <body> <style>body{background-color: #D8D8D8;}h1{color: #08088A;}</style>'+
              'Hola ' + nombre + '.<br>' +
              '<br><b>ABC Buses</b><br><br>'+
              '<a href="/busesA">Agregar Buses</a><br>'+
              '<a href="/busesB">Eliminar Buses</a><br>'+
              '<a href="/busesC">Asignar ruta a bus</a><br>'+
              '<a href="/tipoBA">Nuevo tipo de bus</a><br>'+
              '<a href="/tipoBB">Eliminar tipo de bus</a><br>'+
             '</body> </html>';
  res.send(html);
});
//===========================================================================================================================


//GET CREAR BUSES
//============================================================================================================================
app.get('/busesA', function(req, res){

  var query = client.query("select b.bus Bus, t.nombre Tipo, b.ruta Ruta  from bus b, tipo_bus t where b.tipo_bus = t.tipo_bus");
  	query.on("row", function (row, result) {
        result.addRow(row);
   });

    query.on("end", function (result) {

        var tablaBuses = '<table border="1" style="width:100%">'+
                          '<tr>'+
                           '<th>Bus</th>'+
                           '<th>Tipo</th>'+
                           '<th>Ruta</th>'+
                          '</tr>';

        var l = result.rows.length;
        for (i = 0; i < l; i++){
            tablaBuses += '<tr>'+
                    '<td>' + result.rows[i].bus + '</td>'+
                    '<td>' + result.rows[i].tipo + '</td>'+
                    '<td>' + result.rows[i].ruta + '</td>'+
                   '</tr>';
        }

        var html ='<html> <body> <style>body{background-color: #D8D8D8;}h1{color: #08088A;}</style>'+
                   '<form action="/busesA" method="post">' +
                      'Bus:' +
                      '<input type="text" name="bus"/>' +
                      '<br>' +
                  'Tipo:' +
                      '<input type="text" name="tipo"/>' +
                      '<br>' +
                      '<button type="submit">Agregar</button>' +
                   '</form>'+'<p>'+tablaBuses+'</p>'+
                  '</body> </html>';;

        res.send(html);
    });
});
//============================================================================================================================


//GET ELIMINAR BUSES
//============================================================================================================================
app.get('/busesB', function(req, res){

  var html = '<html> <body> <style>body{background-color: #D8D8D8;}h1{color: #08088A;}</style>'+
              '<form action="/busesB" method="post">' +
               'Bus:' +
               '<input type="text" name="bus"/>' +
               '<br>' +
               '<button type="submit">Eliminar</button>' +
              '</form>'+
             '</body> </html>';
               
  res.send(html);
});
//============================================================================================================================



//GET CONSULTAR
//============================================================================================================================
app.get('/FACO', function(req, res){

  var html = '<html> <body> <style>body{background-color: #D8D8D8;}h1{color: #08088A;}</style>'+
              '<form action="/FACO2" method="post">' +
               'Factura:' +
               '<input type="text" name="fac"/>' +
               '<br>' +
               '<button type="submit">Consultar</button>' +
              '</form>'+
             '</body> </html>';

  res.send(html);
});
//============================================================================================================================




//GET MODIFICAR BUSES
//============================================================================================================================
app.get('/busesC', function(req, res){
//  var bus = req.body.bus;
//  var ruta = req.body.ruta;
//  client.query("UPDATE BUS SET ruta = $1 WHERE bus = $2", [ruta, bus]);
//  client.query("INSERT INTO LOG_BUS(bus, ruta, fecha) VALUES ($1, $2, now());", [bus, ruta]);
  var query = client.query("SELECT b.bus, b.ruta, b.fecha FROM LOG_BUS B");
        query.on("row", function (row, result) {
            result.addRow(row);
       });

        query.on("end", function (result) {

            var tablaLog = '<table border="1" style="width:100%">'+
                              '<tr>'+
                               '<th>Bus</th>'+
                               '<th>Ruta</th>'+
                               '<th>Fecha</th>'+
                              '</tr>';

            var l = result.rows.length;
            for (i = 0; i < l; i++){
                tablaLog += '<tr>'+
                        '<td>' + result.rows[i].bus + '</td>'+
                        '<td>' + result.rows[i].ruta + '</td>'+
                        '<td>' + result.rows[i].fecha + '</td>'+
                       '</tr>';
            }

            var html = '<html> <body> <style>body{background-color: #D8D8D8;}h1{color: #08088A;}</style>'+
                        '<form action="/busesC" method="post">' +
                         'Bus:' +
                         '<input type="text" name="bus"/>' +
                         '<br>' +
                         'Ruta:' +
                         '<input type="text" name="ruta"/>' +
                         '<br>' +
                         '<button type="submit">Submit</button>' +
                        '</form>'+ '<p>' + tablaLog + '</p>'+
                       '</body> </html>';

            res.send(html);
        });
});
//============================================================================================================================


//GET VIAJESC
//============================================================================================================================
app.get('/viajesC', function(req, res){

  var boleto = req.body.boleto;
  var nit = req.body.nit;
  var cliente = req.body.cliente;
  var kilos = req.body.kilos;

  //client.query("UPDATE BUS SET ruta = $1 WHERE bus = $2", [ruta, bus]);
  //client.query("INSERT INTO LOG_BUS(bus, ruta, fecha) VALUES ($1, $2, now());", [bus, ruta]);
  var query = client.query("select v.boleto, p2.direccion Origen, p.direccion Destino, v.kilometros from viaje v, punto p, punto p2 where v.punto_destino = p.punto AND v.punto_origen = p2.punto");
        query.on("row", function (row, result) {
            result.addRow(row);
       });

        query.on("end", function (result) {

            var tablaBol = '<table border="1" style="width:100%">'+
                              '<tr>'+
                               '<th>Boleto</th>'+
                               '<th>Origen</th>'+
                               '<th>Destino</th>'+
                               '<th>Kilometros</th>'+
                              '</tr>';

            var l = result.rows.length;
            for (i = 0; i < l; i++){
                tablaBol += '<tr>'+
                        '<td>' + result.rows[i].boleto + '</td>'+
                        '<td>' + result.rows[i].origen + '</td>'+
                        '<td>' + result.rows[i].destino + '</td>'+
                        '<td>' + result.rows[i].kilometros + '</td>'+
                       '</tr>';
            }

            var html = '<html> <body> <style>body{background-color: #D8D8D8;}h1{color: #08088A;}</style>'+
                        '<form action="/viajesC" method="post">' +
                         'Boleto:' +
                         '<input type="text" name="boleto"/>' +
                         '<br>' +
                         'NIT:' +
                         '<input type="text" name="nit"/>' +
                         '<br>' +
                         'Cliente:' +
                         '<input type="text" name="cliente"/>' +
                         '<br>' +
                         'Kilometros:' +
                         '<input type="text" name="kilometros"/>' +
                         '<br>' +
                         '<button type="submit">Pagar</button>' +
                        '</form>'+ '<p>' + tablaBol + '</p>'+
                       '</body> </html>';

            res.send(html);
        });
});

//GET RESERVACION
//============================================================================================================================
app.get('/RESV', function(req, res){
    var html = '<html> <body> <style>body{background-color: #D8D8D8;}h1{color: #08088A;}</style>'+
                '<form action="/RESV2" method="post">' +
                 'Boleto:' +
                 '<input type="text" name="boleto"/>' +
                 '<br>' +
                 'Cliente:' +
                 '<input type="text" name="cliente"/>' +
                 '<br>' +
                 'Ruta:' +
                 '<input type="text" name="ruta"/>' +
                 '<br>' +
                 'Origen:' +
                 '<input type="text" name="origen"/>' +
                 '<br>' +
                 'Destino' +
                 '<input type="text" name="destino"/>' +
                 '<br>' +
                 'Kilometros' +
                 '<input type="text" name="kilometros"/>' +
                 '<br>' +
                 '<button type="submit">Reservar</button>' +
                '</form>'+
               '</body> </html>';

    res.send(html);
});
//============================================================================================================================



//-------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------POST------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------

//POST RESERVACION
//============================================================================================================================
app.post('/RESV2', function(req, res){

    var boleto = req.body.boleto;
    var cliente = req.body.cliente;
    var ruta = req.body.ruta;
    var origen = req.body.origen;
    var destino = req.body.destino;
    var kilometros = req.body.kilometros;

    client.query("INSERT INTO VIAJE(boleto, ruta_origen, punto_origen, ruta_destino, punto_destino, cliente, kilometros) values($1, $2, $3, $2, $4, $5, $6)", [boleto, ruta, origen, destino, cliente, kilometros]);


    var html = '<html> <body> <style>body{background-color: #D8D8D8;}h1{color: #08088A;}</style>'+
                '<form action="/RESV2" method="post">' +
                 'Boleto:' +
                 '<input type="text" name="boleto"/>' +
                 '<br>' +
                 'Cliente:' +
                 '<input type="text" name="cliente"/>' +
                 '<br>' +
                 'Ruta:' +
                 '<input type="text" name="ruta"/>' +
                 '<br>' +
                 'Origen:' +
                 '<input type="text" name="origen"/>' +
                 '<br>' +
                 'Destino' +
                 '<input type="text" name="destino"/>' +
                 '<br>' +
                 'Kilometros' +
                 '<input type="text" name="kilometros"/>' +
                 '<br>' +
                 '<button type="submit">Reservar</button>' +
                '</form>'+
               '</body> </html>';

    res.send(html);
});
//============================================================================================================================



//POST CREAR BUS
//============================================================================================================================
app.post('/busesA', function(req, res){
  var bus = req.body.bus;
  var tipo = req.body.tipo;
  client.query("INSERT INTO BUS(bus, tipo_bus) values($1, $2)", [bus, tipo]);
  var query = client.query("select b.bus Bus, t.nombre Tipo, b.ruta Ruta  from bus b, tipo_bus t where b.tipo_bus = t.tipo_bus");
      query.on("row", function (row, result) {
          result.addRow(row);
     });

      query.on("end", function (result) {

          var tablaBuses = '<table border="1" style="width:100%">'+
                            '<tr>'+
                             '<th>Bus</th>'+
                             '<th>Tipo</th>'+
                             '<th>Ruta</th>'+
                            '</tr>';

          var l = result.rows.length;
          for (i = 0; i < l; i++){
              tablaBuses += '<tr>'+
                      '<td>' + result.rows[i].bus + '</td>'+
                      '<td>' + result.rows[i].tipo + '</td>'+
                      '<td>' + result.rows[i].ruta + '</td>'+
                     '</tr>';
          }

          var html ='<html> <body> <style>body{background-color: #D8D8D8;}h1{color: #08088A;}</style>'+
                     '<form action="/busesA" method="post">' +
                        'Bus:' +
                        '<input type="text" name="bus"/>' +
                        '<br>' +
                    'Tipo:' +
                        '<input type="text" name="tipo"/>' +
                        '<br>' +
                        '<button type="submit">Agregar</button>' +
                     '</form>'+'<p>'+tablaBuses+'</p>'+
                    '</body> </html>';;

          res.send(html);
      });
});
//============================================================================================================================


//POST FACO2
//============================================================================================================================
app.post('/FACO2', function(req, res){
  var fac = req.body.fac;
  var query = client.query("SELECT F.detalle, P.direccion lugar, D.costo costo FROM DETALLE_VIAJE D, PUNTO P, DETALLE F WHERE D.punto = P.punto AND D.boleto = F.boleto ORDER BY (D.costo)");
      query.on("row", function (row, result) {
          result.addRow(row);
     });

      query.on("end", function (result) {

          var tablaD = '<table border="1" style="width:100%">'+
                            '<tr>'+
                             '<th>Factura</th>'+
                             '<th>Lugar</th>'+
                             '<th>Costo</th>'+
                            '</tr>';

          var l = result.rows.length;
          for (i = 0; i < l; i++){
              tablaD += '<tr>'+
                      '<td>' + result.rows[i].detalle + '</td>'+
                      '<td>' + result.rows[i].lugar + '</td>'+
                      '<td>' + result.rows[i].costo + '</td>'+
                     '</tr>';
          }

          var html ='<html> <body> <style>body{background-color: #D8D8D8;}h1{color: #08088A;}</style>'+
                  '<form action="/FACO2" method="post">' +
                     'Factura:' +
                     '<input type="text" name="fac"/>' +
                     '<br>' +
                     '<button type="submit">Consultar</button>' +
                     '</form>'+'<p>'+tablaD+'</p>'+
                    '</body> </html>';;

          res.send(html);
      });
});
//============================================================================================================================



//POST ELIMINAR BUS
//============================================================================================================================
app.post('/busesB', function(req, res){
  var bus = req.body.bus;
  client.query("DELETE FROM BUS WHERE bus = $1", [bus]);
  var html = '<html> <body> <style>body{background-color: #D8D8D8;}h1{color: #08088A;}</style>'+
              '<form action="/busesB" method="post">' +
               'Bus:' +
               '<input type="text" name="bus"/>' +
               '<br>' +
               '<button type="submit">Eliminar</button>' +
              '</form>'+
             '</body> </html>';

  res.send(html);
});
//============================================================================================================================


//POST MODIFICAR BUS
//============================================================================================================================
app.post('/busesC', function(req, res){
  var bus = req.body.bus;
  var ruta = req.body.ruta;
  client.query("UPDATE BUS SET ruta = $1 WHERE bus = $2", [ruta, bus]);
  client.query("INSERT INTO LOG_BUS(bus, ruta, fecha) VALUES ($1, $2, now());", [bus, ruta]);
  var query = client.query("SELECT b.bus, b.ruta, b.fecha FROM LOG_BUS B");
        query.on("row", function (row, result) {
            result.addRow(row);
       });

        query.on("end", function (result) {

            var tablaLog = '<table border="1" style="width:100%">'+
                              '<tr>'+
                               '<th>Bus</th>'+
                               '<th>Ruta</th>'+
                               '<th>Fecha</th>'+
                              '</tr>';

            var l = result.rows.length;
            for (i = 0; i < l; i++){
                tablaLog += '<tr>'+
                        '<td>' + result.rows[i].bus + '</td>'+
                        '<td>' + result.rows[i].ruta + '</td>'+
                        '<td>' + result.rows[i].fecha + '</td>'+
                       '</tr>';
            }

            var html = '<html> <body> <style>body{background-color: #D8D8D8;}h1{color: #08088A;}</style>'+
                        '<form action="/busesC" method="post">' +
                         'Bus:' +
                         '<input type="text" name="bus"/>' +
                         '<br>' +
                         'Ruta:' +
                         '<input type="text" name="ruta"/>' +
                         '<br>' +
                         '<button type="submit">Submit</button>' +
                        '</form>'+ '<p>' + tablaLog + '</p>'+
                       '</body> </html>';

            res.send(html);
        });
});
//============================================================================================================================


//POST PAGAR VIAJE
//============================================================================================================================
app.post('/viajesC', function(req, res){

  var boleto = req.body.boleto;
  var nit = req.body.nit;
  var cliente = req.body.cliente;
  var kilos = req.body.kilometros;

  client.query("INSERT INTO FACTURA(fecha, nit, cliente, total) VALUES(now(), $1, $2, $3)", [nit, cliente, kilos*2]);
  client.query("INSERT INTO DETALLE(boleto, costo) VALUES($1, $2)", [boleto, kilos*2]);
  var query = client.query("select v.boleto, p2.direccion Origen, p.direccion Destino, v.kilometros from viaje v, punto p, punto p2 where v.punto_destino = p.punto AND v.punto_origen = p2.punto");
        query.on("row", function (row, result) {
            result.addRow(row);
       });

        query.on("end", function (result) {

            var tablaBol = '<table border="1" style="width:100%">'+
                              '<tr>'+
                               '<th>Boleto</th>'+
                               '<th>Origen</th>'+
                               '<th>Destino</th>'+
                               '<th>Kilometros</th>'+
                              '</tr>';

            var l = result.rows.length;
            for (i = 0; i < l; i++){
                tablaBol += '<tr>'+
                        '<td>' + result.rows[i].boleto + '</td>'+
                        '<td>' + result.rows[i].origen + '</td>'+
                        '<td>' + result.rows[i].destino + '</td>'+
                        '<td>' + result.rows[i].kilometros + '</td>'+
                       '</tr>';
            }

            var html = '<html> <body> <style>body{background-color: #D8D8D8;}h1{color: #08088A;}</style>'+
                        '<form action="/viajesC" method="post">' +
                         'Boleto:' +
                         '<input type="text" name="boleto"/>' +
                         '<br>' +
                         'NIT:' +
                         '<input type="text" name="nit"/>' +
                         '<br>' +
                         'Cliente:' +
                         '<input type="text" name="cliente"/>' +
                         '<br>' +
                         'Kilometros:' +
                         '<input type="text" name="kilometros"/>' +
                         '<br>' +
                         '<button type="submit">Pagar</button>' +
                        '</form>'+ '<p>' + tablaBol + '</p>'+
                       '</body> </html>';

            res.send(html);
        });
});
//============================================================================================================================


//POST ADMIN
//============================================================================================================================
app.post('/Admin', function(req, res){
  var nombre = req.body.nom;
  var html = '<html> <body> <style>body{background-color: #D8D8D8;}h1{color: #08088A;}</style>'+
              'Hola ' + nombre + '.<br>' +
              '<br><b>ABC Buses</b><br><br>'+
              '<a href="/busesA">Agregar Buses</a><br>'+
              '<a href="/busesB">Eliminar Buses</a><br>'+
              '<a href="/busesC">Asignar ruta a bus</a><br>'+
              '<a href="/tipoBA">Nuevo tipo de bus</a><br>'+
              '<a href="/tipoBB">Eliminar tipo de bus</a><br>'+
             '</body> </html>';;
  res.send(html);
});
//============================================================================================================================


//POST USUARIO
//============================================================================================================================
app.post('/Usuario', function(req, res){
  var nombre = req.body.nom;
  var html = '<html> <body> <style>body{background-color: #D8D8D8;}h1{color: #08088A;}</style>'+
              'Bienvenido ' + nombre + '!<br>' +
              '<br><b>Viajes</b><br><br>'+
              '<a href="/viajesC">Pagar boleto</a><br>'+
              '<a href="/FACO">Consulta de viajes</a><br>'+
              '<a href="/RESV">Crear reservacion</a><br>'+
             '</body> </html>';;
  res.send(html);
});
//============================================================================================================================


app.listen(3000);
