 // 校验姓名合法性
 export function isNameValueLegal(name: string): any {
  // const  myname =  /^[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})$/;
  const myname = /^[\u4E00-\u9FA5, ·]{2,10}$/;
  const myname1 = /^[a-zA-Z ]{2,10}$/;
  const nul = /^\s*$/;
  const name_valid = (myname.test(name) || myname1.test(name)) && !nul.test(name);
  if (name_valid) {
    return true;
  } else {
    return false;
  }
}
