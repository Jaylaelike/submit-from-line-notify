
const express = require("express");
const app = express();

//use .env
require('dotenv').config();


const axios = require("axios");

// use cors

const cors = require("cors");

app.use(cors());
const url_line_notification = "https://notify-api.line.me/api/notify";

app.listen(process.env.PORT || 5500, () => {
  console.log(`Example app listening ...`);
});

//post data to line notify
app.get("/electric", async (req, res) => {
  try {
    const response = await axios.get(process.env.ELECTRIC_DOWN_URL);
    const data = response.data;
    // const results = JSON.parse(data);
    const station = data[0].station;
    const typestaion = data[0].typestaion;
    const facility = data[0].facility;
    const startdate = data[0].startdate;
    const enddate = data[0].enddate;
    const duration = data[0].duration;
    const detail = data[0].detail;
    const users = data[0].users;
    const downtime = data[0].downtime;
    console.log(station);
    // fetch post to line notify
    await axios.post(
      url_line_notification,
      {
        message: `🔔 มีการเพิ่มข้อมูลไฟฟ้าดับ
    📈 \n สถานี : ${station}
    🔔 ประเภทสถานี : ${typestaion}
    ✅ Facility : ${facility}
    📅 วันที่เริ่มต้น : ${startdate}
    📅 วันที่สิ้นสุด : ${enddate}
    ⏰ ระยะเวลา : ${duration}
    📔 รายละเอียด : ${detail}
    👷‍♂️ ผู้บันทึก : ${users}
    📡 การออกอากาศ : ${downtime}
    `,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${process.env.LINE_NOTIFY_THOKEN}`,
        },
      }
    );

    res.send("Send Line Notify Electrics is Successfully.");
  } catch (error) {
    console.error(error);
  }
});

app.get("/nt", async (req, res) => {
  try {
    const response = await axios.get(process.env.NT_DOWN_URL);
    const data = response.data;
    // const results = JSON.parse(data);
    const station = data[0].station;
    const typestaion = data[0].typestaion;
    const facility = data[0].facility;
    const startdate = data[0].startdate;
    const enddate = data[0].enddate;
    const duration = data[0].duration;
    const detail = data[0].detail;
    const users = data[0].users;
    const downtime = data[0].downtime;
    console.log(station);
    // fetch post to line notify
    await axios.post(
      url_line_notification,
      {
        message: `🔔 มีการเพิ่มข้อมูลเครือข่ายดับ
    📈 \n สถานี : ${station}
    🔔 ประเภทสถานี : ${typestaion}
    ✅ Facility : ${facility}
    📅 วันที่เริ่มต้น : ${startdate}
    📅 วันที่สิ้นสุด : ${enddate}
    ⏰ ระยะเวลา : ${duration}
    📔 รายละเอียด : ${detail}
    👷‍♂️ ผู้บันทึก : ${users}
    📡 การออกอากาศ : ${downtime}
    `,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${process.env.LINE_NOTIFY_THOKEN}`,
        },
      }
    );

    res.send("Send Line Notify NT is Successfully.");
  } catch (error) {
    console.error(error);
  }
});

