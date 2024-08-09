import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;

  if (
    username === process.env.NEXT_PUBLIC_ADMIN_USERNAME &&
    password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
  ) {
    return res.status(200).json({ success: true });
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }
}
