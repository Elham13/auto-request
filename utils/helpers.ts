import axios from "axios";
import { NextFunction, Request, RequestHandler, Response } from "express";
import CroneResult from "../Models/croneResult";
import nodemailer from "nodemailer";

export const asyncHandler =
  (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message = err.message;
  if (err.code === 11000) {
    message = `Record with this ${
      Object.keys(err.keyPattern)?.[0]
    } already exist`;
  }
  return res.status(500).json({ success: false, message });
};

export const croneJob = async () => {
  try {
    let cookie = "a7b26b4ef0c65df91a0112a76b06b06f";
    setInterval(async () => {
      const { data } = await axios.get(
        "https://evisatraveller.mfa.ir/en/request/applyrequest/",
        {
          headers: {
            Accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "en-US,en;q=0.9",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
            Cookie: `__arcsjs=${cookie}; csrftoken=Hi7EombJUDfoQx7zZHhIvdh3IBe1yuCxl0TH41Nh7Xa8hcBBiQQMCQRr3GsobqX8`,
            Host: "evisatraveller.mfa.ir",
            Pragma: "no-cache",
            Referer: "https://evisatraveller.mfa.ir/en/request/applyrequest/",
          },
        }
      );

      let found: boolean = false;
      const dbData = await CroneResult.findById("65465e38db1e9b39f87757f2");

      const searchTerm = new RegExp("kabul", "i");
      const isFailed = new RegExp("Transferring to the website", "i");

      if (isFailed.test(data)) {
        await CroneResult.findByIdAndUpdate(dbData?._id, {
          $set: {
            cookieExpiredCount: dbData.cookieExpiredCount + 1,
          },
        });
      } else {
        if (searchTerm.test(data)) found = true;

        if (found) {
          await CroneResult.findByIdAndUpdate(dbData?._id, {
            $set: {
              successCount: dbData.successCount + 1,
              successSnaps: [...dbData.successSnaps, new Date()],
            },
          });
        } else {
          await CroneResult.findByIdAndUpdate(dbData?._id, {
            $set: {
              failureCount: dbData.failureCount + 1,
            },
          });
        }
      }
    }, 100000);
    // await fs.writeFile("error.html", "<h1>Hi</h1>", (err) => {
    //   console.log(err?.message);
    // });
    // const text = await fs.readFile("index.html", (err, data) => {
    //   if (err) console.log("Read error: ", err.message);
    //   console.log("data: ", data.toString());
    // });
    // console.log("text: ", text);
  } catch (error: any) {
    console.log(error.message);
  }
};

export const sendMail = () => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "wolverine.elham@gmail.com",
      pass: "geawccliiplmaeiv",
    },
  });

  const mailOptions = {
    from: "wolverine.elham@gmail.com", // Sender's email address
    to: "sofiiya.parveen@gmail.com", // Recipient's email address
    subject: "Hello from Node.js", // Email subject
    text: "This is a test email sent from Node.js.", // Email content
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
