export default function bs_list(haystack: number[], needle: number): boolean {
    let lo = 0;
    let hi = haystack.length;

    do {
        let mi = lo + Math.floor((hi - lo) / 2);
        let val = haystack[mi];
        if (val === needle) {
            return true;
        } else if (val > needle) {
            hi = mi;
        } else {
            lo = mi + 1;
        }
    } while (lo < hi);
    return false;
}
