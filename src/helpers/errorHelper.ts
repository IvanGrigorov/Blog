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
        '400' : {
            msgs: ["One or more validation errors occurred."],
            default: "There is an unhandled server error (Problem is not in your computer) !"
        },
        defaultMsg: "There is an unhandled server error (Problem is not in your computer) !"
    }

    static getErrorMsg(status, possibleMsg) : string {
        if (!this.errorConfig[status]) {
            return this.errorConfig.defaultMsg;
        }
        let possibleMsgs = <Array<string>> this.errorConfig[status].msgs;
        let msg = (typeof possibleMsg === "string") ? possibleMsg : possibleMsg.title;
        if (possibleMsgs.indexOf(msg) > -1) {
            if (status == '400') {
                for (const property in possibleMsg.errors) {
                    return possibleMsg.errors[property][0];
                }
                return this.errorConfig[status].default;
            }
            return msg;
        }
        return this.errorConfig[status].default;
    }
};