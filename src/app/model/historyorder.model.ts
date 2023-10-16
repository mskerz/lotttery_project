// To parse this data:
//
//   import { Convert } from "./file";
//
//   const historyOrderUser = Convert.toHistoryOrderUser(json);

export interface HistoryOrderUser {
    purchase_date:  string;
    fullname:       string;
    lottery_number: number;
    quantity_order: number;
    price:          number;
    total_price:    number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toHistoryOrderUser(json: string): HistoryOrderUser[] {
        return JSON.parse(json);
    }

    public static historyOrderUserToJson(value: HistoryOrderUser[]): string {
        return JSON.stringify(value);
    }
}
