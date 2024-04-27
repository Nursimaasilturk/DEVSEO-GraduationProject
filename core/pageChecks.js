//let { titleFont, baseFont, lightFont } = require('./fonts.js');
let { printSubtitle, printTagTitle } = require('./helper/titleHelper.js');
const checkH1Tags = (pageContent, pdfDoc) => {
    printTagTitle('H1 CHECK', pdfDoc);
    const h1TagCount = (pageContent.match(/<h1\b[^>]*>(.*?)<\/h1>/gi) || []).length;

    try {
        if (h1TagCount === 0) {
            printSubtitle('[WARNING]',pdfDoc);
            pdfDoc.text("No <h1> tags found. A single page must have one <h1> Tag\n");
        } else if (h1TagCount === 1) {
            printSubtitle('[SUCCESS]',pdfDoc);
            pdfDoc.text("<h1> tags used correctly.\n");
        } else if (h1TagCount > 1) {
            printSubtitle('[WARNING]',pdfDoc);
            pdfDoc.text(`Only one <h1> tag should be used on a single page. ${h1TagCount} found.\n`);
        }

        pdfDoc.text("\n".repeat(1));
    } catch (error) {
        console.error('Error in checkH1Tags:', error);
    }
};


function checkFooterTags(pageContent, pdfDoc) {
    printTagTitle('FOOTER CHECK', pdfDoc);
    const footerTagCount = (pageContent.match(/<footer\b[^>]*>(.*?)<\/footer>/gi) || []).length;

    if (footerTagCount === 0) {
       printSubtitle('[WARNING]',pdfDoc);
       pdfDoc.text("No <footer> tags found. A single page must have one <footer> tag.\n");

    } else if (footerTagCount === 1) {
       printSubtitle('[SUCCESS]',pdfDoc);
       pdfDoc.text("<footer> tag used correctly.\n");

    } else if (footerTagCount > 1) {
        printSubtitle('[WARNING]',pdfDoc);
       pdfDoc.text(`Only one <footer> tag should be used on a single page. ${footerTagCount} found.\n"`);
    } else {
        printSubtitle('[WARNING]',pdfDoc);
       pdfDoc.text("A single page must have a <footer> tag.\n");
    }
}

function checkTitleTag(pageContent,pdfDoc) {
    printTagTitle('TITLE TAG CHECK', pdfDoc);
    const titleTagCount = (pageContent.match(/<title\b[^>]*>(.*?)<\/title>/gi) || []).length;

    if (titleTagCount === 0) {
        printSubtitle('[WARNING]',pdfDoc);
       pdfDoc.text("No <title> tag found. A single HTML page must have one <title> tag.\n");
    } else if (titleTagCount === 1) {
        printSubtitle('[SUCCESS]',pdfDoc);
       pdfDoc.text("<title> tag used correctly.\n");
    } else {
        printSubtitle('[WARNING]',pdfDoc);
       pdfDoc.text(`Only one <title> tag should be used in a single HTML page. ${titleTagCount} found.\n`);
    }
}

function checkMetaDescriptionTag(pageContent,pdfDoc) {
    printTagTitle('META DESCRIPTION TAG CHECK', pdfDoc);
    const metaDescriptionTagCount = (pageContent.match(/<meta\s+name=["']description["'][^>]*>/gi) || []).length;

    if (metaDescriptionTagCount === 1) {
        printSubtitle('[SUCCESS]',pdfDoc);
       pdfDoc.text("<meta name=\"description\"> tag used correctly.\n");
    } else if (metaDescriptionTagCount === 0) {
        printSubtitle('[WARNING]',pdfDoc);
       pdfDoc.text(" No <meta name=\"description\"> tag found. A single HTML page must have one.\n");
    } else {
        printSubtitle('[WARNING]',pdfDoc);
       pdfDoc.text(`Only one <meta name="description"> tag should be used in a single HTML page. ${metaDescriptionTagCount} found.\n`);
    }

}

function checkMetaKeywordsTag(pageContent,pdfDoc) {
    printTagTitle('META KEYWORDS TAG CHECK', pdfDoc);

    const metaKeywordsTagCount = (pageContent.match(/<meta\s+name=["']keywords["'][^>]*>/gi) || []).length;

    if (metaKeywordsTagCount === 1) {
       printSubtitle('[SUCCESS]',pdfDoc);
       pdfDoc.text("<meta name=\"keywords\"> tag used correctly.\n");

    } else if (metaKeywordsTagCount === 0) {
       printSubtitle('[WARNING]',pdfDoc);
       pdfDoc.text("No <meta name=\"keywords\"> tag found. A single HTML page must have one.\n");
    } else {
        printSubtitle('[WARNING]',pdfDoc);
       pdfDoc.text(`Only one <meta name="keywords"> tag should be used in a single HTML page. ${metaKeywordsTagCount} found.\n`);
    }
}

module.exports = {
    checkH1Tags,
    checkFooterTags,
    checkTitleTag,
    checkMetaDescriptionTag,
    checkMetaKeywordsTag,
}