const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { Resend } = require("resend");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

const resend = new Resend(process.env.RESEND_API_KEY);

// Create MySQL pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// DB Connection Test
db.getConnection((err, conn) => {
  if (err) {
    console.error("❌ MySQL Connection Failed:", err);
  } else {
    console.log("✅ MySQL Connected Successfully");
    conn.release();
  }
});

// REGISTER API
app.post("/api/register", (req, res) => {
  const data = req.body;

  const query = `
    INSERT INTO webinar_registrations
    (firstName, lastName, email, phone, linkedIn, role,
     college, degree, branch, passingYear, location,
     organization, experience, workLocation)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.firstName,
    data.lastName,
    data.email,
    data.phone,
    data.linkedIn,
    data.role,

    data.college || null,
    data.degree || null,
    data.branch || null,
    data.passingYear || null,
    data.location || null,

    data.organization || null,
    data.experience || null,
    data.workLocation || null,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.log("❌ Insert Error:", err);
      return res.status(500).json({ error: "Database insert failed" });
    }

    // You said you have correct `id` in DB
    const id = result.insertId;

    // Fetch inserted user
    db.query("SELECT * FROM webinar_registrations WHERE id = ?", [id], async (err, rows) => {
      if (err) {
        console.log("❌ Fetch Error:", err);
        return res.status(500).json({ error: "User fetch failed" });
      }

      const user = rows[0];
      const userEmail = user.email;
      const { firstName } = user;


      const teamHeadEmail = process.env.TEAM_HEAD_EMAIL;
      const senderEmail = process.env.SENDER_EMAIL;

      console.log("📨 Preparing emails...");
      console.log("User Email:", userEmail);
      console.log("Team Head Email:", teamHeadEmail);

      try {
        // Sending TWO EMAILS at same time
        const responses = await Promise.allSettled([
          resend.emails.send({
            from:`MeleteNova <${process.env.SENDER_EMAIL}>`,
            to: userEmail,
            subject: "🎉 Registration Successful - Cloud Xcelerate with AWS",
            html: `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f7f8fa; padding: 40px;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); overflow: hidden;">
          
          
          <div style="background-color: #002855; padding: 20px; text-align: center;">
            <img src="https://meletenova.com/assets/logo2.png" alt="Meletenova Logo" style="height: 60px;" />
          </div>

          
          <div style="padding: 30px; text-align: left; color: #333;">
            <h2 style="color: #002855;">Thank You, ${firstName}!</h2>
            <p style="font-size: 16px; line-height: 1.6;">
              You have successfully registered for the <b>Cloud Xcelerate with AWS</b>.
            </p>
            <p style="font-size: 16px; line-height: 1.6;">
              Date: 17-Dec-2025<br>
              Time: 10 AM - 11:30 AM<br>
              Webinar link will be shared soon.
            </p>
            <p style="font-size: 16px; line-height: 1.6;">
              If you have any queries, feel free to contact us at
              <a href="mailto:${process.env.QUERIES_MAIL}" style="color: #002855; text-decoration: none;"><b>${process.env.QUERIES_MAIL}</b></a>.
            </p>
             <div style="margin-top:5px;">
               <span style="font-size: 15px; display: block; margin: 0;">Warm regards,</span>
  <span style="font-weight: bold; color: #002855; font-size: 18px; display: block; margin: 0;">The Meletenova Team</span>
  <span style="font-size: 14px; color: #777; display: block; margin: 0;">Innovating Beyond Expectations</span>
  <img src="https://meletenova.com/assets/Logo.png" alt="Meletenova Logo" style="height: 50px; margin-top: 6px; display: block;" />
            </div>
          </div>

          
          <div style="background-color: #f1f3f6; text-align: center; padding: 20px; font-size: 13px; color: #555;">
            <p style="margin: 5px 0;">Meletenova | <a href="https://meletenova.com" style="color: #002855; text-decoration: none;">meletenova.com</a></p>
            <p style="margin: 5px 0; color: #666;">Empowering your digital future through innovative IT services and certification programs.</p>
            <p style="margin: 10px 0;">Follow us on</p>

            <div style="margin-top: 8px;">
              <a href="https://www.facebook.com/meletenova" style="margin: 0 8px;" target="_blank">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" width="24" height="24" />
              </a>
              <a href="https://x.com/meletenova" style="margin: 0 8px;" target="_blank">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" width="24" height="24" />
              </a>
                <a href="https://www.linkedin.com/company/meletenova-solutions-pvt-ltd/?viewAsMember=true" style="margin: 0 8px;" target="_blank">
                <img src="https://cdn-icons-png.flaticon.com/512/145/145807.png" alt="LinkedIn" width="24" height="24" />
              </a>
              <a href="https://www.youtube.com/@MeleteNovaSolutionsPrivateLimi" style="margin: 0 8px;" target="_blank">
                <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YouTube" width="26" height="26" />
              </a>
              <a href="https://www.instagram.com/melete.k_?igsh=MXExMnF2NW5ocHgyOQ==" style="margin: 0 8px;" target="_blank">
                <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" width="24" height="24" />
              </a>
            </div>

            <p style="margin-top: 15px; font-size: 12px; color: #999;">
              © ${new Date().getFullYear()} MeleteNova Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </div>`,
     }),

          resend.emails.send({
            from: `MeleteNova <${process.env.SENDER_EMAIL}>`,
            to: teamHeadEmail,
            subject: "📥 New Webinar Registration Received",
            html:`<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f7f8fa; padding: 40px;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); overflow: hidden;">
          
          <div style="background-color: #002855; padding: 20px; text-align: center;">
            <img src="https://meletenova.com/assets/logo2.png" alt="Meletenova Logo" style="height: 60px;" />
          </div>

          
          <div style="padding: 30px; text-align: left; color: #333;">
            <h2 style="color: #002855;">Thank You, ${firstName}!</h2>
            <p style="font-size: 16px; line-height: 1.6;">
              You have successfully registered for the <b>CyberShield 2025</b>.
            </p>
            <p style="font-size: 16px; line-height: 1.6;">
              Date: 07-Dec-2025<br>
              Time: 10 AM - 11:30 AM<br>
              Webinar link will be shared soon.
            </p>
            <p style="font-size: 16px; line-height: 1.6;">
              If you have any queries, feel free to contact us at
              <a href="mailto:${process.env.QUERIES_MAIL}" style="color: #002855; text-decoration: none;"><b>${process.env.QUERIES_MAIL}</b></a>.
            </p>
             <div style="margin-top:5px;">
               <span style="font-size: 15px; display: block; margin: 0;">Warm regards,</span>
  <span style="font-weight: bold; color: #002855; font-size: 18px; display: block; margin: 0;">The Meletenova Team</span>
  <span style="font-size: 14px; color: #777; display: block; margin: 0;">Innovating Beyond Expectations</span>
  <img src="https://meletenova.com/assets/Asset%203.png" alt="Meletenova Logo" style="height: 50px; margin-top: 6px; display: block;" />
            </div>
          </div>

          
          <div style="background-color: #f1f3f6; text-align: center; padding: 20px; font-size: 13px; color: #555;">
            <p style="margin: 5px 0;">Meletenova | <a href="https://meletenova.com" style="color: #002855; text-decoration: none;">meletenova.com</a></p>
            <p style="margin: 5px 0; color: #666;">Empowering your digital future through innovative IT services and certification programs.</p>
            <p style="margin: 10px 0;">Follow us on</p>

            <div style="margin-top: 8px;">
              <a href="https://www.facebook.com/meletenova" style="margin: 0 8px;" target="_blank">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" width="24" height="24" />
              </a>
              <a href="https://x.com/meletenova" style="margin: 0 8px;" target="_blank">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" width="24" height="24" />
              </a>
                <a href="https://www.linkedin.com/company/meletenova-solutions-pvt-ltd/?viewAsMember=true" style="margin: 0 8px;" target="_blank">
                <img src="https://cdn-icons-png.flaticon.com/512/145/145807.png" alt="LinkedIn" width="24" height="24" />
              </a>
              <a href="https://www.youtube.com/@MeleteNovaSolutionsPrivateLimi" style="margin: 0 8px;" target="_blank">
                <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YouTube" width="26" height="26" />
              </a>
              <a href="https://www.instagram.com/melete.k_?igsh=MXExMnF2NW5ocHgyOQ==" style="margin: 0 8px;" target="_blank">
                <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" width="24" height="24" />
              </a>
            </div>

            <p style="margin-top: 15px; font-size: 12px; color: #999;">
              © ${new Date().getFullYear()} MeleteNova Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </div>`,
          }),
        ]);


        return res.status(200).json({
          message: "Registration saved & emails sent successfully!",
        });
      } catch (emailErr) {
        console.log("❌ Email Sending Error:", emailErr);
        return res.status(500).json({ error: "Emails could not be sent" });
      }
    });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
