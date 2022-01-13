import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';
import { ApiService } from '../../api/api.service';

@Pipe({
  name: 'authPicture'
})
export class AuthPicturePipe implements PipeTransform {
  constructor(private http: ApiService) {}

  @memo()
  transform(src: string | null): Promise<any> {
    return new Promise((resolve) => {
      if (src) {
        const vUrl = isNaN(Number(src)) ? src : `/api/ContentBin?id=${src}`;
        this.http.getService(vUrl).subscribe((res) => {
          resolve(res);
        });
      } else resolve(null);
    });
  }
}
