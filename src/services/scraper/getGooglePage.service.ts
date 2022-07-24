import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class GetGooglePageService {
  constructor(private readonly httpService: HttpService) {}

  async getGooglePage(urlKeyword: string): Promise<any> {
    const url = `https://www.google.com/search?q=${urlKeyword}`;

    const getResponseData = await this.httpService.axiosRef(url, {
      headers: {
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
      },
    });

    return getResponseData.data;
  }
}
