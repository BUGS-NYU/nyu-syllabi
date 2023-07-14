import { google } from "googleapis"

export async function getGoogleSheetSyllabi() {
    try {
        const target = ["https://www.googleapis.com/auth/spreadsheets.readonly"]
        const jwt = new google.auth.JWT(
            process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
            undefined,
            process.env.GOOGLE_SHEETS_PRIVATE_KEY!.replace(/\\n/g, "\n"),
            target
        );

        const sheets = google.sheets({ version: "v4", auth: jwt });
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
            range: "Form Responses 1",
        });

        const rows = response.data.values;
        if (rows) {
            return rows.map((row) => ({
                timestamp: row[0],
                email: row[1],
                albert_catalog_number: row[2],
                course_title: row[3],
                school: row[4],
                term: row[5],
                year: row[6],
                professor: row[7],
                link: row[8]
            }));
        }
    } catch (err) {
        console.log(err);
    }

    return [];
}