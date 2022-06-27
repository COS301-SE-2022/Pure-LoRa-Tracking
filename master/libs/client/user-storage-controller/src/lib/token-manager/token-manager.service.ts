import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenManagerService {

  // constructor() { 

  // }


  getToken(){
    return "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZldXNlckByZXNlcnZlLmNvbSIsInNjb3BlcyI6WyJDVVNUT01FUl9VU0VSIl0sInVzZXJJZCI6ImY5NmU2MGQwLWRmZTgtMTFlYy1iZGIzLTc1MGNlN2VkMjQ1MSIsImVuYWJsZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiJjZDJkZjJiMC1kZmU4LTExZWMtYmRiMy03NTBjZTdlZDI0NTEiLCJjdXN0b21lcklkIjoiZWY1NWZmNDAtZGZlOC0xMWVjLWJkYjMtNzUwY2U3ZWQyNDUxIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2NTYzMjgzMTAsImV4cCI6MTY1NjMzNzMxMH0.eaXSFE-oq5Z2E-iNdVT4y3OmgGRTqBTVwHI3_ZkTu2ZU_2ApvZE2w8lee4RI52iOm6cliEsQdYwjXy40Erw4mA";
  }
}
