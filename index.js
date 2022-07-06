const moment = require("moment");
const nodemailer = require("nodemailer");
const fs = require("fs");
const mail_list = fs.readFileSync("./mail_list.txt", "utf8");
let u_mail = 'mail_adresiniz@gmail.com'; // Mail adresinizi giriniz.
let u_pass = 'uygulama_sifresi'; // Mail adresinizin uygulama şifresini giriniz. UYGULAMA ŞİFRESİ GİRİLECEKTİR GOOGLE DAN ARAŞTIRA BİLİRSİNİZ YOKSA MAİL GÖNDERİLMEZ

function log(msg) {
  console.log(`${moment().format("YYYY-MM-DD HH:mm:ss")} ➾ ${msg}`);
  fs.appendFileSync("./log.txt", `${moment().format("YYYY-MM-DD HH:mm:ss")} ➾ ${msg} \n`);
}

log("Program başlatıldı.");

const ac = nodemailer.createTransport({
host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: u_mail,
            pass: u_pass
        }
});

function mesaj(user_name) {
    let geri_yanit = `Merhaba ${user_name}, <br> Mesaj`;
    return geri_yanit;
}

let mail_list_arr = mail_list.split("\n");
for (let i = 0; i < mail_list_arr.length; i++) {
    let mailimiz = mail_list_arr[i].split(":");
    let mail = mailimiz[0];
    let name = mailimiz[1];
    var mail_config = {
        name: "SpeedSMM",
        from:  `SpeedSMM <${u_mail}>`,
        to: mail, 
        subject: "SpeedSMM | Tanıttım", 
        html: mesaj(name)
    };

    ac.sendMail(mail_config, function (err, info) {
    if(err) {
        log(`${i}. ${mail} adresine gönderilemedi!`);
        setTimeout(function () {
            log(err.message);
        }, 1000);
    }
    if(info) {
        log(`${i}. ${mail} adresine ${name} isimli kişiye mail gönderildi.`);
        setTimeout(function () {
            log(info.response);
        }, 1000);
    }});
    if(i == mail_list_arr.length - 1) {
        log("Program sonlandı. Mail Gönderim İşlemi Tamamlandı.");
        log('----------------------------------------------------------------------------------------------------------------------');
        log('Programın Yapımcısı: Can');
        log('Web Sitelerimiz: https://speedsmm.com ve https://fastuptime.com/');
        log('Github: https://github.com/fastuptime');
        log('----------------------------------------------------------------------------------------------------------------------');
    }
}