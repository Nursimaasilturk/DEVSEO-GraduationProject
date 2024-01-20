const checkH1Tags = (pageContent) => {
    const title = "H1 CHECK"
	const h1TagCount = (pageContent.match(/<h1\b[^>]*>(.*?)<\/h1>/gi) || []).length;
	if (h1TagCount === 0) {
		return "[WARNING] No <h1> tags found. A single page must has one <h1> Tag\n";
	} else if (h1TagCount === 1) {
		return "[SUCCESS] <h1> tags used correctly.\n";
	} else if (h1TagCount > 1) {
		return ` [WARNING] Only one <h1> tag should be used in single page. ${h1TagCount} found.\n`;
	} else {
		return "[WARNING] A single page must has a <h1> tag\n";
	}
}

function checkFooterTags(pageContent) {
    const footerTagCount = (pageContent.match(/<footer\b[^>]*>(.*?)<\/footer>/gi) || []).length;

    if (footerTagCount === 0) {
        return "[WARNING] No <footer> tags found. A single page must have one <footer> tag.\n";
    } else if (footerTagCount === 1) {
        return "[SUCCESS] <footer> tag used correctly.\n";
    } else if (footerTagCount > 1) {
        return `[WARNING] Only one <footer> tag should be used on a single page. ${footerTagCount} found.\n"`;
    } else {
        return "[WARNING] A single page must have a <footer> tag.\n";
    }
}

function checkTitleTag(pageContent) {
    const titleTagCount = (pageContent.match(/<title\b[^>]*>(.*?)<\/title>/gi) || []).length;

    if (titleTagCount === 0) {
        return " [WARNING] No <title> tag found. A single HTML page must have one <title> tag.\n";
    } else if (titleTagCount === 1) {
        return "[SUCCESS] <title> tag used correctly.\n";
    } else {
        return `[WARNING] Only one <title> tag should be used in a single HTML page. ${titleTagCount} found.\n`;
    }
}

function checkMetaDescriptionTag(pageContent) {
    const metaDescriptionTagCount = (pageContent.match(/<meta\s+name=["']description["'][^>]*>/gi) || []).length;

    if (metaDescriptionTagCount === 1) {
        return "[SUCCESS] <meta name=\"description\"> tag used correctly.\n";
    } else if (metaDescriptionTagCount === 0) {
        return "[WARNING] No <meta name=\"description\"> tag found. A single HTML page must have one.\n";
    } else {
        return `[WARNING] Only one <meta name="description"> tag should be used in a single HTML page. ${metaDescriptionTagCount} found.\n`;
    }

}

function checkMetaKeywordsTag(pageContent) {
    const metaKeywordsTagCount = (pageContent.match(/<meta\s+name=["']keywords["'][^>]*>/gi) || []).length;

    if (metaKeywordsTagCount === 1) {
        return "[SUCCESS] <meta name=\"keywords\"> tag used correctly.\n";
    } else if (metaKeywordsTagCount === 0) {
        return "[WARNING] No <meta name=\"keywords\"> tag found. A single HTML page must have one.\n";
    } else {
        return ` [WARNING]Only one <meta name="keywords"> tag should be used in a single HTML page. ${metaKeywordsTagCount} found.\n`;
    }
}

module.exports = {
    checkH1Tags,
    checkFooterTags,
    checkTitleTag,
    checkMetaDescriptionTag,
    checkMetaKeywordsTag,
}