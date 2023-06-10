let mysql = require('mysql')
let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sync_contacts"
});
connection.connect(function(err){
    if(err){
        console.log("not connected",err, sqlmessage)
    }
    else{
        console.log("connected")
    }
});
module.exports = {connection};
/*connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO contacts (userid,name,mobileno) VALUES ('2','amit','8839246785')";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });*/


