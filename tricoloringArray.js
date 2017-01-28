exports.solution = function(A) {
    const arr = [[],[],[],[]];
    const type = { "color": 0, "value": 1, "sorted": 2, "colorSorted": 3};
    const color = { first: "G", second: "B", third: "R" };
    let level;

    // primary initialization
    arr[type.value] = arr[type.value].concat(A);
    arr[type.sorted] = arr[type.sorted].concat(A);
    arr[type.sorted].sort().reverse();
    level = arr[type.sorted][0];
    arr[type.colorSorted][0] = color.first;

    // populate the colorSorted by recursion
    const findNextColor = function (arr, index, value, level, pointer, color) {
        if (index < arr[type.sorted].length) {
            value = arr[type.sorted][index] + value;

            if (arr[type.colorSorted][index] != undefined) {
                return findNextColor(arr, index + 1, value - arr[type.sorted][index], level, pointer, color);
            } else if (value === level) {
                arr[type.colorSorted][index] = color;
                return true;
            } else if (value > level) {
                return findNextColor(arr, index + 1, value - arr[type.sorted][index], level, pointer, color);
            } else if (value < level) {
                if (findNextColor(arr, index + 1, value, level, pointer, color)) {
                    arr[type.colorSorted][index] = color;
                    return true;
                }
            }
        }
        return false;
    }

    // populate the colorSorted array
    findNextColor(arr, 1, 0, level, 0, color.second);
    findNextColor(arr, 1, 0, level, 0, color.third);

    // copy colorSorted to the color array by original order
    for (let i = 0; i < arr[type.value].length; i++) {
        let val = arr[type.sorted][i];
        let sign = arr[type.colorSorted][i];
        arr[type.color][arr[type.value].indexOf(val)] = sign;
    }

    return arr[type.color].indexOf(undefined) > 0 ||
        arr[type.color].indexOf(color.first) < 0 ||
        arr[type.color].indexOf(color.second) < 0 ||
        arr[type.color].indexOf(color.third) < 0
        ? "impossible"
        : arr[type.color].join().replace(/,/gi, '');
}