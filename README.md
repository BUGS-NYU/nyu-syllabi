# NYU Syllabi

A Next.js site to host syllabi for NYU classes across different schools, great if you want to know what will be covered in your classes. Submission and retrieval of syllabi are both done on the site. 

## Development

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To work on the syllabi deployment, .env.local file will need to be provided. Submission of Syllabi is done through a Google Form which goes into a Google Sheet along with a link to the syllabus. The next.js site connects to a Google Sheet via its respective API to handle the retrieval of the syllabi. 

The .env.local file is formatted as below:
```
GOOGLE_SHEETS_PRIVATE_KEY=""
GOOGLE_SHEETS_CLIENT_EMAIL=""
GOOGLE_SHEETS_SPREADSHEET_ID""
```
