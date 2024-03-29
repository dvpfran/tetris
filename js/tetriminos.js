// [y, x]
const tetriminos = [
    {
        diagram: [
                  [1, 3], [1, 4], [1, 5], [1, 6]
                ],
        positions: [
                    [[-1, 1], [0, 0], [1, -1], [2, -2]],
                    [[1, -1], [0, 0], [-1, 1], [-2, 2]]
                ],
        backColor: "#31c8f0"
    },
    {
        diagram: [
                  [0, 3],
                  [1, 3], [1, 4], [1, 5]
                ],
        positions: [
                    [[0, 2], [-1, 1], [0, 0], [1, -1]],
                    [[2, 0], [1, 1], [0, 0], [-1, -1]],
                    [[0, -2], [1, -1], [0, 0], [-1, 1]],
                    [[-2, 0], [-1, -1], [0, 0], [1, 1]]
                   ],          
        backColor: "#5866af"
    },
    {
        diagram: [
                                  [0, 5],
                  [1, 3], [1, 4], [1, 5]
                 ],
        positions: [
                    [[2, 0], [-1, 1], [0, 0], [1, -1]],
                    [[0, -2], [1, 1], [0, 0], [-1, -1]],
                    [[-2, 0], [1, -1], [0, 0], [-1, 1]],
                    [[0, 2], [-1, -1], [0, 0], [1, 1]]
                   ], 
        backColor: "#ef7922"
    },
    {
        diagram: [
                    [0, 4], [0, 5],
                    [1, 4], [1, 5],
                 ],
        positions: [
                    [[0, 0], [0, 0], [0, 0], [0, 0]]
                   ],
        backColor: "#f7d409"
    },
    {
        diagram: [
                  [0, 5], [0, 6],
                  [1, 4],[1, 5]
                 ],
        positions: [
                    [[1, 1], [2, 0], [-1, 1], [0, 0]],
                    [[-1, -1], [-2, 0], [1, -1], [0, 0]]
                   ],
        backColor: "#41b73f"
    },
    {
        diagram: [
                            [0, 4],
                    [1, 3], [1, 4], [1, 5],
                ],
        positions: [
                    [[1, 1], [-1, 1], [0, 0], [1, -1]],
                    [[1, -1], [1, 1], [0, 0], [-1, -1]],
                    [[-1, -1], [1, -1], [0, 0], [-1, 1]],
                    [[-1, 1], [-1, -1], [0, 0], [1, 1]]
                   ],
        backColor: "#ab4f9e"
    },
    {
        diagram: [
                    [0, 3], [0, 4],
                            [1, 4], [1, 5]
                 ],
        positions: [
                    [[-1, 2], [0, 1], [-1, 0], [0, -1]],
                    [[1, -2], [0, -1], [1, 0], [0, 1]]
                   ],
        backColor: "#ec2128"
    },
];