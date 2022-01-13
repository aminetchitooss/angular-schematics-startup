import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import memo from 'memo-decorator';
@Pipe({
  name: 'svgIcon'
})
export class SvgIconPipe implements PipeTransform {
  constructor(private http: HttpClient, private sanitized: DomSanitizer) {}

  @memo()
  transform(value: string | undefined): Promise<any> {
    return new Promise((resolve) => {
      if (!value) resolve(null);
      const headers = new HttpHeaders();
      headers.set('Accept', 'image/svg+xml');
      this.http.get(`assets/svg/${value?.split('?')[0]}.svg`, { headers, responseType: 'text' }).subscribe((svgString) => {
        const id = Date.now();
        let result = svgString.split('path-1').join(`path-${id}`).split('mask-2').join(`mask-${id}`);
        resolve(this.sanitized.bypassSecurityTrustHtml(result));
      });
    });
  }
}
