# NYU Syllabi

A Next.js site to host syllabi for NYU classes across different schools, great if you want to know what will be covered in your classes. Submission and retrieval of syllabi are both done on the site. 

## Development

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To work on the syllabi deployment, a .env.local file will need to be provided in the root directory. Submission of a syllabus is done through a Google Form which links to a Google Sheet which contains the syllabus metadata, including a link to the blob itself in a Google Drive folder. The Next.js site connects to the Google Sheet via its respective API to handle the retrieval of the syllabi. 

The .env.local file is formatted as below:
```
GOOGLE_SHEETS_PRIVATE_KEY=""
GOOGLE_SHEETS_CLIENT_EMAIL=""
GOOGLE_SHEETS_SPREADSHEET_ID""
```

While the DB sheet used for the site is kept private, a public copy without user information can be found [here](https://docs.google.com/spreadsheets/d/1Im-Kggw4PshixN0X59UXEuug8W83srsuWZGCYn3F-ak/edit?usp=sharing). Feel free to use this sheet for development - an API key and client email will still need to be set up.
