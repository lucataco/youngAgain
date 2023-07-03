import type { NextApiRequest, NextApiResponse } from "next";

type Data = string;
interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    hookUrl: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Data>
) {

  const imageUrl = req.body.hookUrl;
  // POST request to Replicate to get status of prediction
  let resp = await fetch(imageUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + process.env.REPLICATE_API_KEY,
    },
  });

  let jsonResp = await resp.json();
  if (jsonResp.status === "succeeded") {
    res.status(200).json(jsonResp.output);
  } else if (jsonResp.status === "failed") {
    res.status(400).json("Failed to restore image");
  } else
    res.status(200).json("processing")
}
