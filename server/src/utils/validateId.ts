export function isValidId  (id:string) {
    let regexp = new RegExp('^[A-Z][0-9]{6}[0-9|A]$'),
    test = regexp.test(id);
    if(!test) return false;

    let firstCh = id.charCodeAt(0);
    let S = (36 * 9) + ((firstCh - 55) * 8);
    let idx = 7 ; 
    for(let i = 1; i <= 6; i++) {
        let j = id.charCodeAt(i) - 48;
        S += j * idx;
        idx--;
    }

    let M = S % 11;
    let N = 11 - M;

    if (N == 10) N = 17; 
    if (N == 11) N = 0;  

    let check_digit = id.charCodeAt(7) ;
    check_digit -= 48;

    if (N != check_digit) {
        return false;
    }

    return true;

    
}