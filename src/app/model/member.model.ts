// To parse this data:
//
//   import { Convert } from "./file";
//
//   const temperatures = Convert.toTemperatures(json);

export interface Member {
    user_id:   number;
    email:     string;
    password:  string;
    fullname:  string;
    birthdate: string;
    phone_no:  string;
    roles:     string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toMembers(json: string): Member[] {
        return JSON.parse(json);
    }

    public static MembersToJson(value: Member): string {
        return JSON.stringify(value);
    }


    public static toMember(json: string): Member {
        return JSON.parse(json);
    }

    public static MemberToJson(value: Member): string {
        return JSON.stringify(value);
    }
}
