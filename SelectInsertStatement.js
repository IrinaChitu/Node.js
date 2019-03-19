var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

// Create connection to database
var config = {
    userName: '',
    password: '',
    server: 'letsdoitserver.database.windows.net',
    options: {
        database: 'myDB',
        encrypt: true
    }
}

var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected');
        selectStatement();
        insertStatement();
    }
});

function selectStatement() {
    request = new Request("select * from loginTable", function(err) {
        if (err) {
            console.log(err);}
    });
    var result = "";
    request.on('row', function(columns) {
        columns.forEach(function(column) {
            result += column.value + " ";
        });
        console.log(result);
        result = "";
    });
    request.on('done', function(rowCount, more) {
        console.log(rowCount + ' rows returned');
    });
    connection.execSql(request);
}

function insertStatement() {
    request = new Request("INSERT INTO loginTable (UserName, Password) VALUES('nic_irina', 'psw')", function(err) {
        if (err) {
            console.log(err);}
    });

    request.addParameter('UserName', TYPES.NVarChar);
    request.addParameter('Password', TYPES.NVarChar);

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                console.log(column.value);
            }
        });
    });
    connection.execSql(request);
}