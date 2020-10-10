/**
 * The Localization : use for change game language
 * Author : Thomas Tran
 * email: thomas.tran@mfortune.co.uk
 * git: https://github.com/OnePassio/mini_html5_game.git
 */
enum GameLanguage {
    UK=1,
    VN = 2
}
export class Localization {
    private static gameLanguage:GameLanguage=GameLanguage.UK;
    public static getTextByID(id:number):string {
        let text ='';
        if(this.gameLanguage === GameLanguage.UK) {
            let value = LANGUAGE_UK[id];
            if(value!=null) {
                text = value;
            }
        }
        else if(this.gameLanguage === GameLanguage.VN) {
            let value = LANGUAGE_VN[id];
            if(value!=null) {
                text = value;
            }
        }
        return text;
    }
    public static formatString(str: string, ...val: string[]):string {
        for (let index = 0; index < val.length; index++) {
            str = str.replace(`{${index}}`, val[index]);
        }
        return str;
    }

}
const LANGUAGE_UK:{ [index: number]: string; }  = {
    1:'WIN',
    2:'SPINNING !',
    3:'SAFE {0}',
    4:'YOU WIN ${0}!',
    5:'Match a pair of symbols for a safe busting multiplier',
    6:'TOUCH THE DIAL TO SPIN YOUR $ DIGIT COMBINATION',
    7:'PLAY AGAIN',
    8:'PLAY'
};

const LANGUAGE_VN:{ [index: number]: string; }  = {
    1:'THẮNG',
    2:'ĐANG QUAY !',
    3:'KHÓA SỐ {0}',
    4:'CHIẾN THẮNG ${0}!',
    5:'Quay ra một cặp khóa có cấp độ nhân giống nhau',
    6:'CHẠM VÀO SPIN ĐỂ BẮT ĐẦU ĐI TÌM CẶP KHÓA',
    7:'CHƠI LẠI',
    8:'CHƠI'
};