export const generateVerificationCode = (length = 6)=>{
   const Characters = '0123654987'
   let verificationCode = '';
   const charactersLength = Characters.length; 
   for(let i=0;i<length;i++){
        verificationCode +=Characters.charAt(Math.floor(Math.random() * charactersLength))
   }
   return verificationCode;
}
generateVerificationCode();