import { Request, Response } from "express";
import axios from "axios";
import { asyncHandler } from "../../../utils/helpers";

export const runAutoRequest = asyncHandler(
  async (req: Request, res: Response) => {
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
          Cookie:
            "__arcsjs=5ce050dc566e64fbf33bfa35da2d61f7; csrftoken=Hi7EombJUDfoQx7zZHhIvdh3IBe1yuCxl0TH41Nh7Xa8hcBBiQQMCQRr3GsobqX8",
          Host: "evisatraveller.mfa.ir",
          Pragma: "no-cache",
          Referer: "https://evisatraveller.mfa.ir/en/request/applyrequest/",
        },
      }
    );

    let found: boolean = false;

    if (data?.includes("Kabul")) found = true;

    return res
      .status(200)
      .json({ success: true, message: "Fetched", data: found });
  }
);
