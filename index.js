const express = require("express");
const line = require("@line/bot-sdk");
const bodyParser = require('body-parser')
const address = require("./address");
const query = require("./query");
const capital = require("./capital");
const withdraw = require("./withdraw");
const fund = require("./fund");
let cors = require('cors')
const request = require("request");
require("dotenv").config();
const { clientDB } = require("./connect");
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}))
const data = {
  id: null,
  del:null
};
const IDB = "INSERT INTO question (question) VALUES ($1)";
const SDB = "select * from question order by id ASC";
clientDB.connect();
app.get("/data", (req, res) => {
  let result = [];
  clientDB.query(SDB, (err, resDB) => {
    result.push(resDB.rows);
    data.id = JSON.stringify(resDB.rows);
    if (err) throw err;
    for (let row of resDB.rows) {
      console.log(JSON.stringify(row));
    }
    res.status(200).json(result)
    console.log(`this is = ${result}`);
  });
});

app.post("/delete", (req, res) => {
  // req.header("Content-Type", "application/json");
   // console.log('====================================');
   // //console.log(this value =${delparams});
   // console.log('====================================');
   clientDB.query(`DELETE FROM question WHERE id in (${req.body.data})`, (err, resDB) => {
     if (err) throw err;
     else{
         if (resDB.rowCount) {
             res.send(`Delete success`);
         }
         else{
                 res.send(JSON.stringify(resDB))
         }
     }
     
    
   });
   // console.log(req.body);
   
   // res.send(req.body)
   
   
 });
 app.delete('/del', (req, res) => {
   console.log(req.query.id);
   clientDB.query(`DELETE FROM question WHERE id=(${req.query.id})`, (err, resDB) => {
     if (err) throw err;
     else{
         if (resDB.rowCount) {
             res.send(`Delete success`);
         }
         else{
                 res.send(JSON.stringify(resDB))
         }
     }
     
    
   });
 })
 
 
 app.get('/insert', (req, res) => {
   clientDB.query(IDB, ["กด้กด"], (err, resDB) => {
     if (err) throw err;
     for (let row of resDB.rows) {
       console.log(JSON.stringify(row));
     }
     //  clientDB.end();
   });
   res.send('GET request to the homepage')
 })

const config = {
  channelAccessToken:"8FC6j5lCQ+Pv/zVBEdg884W4Ttf5zhEF6jAMuL4L22ltOb7JZUDb6HiCYMbf+Zr0Nl3f7zWhsev4f72kTxYSTBtZFmeUzLqAYG0ft1CYdArM9GsbsoeqSg6Wjh5UZsfrJp17znmS7psLuNcT6UFURwdB04t89/1O/w1cDnyilFU=",
  channelSecret: "03154e6c1a360487b99ee9f162cc7691"
};

const client = new line.Client(config);

app.post("/webhook", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then(result =>
    res.json(result)
  );
});

function handleEvent(event) {
  console.log(event);
  if (event.type === "message" && event.message.type === "text") {
    handleMessageEvent(event);
  } else {
    return Promise.resolve(null);
  }
}

async function handleMessageEvent(event) {
  // let msg = {
  //   type: "text",
  //   text: "dffd"
  // };

  let eventText = event.message.text.toLowerCase();

   if (eventText === "สอบถาม") {
    // console.dir();
    let msg = {
      type: "text",
      text: 'ท่านสามารถสอบถามข้อมูลจากบอทได้โดยพิมพ์หมายเลขเพื่อสอบถามได้ดังนี้\n(1)ที่อยู่\n(2)ค่าเช่า\n(3)สิ่งอำนวยความสะดวก\n(4)รูปภาพ\n(5)เบอร์โทร\nเลือกหัวข้อในการสอบถามได้เลยค่ะ'
    };
      return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "สอบถามหน่อยครับ") {
    let msg = {
      type: "text",
      text: 'ท่านสามารถสอบถามข้อมูลจากบอทได้โดยพิมพ์หมายเลขเพื่อสอบถามได้ดังนี้\n(1)ที่อยู่\n(2)ค่าเช่า\n(3)สิ่งอำนวยความสะดวก\n(4)รูปภาพ\n(5)เบอร์โทร\nเลือกหัวข้อในการสอบถามได้เลยค่ะ'
    };
      return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "สอบถามหน่อยค่ะ") {
    let msg = {
      type: "text",
      text: 'ท่านสามารถสอบถามข้อมูลจากบอทได้โดยพิมพ์หมายเลขเพื่อสอบถามได้ดังนี้\n(1)ที่อยู่\n(2)ค่าเช่า\n(3)สิ่งอำนวยความสะดวก\n(4)รูปภาพ\n(5)เบอร์โทร\nเลือกหัวข้อในการสอบถามได้เลยค่ะ'
    };
      return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "ถามไรหน่อย") {
    let msg = {
      type: "text",
      text: 'ท่านสามารถสอบถามข้อมูลจากบอทได้โดยพิมพ์หมายเลขเพื่อสอบถามได้ดังนี้\n(1)ที่อยู่\n(2)ค่าเช่า\n(3)สิ่งอำนวยความสะดวก\n(4)รูปภาพ\n(5)เบอร์โทร\nเลือกหัวข้อในการสอบถามได้เลยค่ะ'
    };
      return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "สวัสดีครับ") {
    let msg = {
      type: "text",
      text: 'ท่านสามารถสอบถามข้อมูลจากบอทได้โดยพิมพ์หมายเลขเพื่อสอบถามได้ดังนี้\n(1)ที่อยู่\n(2)ค่าเช่า\n(3)สิ่งอำนวยความสะดวก\n(4)รูปภาพ\n(5)เบอร์โทร\nเลือกหัวข้อในการสอบถามได้เลยค่ะ'
    };
      return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "สวัสดีค่ะ") {
    let msg = {
      type: "text",
      text: 'ท่านสามารถสอบถามข้อมูลจากบอทได้โดยพิมพ์หมายเลขเพื่อสอบถามได้ดังนี้\n(1)ที่อยู่\n(2)ค่าเช่า\n(3)สิ่งอำนวยความสะดวก\n(4)รูปภาพ\n(5)เบอร์โทร\nเลือกหัวข้อในการสอบถามได้เลยค่ะ'
    };
      return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "สวัสดี") {
    let msg = {
      type: "text",
      text: 'ท่านสามารถสอบถามข้อมูลจากบอทได้โดยพิมพ์หมายเลขเพื่อสอบถามได้ดังนี้\n(1)ที่อยู่\n(2)ค่าเช่า\n(3)สิ่งอำนวยความสะดวก\n(4)รูปภาพ\n(5)เบอร์โทร\nเลือกหัวข้อในการสอบถามได้เลยค่ะ'
    };
      return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "หวัดดี") {
    let msg = {
      type: "text",
      text: 'ท่านสามารถสอบถามข้อมูลจากบอทได้โดยพิมพ์หมายเลขเพื่อสอบถามได้ดังนี้\n(1)ที่อยู่\n(2)ค่าเช่า\n(3)สิ่งอำนวยความสะดวก\n(4)รูปภาพ\n(5)เบอร์โทร\nเลือกหัวข้อในการสอบถามได้เลยค่ะ'
    };
      return client.replyMessage(event.replyToken, msg);
  } else if (eventText.replace(/\s+/g, '').slice(0,6)==="delete") { 
   
   let delparams = eventText.slice(6, eventText.length);
 //  data.id=delparams
  clientDB.query("DELETE FROM question WHERE id=$1", [delparams], (err, resDB) => {
       if (err)
         throw err;
       else {
         if (resDB.rowCount) {
           data.del = "Delete success";
           let msg = {
             type: "text",
             text: data.del
           };
           request({
             method: "POST",
             uri: "https://notify-api.line.me/api/notify",
             header: {
               "Content-Type": "application/x-www-form-urlencoded"
             },
             auth: {
               bearer: "JZ0NMocuEk8rtF1f60LG0NlZXLBJzIeAKIypMedfIwb" //token
             },
             form: {
               message: `this is eventext=${data.del}` //ข้อความที่จะส่ง 
             }
           }, (err, httpResponse, body) => {
             if (err) {
               console.log(err);
             }
             else {
               console.log(body);
             }
           });
           return client.replyMessage(event.replyToken, msg);
         }
         else {
           data.del = "Delete error";
           let msg = {
             type: "text",
             text: data.del
           };
           request({
             method: "POST",
             uri: "https://notify-api.line.me/api/notify",
             header: {
               "Content-Type": "application/x-www-form-urlencoded"
             },
             auth: {
               bearer: "JZ0NMocuEk8rtF1f60LG0NlZXLBJzIeAKIypMedfIwb" //token
             },
             form: {
               message: `this is eventext=${data.del}` //ข้อความที่จะส่ง
             }
           }, (err, httpResponse, body) => {
             if (err) {
               console.log(err);
             }
             else {
               console.log(body);
             }
           });
           return client.replyMessage(event.replyToken, msg);
         }
       }
     });
   
  
     
  } else if (eventText === "report") {
    let result = [];
    clientDB.query(SDB, (err, resDB) => {
      if (err) throw err;
      for (let row of resDB.rows) {
        result.push(row);
        console.log(JSON.stringify(row));
      }
      data.id = JSON.stringify(result);
      console.log(`this is = ${result}`);
      request(
        {
          method: "POST",
          uri: "https://notify-api.line.me/api/notify",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          auth: {
            bearer: "JZ0NMocuEk8rtF1f60LG0NlZXLBJzIeAKIypMedfIwb" //token
          },
          form: {
            message: `this is eventext=${data.id}` //ข้อความที่จะส่ง
          }
        },
        (err, httpResponse, body) => {
          if (err) {
            console.log(err);
          } else {
            console.log(body);
          }
        }
      );
  
      let msg = {
        type: "text",
        text: data.id
      };
       return client.replyMessage(event.replyToken, msg);
    });
 
  } else if (eventText === "1") {
    let msg = {
      type: "text",
      text: '102 หมู่ 12 ตำบล กำแพงแสน อำเภอ กำแพงแสน จังหวัด นคปฐม 73140'
    };
      return client.replyMessage(event.replyToken, msg);
  }  else if (eventText === "2") {
    let msg = {
      type: "text",
      text: '>> Pack 1 << \n'+ 
      ' ค่าเช่าเดือนละ 4500 บาท (แอร์, ทีวี, กล่องจาน, เครื่องทำน้ำอุ่น, เฟอร์นิเจอร์, เตียงคู่)'+
      'ค่าน้ำ เหมา 100 บาท '+
      'ค่าไฟ 8 บาท\n'+
      '>> Pack 2 << '+
      'ค่าเช่าเดือนละ 5000 บาท (แอร์, ทีวี, กล่องจาน, เครื่องทำน้ำอุ่น, เฟอร์นิเจอร์, เตียงคู่, ตู้เย็น, ไมโครเวฟ)'+
      'ค่าน้ำ เหมา 100 บาท '+
      'ค่าไฟ 8 บาท'
    };
      return client.replyMessage(event.replyToken, msg);
  }  else if (eventText === "3") {
    let msg = {
      type: "text",
      text: 'สำหรับสิ่งอำนวยความสะดวกของทางหอพักจะมีอาทิเช่น ลิฟต์ เครื่องซักผ้า ตู้กดน้ำ เครื่องปริ้น ที่นั่งอ่านหนังสือ ที่จอดรถ อีกทั้งยังมีคีย์การ์ดและระบบสแกนลายนิ้วมือด้วยค่ะ'
    };
      return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "4") {
    let msg = {
      type: "text",
      text: 'สามารถชมรูปภาพหอพักและห้องพักได้ที่เพจ face book คลิกลิ้งค์ด้านหลังได้เลยค่ะ \n'+
      'https://www.facebook.com/%E0%B8%AB%E0%B8%AD%E0%B8%9E%E0%B8%B1%E0%B8%81%E0%B9%81%E0%B8%A1%E0%B9%80%E0%B8%99%E0%B8%AD%E0%B8%A3%E0%B9%8C-%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A5%E0%B8%B1%E0%B8%A2%E0%B9%80%E0%B8%81%E0%B8%A9%E0%B8%95%E0%B8%A3%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%95%E0%B8%A3%E0%B9%8C-%E0%B8%81%E0%B8%B3%E0%B9%81%E0%B8%9E%E0%B8%87%E0%B9%81%E0%B8%AA%E0%B8%99-790681051046302/'
    };
      return client.replyMessage(event.replyToken, msg);

  }
  else if (eventText === "5") {
    let msg = {
      type: "text",
      text: 'ติดต่อโทรศัพท์ : 0871712116'
    };
     return client.replyMessage(event.replyToken, msg);
  } else if (eventText === "คุยกับบอท") {
    let msg = {
      type: "text",
      text:
      "ท่านสามารถสอบถามข้อมูลจากบอทได้โดยพิมพ์หมายเลขเพื่อสอบถามได้ดังนี้\n(1)ที่อยู่\n(2)ค่าเช่า\n(3)สิ่งอำนวยความสะดวก\n(4)รูปภาพ\n(5)เบอร์โทร\nเลือกหัวข้อในการสอบถามได้เลยค่ะ"
    };
     return client.replyMessage(event.replyToken, msg);
  }  else {
    let msg = {
      type: "text",
      text:
        "ท่านสามารถสอบถามข้อมูลจากบอทได้โดยพิมพ์หมายเลขเพื่อสอบถามได้ดังนี้\n(1)ที่อยู่\n(2)ค่าเช่า\n(3)สิ่งอำนวยความสะดวก\n(4)รูปภาพ\n(5)เบอร์โทร\nเลือกหัวข้อในการสอบถามได้เลยค่ะ"
    };
    if (eventText !== "hello, world" && eventText !== null) {
      //   clientDB.connect();
      clientDB.query(IDB, [eventText], (err, resDB) => {
        if (err) throw err;
        for (let row of resDB.rows) {
          console.log(JSON.stringify(row));
        }
        //  clientDB.end();
      });
    }
     return client.replyMessage(event.replyToken, msg);
  }


}

app.set("port", process.env.PORT || 5000);

app.listen(app.get("port"), function() {
  console.log("run at port", app.get("port"));
});
