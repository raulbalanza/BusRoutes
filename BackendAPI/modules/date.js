function date(){

    let d = new Date();

    return "(" + parse(d.getDate()) + "/" + parse(d.getMonth()+1) + "/" + d.getFullYear() + " - " + 
        parse(d.getHours()) + ":" + parse(d.getMinutes()) + ":" + parse(d.getSeconds()) + ")";

}

function parse(number){

    return (number >= 10) ? number : "0" + number;

}

module.exports = date;