import { NextResponse } from "next/server";
import fs from 'fs';
import path from "path";
import { loadAHDLSOA, loadEEICLA, loadHHPoHT } from "@/app/utils/csv";

export async function POST(req: Request, { params }: { params: { data: string } }) {
  const dataTypes = ['AHDLSOA', 'EEICLA', 'HHPoHT'];
  const data = params.data;
  if (!dataTypes.includes(data)) {
    return NextResponse.json({ errorMessage: "Could not upload file to database." }, { status: 400 });
  }
  const formData = await req.formData();
  const file: File = formData.get('file') as File;
  const year: string = formData.get('year') as string || 'n.d.';

  const dataAsString: string = await file.text();

  const filePath = path.join(process.cwd(), `/${data}-${year}.csv`);

  if (fs.existsSync(filePath)) {
    return NextResponse.json({ errorMessage: "The file for that year already exists." }, { status: 409 });
  }

  fs.writeFile(filePath, dataAsString, 'utf-8', async err => {
    if (err) {
      console.error('Error writing to file:', err);
      return NextResponse.json({ errorMessage: "There was an error handling the file." }, { status: 500 });
    } else {
      console.log('File written successfully!');
    }
  });
  
  // FIXME: Currently, the load functions aren't properly erroring, so catch
  // is not being triggered. Once there is error handling, this should work as intended.
  switch(data) {
    case 'AHDLSOA':
      try {
        await loadAHDLSOA(async () => {
          console.log('Finished uploading AHDLSOA Data');
        }, filePath);
        return NextResponse.json({ successMessage: "Successfully uploaded data." }, { status: 200 });
      } catch (e) {
        console.error(e);
        return NextResponse.json({ errorMessage: "Could not upload data to database." }, { status: 409 });
      }
    case 'EEICLA':
      try {
        await loadEEICLA(async () => {
          console.log('Finished uploading EEICLA Data');
        }, filePath);
        return NextResponse.json({ successMessage: "Successfully uploaded data." }, { status: 200 });
      } catch (e) {
        console.error(e);
        return NextResponse.json({ errorMessage: "Could not upload data to database." }, { status: 409 });
      }
    case 'HHPoHT':
      try {
        await loadHHPoHT(async () => {
          console.log('Finished uploading HHPoHT Data');
        }, filePath);
        return NextResponse.json({ successMessage: "Successfully uploaded data." }, { status: 200 });
      } catch (e) {
        console.error(e);
        return NextResponse.json({ errorMessage: "Could not upload data to database." }, { status: 409 });
      }
    default:
      console.error('Do not recognise that data code.');
      return NextResponse.json({ errorMessage: "Data not recognised." }, { status: 400 });
  }
}
