import type { NextApiRequest, NextApiResponse } from "next";

type Data = string;
interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    imageUrl: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Data>
) {

  const imageUrl = req.body.imageUrl;
  // POST request to Replicate to start the image restoration generation process
  let startResponse = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + process.env.REPLICATE_API_KEY,
    },
    body: JSON.stringify({
      version:
        "9222a21c181b707209ef12b5e0d7e94c994b58f01c7b2fec075d2e892362f13c",
      input: { image: imageUrl, target_age: "0"},
    }),
  });
  let jsonStartResponse = await startResponse.json();
  let endpointUrl = jsonStartResponse.urls.get;
  if(endpointUrl){
    res.status(200).json(endpointUrl);
  } else {
    res.status(400).json("Failed to start image restoration process");
  }
  
}
