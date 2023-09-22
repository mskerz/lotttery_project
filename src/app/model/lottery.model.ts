// To parse this data:
//
//   import { Convert } from "./file";
//
//   const lottery = Convert.toLottery(json);

export interface Lottery {
    idx:              number;
    lottery_number:   number;
    draw_no:          number;
    set_no:           number;
    price:            number;
    lottery_quantity: number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toLottery(json: string): Lottery[] {
        return JSON.parse(json);
    }

    public static lotteryToJson(value: Lottery[]): string {
        return JSON.stringify(value);
    }
}
