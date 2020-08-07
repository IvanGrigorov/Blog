export class Helpers {
    static getCurrentDate(): string {
        return new Date().toString().split(' (')[0];
    };
};