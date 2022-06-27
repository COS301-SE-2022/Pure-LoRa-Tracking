import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenManagerService {

  // constructor() { 

  // }


  getToken(){
    return "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZldXNlckByZXNlcnZlLmNvbSIsInNjb3BlcyI6WyJDVVNUT01FUl9VU0VSIl0sInVzZXJJZCI6ImY5NmU2MGQwLWRmZTgtMTFlYy1iZGIzLTc1MGNlN2VkMjQ1MSIsImVuYWJsZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiJjZDJkZjJiMC1kZmU4LTExZWMtYmRiMy03NTBjZTdlZDI0NTEiLCJjdXN0b21lcklkIjoiZWY1NWZmNDAtZGZlOC0xMWVjLWJkYjMtNzUwY2U3ZWQyNDUxIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2NTYzNDAzNTEsImV4cCI6MTY1NjM0OTM1MX0.izqaTdGZf4jT6ajAU7LTz_Z0bgSD7a1LOABlmfBtg8VrFIG17vIHoA8QNUt-gDBf1-AWc71SIWfR7cowaJ9GwA";
  }
}
