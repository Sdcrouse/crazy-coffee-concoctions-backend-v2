// TODO: Get concoctions by userID
export async function getConcoctions(req, res) {
    console.log(req.userId);
    res.status(200).json({ status: 200, message: "Here are your concoctions!" });
};