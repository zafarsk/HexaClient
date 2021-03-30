import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { PaginatedResult } from '../_models/pagination';
import { User } from '../_models/user';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;
  members: Member[]=[];
  memberCache = new Map();
  user: User;
  userParams: UserParams;
  
  constructor(private http: HttpClient, private accountService: AccountService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe( user => {
      this.user = user;
      this.userParams = new UserParams(user);
    });
  }

  getUserParams(){
    return this.userParams;
  }
  setUserParams(params: UserParams){
    this.userParams = params;

  }
  resetUserParams(){
    this.userParams = new UserParams(this.user);
    return this.userParams;
    
  }

  getMembers(userParams: UserParams){
    var key = Object.values(userParams).join("-");
    var response = this.memberCache.get(key);
    if(response){
      return of(response);
    }
    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
    params = params.append("minAge", userParams.minAge.toString());
    params = params.append("maxAge", userParams.maxAge.toString());
    params = params.append("orderBy", userParams.orderBy);

    return getPaginatedResult<Member[]>(this.baseUrl + "users",params,this.http)
          .pipe(map(response =>{
            this.memberCache.set(key,response);
            return response;
          }));
  }  

  register(model:any){
    return this.http.post(this.baseUrl +"users/register",model).pipe(
      map((response: any) => {
        const user = response as Member;
        var key = Object.values(this.resetUserParams()).join("-");
        var records = this.memberCache.get(key);
        if(records){
          records.results.push(user);
          this.memberCache.set(key,records);
        }
        //console.log(user);
        return user;
        
      })
    )
  }

  
}
