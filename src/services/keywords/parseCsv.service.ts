import { Injectable } from '@nestjs/common';
import { parse } from 'papaparse';

@Injectable()
export class ParseCsvService {
  async parseData(csvFile: Express.Multer.File): Promise<any> {
    const csvBufferData = csvFile.buffer.toString();

    const parsedCSV = parse(csvBufferData, {
      header: false,
      skipEmptyLines: true,
      complete: (results) => results.data,
    });

    if (parsedCSV) {
      return parsedCSV.data;
    } else throw new Error('Error parsing CSV data');
  }
}
