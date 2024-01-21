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


const SUPABASE_STORAGE_URL = 'https://umtnkgqmgdtgeladncyw.supabase.co/storage/v1/object/public/syllabi-blobs/'

export default function SyllabiTable({ syllabi } : { syllabi: any[] }) {
  function createData(
      course_code: string, 
      course_name: string, 
      term: string, 
      year: string, 
      file_link: string,
      timestamp: string
  ) {
    return { course_code, course_name, term, year, file_link, timestamp};
  }

  // const rows = [
  //     createData('ECON-UA-1', 'Intro to Microeconomics', 'Fall', '2021', 'https://umtnkgqmgdtgeladncyw.supabase.co/storage/v1/object/public/syllabi-blobs/ECON-UA-1.pdf', '2024-01-10 02:51:05.542373+00'),
  //     createData('ECON-UA-2', 'Intro to Macroeconomics', 'Spring', '2021', 'https://umtnkgqmgdtgeladncyw.supabase.co/storage/v1/object/public/syllabi-blobs/ECON-UA-2.pdf', '2024-01-10 02:51:05.542373+00'),
  //     createData('ECON-UA-3', 'Statistics for Economics', 'Fall', '2020', 'https://umtnkgqmgdtgeladncyw.supabase.co/storage/v1/object/public/syllabi-blobs/ECON-UA-3.pdf', '2024-01-10 02:51:05.542373+00')
  // ];

  const rows = syllabi.map((syllabus) => (
    console.log(syllabus),
    createData(
      syllabus.course_code,
      syllabus.title,
      syllabus.term,
      syllabus.year,
      syllabus.file_link,
      syllabus.timestamp
    )
  ));

  return (
    <TableContainer component={Paper}>
      <Table sx={{ 
        minWidth: 60,
         //remove all left padding
        '& .MuiTableCell-root': {
          paddingLeft: 0,
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
               <Link href={SUPABASE_STORAGE_URL + row.file_link} id='tablelinks'> 
                  {row.course_name} 
                </Link>
              </TableCell>
              <TableCell align="left">{row.term}</TableCell>
              <TableCell align="left">{row.year}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
