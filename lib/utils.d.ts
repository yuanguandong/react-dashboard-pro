export declare function randomNum(minNum: number, maxNum: number): number;
export declare const getPosition: (random: any, fontSize: number) => {
    fontSize: number;
    top?: undefined;
    left?: undefined;
} | {
    fontSize: number;
    top: string;
    left: string;
};
export declare function generateUuid(len?: number, radix?: number): string;
