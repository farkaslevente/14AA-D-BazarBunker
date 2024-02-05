import query from "./db.js"

async function getAllUsers() {
    const rows = await query(
        `SELECT id, nev, email, hely, pPic, jelszo
        FROM felhasznalok`
    );
    return rows;
};

export default getAllUsers