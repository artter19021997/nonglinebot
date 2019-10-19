const { Client } = require('pg');

const client = new Client({
  connectionString:'postgres://hrpgiaziigzlob:fdbfd8262a54b8140fb235c78c26e07df7edfc1cf30b6dcd278b71a20cf959f8@ec2-184-73-232-93.compute-1.amazonaws.com:5432/da574miessq8sl',
  ssl: true,
});


const  CTB = 'CREATE TABLE question(id SERIAL PRIMARY KEY,question VARCHAR NOT NULL);'
 const IDB = "INSERT INTO question (name) VALUES ($1)"
 
// // client.query(CTB,(err, res) => {
// //   if (err) throw err;
// //   for (let row of res.rows) {
// //     console.log(JSON.stringify(row));
// //   }
// //   client.end();
// // });
//  เปิดโค้ตตรงนี้เพื่อสร้าง database

let createData=()=>{
    client.connect();
    client.query(CTB,(err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
          console.log(JSON.stringify(row));
        }
        client.end();
      });
}

// let addData=(params)=>{
//     client.connect();
//     client.query(IDB,[params],(err, res) => {
//         if (err) throw err;
//         for (let row of res.rows) {
//           console.log(JSON.stringify(row));
//         }
//         client.end();
//       });
// }
// let  getData=()=>{
//     client.connect();
//     let result = []
//      client.query(SDB,(err, res) => {
//         result.push(res.rows)
//         if (err) throw err;
//         for (let row of res.rows) {
            
//           console.log(JSON.stringify(row));
//         }
       
//         console.log(`this is = ${result}`);
//       });
//       client.end();
    
     
//       return result
    
      
// }
// createData()
module.exports= {
    clientDB:client
}