let { titleFont, baseFont, lightFont } = require('./../fonts.js');


const printSubtitle = ( message , pdfDoc ) => {

    pdfDoc.font(titleFont);
    if(message == '[WARNING]'){
        pdfDoc.fillColor('red');
        pdfDoc.text('[WARNING] ');
    }
    if(message == '[SUCCESS]'){
        pdfDoc.fillColor('green');
        pdfDoc.text('[SUCCESS] ');
    }

    pdfDoc.font(baseFont);
    pdfDoc.fillColor('black');
}

const printTagTitle = (title, pdfDoc) => {
    pdfDoc.font(titleFont);
    pdfDoc.fillColor('#2d8bba');
    pdfDoc.fontSize(15);
    pdfDoc.text(`\n${title}\n`);
    pdfDoc.font(baseFont);
    pdfDoc.fillColor('black');
    pdfDoc.fontSize(8);
}

module.exports = {
    printSubtitle,
    printTagTitle
}