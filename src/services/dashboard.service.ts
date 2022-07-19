import { Injectable } from '@nestjs/common';
import { parse } from 'papaparse';

@Injectable()
export class DashboardService {
  async parseData(csvFile: Express.Multer.File) {
    const csvBufferData = csvFile.buffer.toString();

    const parsedCSV = parse(csvBufferData, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.toLowerCase().replace('#', '').trim(),
      complete: (results) => results.data,
    });

    return {
      keywords: parsedCSV.data,
      success: 'File uploaded successfully',
    };
  }
}
