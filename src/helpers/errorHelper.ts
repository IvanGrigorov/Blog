export class ErrorHelper {
    private static errorConfig = {
        '401' : {
            msgs: ["Wrong Password !", "Wrong Username !"],
            default: "You are not admin"
        },
        '500' : {
            msgs: [],
            default: "Server Error (Problem is not in your computer) !"
        },
        '404' : {
            msgs: [],
            default: "Ressource not found !"
        },
        defaultMsg: "There is an unhandled server error (Problem is not in your computer) !"
    }

    static getErrorMsg(status, possibleMsg) : string {
        if (!this.errorConfig[status]) {
            return this.errorConfig.defaultMsg;
        }
        let possibleMsgs = <Array<string>> this.errorConfig[status].msgs;
        if (possibleMsgs.indexOf(possibleMsg) > -1) {
            return possibleMsg;
        }
        return this.errorConfig[status].default;
    }
};