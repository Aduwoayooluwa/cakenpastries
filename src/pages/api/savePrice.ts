import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";

export const SUPABBASE_URI="https://hznjvpktszgwmcioaury.supabase.co"
export const SUPABASE_APIKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6bmp2cGt0c3pnd21jaW9hdXJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY2MDM4ODEsImV4cCI6MjAwMjE3OTg4MX0.dopQCkNLYIyHkTZG5xuqimj7ohWYzcbVAw_RuWWhCKE"
export const supabase = createClient(SUPABBASE_URI, SUPABASE_APIKEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { id, subtotal } = req.body;

        // storing the subtotal in supabse database
        const { data, error } = await supabase.from('store')
            .insert([{id, subtotal }])

        if (error) {
            res.status(500).json({message: error.message})
        }

        else {
            console.log(data)
            res.status(200).json({message: "Price saved successfully", })
        }

    }
    else {
        res.status(405).json({message: "Method not allowed"})
    }
}