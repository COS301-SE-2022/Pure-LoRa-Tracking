import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenManagerService {

  constructor(public cookieservice:CookieService) { 

  }

  getToken(){
    if(this.cookieservice.check("PURELORA_TOKEN")){
      return this.cookieservice.get("PURELORA_TOKEN");
    }
    return "";
  }

  getAdminToken(){
    return "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZlYWRtaW5AcmVzZXJ2ZS5jb20iLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInVzZXJJZCI6ImQ2MzcyZTMwLWRmZTgtMTFlYy1iZGIzLTc1MGNlN2VkMjQ1MSIsImVuYWJsZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiJjZDJkZjJiMC1kZmU4LTExZWMtYmRiMy03NTBjZTdlZDI0NTEiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2NTY0MzA1OTgsImV4cCI6MTY1NjQzOTU5OH0.FiaukfzwrFNcfhRvRrpfZFZEAgMQJoXEqdek1FqpR1FMpxDaazSmpXWL2fre2gNo4w-ILy1M1SN438MsbYCKFA";
  }
}
