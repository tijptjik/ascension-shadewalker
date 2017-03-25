// Based on http://www.redblobgames.com/grids/hexagons/

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return `(${this.x}, ${this.y})`;
    }

}

class Hex {
    constructor(q, r, s) {
        this.q = q;
        this.r = r;
        this.s = s;
    }
    toString() {
        return `(${this.q}, ${this.r}), ${this.s})`;
    }
    add(hex) {
        return new Hex(
            this.q + hex.q,
            this.r + hex.r,
            this.s + hex.s);
    }
    subtract(hex) {
        return new Hex(
            this.q - hex.q,
            this.r - hex.r,
            this.s - hex.s);
    }
    scale(k) {
        this.q = this.q * k;
        this.r = this.r * k;
        this.s = this.s * k;
        return this;
    }
    direction(direction, diagonal = false) {
        let coords;
        const
            adjacent_coords = [
                [1, 0, -1],
                [1, -1, 0],
                [0, -1, 1],
                [-1, 0, 1],
                [-1, 1, 0],
                [0, 1, -1]
            ],
            diagonal_coords = [
                [2, -1, -1],
                [1, -2, 1],
                [-1, -1, 2],
                [-2, 1, 1],
                [-1, 2, -1],
                [1, 1, -2]
            ];
        if (diagonal === false) {
            coords = adjacent_coords[direction]
        } else {
            coords = diagonal_coords[direction]
        }
        return coords;
    }
    neighbour(direction, diagonal = false) {
        return this.add(new Hex(...this.direction(direction, diagonal)))
    }
    length(){
        return Math.trunc(
           (Math.abs(this.q) +
            Math.abs(this.r) +
            Math.abs(this.s)
            ) / 2);
    }
    distance(hex){
        return this.subtract(hex).length();
    }
    round(){
        
        let q = Math.trunc(Math.round(this.q)),
            r = Math.trunc(Math.round(this.r)),
            s = Math.trunc(Math.round(this.s)),
            q_diff = Math.abs(q - this.q),
            r_diff = Math.abs(r - this.r),
            s_diff = Math.abs(s - this.s);

        if (q_diff > r_diff && q_diff > s_diff) {
            q = -r - s;
        } else if (r_diff > s_diff) {
            r = -q - s;
        } else {
            s = -q - r;
        }

        return new Hex(q, r, s);

    }
    lerp(hex, t) {
        return new Hex(
            this.q * (1 - t) + 
                hex.q * t,
            this.r * (1 - t) +
                hex.r * t,
            this.s * (1 - t) +
                hex.s * t);
    }
    linedraw(hex) {
        let N = this.distance(hex),
            a_nudge = new Hex(this.q + 0.000001, this.r + 0.000001, this.s - 0.000002),
            b_nudge = new Hex(hex.q + 0.000001, hex.r + 0.000001, hex.s - 0.000002),
            results = [],
            step = 1.0 / Math.max(N, 1);
        for (var i = 0; i <= N; i++) {
            let hhh = a_nudge.lerp(b_nudge, step * i)
            results.push(
                a_nudge.lerp(b_nudge, step * i).round());
        }
        return results;
    }
}

// TESTING

hex = new Hex(9,2,3)
hex_a = new Hex(-2,4,1)
hex_b = new Hex(2,0,0)