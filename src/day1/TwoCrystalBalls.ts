export default function two_crystal_balls(breaks: boolean[]): number {
    let len = breaks.length;
    let jump = Math.floor(Math.sqrt(len));

    let i = jump;
    for (; i < breaks.length; i += jump) {
        if (breaks[i]) {
            break;
        }
    }
    let j = i - jump;
    for (; j < i; j++) {
        if (breaks[j]) {
            return j;
        }
    }

    return -1;
}
