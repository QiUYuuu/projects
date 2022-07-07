const mobilePhoneNumber = [
  /^1[3-9][0-9]{9}$/,
  /^1(?:3[0-9]|4[5-9]|5[0-9]|6[12456]|7[0-8]|8[0-9]|9[0-9])[0-9]{8}$/
];
const landlinePhoneNumber = [
  /^(?:0[1-9][0-9]{1,2}-)?[2-8][0-9]{6,7}$/,
  /^0[1-9][0-9]{1,2}-[2-8][0-9]{6,7}$/
];

export function isChinesePhoneNumber(phoneNumber: string, isStrict: boolean = false, type: string = 'all') {
  const mode = isStrict ? 1 : 0;
  switch (type) {
    case 'mobile':
      return mobilePhoneNumber[mode].test(phoneNumber);
    case 'landline':
      return landlinePhoneNumber[mode].test(phoneNumber);
    default:
      return (mobilePhoneNumber[mode].test(phoneNumber) || landlinePhoneNumber[mode].test(phoneNumber));
  }
}
