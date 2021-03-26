import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';


@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient, private store:Storage, private transfer: FileTransfer, private file:File) {}

  server_url = 'https://carv.ist/sites/fawori/api.php';
  local_news:any;
  local_chances:any;
  local_blog_list:any;
  local_user:any;
  local_polls:any;
  local_rosettes:any;
  local_cities:any;
  local_districts:any;
  local_user_info:any;
  contents:any;
  local_avatars:any;
  start_page='tabs';
  phone:String='';

  getUser(){
    return new Promise((resolve, reject) => {
      if(this.local_user){
        //console.log('local user ready',this.local_user);
        resolve(this.local_user);
      }
      else{
        this.store.get('user').then((val) => {
          if(val){
            this.local_user = JSON.parse(val);
            resolve(this.local_user);
          }
          else{
            resolve(this.local_user);
          }
        }).catch((err)=>{
          resolve(this.local_user);
        });
      }
    });
  }

  logout(){
    return new Promise((resolve, reject) => {
      this.local_user={};
      this.store.set('user',JSON.stringify(this.local_user)).then(()=>{
        this.store.remove('user').then(()=>{
          resolve({status:'ok'});
        });
      })
      
    });

  }

  sendForm(form){
    return this.http.post<any>(this.server_url, {job:'send_form',hash:this.local_user.hash,form:form}).pipe();
  }

  stepDone(step_id){
    return this.http.post<any>(this.server_url, {job:'update_step',hash:this.local_user.hash,step_id:step_id}).pipe();
  }

  sendFiles(form,step_id){
    form.forEach((f)=>{
      if(f.id && f.id>0){
        form.splice(form.indexOf(f),1);
      }
    })
    return this.http.post<any>(this.server_url, {job:'send_files',hash:this.local_user.hash,step_id:step_id,form:form}).pipe();
  }

  saveUpload(form,step_id,link){
    return this.http.post<any>(this.server_url, {job:'upload_files',hash:this.local_user.hash,step_id:step_id,path:link.response}).pipe();
  }

  deleteFile(id){
    return this.http.post<any>(this.server_url, {job:'delete_file',hash:this.local_user.hash,id:id}).pipe();
  }

  checkUser(){
    return this.http.post<any>(this.server_url, {job:'check_user',hash:this.local_user.hash,phone:this.local_user.phone}).pipe(
      tap((result) => { 
        //console.log('got full user',result); this.local_user=result; 
        this.store.set('user',JSON.stringify(this.local_user));
      } ),
      catchError(this.handleError('check user'))
    );
  }

  getPaintHistory(){
    return this.http.post<any>(this.server_url, {job:'get_paint_history',hash:this.local_user.hash}).pipe(
      tap((result) => { } ),
      catchError(this.handleError('check user'))
    );
  }

  getUserRosettes(){
    return this.http.post<any>(this.server_url, {job:'get_user_rosettes',hash:this.local_user.hash}).pipe(
      tap((result) => { } ),
      catchError(this.handleError('check user'))
    );
  }

  getUserGifts(){
    return this.http.post<any>(this.server_url, {job:'get_user_gifts',hash:this.local_user.hash}).pipe(
      tap((result) => { } ),
      catchError(this.handleError('check user'))
    );
  }

  getUserInfo(){
    return this.http.post<any>(this.server_url, {job:'get_user_info',hash:this.local_user.hash}).pipe(
      tap((result) => { 
        //console.log('got full user',result); this.local_user_info=result;
      } ),
      catchError(this.handleError('check user'))
    );
  }

  getStepRecords(id){
    return this.http.post<any>(this.server_url, {job:'get_step_records',hash:this.local_user.hash, step_id:id}).pipe(
      tap((result) => { } ),
      catchError(this.handleError('get step records'))
    );
  }

  getCities(){
    return this.http.post<any>(this.server_url, {job:'get_cities'}).pipe(
      tap((result) => { 
        this.local_cities=result;
      } ),
      catchError(this.handleError('get cities'))
    );
  }

  getCityName(id){
    let title ='';
    if(this.local_cities){
      this.local_cities.forEach(c=>{
        if(c.id==id){
          title=c.name;
        }
      });
    }
    return title;
  }

  getDistrictName(id){
    let title ='';
    if(this.local_districts){
      this.local_districts.forEach(c=>{
        if(c.id==id){
          title=c.name;
        }
      });
    }
    return title;
  }

  updateProfile(user,info){
    return this.http.post<any>(this.server_url, {job:'update_profile',user:user, info:info}).pipe(
      tap((result) => { 
        //console.log('result',result);
      } ),
      catchError(this.handleError('update user'))
    );
  }

  getDistricts(id){
    return this.http.post<any>(this.server_url, {job:'get_districts',city:id}).pipe(
      tap((result) => { } ),
      catchError(this.handleError('get districts'))
    );
  }

  getAllDistricts(){
    return this.http.post<any>(this.server_url, {job:'get_all_districts'}).pipe(
      tap((result) => { 
        this.local_districts=result;
      } ),
      catchError(this.handleError('get districts'))
    );
  }

  setUser(user){
    this.local_user=user;
    this.store.set('user',JSON.stringify(this.local_user));
  }

  getContents():Observable<any>{
    if(!this.local_user){
      this.local_user={hash:''}
    }
    return this.http.post<any>(this.server_url, {job:'get_contents',hash:this.local_user.hash}).pipe(
      tap((result) => { this.contents=result; } ),
      catchError(this.handleError('get contents'))
    );
  }

  fastContent(alias){
    let return_text='';
    if(this.contents){
      this.contents.forEach(c=>{
        if(c.alias==alias){
          return_text=c.content;
        }
      })
    }
    return return_text;
  }

  fastSubjectContent(alias){
    let return_text={content:'',subject:''};
    if(this.contents){
      this.contents.forEach(c=>{
        if(c.alias==alias){
          return_text.content=c.content;
          return_text.subject=c.subject;
        }
      })
    }
    return return_text;
  }

  sendPrizeInfo(form,prize):Observable<any>{
    return this.http.post<any>(this.server_url, {job:'save_prize_info',hash:this.local_user.hash,info:form,prize:prize}).pipe(
      tap((result) => { console.log('got info titles'); } ),
      catchError(this.handleError('get info titles'))
    );
  }

  getInfoTitles():Observable<any>{
    return this.http.post<any>(this.server_url, {job:'get_info_titles',hash:this.local_user.hash}).pipe(
      tap((result) => { console.log('got info titles'); } ),
      catchError(this.handleError('get info titles'))
    );
  }

  getRosettes():Observable<any>{
    return this.http.post<any>(this.server_url, {job:'get_rosettes',hash:this.local_user.hash}).pipe(
      tap((result) => { console.log('got rosettes'); this.local_rosettes=result; } ),
      catchError(this.handleError('add login'))
    );
  }

  getSubRosettes(id):Observable<any>{
    return this.http.post<any>(this.server_url, {job:'get_rosettes',hash:this.local_user.hash,master:id}).pipe(
      tap((result) => { } ),
      catchError(this.handleError('add login'))
    );
  }

  checkBarcode(code):Observable<any>{
    return this.http.post<any>(this.server_url, {job:'check_barcode',barcode:code,hash:this.local_user.hash}).pipe(
      tap((result) => { console.log('got barcode result'); } ),
      catchError(this.handleError('check barcode'))
    );
  }

  getPolls():Observable<any>{
    return this.http.post<any>(this.server_url,{job:'get_polls',hash:this.local_user.hash}).pipe(
      tap((res)=>{console.log( 'came all the polls'); this.local_polls=res; }),
      catchError(this.handleError('polls'))
    );
  }

  sendPoll(poll):Observable<any>{
    return this.http.post<any>(this.server_url,{job:'send_poll',hash:this.local_user.hash, poll_id:poll.id, answers:poll.answers}).pipe(
      tap((res)=>{console.log( 'submitted the poll'); }),
      catchError(this.handleError('poll submit'))
    );
  }

  getAvatars(){
    return this.http.post<any>(this.server_url,{job:'get_avatars',hash:this.local_user.hash}).pipe(
      tap((res)=>{console.log( 'got the avatars'); this.local_avatars=res; }),
      catchError(this.handleError('get avatar'))
    );
  }

  getAvatarDetail(id){
    let avatar = {};
    if(this.local_avatars){
      this.local_avatars.forEach(p=>{
        if(p.id == id){console.log('found avatar',p.id);avatar=p;}
      })
    }
    else{}
    return avatar;
  }

  getPollDetail(id){
    let poll = {};
    if(this.local_polls){
      this.local_polls.forEach(p=>{
        if(p.id == id){
          console.log('found poll',p.id);
          poll=p;
        }
      })
    }
    else{
      
    }
    return poll;
  }

  getRosetteDetail(id){
    let obj = {};
    this.local_rosettes.forEach(rosette=>{
      if(rosette.id==id){
        obj=rosette;
      }
    });
    return obj;
  }

  setHash(hash,phone){
    this.local_user={};
    this.local_user.hash=hash;
    this.local_user.phone=phone;
    this.store.set('user',JSON.stringify(this.local_user));
  }

  setAvatar(id){
    this.local_user.avatar=id;
    this.local_user.avatar_id=id;
    console.log('setup avatar id : ',this.local_user);
    this.store.set('user',JSON.stringify(this.local_user)).then(()=>{
      console.log('local user saved');
    });
    return this.http.post<any>(this.server_url, {job:'set_avatar',avatar:id, hash:this.local_user.hash}).pipe(
      tap((result) => { } ),
      catchError(this.handleError('set avatar'))
    );
  }

  setPhone(phone){
    this.phone=phone;
  }

  getPhone(){
    return this.phone;
  }

  sendInvites(list,step_id):Observable<any>{
    return this.http.post<any>(this.server_url, {job:'send_invites',list:list, step_id:step_id, hash:this.local_user.hash}).pipe(
      tap((result) => {} ),
      catchError(this.handleError('send invite'))
    );
  }

  getInvites(step_id):Observable<any>{
    return this.http.post<any>(this.server_url, {job:'get_invites', step_id:step_id, hash:this.local_user.hash}).pipe(
      tap((result) => {} ),
      catchError(this.handleError('get invite'))
    );
  }

  getPermissions():Observable<any>{
    return this.http.post<any>(this.server_url, {job:'get_permissions', hash:this.local_user.hash}).pipe(
      tap((result) => {} ),
      catchError(this.handleError('get permissions'))
    );
  }

  updatePermissions(perm):Observable<any>{
    return this.http.post<any>(this.server_url, {job:'update_permissions', hash:this.local_user.hash, permissions:perm}).pipe(
      tap((result) => {} ),
      catchError(this.handleError('update permissions'))
    );
  }

  sendActivation(phone,code):Observable<any>{
    return this.http.post<any>(this.server_url, {job:'check_code',phone:phone,code:code}).pipe(
      tap((result) => {} ),
      catchError(this.handleError('add user'))
    );
  }

  postUser(user):Observable<any>{
    return this.http.post<any>(this.server_url, {job:'signup',user:user}).pipe(
      tap((result) => {} ),
      catchError(this.handleError('add user'))
    );
  }

  postLogin(phone:String):Observable<any>{
    return this.http.post<any>(this.server_url, {job:'signin',phone:phone}).pipe(
      tap((result) => { this.local_user={phone:phone, hash:''}; } ),
      catchError(this.handleError('add login'))
    );
  }

  reSendActivation(phone:String):Observable<any>{
    return this.http.post<any>(this.server_url, {job:'resend_activation',phone:phone}).pipe(
      tap(),
      catchError(this.handleError('add login'))
    );
  }

  getNews():Observable<any>{
    if(this.local_news && this.local_news.length>0){
      return of(this.local_news);
    }
    else{
      return this.http.post<any>(this.server_url, {job:'get_news'}).pipe(
        tap((news) => {this.local_news=news} ),
        catchError(this.handleError('add News'))
      );
    }
  }

  getWheel():Observable<any>{
    return this.http.post<any>(this.server_url, {job:'get_wheel', hash:this.local_user.hash}).pipe(
      tap(),
      catchError(this.handleError('add wheel'))
    );
  }

  sendWheel(id):Observable<any>{  
    return this.http.post<any>(this.server_url, {job:'wheel_result', hash:this.local_user.hash, id:id }).pipe(
      tap(),
      catchError(this.handleError('update wheel'))
    );
  }

  getChances():Observable<any>{
    if(this.local_chances && this.local_chances.length>0){
      return of(this.local_chances);
    }
    else{
      return this.http.post<any>(this.server_url, {job:'get_chances', hash:this.local_user.hash}).pipe(
        tap((news) => {this.local_chances=news} ),
        catchError(this.handleError('add Chances'))
      );
    }
  }

  getChanceDetail(id){
    let obj = {};
    this.local_chances.forEach(chance=>{
      if(chance.id==id){
        obj=chance;
      }
    });
    return obj;
  }

  getBlogs():Observable<any>{
    if(this.local_blog_list && this.local_blog_list.length>0){
      return of(this.local_blog_list);
    }
    else{
      return this.http.post<any>(this.server_url, {job:'get_blog_list'}).pipe(
        tap((news) => {this.local_blog_list=news} ),
        catchError(this.handleError('add Blog'))
      );
    }
  }

  getContentDetail(section,search_id){
    let will_return:any={};
    //console.log('for section',section);
    if(section=='news'){
      this.local_news.forEach(item=>{
        if(item.id==search_id){
          will_return = item;
        }
      })
    }
    else if(section=='blog'){
      this.local_blog_list.forEach(item=>{
        if(item.id==search_id){
          will_return = item;
        }
      })
    }
    return will_return;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
