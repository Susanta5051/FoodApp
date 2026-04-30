const checkNumber = (numString : string)=>{
    const regex = /^\d+$/;
    return regex.test(numString);
}
export default checkNumber;