'use client'

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from 'next/link';

const SUPABASE_STORAGE_URL= 'https://umtnkgqmgdtgeladncyw.supabase.co/storage/v1/object/public/syllabi-blobs/'

export default function SyllabiTable({ syllabi } : { syllabi: any[] }) {
  function createData(
      course_code: string, 
      course_name: string, 
      term: string, 
      year: string, 
      link: string,
      timestamp: string
  ) {
    return { course_code, course_name, term, year, link, timestamp};
  }

  const rows = syllabi.map((syllabus) => (
    // console.log(syllabus),
    createData(
      syllabus.course_code,
      syllabus.title,
      syllabus.term,
      syllabus.year,
      syllabus.link,
      syllabus.timestamp
    )
  ));

  var date = new Date();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ 
        // minWidth: 60,
        // backgroundColor: '#f5f5f5',
         //remove all left padding
        '& .MuiTableCell-root': {
          borderWidth: 2,
        },
        // make the table header bold, 
        '& .MuiTableCell-head': {
          // fontWeight: 'bold',
          color: 'grey',
        },
      }} aria-label="syllabi-table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Course Code</TableCell>
            <TableCell align="left">Course Name</TableCell>
            <TableCell align="left">Term</TableCell>
            <TableCell align="left">Year</TableCell>
            {/* <TableCell align="left">Uploaded</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.course_code}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.course_code}</TableCell>
              <TableCell component="th" scope="row">
               <Link href={SUPABASE_STORAGE_URL + row.link} id='tablelinks'> 
                  {row.course_name} 
                </Link>
              </TableCell>
              <TableCell align="left">{row.term}</TableCell>
              <TableCell align="left">{row.year}</TableCell>
              {/* <TableCell align="left">{row.timestamp}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
