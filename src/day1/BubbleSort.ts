function bubble_sort_1(arr: number[]): void {
    for (let j = 0; j < arr.length; ++j) {
        for (let i = 0; i < arr.length - 1 - j; ++i) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            }
        }
    }
}

function bubble_sort_2(arr: number[]): void {
    for (let end = arr.length; end > 2; --end) {
        for (let i = 0; i < end - 1; ++i) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            }
        }
    }
}

export default function bubble_sort(arr: number[]): void {
    // bubble_sort_1(arr);
    bubble_sort_2(arr);
}

// function my_bubble_sort(arr: number[]): void {
//     let swapped: boolean = false;
//     for (let end = arr.length; end > 2; --end) {
//         for (let i = 0; i < end - 1; ++i) {
//             if (arr[i] > arr[i + 1]) {
//                 [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
//                 swapped = true;
//             } else if (i === end - 1 && !swapped) {
//                 return; // array is sorted
//             }
//         }
//     }
// }
